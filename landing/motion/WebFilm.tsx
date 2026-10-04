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
const ink = "#181818",
  orange = "#ef623f";
const ease = (n: number) => {
  const t = Math.max(0, Math.min(1, n));
  return t * t * (3 - 2 * t);
};
const titles = [
  "자료를 넣고, 원하는 영상을 말하세요.",
  "만들기 전에, 기획부터 함께.",
  "장면·목소리·자막을 한 흐름으로.",
  "전체가 아니라, 선택한 장면만.",
  "완성본도, 다음 편집도 함께.",
];
const results = [
  "HIOB와 대화 시작",
  "확인한 기획으로 제작 시작",
  "제작한 소재를 하나의 프로젝트로",
  "좋은 장면은 그대로 유지",
  "MP4 + 음원 + 자막 + 프로젝트",
];
const tags = ["CONNECT", "PLAN", "CREATE", "REFINE", "DELIVER"];
const accents = [orange, "#4067da", "#7954c5", orange, orange];
const box: React.CSSProperties = {
  background: "#fff",
  border: "2px solid #e2e2e2",
  borderRadius: 24,
  boxShadow: "0 20px 65px #0000000c",
};
const pill: React.CSSProperties = {
  padding: "12px 24px",
  borderRadius: 14,
  fontSize: 30,
  fontWeight: 650,
};

function Cursor({
  x,
  y,
  click = false,
}: {
  x: number;
  y: number;
  click?: boolean;
}) {
  return (
    <svg
      width="55"
      height="65"
      viewBox="0 0 55 65"
      style={{
        position: "absolute",
        left: x,
        top: y,
        transform: `scale(${click ? 0.85 : 1})`,
        filter: "drop-shadow(0 4px 5px #0003)",
      }}
    >
      <path
        d="M8 3 L45 39 L29 39 L37 57 L27 62 L20 44 L8 54 Z"
        fill="white"
        stroke={ink}
        strokeWidth="3"
      />
    </svg>
  );
}
function Window({
  name,
  children,
}: {
  name: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ ...box, position: "absolute", inset: "0 120px" }}>
      <div
        style={{
          height: 84,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 40px",
          borderBottom: "2px solid #eee",
        }}
      >
        <strong style={{ fontSize: 34, letterSpacing: -1 }}>
          hiob<span style={{ color: orange }}>●</span>
        </strong>
        <span style={{ fontSize: 27, color: "#666" }}>{name}</span>
      </div>
      {children}
    </div>
  );
}
function Action({ index }: { index: number }) {
  const f = useCurrentFrame(),
    t = f / 30;
  // One action (0–3.5s), then a stable result (3.5–6s). No floating UI.
  if (index === 0) {
    const attach = ease((t - 0.5) / 0.8),
      response = ease((t - 2.1) / 0.7);
    return (
      <Window name="Codex + HIOB">
        <div style={{ padding: "32px 44px" }}>
          <div
            style={{
              ...pill,
              background: "#f2f2f2",
              display: "inline-block",
              transform: `translateY(${30 * (1 - attach)}px)`,
              opacity: attach,
            }}
          >
            ↗ HIOB_서비스소개.pdf
          </div>
          <div style={{ marginTop: 25, fontSize: 44, fontWeight: 700 }}>
            이 자료로 30초 소개 영상을 만들어줘.
          </div>
          <div
            style={{
              marginTop: 32,
              padding: "26px 30px",
              background: "#fff1ec",
              borderLeft: `5px solid ${orange}`,
              borderRadius: 14,
              opacity: response,
              transform: `translateY(${18 * (1 - response)}px)`,
            }}
          >
            <strong style={{ fontSize: 35 }}>먼저 기획을 정리할게요.</strong>
            <div style={{ fontSize: 30, marginTop: 12, color: "#595959" }}>
              훅 → 장면 → 나레이션을 함께 확인해 주세요.
            </div>
          </div>
        </div>
      </Window>
    );
  }
  if (index === 1) {
    const approved = ease((t - 3) / 0.45);
    return (
      <Window name="기획 검토">
        <div style={{ display: "flex", gap: 22, padding: "32px 40px" }}>
          {["01  시작", "02  전개", "03  마무리"].map((label, i) => {
            const a = ease((t - 0.2 - i * 0.6) / 0.5);
            return (
              <div
                key={label}
                style={{
                  ...box,
                  flex: 1,
                  padding: 26,
                  height: 240,
                  opacity: a,
                  transform: `translateY(${28 * (1 - a)}px)`,
                }}
              >
                <span style={{ color: "#4067da", fontSize: 26 }}>{label}</span>
                <div
                  style={{
                    fontSize: 37,
                    lineHeight: 1.4,
                    fontWeight: 700,
                    marginTop: 25,
                    whiteSpace: "pre-line",
                  }}
                >
                  {
                    [
                      "대화로\n시작하기",
                      "장면·음성·\n자막 만들기",
                      "완성본과\n프로젝트",
                    ][i]
                  }
                </div>
              </div>
            );
          })}
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 30,
            right: 40,
            ...pill,
            background: approved > 0.5 ? "#181818" : "#4067da",
            color: "white",
          }}
        >
          {" "}
          {approved > 0.5 ? "✓ 확인한 기획" : "기획 확인하기"}
        </div>
        <Cursor
          x={1470}
          y={455 + 70 * (1 - ease((t - 2.3) / 0.6))}
          click={t > 3 && t < 3.25}
        />
      </Window>
    );
  }
  if (index === 2) {
    return (
      <Window name="소재 제작 · 과정을 압축한 연출">
        <div style={{ display: "flex", gap: 26, padding: "32px 40px" }}>
          {["장면", "목소리", "자막"].map((label, i) => {
            const ready = ease((t - 1 - i * 0.6) / 0.7);
            return (
              <div
                key={label}
                style={{
                  ...box,
                  flex: 1,
                  padding: 25,
                  height: 285,
                  borderColor:
                    ready > 0.95
                      ? ["#c7d3fa", "#dfd1f8", "#ffd6ca"][i]
                      : "#e2e2e2",
                }}
              >
                <div
                  style={{
                    fontSize: 31,
                    fontWeight: 750,
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  {label}
                  <span style={{ color: accents[i + 1] || orange }}>
                    {ready > 0.95 ? "✓" : "…"}
                  </span>
                </div>
                <div
                  style={{
                    height: 130,
                    marginTop: 23,
                    borderRadius: 12,
                    overflow: "hidden",
                    background: ["#edf1fc", "#f3eefa", "#fff1ec"][i],
                    position: "relative",
                  }}
                >
                  {i === 0 ? (
                    <OffthreadVideo
                      src={staticFile("video/scene-3.mp4")}
                      muted
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  ) : i === 1 ? (
                    <div
                      style={{
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 7,
                      }}
                    >
                      {Array.from({ length: 24 }, (_, j) => (
                        <i
                          key={j}
                          style={{
                            width: 6,
                            height: 15 + 65 * Math.abs(Math.sin(j * 1.3)),
                            borderRadius: 5,
                            background: "#7954c5",
                          }}
                        />
                      ))}
                    </div>
                  ) : (
                    <div
                      style={{
                        padding: 22,
                        fontSize: 30,
                        fontWeight: 700,
                        lineHeight: 1.45,
                      }}
                    >
                      당신이 감독하고,
                      <br />
                      히옵이 연결합니다.
                    </div>
                  )}
                </div>
                <div style={{ height: 5, background: "#eee", marginTop: 25 }}>
                  <div
                    style={{
                      height: "100%",
                      width: `${ready * 100}%`,
                      background: accents[i + 1] || orange,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </Window>
    );
  }
  if (index === 3) {
    const trim = ease((t - 1.2) / 1.6),
      width = 440 - 170 * trim;
    return (
      <Window name="선택 구간 수정">
        <div style={{ padding: "26px 40px" }}>
          <div style={{ fontSize: 30, marginBottom: 24 }}>
            “가운데 장면만 더 짧게.”
          </div>
          <div style={{ display: "flex", gap: 14, height: 170 }}>
            {["오프닝", "선택한 장면", "마무리"].map((label, i) => (
              <div
                key={label}
                style={{
                  width: i === 1 ? width : 350,
                  flexShrink: 0,
                  background: i === 1 ? "#fff1ec" : "#242424",
                  color: i === 1 ? ink : "#fff",
                  border: `4px solid ${i === 1 ? orange : "transparent"}`,
                  borderRadius: 13,
                  padding: 25,
                  fontSize: 35,
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
                      top: 65,
                      fontSize: 34,
                      color: orange,
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
              marginTop: 18,
              background: "#f2eef8",
              padding: "14px 23px",
              borderRadius: 10,
              fontSize: 28,
              color: "#6145a0",
            }}
          >
            ▂▅▃▇▃▂▆▇　나레이션
          </div>
          <div
            style={{
              marginTop: 13,
              background: "#ededed",
              padding: "14px 23px",
              borderRadius: 10,
              fontSize: 28,
            }}
          >
            당신이 감독하고, 히옵이 연결합니다.
          </div>
        </div>
        <Cursor
          x={40 + 350 + 14 + width - 25}
          y={202}
          click={trim > 0 && trim < 1}
        />
      </Window>
    );
  }
  const reveal = ease((t - 0.3) / 0.8);
  return (
    <Window name="완성본과 편집 프로젝트">
      <div style={{ display: "flex", gap: 45, padding: "36px 44px" }}>
        <div
          style={{
            width: 560,
            height: 310,
            background: "#181818",
            borderRadius: 14,
            overflow: "hidden",
            position: "relative",
          }}
        >
          <OffthreadVideo
            src={staticFile("video/scene-5.mp4")}
            muted
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "#0003",
              display: "grid",
              placeItems: "center",
              color: "white",
              fontSize: 55,
            }}
          >
            ▶
          </div>
        </div>
        <div style={{ flex: 1, opacity: reveal }}>
          {["MP4  완성 영상", "WAV  분리 음원", "SRT  자막"].map((label, i) => (
            <div
              key={label}
              style={{
                padding: "15px 0",
                borderBottom: "2px solid #eee",
                fontSize: 31,
                display: "flex",
                justifyContent: "space-between",
                opacity: ease((t - 0.6 - i * 0.5) / 0.6),
              }}
            >
              {label}
              <span>↓</span>
            </div>
          ))}
          <div
            style={{
              ...pill,
              color: "white",
              background: orange,
              marginTop: 22,
              fontSize: 27,
            }}
          >
            프로젝트에서 이어서 편집 ↗
          </div>
        </div>
      </div>
    </Window>
  );
}
function Scene({ index }: { index: number }) {
  const f = useCurrentFrame(),
    t = f / 30;
  return (
    <AbsoluteFill
      style={{
        background: index === 2 ? "#151515" : "#f5f5f5",
        color: index === 2 ? "white" : ink,
        fontFamily: "Noto",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.06,
          filter: "grayscale(1)",
        }}
      >
        <OffthreadVideo
          src={staticFile(`ambient/scene-${index + 1}.mp4`)}
          muted
          playbackRate={0.9791667}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>
      <div
        style={{
          position: "absolute",
          left: 110,
          top: 68,
          fontSize: 28,
          letterSpacing: 3,
          color: accents[index],
        }}
      >
        0{index + 1} / {tags[index]}
      </div>
      <div
        style={{
          position: "absolute",
          left: 110,
          top: 126,
          fontSize: 60,
          fontWeight: 750,
          letterSpacing: -2,
        }}
      >
        {titles[index]}
      </div>
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 270,
          height: 550,
          color: ink,
        }}
      >
        <Action index={index} />
      </div>
      <div
        style={{
          position: "absolute",
          left: 110,
          right: 110,
          bottom: 130,
          display: "flex",
          alignItems: "center",
          gap: 20,
          opacity: ease((t - 3.5) / 0.45),
        }}
      >
        <span
          style={{
            width: 13,
            height: 13,
            borderRadius: 20,
            background: accents[index],
          }}
        />
        <strong style={{ fontSize: 36, fontWeight: 650 }}>
          {results[index]}
        </strong>
        <span
          style={{
            marginLeft: "auto",
            fontSize: 23,
            color: index === 2 ? "#bbb" : "#777",
          }}
        >
          HUMAN DIRECTED. AI CONNECTED.
        </span>
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
    id="HIOBWeb"
    component={Film}
    fps={30}
    durationInFrames={900}
    width={1920}
    height={1080}
  />
));
