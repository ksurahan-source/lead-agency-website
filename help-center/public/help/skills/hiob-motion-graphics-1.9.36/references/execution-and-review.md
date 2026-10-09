# 현재 실행 계약과 검수

`creative_catalog`의 실제 schema가 아래 요약보다 우선한다. source code가 있다는 것과 고객 실행 경로는 다르다.

| 요청 | 현재 실행 | 주의 |
|---|---|---|
| 제목·자막의 내용/위치/스타일 | edit_check → edit_assemble | 카탈로그가 허용한 필드만 사용 |
| 제목·자막 입장 애니메이션 | 고정 렌더 동작(첫 5프레임 10px 상승) | 선택 가능한 모션 preset으로 표시하지 않음 |
| 시간 지정 flash/vignette/zoom | edit.effects → edit_check → edit_assemble | 실제 schema의 start/end/strength; 승인 카메라·라벨 hold를 보존 |
| 로고 위치/크기/불투명도·영상 색 보정 | edit.logos / videoAdjustments | 실제 파일/hash와 자산 연결; 자유로운 레이어 모션은 아님 |
| 음악·효과음 배치 | sound_library/import, audio_inspect, audio_set | audio_set은 전체 트랙 교체, 승인 발화와 타이밍 보존 |
| 영상 보존 음향 후보 | audio_export | stream 보존 여부·실제 후보를 검수, 모션 생성 경로가 아님 |
| 임의 VFX·스티커·GIF·path·counter·motionPreset | MCP v1 미연결 | 지원되는 effects와 구별; 실제 코드/소비자 구현 후보로 분리 |
| 영상 컷 재생 속도 | MCP v1 미연결 | audio playbackRate로 영상 시간까지 바뀌었다고 주장하지 않음 |

## 구현 후보의 완료 조건

현재 `required-ad-finish-2026-10-05` 정책은 음악·SFX·제목·자막·서로 다른 두 효과를 확인한다. 이는 현재 완료 계약이며 스킬의 일반 취향으로 우회하거나 성공 자산에 소급 적용하지 않는다. 실제 화면 사건/승인 보존과 충돌하면 구체적인 충돌을 기록한다. 새 후보 전체에 장식 효과를 늘리거나 이 존재 검사로 광고 품질 pass를 만들지 않는다.

실제 source/component ID→프로젝트 저장→미리보기→재열기→등록된 render 입력→최종 파일→다운로드의 계보를 기록한다. 호스트가 수동 조립한 MP4는 해당 수동 제작만 입증한다. 기존 화면비·디자인·음성 타이밍을 새 템플릿 기본값으로 덮어쓰지 않는다.

Remotion 코드의 시간은 실제 fps/useCurrentFrame과 deterministic animation으로 연결하고 설치 버전의 API를 사용한다. 인터넷 이미지·폰트는 실제 파일·허가·로드 결과를 확인한다. 컷 종료 이후 불필요한 미세 움직임을 강제하지 않는다. preview와 렌더는 별도 실제 증거이며 미실행이면 표시한다.

## 대표 실패

- “30% 예약금” counter가 승인 전문과 다른 수치를 보여줌: 숫자/조건 대조 실패.
- label hold가 Ken Burns로 잘림: 실제 제품/읽기 검사 실패.
- `motionPreset`을 MCP edit 입력에 추가: 현재 스키마 미지원. 필드를 제거하고 지원되는 제목/자막으로 진행하거나 별도 코드 후보를 만든다.
- 검수표 점수 9점만 있고 영상/음성 미관찰: unverified. 실제 구간을 보고 기록할 때까지 pass 금지.
