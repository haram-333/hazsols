const fs = require('fs');
const path = require('path');

const dir = path.join('public', 'frames');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

const TOTAL = 100;
const W = 1920;
const H = 1080;

for (let i = 1; i <= TOTAL; i++) {
  const progress = i / TOTAL;
  const angle = progress * Math.PI * 4;
  const r1 = 180 + Math.sin(angle * 1.3) * 60;
  const r2 = 280 + Math.cos(angle * 0.9) * 80;
  const cx1 = 960 + Math.cos(angle) * 300;
  const cy1 = 540 + Math.sin(angle * 0.7) * 200;
  const cx2 = 960 + Math.cos(angle + Math.PI) * 400;
  const cy2 = 540 + Math.sin(angle * 1.1 + 1) * 250;
  const lineOp = (0.04 + progress * 0.03).toFixed(3);
  const circOp = (0.08 + Math.sin(angle * 2) * 0.04).toFixed(3);
  const circOp2 = (0.04 + Math.sin(angle * 2) * 0.02).toFixed(3);
  const circOp3 = (0.064 + Math.sin(angle * 2) * 0.032).toFixed(3);
  const circOp4 = (0.04 + Math.sin(angle * 2) * 0.02).toFixed(3);
  const accentX = 960 + Math.cos(angle * 2) * 500;
  const accentY = 540 + Math.sin(angle * 1.5) * 300;
  const lineOp2 = (0.024 + progress * 0.018).toFixed(3);

  let hLines = '';
  for (let j = 0; j < 20; j++) {
    const ly = (j / 20) * H + progress * H * 0.1;
    hLines += `<line x1="0" y1="${ly.toFixed(0)}" x2="${W}" y2="${ly.toFixed(0)}" stroke="#C8F04A" stroke-opacity="${lineOp}" stroke-width="0.5"/>`;
  }

  let vLines = '';
  for (let j = 0; j < 15; j++) {
    const lx = (j / 15) * W + progress * W * 0.05;
    vLines += `<line x1="${lx.toFixed(0)}" y1="0" x2="${lx.toFixed(0)}" y2="${H}" stroke="#C8F04A" stroke-opacity="${lineOp2}" stroke-width="0.5"/>`;
  }

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <radialGradient id="g1" cx="${(cx1/W*100).toFixed(1)}%" cy="${(cy1/H*100).toFixed(1)}%" r="40%">
      <stop offset="0%" stop-color="#C8F04A" stop-opacity="${circOp}"/>
      <stop offset="100%" stop-color="#0C0C0E" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="g2" cx="${(cx2/W*100).toFixed(1)}%" cy="${(cy2/H*100).toFixed(1)}%" r="35%">
      <stop offset="0%" stop-color="#C8F04A" stop-opacity="${circOp2}"/>
      <stop offset="100%" stop-color="#0C0C0E" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="#0C0C0E"/>
  <rect width="${W}" height="${H}" fill="url(#g1)"/>
  <rect width="${W}" height="${H}" fill="url(#g2)"/>
  ${hLines}
  ${vLines}
  <circle cx="${accentX.toFixed(0)}" cy="${accentY.toFixed(0)}" r="${r1.toFixed(0)}" fill="none" stroke="#C8F04A" stroke-opacity="${circOp3}" stroke-width="1"/>
  <circle cx="${(W - accentX).toFixed(0)}" cy="${(H - accentY).toFixed(0)}" r="${r2.toFixed(0)}" fill="none" stroke="#C8F04A" stroke-opacity="${circOp4}" stroke-width="0.5"/>
</svg>`;

  const filename = `frame_${String(i).padStart(3, '0')}.svg`;
  fs.writeFileSync(path.join(dir, filename), svg);
}
console.log('Done! 100 SVG frames generated in public/frames/');
