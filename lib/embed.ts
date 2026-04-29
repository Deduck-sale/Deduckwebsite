export type EmbedType = "youtube" | "vimeo" | "video" | "image";

export interface EmbedInfo {
  type: EmbedType;
  /** Embed-friendly URL (iframe src for youtube/vimeo, original for video/image) */
  src: string;
  /** Original URL */
  url: string;
}

/** Match YouTube formats: watch, youtu.be, shorts, embed */
const YT_PATTERNS = [
  /youtube\.com\/watch\?v=([\w-]+)/,
  /youtu\.be\/([\w-]+)/,
  /youtube\.com\/shorts\/([\w-]+)/,
  /youtube\.com\/embed\/([\w-]+)/,
];

const VIMEO_PATTERN = /vimeo\.com\/(?:video\/)?(\d+)/;

const VIDEO_FILE_PATTERN = /\.(mp4|webm|mov|m4v)(\?.*)?$/i;

export function getYouTubeId(url: string): string | null {
  for (const p of YT_PATTERNS) {
    const m = url.match(p);
    if (m) return m[1];
  }
  return null;
}

export function getVimeoId(url: string): string | null {
  const m = url.match(VIMEO_PATTERN);
  return m ? m[1] : null;
}

/** Best-effort YouTube thumbnail. maxres may 404 for some videos; fallback to hqdefault. */
export function getYouTubeThumbnail(url: string): string | null {
  const id = getYouTubeId(url);
  if (!id) return null;
  return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
}

export function detectEmbed(url: string): EmbedInfo {
  const ytId = getYouTubeId(url);
  if (ytId) {
    return {
      type: "youtube",
      src: `https://www.youtube.com/embed/${ytId}?autoplay=1&rel=0&modestbranding=1`,
      url,
    };
  }
  const vimeoId = getVimeoId(url);
  if (vimeoId) {
    return {
      type: "vimeo",
      src: `https://player.vimeo.com/video/${vimeoId}?autoplay=1&title=0&byline=0&portrait=0`,
      url,
    };
  }
  if (VIDEO_FILE_PATTERN.test(url)) {
    return { type: "video", src: url, url };
  }
  return { type: "image", src: url, url };
}
