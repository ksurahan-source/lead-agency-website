# hi-ob.com — sGTM + BigQuery 세팅 가이드

> **Last updated: 2026-06-06**
> ✅ = 완료 | ⚠️ = 주의 필요 | 🔲 = 수동 작업 필요

---

## 확정된 ID / 키 레퍼런스

| 항목 | 값 | 상태 |
|---|---|---|
| **GTM 계정** | `6351881812` (hiob4515@gmail.com) | ✅ |
| **wGTM 컨테이너 ID** | `GTM-P74PV945` | ✅ |
| **sGTM 서버 컨테이너 ID** | `GTM-PDH7TJ87` | ✅ |
| **GCP 프로젝트** | `rising-goal-498613-a1` (hiob4515-org) | ✅ |
| **Cloud Run URL (기존 배포)** | `https://server-side-tagging-6hc6hrukiq-uc.a.run.app` | ✅ 이미 배포됨 |
| **Cloud Run 리전** | `us-central1` | ✅ |
| **sGTM 퍼스트파티 도메인** | `https://sgtm.hi-ob.com` | ✅ Worker 라우팅, HTTP 200 확인 |
| **GA4 Measurement ID** | `G-ZSRNLEWD1F` | ✅ |
| **Meta Pixel ID** | `1715625702927911` | ✅ |
| **BigQuery 프로젝트** | `rising-goal-498613-a1` | ✅ |
| **BigQuery 데이터셋** | `hiob_analytics` (us-central1) | ✅ |
| **BigQuery 테이블** | `hiob_analytics.events` (47컬럼, DAY 파티션) | ✅ |
| **런타임 SA** | `757010738491-compute@developer.gserviceaccount.com` | ✅ |
| **SA 권한** | `roles/bigquery.jobUser` + `roles/bigquery.dataEditor` | ✅ |

---

## 🔑 핵심 발견사항 (이전 세션 GTM 파일 분석 결과)

### sGTM 이미 배포되어 있음
- hi-ob sGTM Cloud Run은 **이미 배포 완료**: `https://server-side-tagging-6hc6hrukiq-uc.a.run.app`
- GTM-PDH7TJ87 서버 컨테이너의 `taggingServerUrls`에서 확인됨
- **추가 Cloud Run 배포 불필요** — CNAME만 연결하면 됨

### wGTM이 이미 sGTM URL을 참조 중
- `GTM-P74PV945` 의 변수 `CAPI v2 - const GTM Server URL` = `https://server-side-tagging-6hc6hrukiq-uc.a.run.app`
- GA4 Config 태그 (`CAPI v2 - GA4 Config - 페이지뷰`, tagId 97)의 `server_container_url` + `transport_url` 모두 이 변수 참조
- 현재 원시 Cloud Run URL로 라우팅 중 → **vanity 도메인 전환 후 변수 값 업데이트 필요**

### sGTM 서버 컨테이너 Meta CAPI 태그 현황
| 태그명 | tagId | 이벤트 | Pixel |
|---|---|---|---|
| `Meta CAPI - Lead` | 7 | `generate_lead` | `1715625702927911` |
| `Meta CAPI - Contact` | 9 | `Contact` | `1715625702927911` |

### sGTM 서버 컨테이너 클라이언트 현황
| 클라이언트명 | clientId | 타입 |
|---|---|---|
| GA4 Client | 1 | `gaaw_client`, cookie `FPID`, domain auto |
| HI-OB Web GTM Client | 4 | `gtm_client`, allowedContainerIds: `GTM-P74PV945`, path `/PEt1xrb` |

---

## 코드 변경 현황

- `NEXT_PUBLIC_GTM_SERVER_URL` 환경변수 지원 여부: 프로젝트 코드 확인 필요
  - chart-leaders의 경우 `app/layout.js` 수동 추가됨
  - hi-ob (`lead-agency-website`)도 동일한 패턴으로 추가 필요할 수 있음

---

## 작업 현황 체크리스트

### ✅ STEP 1 — GTM 서버 컨테이너 (이미 존재)

- 컨테이너 ID: `GTM-PDH7TJ87`
- 이미 배포 완료됨 — 신규 생성 불필요

### ✅ STEP 2 — Cloud Run sGTM (이미 배포됨)

```
URL: https://server-side-tagging-6hc6hrukiq-uc.a.run.app
리전: us-central1
```

> ℹ️ 기존 배포 확인됨. 추가 배포 불필요.
> 서비스가 중지된 경우에만 아래 재배포 스크립트 참고:

<details>
<summary>재배포 필요 시 (펼치기)</summary>

```bash
export PATH=/opt/homebrew/bin:/opt/homebrew/share/google-cloud-sdk/bin:/usr/bin:/bin:/usr/local/bin:$PATH

# Container Config는 GTM UI → GTM-PDH7TJ87 → Admin → Container Settings에서 확인
CONTAINER_CONFIG="GTM_Container_Config_값_입력"
PROJECT=rising-goal-498613-a1
REGION=us-central1
SERVICE=hiob-sgtm

gcloud run deploy "$SERVICE" \
  --project="$PROJECT" \
  --region="$REGION" \
  --image=gcr.io/cloud-tagging-10302018/gtm-cloud-image:stable \
  --platform=managed \
  --allow-unauthenticated \
  --min-instances=1 \
  --max-instances=3 \
  --memory=512Mi \
  --cpu=1 \
  --port=8080 \
  --set-env-vars="CONTAINER_CONFIG=${CONTAINER_CONFIG}" \
  --timeout=60
```
</details>

### ✅ STEP 3 — Cloudflare DNS + Worker Proxy 설정 (완료)

#### 아키텍처 (DNS Only가 아닌 Worker Proxy 방식)

> Cloud Run은 `*.run.app` TLS 인증서만 보유 → 커스텀 도메인에 DNS Only(회색)를 설정하면 TLS 실패.  
> 해결책: **Cloudflare Proxy(주황) + Worker**로 Host 헤더를 Cloud Run URL로 교체.

```
[브라우저] → sgtm.hi-ob.com
    │ Cloudflare Proxy (주황, TLS 종단)
    ↓ Worker: hiob-sgtm-proxy
    │ Host 헤더를 server-side-tagging-6hc6hrukiq-uc.a.run.app 으로 교체
    ↓ Cloud Run: server-side-tagging-6hc6hrukiq-uc.a.run.app
```

**DNS 레코드 (설정 완료)**

| 타입 | 이름 | 대상 | 프록시 |
|---|---|---|---|
| `CNAME` | `sgtm` | `server-side-tagging-6hc6hrukiq-uc.a.run.app` | **Proxied (주황)** ✅ |

**Worker 배포 (완료)**

- Worker 이름: `hiob-sgtm-proxy`
- Worker Route: `sgtm.hi-ob.com/*` → `hiob-sgtm-proxy` (Route ID: `558e99d147174ae5972e167f37f2023f`)

Worker 코드 (Host 헤더 교체):
```javascript
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  const url = new URL(request.url);
  const originHost = "server-side-tagging-6hc6hrukiq-uc.a.run.app";
  const originUrl = "https://" + originHost + url.pathname + url.search;
  
  const headers = new Headers(request.headers);
  headers.set("Host", originHost);
  
  const originRequest = new Request(originUrl, {
    method: request.method,
    headers: headers,
    body: request.method !== "GET" && request.method !== "HEAD" ? request.body : null,
  });
  
  return await fetch(originRequest);
}
```

**검증 결과 (2026-06-06)**

```bash
curl --resolve "sgtm.hi-ob.com:443:104.21.10.201" \
  "https://sgtm.hi-ob.com/gtm.js?id=GTM-P74PV945" -o /dev/null -w "%{http_code}"
# → 200 ✅
```

### ✅ STEP 4 — Cloudflare Pages 환경변수 (완료)

설정 완료:

| 변수명 | 값 | 환경 |
|---|---|---|
| `NEXT_PUBLIC_GTM_SERVER_URL` | `https://sgtm.hi-ob.com` | Production ✅ |

재배포 완료.

### 🔲 STEP 5 — GTM wGTM (`GTM-P74PV945`) 수정 및 게시

CNAME + 재배포 완료 후:

1. https://tagmanager.google.com → `GTM-P74PV945` 컨테이너
2. **Variables** → `CAPI v2 - const GTM Server URL`
   - 현재값: `https://server-side-tagging-6hc6hrukiq-uc.a.run.app`
   - 변경값: `https://sgtm.hi-ob.com` ← **반드시 변경**
3. `CAPI v2 - GA4 Config - 페이지뷰` 태그 확인:
   - `server_container_url` = `{{CAPI v2 - const GTM Server URL}}` → 자동 반영
   - `transport_url` = `{{CAPI v2 - const GTM Server URL}}` → 자동 반영
4. **Publish** (게시)

### 🔲 STEP 6 — sGTM 서버 컨테이너 (`GTM-PDH7TJ87`): BQ 태그 설치

1. GTM UI → 서버 컨테이너 `GTM-PDH7TJ87`
2. **Templates** → **Search Gallery** → `GA4 to BigQuery` 검색 (by google)
   - 또는 https://github.com/google/sgtm-ga4-to-bigquery `.tpl` Import
3. **Tags** → **New** → 위 템플릿 선택
4. 설정값:

   | 필드 | 값 |
   |---|---|
   | Measurement ID | `G-ZSRNLEWD1F` |
   | BigQuery Project ID | `rising-goal-498613-a1` |
   | BigQuery Dataset ID | `hiob_analytics` |
   | BigQuery Table ID | `events` |

5. **Trigger**: All Events
6. **Publish**

---

## 현재 wGTM 태그 구조 (GTM-P74PV945) — 주요 태그

| 태그명 | tagId | 이벤트/트리거 | 상태 |
|---|---|---|---|
| `CAPI v2 - GA4 Config - 페이지뷰` | 97 | 페이지뷰 트리거 (71) | ✅ GA4 + sGTM 라우팅 |
| `CAPI v2 - GA4 Event - 리드 완료 (300,000원)` | 86 | generate_lead (55) | ✅ value=300000 KRW |
| `GA4 Event - 페이지뷰 스크롤 깊이` | 94 | 스크롤 트리거 | ✅ Lookup - Scroll Value |
| `GA4 Event - 카카오톡 버튼 클릭 Contact` | 100 | Contact 클릭 트리거 | ✅ |

GA4 이벤트 공통 파라미터 (DLV 변수):
- `event_id`, `event_name`, `action_source`, `event_source_url`
- `page_location`, `page_referrer`, `page_title`
- `content_name`, `lead_company`, `lead_source`
- `fbp`, `fbc`, `external_id`
- `x-fb-ud-em`, `x-fb-ud-ph`, `x-fb-ud-fn`, `x-fb-ud-ln`
- `x-fb-ck-fbp`, `x-fb-ck-fbc`, `x-fb-cd-content_name`
- `custom_properties`, `scroll_threshold`

---

## 검증 쿼리 (BQ 태그 설치 후)

```sql
SELECT event_name, COUNT(*) AS c, COUNTIF(content IS NOT NULL) AS with_campaign
FROM `rising-goal-498613-a1.hiob_analytics.events`
WHERE _PARTITIONDATE >= DATE_SUB(CURRENT_DATE(), INTERVAL 1 DAY)
GROUP BY event_name ORDER BY c DESC;
```
