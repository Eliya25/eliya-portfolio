import { ImageResponse } from "next/og";

export const alt = "Eliya Cohen — Backend Engineer portfolio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "72px",
        background: "#0c121c",
        color: "#edf3fb",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", color: "#7ab0f2", fontSize: 26 }}>
        BACKEND ENGINEERING · RELIABLE SYSTEMS
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", fontSize: 76, fontWeight: 700 }}>
          Eliya Cohen
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 20,
            color: "#9fadc1",
            fontSize: 36,
          }}
        >
          Backend Engineer &amp; Development Team Lead
        </div>
      </div>
    </div>,
    size,
  );
}
