import { HELP_ARTICLES, HELP_TOPICS } from "./helpTopics.mjs";

export const ORIGIN = "https://hi-ob.com";
export const SYSTEMS = { windows: "Windows", macos: "macOS", linux: "Linux" };
export const ARTICLE_PATHS = Object.fromEntries(
  HELP_ARTICLES.map((article) => [
    article.id,
    "/help/" + (article.topic === "fix" ? "troubleshooting/" : "") + article.id,
  ]),
);
export const HELP_ROUTES = [
  {
    path: "/help",
    title: "HIOB 도움말 — 설치부터 첫 영상까지",
    description:
      "Codex에 HIOB MCP를 연결하고 자료·기획·영상·목소리·편집을 하나의 프로젝트로 이어가세요. 운영체제별 설치와 문제 해결을 안내합니다.",
  },
  ...HELP_TOPICS.map((topic) => ({
    path: "/help/topics/" + topic.id,
    article: topic.id,
    title: topic.title,
    description: topic.description,
  })),
  ...HELP_ARTICLES.map((article) => ({
    path: ARTICLE_PATHS[article.id],
    article: article.id,
    title: article.title,
    description: article.summary,
  })),
  ...Object.entries(SYSTEMS).map(([os, name]) => ({
    path: "/help/install/" + os,
    article: "install",
    os,
    title: name + "에 HIOB MCP 설치하기",
    description:
      name +
      "에서 필요한 프로그램 준비부터 HIOB MCP 설치, Codex 등록과 렌더 환경 확인까지 순서대로 안내합니다.",
  })),
];
export const PRODUCT_ROUTE = {
  path: "/mcp",
  title: "HIOB MCP — Codex와 함께 만드는 영상 프로젝트",
  description:
    "당신이 방향을 정하고, AI와 기획을 다듬고, HIOB가 영상·음성·편집 도구를 연결합니다. 만드는 과정과 비용, 설치 방법을 확인하세요.",
};
export const WATCH_ROUTE = {
  path: "/watch/hiob",
  title: "HIOB 사용 흐름 영상 — 자료에서 편집 가능한 프로젝트까지",
  description:
    "HIOB가 자료·기획·장면·목소리·자막·프로젝트를 연결하는 흐름을 30초 영상과 대본으로 살펴보세요.",
};
export const PUBLIC_ROUTES = [PRODUCT_ROUTE, ...HELP_ROUTES, WATCH_ROUTE];
export const LEGACY_HASHES = {
  home: "/help",
  ...ARTICLE_PATHS,
  ...Object.fromEntries(HELP_TOPICS.map((t) => [t.id, "/help/topics/" + t.id])),
  ...Object.fromEntries(
    Object.keys(SYSTEMS).map((os) => [os, "/help/install/" + os]),
  ),
  codex: ARTICLE_PATHS.manual,
  verify: ARTICLE_PATHS.tools,
  requirements: ARTICLE_PATHS.compatibility,
  troubleshooting: "/help/topics/fix",
};
export function helpHref(id) {
  return Object.hasOwn(LEGACY_HASHES, id) ? LEGACY_HASHES[id] : "/help";
}
