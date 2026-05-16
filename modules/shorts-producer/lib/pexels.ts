import axios from 'axios';

const PEXELS_API_KEY = process.env.PEXELS_API_KEY;

export async function searchStockVideo(query: string, _shotType?: string) {
  try {
    const searchQuery = buildNativeSearchQuery(query, _shotType);
    const response = await axios.get('https://api.pexels.com/videos/search', {
      params: {
        query: searchQuery,
        orientation: 'portrait',
        per_page: 8,
      },
      headers: {
        Authorization: PEXELS_API_KEY,
      },
    });

    const videos = (Array.isArray(response.data.videos) ? response.data.videos : []) as PexelsVideo[];
    const selected = videos
      .map((video: PexelsVideo) => ({
        video,
        score: scoreNativeCandidate(video, _shotType),
      }))
      .sort((left: ScoredVideo, right: ScoredVideo) => right.score - left.score)[0]?.video;

    const file = selected?.video_files
      ?.filter((item: PexelsVideoFile) => item.width && item.height && item.height >= item.width)
      .sort((left: PexelsVideoFile, right: PexelsVideoFile) => (
        Math.abs((left.height ?? 0) - 1920) - Math.abs((right.height ?? 0) - 1920)
      ))[0]
      ?? selected?.video_files?.[0];

    return file?.link || null;
  } catch (error) {
    console.error('Pexels Search Error:', error);
    return null;
  }
}

interface PexelsVideoFile {
  link?: string;
  width?: number;
  height?: number;
}

interface PexelsVideo {
  width?: number;
  height?: number;
  duration?: number;
  url?: string;
  video_files?: PexelsVideoFile[];
}

interface ScoredVideo {
  video: PexelsVideo;
  score: number;
}

function buildNativeSearchQuery(query: string, shotType?: string) {
  const rawIntent = [
    query,
    shotType,
    'handheld',
    'phone',
    'close up',
    'screen',
    'night desk',
    'real workspace',
    'vertical',
    'no face',
    'not corporate',
  ];

  return rawIntent.filter(Boolean).join(' ');
}

function scoreNativeCandidate(video: PexelsVideo, shotType?: string) {
  const isVertical = (video.height ?? 0) >= (video.width ?? 0);
  const duration = video.duration ?? 0;
  const url = video.url?.toLowerCase() ?? '';
  let score = 0;

  if (isVertical) score += 4;
  if (duration >= 3 && duration <= 18) score += 3;
  if (/phone|screen|laptop|desk|hand|night|close/.test(url)) score += 2;
  if (/business|corporate|meeting|office|success|smiling/.test(url)) score -= 3;
  if (shotType && url.includes(shotType)) score += 1;

  return score;
}
