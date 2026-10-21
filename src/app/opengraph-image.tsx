import { ImageResponse } from "next/og";

export const alt = "MyG Express — Logística, paquetería y entregas a nivel nacional";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: 80, color: "white", background: "linear-gradient(135deg, #07140c, #0e8f45)" }}>
      <div style={{ display: "flex", fontSize: 92, fontWeight: 900 }}>MyG Express</div>
      <div style={{ display: "flex", marginTop: 24, maxWidth: 900, fontSize: 46, lineHeight: 1.2 }}>Logística y entregas de confianza a nivel nacional</div>
      <div style={{ display: "flex", marginTop: 46, fontSize: 28, color: "#b7f7c7" }}>Huancayo · La Merced · Satipo · Oxapampa</div>
    </div>,
    size,
  );
}
