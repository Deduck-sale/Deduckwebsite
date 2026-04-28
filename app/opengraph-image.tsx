import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "De Duck Agency — Digital Marketing Agency";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background:
            "linear-gradient(135deg, #040d0a 0%, #1b4332 50%, #040d0a 100%)",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "10%",
            left: "5%",
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: "rgba(255, 208, 0, 0.15)",
            filter: "blur(80px)",
          }}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: 110,
            fontWeight: 700,
            color: "white",
            letterSpacing: "0.05em",
            zIndex: 1,
          }}
        >
          DE
          <span
            style={{
              color: "#ffd000",
              fontSize: 130,
              margin: "0 12px",
              lineHeight: 1,
            }}
          >
            🦆
          </span>
          UCK
        </div>
        <div
          style={{
            fontSize: 36,
            color: "#ffd000",
            marginTop: 16,
            fontWeight: 600,
            zIndex: 1,
          }}
        >
          เดอ-ดัค-เอ-เจน-ซี่
        </div>
        <div
          style={{
            fontSize: 28,
            color: "rgba(255,255,255,0.7)",
            marginTop: 24,
            fontWeight: 300,
            zIndex: 1,
          }}
        >
          Digital Marketing Agency
        </div>
        <div
          style={{
            fontSize: 22,
            color: "rgba(255,255,255,0.5)",
            marginTop: 8,
            fontWeight: 300,
            zIndex: 1,
          }}
        >
          ทีมงานพร้อม บริการด้วยใจ เก็บทุกความทรงจำ
        </div>
      </div>
    ),
    { ...size }
  );
}
