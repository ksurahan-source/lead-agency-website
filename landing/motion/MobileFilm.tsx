import React from "react";
import {
  AbsoluteFill,
  Composition,
  OffthreadVideo,
  Sequence,
  registerRoot,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { loadFont } from "@remotion/fonts";
loadFont({
  family: "Noto",
  url: staticFile("NotoSansKR.ttf"),
  weight: "100 900",
});
const ease = (n: number) => {
  const t = Math.max(0, Math.min(1, n));
  return t * t * (3 - 2 * t);
};
const accent = ["#ef623f", "#4067da", "#7954c5", "#ef623f", "#ef623f"];
const titles = [
  "자료를 넣고,\n원하는 영상을 말하세요.",
  "만들기 전에,\n기획부터 함께.",
  "장면·목소리·자막을\n한 흐름으로.",
  "좋은 장면은 남기고,\n선택한 장면만 짧게.",
  "완성본도,\n다음 편집도 함께.",
];
const results = [
  "HIOB와 대화 시작",
  "확인한 기획으로 제작",
  "하나의 프로젝트로 연결",
  "필요한 부분만 수정",
  "프로젝트에서 이어서 편집 ↗",
];
function Scene({ index }: { index: number }) {
  const f = useCurrentFrame(),
    t = f / 30,
    blue = accent[index];
  const row: React.CSSProperties = {
    borderRadius: 18,
    padding: "18px 28px",
    background: "#f3f3f3",
    fontSize: 43,
    lineHeight: 1.45,
  };
  return (
    <AbsoluteFill
      style={{
        background: index === 2 ? "#151515" : "#f5f5f5",
        color: index === 2 ? "white" : "#181818",
        fontFamily: "Noto",
        padding: 60,
      }}
    >
      <div style={{ fontSize: 29, color: blue, letterSpacing: 3 }}>
        0{index + 1} / HIOB
      </div>
      <h1
        style={{
          fontSize: 61,
          lineHeight: 1.25,
          letterSpacing: -2,
          margin: "25px 0 0",
          whiteSpace: "pre-line",
        }}
      >
        {titles[index]}
      </h1>
      <div
        style={{
          position: "absolute",
          left: 60,
          right: 60,
          top: 315,
          height: 610,
          background: "white",
          color: "#181818",
          border: "2px solid #e3e3e3",
          borderRadius: 28,
          padding: 38,
          boxShadow: "0 25px 60px #0000000a",
        }}
      >
        <div
          style={{
            fontSize: 32,
            borderBottom: "2px solid #eee",
            paddingBottom: 22,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <strong>
            hiob<span style={{ color: "#ef623f" }}>●</span>
          </strong>
          <span style={{ fontSize: 28, color: "#777" }}>
            제품 사용 흐름 · 연출
          </span>
        </div>
        {index === 0 && (
          <>
            <div
              style={{
                ...row,
                fontSize: 36,
                marginTop: 24,
                opacity: ease((t - 0.4) / 0.7),
              }}
            >
              ↗ HIOB_서비스소개.pdf
            </div>
            <div
              style={{
                fontSize: 50,
                lineHeight: 1.35,
                fontWeight: 700,
                marginTop: 23,
              }}
            >
              이 자료로 30초
              <br />
              소개 영상을 만들어줘.
            </div>
            <div
              style={{
                ...row,
                background: "#fff1ec",
                marginTop: 25,
                opacity: ease((t - 2.1) / 0.7),
              }}
            >
              먼저 기획을 정리할게요.
              <br />
              <span style={{ fontSize: 34 }}>훅 → 장면 → 나레이션</span>
            </div>
          </>
        )}
        {index === 1 && (
          <div style={{ marginTop: 22 }}>
            {[
              "대화로 시작하기",
              "장면·음성·자막 만들기",
              "완성본과 프로젝트",
            ].map((label, i) => (
              <div
                key={label}
                style={{
                  ...row,
                  marginBottom: 14,
                  opacity: ease((t - 0.2 - i * 0.6) / 0.5),
                  display: "flex",
                  alignItems: "center",
                  gap: 25,
                }}
              >
                <span style={{ fontSize: 29, color: blue }}>0{i + 1}</span>
                <strong>{label}</strong>
              </div>
            ))}
            <div
              style={{
                fontSize: 37,
                color: blue,
                marginTop: 22,
                opacity: ease((t - 3) / 0.45),
              }}
            >
              ✓ 확인한 기획으로 제작 시작
            </div>
          </div>
        )}
        {index === 2 && (
          <div style={{ marginTop: 22 }}>
            {["장면", "목소리", "자막"].map((label, i) => {
              const ready = ease((t - 1 - i * 0.6) / 0.7);
              return (
                <div
                  key={label}
                  style={{
                    ...row,
                    marginBottom: 16,
                    background: ["#edf1fc", "#f3eefa", "#fff1ec"][i],
                  }}
                >
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <strong>{label}</strong>
                    <span style={{ color: accent[i + 1] || blue }}>
                      {ready > 0.95 ? "✓" : "…"}
                    </span>
                  </div>
                  <div style={{ height: 7, background: "#ddd", marginTop: 15 }}>
                    <div
                      style={{
                        width: `${ready * 100}%`,
                        height: "100%",
                        background: accent[i + 1] || blue,
                      }}
                    />
                  </div>
                </div>
              );
            })}
            <div style={{ fontSize: 29, color: "#666" }}>
              확인한 기획에 필요한 소재를 제작합니다.
            </div>
          </div>
        )}
        {index === 3 && (
          <>
            <div style={{ fontSize: 42, marginTop: 30 }}>
              “가운데 장면만 더 짧게.”
            </div>
            <div
              style={{ display: "flex", gap: 13, height: 160, marginTop: 32 }}
            >
              {["시작", "선택", "끝"].map((label, i) => (
                <div
                  key={label}
                  style={{
                    width: i === 1 ? 280 - 110 * ease((t - 1.2) / 1.6) : 245,
                    background: i === 1 ? "#fff1ec" : "#242424",
                    color: i === 1 ? "#181818" : "white",
                    border: `4px solid ${i === 1 ? blue : "transparent"}`,
                    borderRadius: 12,
                    padding: 24,
                    fontSize: 45,
                    fontWeight: 700,
                    position: "relative",
                  }}
                >
                  {label}
                  {i === 1 && (
                    <span
                      style={{
                        position: "absolute",
                        right: 8,
                        bottom: 15,
                        color: blue,
                      }}
                    >
                      Ⅱ
                    </span>
                  )}
                </div>
              ))}
            </div>
            <div
              style={{
                ...row,
                marginTop: 25,
                background: "#f3eefa",
                fontSize: 35,
              }}
            >
              ▂▅▃▇▃▂▆▇　나레이션
            </div>
            <div style={{ ...row, marginTop: 15, fontSize: 35 }}>
              당신이 감독하고, 히옵이 연결합니다.
            </div>
          </>
        )}
        {index === 4 && (
          <>
            <div
              style={{
                height: 210,
                marginTop: 26,
                borderRadius: 15,
                overflow: "hidden",
                position: "relative",
                background: "#181818",
              }}
            >
              <OffthreadVideo
                src={staticFile("video/scene-5.mp4")}
                muted
                style={{ height: "100%", width: "100%", objectFit: "cover" }}
              />
              <span
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "grid",
                  placeItems: "center",
                  fontSize: 57,
                  color: "white",
                  background: "#0002",
                }}
              >
                ▶
              </span>
            </div>
            {["MP4  완성 영상", "WAV · SRT  음원과 자막"].map((label, i) => (
              <div
                key={label}
                style={{
                  fontSize: 39,
                  padding: "21px 0",
                  borderBottom: "2px solid #eee",
                  opacity: ease((t - 0.6 - i * 0.8) / 0.6),
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                {label}
                <span>↓</span>
              </div>
            ))}
          </>
        )}
      </div>
      <div
        style={{
          position: "absolute",
          left: 60,
          bottom: 55,
          fontSize: 39,
          fontWeight: 700,
          opacity: ease((t - 3.5) / 0.45),
        }}
      >
        <span style={{ color: blue }}>● </span>
        {results[index]}
      </div>
    </AbsoluteFill>
  );
}
function Film() {
  return (
    <AbsoluteFill>
      {titles.map((_, i) => (
        <Sequence
          key={i}
          from={i * 180}
          durationInFrames={180}
          premountFor={30}
        >
          <Scene index={i} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
}
registerRoot(() => (
  <Composition
    id="HIOBMobile"
    component={Film}
    fps={30}
    durationInFrames={900}
    width={1080}
    height={1080}
  />
));
