import importlib.util
import pathlib
import sys
import types
import unittest
from datetime import datetime, timezone


sys.modules.setdefault("functions_framework", types.SimpleNamespace(http=lambda fn: fn))
sys.modules.setdefault("requests", types.SimpleNamespace(RequestException=Exception, post=None))
sys.modules.setdefault("google", types.ModuleType("google"))
sys.modules.setdefault("google.api_core", types.ModuleType("google.api_core"))
exceptions_module = types.ModuleType("google.api_core.exceptions")
exceptions_module.NotFound = type("NotFound", (Exception,), {})
sys.modules.setdefault("google.api_core.exceptions", exceptions_module)
sys.modules.setdefault("google.cloud", types.ModuleType("google.cloud"))
sys.modules.setdefault(
    "google.cloud.bigquery",
    types.SimpleNamespace(
        Client=object,
        Table=object,
        SchemaField=lambda *args, **kwargs: None,
        QueryJobConfig=lambda *args, **kwargs: types.SimpleNamespace(query_parameters=[]),
        ScalarQueryParameter=lambda *args, **kwargs: None,
        ArrayQueryParameter=lambda *args, **kwargs: None,
    ),
)
sys.modules.setdefault(
    "google.cloud.secretmanager",
    types.SimpleNamespace(SecretManagerServiceClient=object),
)

MODULE_PATH = pathlib.Path(__file__).with_name("main.py")
SPEC = importlib.util.spec_from_file_location("meta_crm_bq_export_main", MODULE_PATH)
main = importlib.util.module_from_spec(SPEC)
sys.modules[SPEC.name] = main
SPEC.loader.exec_module(main)


HASHED_EMAIL = "7b17fb0bd173f625b58636fb796407c22b3d16fc78302d79f0fd30c2fc2fc068"
HASHED_PHONE = "6069d14bf122fdfd931dc7beb58e5dfbba395b1faf05bdcd42d12358d63d8599"


class MetaCrmPayloadTest(unittest.TestCase):
    def test_lead_payload_uses_allowlisted_hashed_fields(self):
        candidate = main.Candidate(
            source_event_id="lead-event-1",
            source_event_name="generate_lead",
            crm_event_name="Lead",
            event_time=1673035686,
            event_timestamp=datetime.now(timezone.utc),
            lead_id="1234567890123456",
            em=HASHED_EMAIL,
            ph=HASHED_PHONE,
            fn=None,
            ln=None,
            external_id=HASHED_EMAIL,
            fbp="fb.1.123.abc",
            fbc="fb.1.123.click",
            value=300000,
            currency="KRW",
        )

        payload = main.build_meta_payload(candidate)
        event = payload["data"][0]

        self.assertEqual(event["event_name"], "Lead")
        self.assertEqual(event["action_source"], "system_generated")
        self.assertEqual(event["event_id"], "lead-event-1")
        self.assertEqual(event["custom_data"]["event_source"], "crm")
        self.assertEqual(event["custom_data"]["lead_event_source"], "hi-ob BigQuery")
        self.assertEqual(event["user_data"]["lead_id"], "1234567890123456")
        self.assertEqual(event["user_data"]["em"], [HASHED_EMAIL])
        self.assertEqual(event["user_data"]["ph"], [HASHED_PHONE])
        self.assertEqual(event["user_data"]["external_id"], [HASHED_EMAIL])
        self.assertEqual(event["user_data"]["fbp"], "fb.1.123.abc")
        self.assertEqual(event["user_data"]["fbc"], "fb.1.123.click")
        self.assertNotIn("email", event["user_data"])
        self.assertNotIn("phone_number", event["user_data"])

    def test_rejects_raw_or_empty_identifier_values(self):
        candidate = main.Candidate(
            source_event_id="lead-event-2",
            source_event_name="Lead",
            crm_event_name="Lead",
            event_time=1673035686,
            event_timestamp=datetime.now(timezone.utc),
            lead_id="not-a-meta-lead-id",
            em="person@example.com",
            ph="821012345678",
            fn="",
            ln=None,
            external_id="not-a-hash",
            fbp=None,
            fbc=None,
            value=None,
            currency=None,
        )

        user_data = main.build_meta_payload(candidate)["data"][0]["user_data"]
        self.assertEqual(user_data, {})

    def test_stage_event_gets_deterministic_crm_event_id(self):
        candidate = main.Candidate(
            source_event_id="1234567890123456",
            source_event_name="lead_paid",
            crm_event_name="lead_paid",
            event_time=1673035686,
            event_timestamp=datetime.now(timezone.utc),
            lead_id="1234567890123456",
            em=HASHED_EMAIL,
            ph=None,
            fn=None,
            ln=None,
            external_id=None,
            fbp=None,
            fbc=None,
            value=500000,
            currency="KRW",
        )

        first = main.build_meta_payload(candidate)["data"][0]
        second = main.build_meta_payload(candidate)["data"][0]
        self.assertEqual(first["event_id"], second["event_id"])
        self.assertTrue(first["event_id"].startswith("crm_"))
        self.assertEqual(first["custom_data"]["value"], 500000)
        self.assertEqual(first["custom_data"]["currency"], "KRW")


if __name__ == "__main__":
    unittest.main()
