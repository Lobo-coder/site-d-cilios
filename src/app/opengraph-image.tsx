import { ImageResponse } from "next/og";

/** Imagem que aparece quando o link é compartilhado (WhatsApp, Instagram…). */
export const alt = "D Cílios · Agende online";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Baixa só as letras usadas de uma fonte do Google Fonts (a imagem é gerada uma vez, no build). */
async function googleFont(family: string, text: string) {
  const css = await (await fetch(`https://fonts.googleapis.com/css2?family=${family}&text=${encodeURIComponent(text)}`)).text();
  const url = css.match(/src: url\((.+?)\) format\('(opentype|truetype)'\)/)?.[1];
  if (!url) throw new Error(`Fonte não encontrada: ${family}`);
  return (await fetch(url)).arrayBuffer();
}

export default async function Image() {
  const script = await googleFont("Great+Vibes", "D");
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 80,
          background: "radial-gradient(ellipse at top right, #f3dbe2 0%, #fbf1f3 45%, #fcf8f8 100%)",
          color: "#2e2a2b",
        }}
      >
        <div
          style={{
            width: 380,
            height: 380,
            borderRadius: 9999,
            background: "#ffffff",
            border: "2px solid #ecdde1",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <div style={{ position: "absolute", top: -20, fontSize: 330, fontFamily: "Great Vibes", color: "#c98a9c" }}>D</div>
          <div style={{ fontSize: 52, letterSpacing: 22, fontFamily: "serif" }}>CÍLIOS</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 60, lineHeight: 1.1 }}>Agende seu</div>
          <div style={{ fontSize: 60, lineHeight: 1.1 }}>horário online</div>
          <div style={{ marginTop: 24, fontSize: 30, color: "#b26b80" }}>Tambaú · João Pessoa</div>
        </div>
      </div>
    ),
    { ...size, fonts: [{ name: "Great Vibes", data: script, style: "normal", weight: 400 }] },
  );
}
