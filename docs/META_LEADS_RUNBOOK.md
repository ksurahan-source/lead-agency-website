# Meta Lead Ads 동기화 가이드 (META_LEADS_RUNBOOK)

Meta Lead Form으로 수집된 리드를 자동으로 hi-op 데이터베이스로 동기화하고, 리드 상태 변화를 Meta CAPI로 보내는 시스템입니다.

## 개요

1. **Pull (Meta → D1)**: 30분마다 cron job이 Meta Lead Form API를 호출하여 신규 리드를 D1으로 가져옵니다.
2. **Push (D1 → Meta)**: 관리자가 리드 상태를 변경할 때 (`contacted`, `consulted`, `paid`), Meta CAPI로 스테이지 이벤트를 전송합니다.

---

## 단계 1: Meta Business Settings에서 토큰 발급

### 1.1 System User 토큰 생성

1. **Meta Business Settings** 접속 (https://business.facebook.com/)
2. **Users** → **System Users** 메뉴
3. **Create System User** 클릭
4. 이름: `hiob-lead-sync` (또는 임의)
5. Role: **Admin**
6. **Create System User** 확인

### 1.2 필요한 권한 할당

생성된 System User의 **Permissions** 탭에서:

- `leads_retrieval` ✓
- `pages_show_list` ✓

또는 해당 앱(Pixel)의 **Roles and Permissions** 에서 System User에 권한 할당

### 1.3 액세스 토큰 생성

System User 클릭 → **Generate new token**

- **App**: hi-op Pixel이 포함된 앱 선택
- **Token Expires**: 60일 (또는 최대 가능 기간)
- 토큰 복사 및 안전한 곳에 저장

---

## 단계 2: Cloudflare Pages 환경 변수 설정

### 2.1 필수 변수

Cloudflare Pages 대시보드 → Settings → Environment variables

| 변수명 | 값 | 예시 |
|--------|-----|------|
| `META_LEADS_TOKEN` | 단계 1에서 생성한 토큰 | `EAAC...` |
| `CRON_SECRET` | Cron 요청 인증용 시크릿 (임의 생성) | `super-secret-key-12345` |
| `META_LEAD_FORM_IDS` | 콤마로 구분된 Meta Lead Form ID 목록 | `867521075797089` 또는 `form1,form2` |

### 2.2 선택 변수

| 변수명 | 기본값 | 설명 |
|--------|---------|------|
| `META_PIXEL_ID` | `1715625702927911` | Meta Conversion Pixel ID (리드 스테이지 이벤트 전송) |
| `META_ACCESS_TOKEN` | (필수 없음) | CAPI 콜백용 토큰 (이미 있으면 사용, 없으면 `META_LEADS_TOKEN` 사용) |
| `META_TEST_EVENT_CODE` | (없음) | 테스트 모드 코드 (개발 시에만 설정) |

---

## 단계 3: D1 마이그레이션 실행

### 3.1 DB 이름 확인

`wrangler.toml` 확인:

```toml
[[d1_databases]]
binding = "DB"
database_name = "leads-db"     # ← 이 이름 사용
database_id = "b4f91404-552b-4505-a9e9-52701d44bd78"
```

### 3.2 마이그레이션 적용

```bash
wrangler d1 migrations list leads-db --remote
wrangler d1 migrations apply leads-db --remote
```

**원칙**: prod DB는 직접 수정하지 않습니다. `wrangler.toml`의 `migrations_dir = "db/migrations"`를 사용해 Wrangler가 적용 이력을 추적하게 합니다.

---

## 단계 4: 배포

```bash
npm run build      # 빌드 검증
npm run pages:build
npm run deploy
```

---

## 단계 5: Cloud Scheduler 설정 (Google Cloud)

Cron job이 30분마다 리드를 동기화하도록 설정합니다.

### 5.1 Job 생성

```bash
gcloud scheduler jobs create http hiob-meta-leads-30min \
  --schedule="*/30 * * * *" \
  --uri="https://hi-ob.com/api/cron/pull-meta-leads?key=<CRON_SECRET>" \
  --http-method=GET \
  --location=asia-northeast3 \
  --project=rising-goal-498613-a1
```

**주의**: `<CRON_SECRET>`을 실제 값으로 바꾸세요.

### 5.2 Cron 스케줄 확인

```bash
gcloud scheduler jobs list --location=asia-northeast3
```

---

## 단계 6: 첫 동기화 테스트

### 6.1 드라이런 (데이터 불러오기만, 저장 없음)

```bash
curl "https://hi-ob.com/api/cron/pull-meta-leads?key=<CRON_SECRET>&dry=1&days=7"
```

**응답 예시:**
```json
{
  "forms": [
    {
      "form_id": "867521075797089",
      "scanned": 25,
      "inserted": 0,
      "skipped": 0
    }
  ],
  "errors": [],
  "dry": true
}
```

### 6.2 전체 백필 (90일, 실제 저장)

```bash
curl "https://hi-ob.com/api/cron/pull-meta-leads?key=<CRON_SECRET>&days=90"
```

---

## 단계 7: Meta Events Manager 연결

### 7.1 Conversion 퍼널 매핑

Meta Business Suite → **Events Manager** → **Conversions**

새로운 변환 단계 추가:

| 단계명 | CAPI 이벤트 | 설명 |
|--------|-----------|------|
| 처음 연락 (lead_contacted) | `lead_contacted` | 관리자가 첫 연락 시작 |
| 중간 상담 (lead_consulted) | `lead_consulted` | 깊이 있는 상담/미팅 진행 |
| 최종 성약 (lead_paid) | `lead_paid` | 계약/결제 완료 |

### 7.2 Value 설정

`lead_paid` 이벤트에 Value 추적:

- **Value**: 리드의 계약금액 (기본값: 500,000 KRW)
- **Currency**: `KRW`

### 7.3 CRM 퍼널 설정 (선택)

Meta CRM 또는 자체 DB와 연동:
1. Conversion Lead 소스: `api.lead_ads`
2. 스테이지 매핑:
   - `lead_contacted` → 중간 단계
   - `lead_consulted` → 다음 단계
   - `lead_paid` → 최종 단계

---

## 운영 가이드

### 조회

리드 목록 조회:
```bash
curl "https://hi-ob.com/api/leads?pw=<ADMIN_PASSWORD>"
```

### 상태 업데이트

관리자 대시보드에서 리드 상태를 변경하면, 자동으로 Meta CAPI로 이벤트가 전송됩니다.

```bash
curl -X PATCH https://hi-ob.com/api/leads?pw=<ADMIN_PASSWORD> \
  -H "Content-Type: application/json" \
  -d '{"id":"lead-uuid","status":"consulted"}'
```

**자동 발생:**
- Status = `contacted` → Meta에 `lead_contacted` 이벤트
- Status = `consulted` → Meta에 `lead_consulted` 이벤트
- Status = `paid` → Meta에 `lead_paid` 이벤트 (value + currency 포함)

### 로깅

Cloudflare Pages Function 로그:
```bash
wrangler tail
```

---

## 90일 보관 및 토큰 순환

### Meta Lead API

- **보관 기간**: 90일 (Meta 기본 정책)
- 초기 동기화 시 `&days=90` 사용
- 정기 동기화 (30분마다)는 자동으로 `days=7` (기본값) 사용

### 액세스 토큰

- **만료 기간**: 60일
- **갱신**: 매월 1회, 새 토큰 생성 후 `META_LEADS_TOKEN` 업데이트
- **알림**: 만료 7일 전에 갱신하기

---

## 검증 쿼리

### D1 직접 조회

```bash
wrangler d1 shell leads-db --remote
```

```sql
-- 최근 24시간 신규 리드
SELECT id, name, email, source, created_at FROM leads
WHERE source = 'meta_lead_ads'
  AND created_at > datetime('now', '-1 day')
ORDER BY created_at DESC;

-- 메타 소스 ID로 메타 리드 조회
SELECT id, name, email, source_id, metadata FROM leads
WHERE source_id IS NOT NULL
LIMIT 10;

-- 상태별 리드 카운트
SELECT status, COUNT(*) as count FROM leads GROUP BY status;
```

---

## 문제 해결

### Cron 실패 (403 Unauthorized)

**원인**: `key` 파라미터가 일치하지 않음

**해결**: `<CRON_SECRET>` 값이 정확한지 확인

### Meta API 에러 (400 / 401)

**원인**: 토큰 만료 또는 권한 부족

**해결**:
1. 토큰 재발급
2. System User 권한 확인 (`leads_retrieval`, `pages_show_list`)

### 리드가 동기화되지 않음

**원인**: Meta Lead Form이 실제로 리드를 생성하지 않음

**해결**:
1. Meta Lead Form이 활성화되어 있는지 확인
2. 테스트 리드 제출 후 API로 확인:
   ```bash
   curl "https://hi-ob.com/api/cron/pull-meta-leads?key=<CRON_SECRET>&dry=1&days=1"
   ```
3. `scanned` > 0인지 확인

---

## 추가 참고

- [Meta Graph API Docs (Lead Form)](https://developers.facebook.com/docs/graph-api/reference/lead-gen-data)
- [Meta CAPI 설정](https://developers.facebook.com/docs/marketing-api/conversions-api)
- [Cloudflare Pages 환경 변수](https://developers.cloudflare.com/pages/functions/bindings/)
- 이 프로젝트: `/Users/surahanchoi/lead-agency-website`
