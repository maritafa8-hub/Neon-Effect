/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { NeonBackgroundSettings } from '../types/neon';

// Cached procedural pattern canvases to prevent regenerating per frame
let cachedBrickCanvas: HTMLCanvasElement | null = null;
let cachedConcreteCanvas: HTMLCanvasElement | null = null;
let cachedDarkWoodCanvas: HTMLCanvasElement | null = null;
let cachedSubwayTileCanvas: HTMLCanvasElement | null = null;
let cachedSlateCanvas: HTMLCanvasElement | null = null;
let cachedSmokeCanvas: HTMLCanvasElement | null = null;
let cachedHexCarbonCanvas: HTMLCanvasElement | null = null;

/**
 * 1. Rich Weathered Dark Brick Wall Pattern
 */
function getBrickWallPattern(width: number, height: number): HTMLCanvasElement {
  if (cachedBrickCanvas && cachedBrickCanvas.width >= width && cachedBrickCanvas.height >= height) {
    return cachedBrickCanvas;
  }

  const canvas = document.createElement('canvas');
  canvas.width = Math.max(width, 1920);
  canvas.height = Math.max(height, 1080);
  const ctx = canvas.getContext('2d');
  if (!ctx) return canvas;

  // Deep recessed charcoal mortar
  ctx.fillStyle = '#080a0f';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const brickHeight = 38;
  const brickWidth = 92;
  const mortar = 4;

  const rows = Math.ceil(canvas.height / (brickHeight + mortar)) + 1;
  const cols = Math.ceil(canvas.width / (brickWidth + mortar)) + 2;

  for (let r = 0; r < rows; r++) {
    const isShifted = r % 2 === 1;
    const xOffset = isShifted ? -(brickWidth / 2) : 0;
    const y = r * (brickHeight + mortar);

    for (let c = 0; c < cols; c++) {
      const x = xOffset + c * (brickWidth + mortar);

      // Deterministic brick tone variations (rich charcoal, burnt sienna, and dark umber)
      const seed = Math.sin(r * 53 + c * 29) * 10000;
      const rand = seed - Math.floor(seed);
      
      const rBase = 22 + Math.floor(rand * 18);
      const gBase = 18 + Math.floor(rand * 14);
      const bBase = 22 + Math.floor(rand * 16);

      // Main brick face
      ctx.fillStyle = `rgb(${rBase}, ${gBase}, ${bBase})`;
      ctx.beginPath();
      ctx.roundRect ? ctx.roundRect(x, y, brickWidth, brickHeight, 2) : ctx.rect(x, y, brickWidth, brickHeight);
      ctx.fill();

      // Top specular/bevel highlight
      ctx.fillStyle = `rgba(255, 255, 255, ${0.03 + rand * 0.03})`;
      ctx.fillRect(x, y, brickWidth, 2);

      // Bottom mortar shadow cast
      ctx.fillStyle = `rgba(0, 0, 0, ${0.3 + rand * 0.15})`;
      ctx.fillRect(x, y + brickHeight - 3, brickWidth, 3);
    }
  }

  // Micro-grunge texture
  const noiseData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = noiseData.data;
  for (let i = 0; i < data.length; i += 16) {
    const n = (Math.random() - 0.5) * 12;
    data[i] = Math.max(0, Math.min(255, data[i] + n));
    data[i + 1] = Math.max(0, Math.min(255, data[i + 1] + n));
    data[i + 2] = Math.max(0, Math.min(255, data[i + 2] + n));
  }
  ctx.putImageData(noiseData, 0, 0);

  cachedBrickCanvas = canvas;
  return canvas;
}

/**
 * 2. Architectural Polished Concrete Surface
 */
function getConcretePattern(width: number, height: number): HTMLCanvasElement {
  if (cachedConcreteCanvas && cachedConcreteCanvas.width >= width && cachedConcreteCanvas.height >= height) {
    return cachedConcreteCanvas;
  }

  const canvas = document.createElement('canvas');
  canvas.width = Math.max(width, 1920);
  canvas.height = Math.max(height, 1080);
  const ctx = canvas.getContext('2d');
  if (!ctx) return canvas;

  ctx.fillStyle = '#0f121a';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Cloudy mineral mottling
  for (let i = 0; i < 50; i++) {
    const cx = Math.random() * canvas.width;
    const cy = Math.random() * canvas.height;
    const r = 120 + Math.random() * 340;
    const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
    const alpha = 0.04 + Math.random() * 0.06;
    grad.addColorStop(0, Math.random() > 0.5 ? `rgba(255,255,255,${alpha})` : `rgba(0,0,0,${alpha * 1.6})`);
    grad.addColorStop(1, 'transparent');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fill();
  }

  // Aggregate grain noise
  const noiseData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = noiseData.data;
  for (let i = 0; i < data.length; i += 8) {
    const n = (Math.random() - 0.5) * 15;
    data[i] = Math.max(0, Math.min(255, data[i] + n));
    data[i + 1] = Math.max(0, Math.min(255, data[i + 1] + n));
    data[i + 2] = Math.max(0, Math.min(255, data[i + 2] + n));
  }
  ctx.putImageData(noiseData, 0, 0);

  cachedConcreteCanvas = canvas;
  return canvas;
}

/**
 * 3. Luxurious Vertical Acoustic Slat Wood Panels
 */
function getDarkWoodPattern(width: number, height: number): HTMLCanvasElement {
  if (cachedDarkWoodCanvas && cachedDarkWoodCanvas.width >= width && cachedDarkWoodCanvas.height >= height) {
    return cachedDarkWoodCanvas;
  }

  const canvas = document.createElement('canvas');
  canvas.width = Math.max(width, 1920);
  canvas.height = Math.max(height, 1080);
  const ctx = canvas.getContext('2d');
  if (!ctx) return canvas;

  // Deep black acoustic felt backing
  ctx.fillStyle = '#050608';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const slatWidth = 28;
  const slatGap = 8;
  const totalPitch = slatWidth + slatGap;
  const cols = Math.ceil(canvas.width / totalPitch) + 1;

  for (let c = 0; c < cols; c++) {
    const x = c * totalPitch;
    const seed = Math.sin(c * 17) * 1000;
    const rand = seed - Math.floor(seed);

    // Warm charred walnut tones
    const r = 24 + Math.floor(rand * 12);
    const g = 17 + Math.floor(rand * 9);
    const b = 15 + Math.floor(rand * 8);

    // Slat base
    ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
    ctx.fillRect(x, 0, slatWidth, canvas.height);

    // Fine vertical wood grain streaks
    for (let gIdx = 0; gIdx < 5; gIdx++) {
      const gx = x + 3 + (gIdx * (slatWidth - 6)) / 4;
      ctx.fillStyle = `rgba(0, 0, 0, ${0.15 + (gIdx % 2) * 0.1})`;
      ctx.fillRect(gx, 0, 1.5, canvas.height);
    }

    // Left edge highlight (specular ridge catching light)
    ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.fillRect(x, 0, 2, canvas.height);

    // Right edge bevel shadow
    ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
    ctx.fillRect(x + slatWidth - 2, 0, 2, canvas.height);
  }

  cachedDarkWoodCanvas = canvas;
  return canvas;
}

/**
 * 4. Glossy Dark Subway / Metro Ceramic Tiles
 */
function getSubwayTilePattern(width: number, height: number): HTMLCanvasElement {
  if (cachedSubwayTileCanvas && cachedSubwayTileCanvas.width >= width && cachedSubwayTileCanvas.height >= height) {
    return cachedSubwayTileCanvas;
  }

  const canvas = document.createElement('canvas');
  canvas.width = Math.max(width, 1920);
  canvas.height = Math.max(height, 1080);
  const ctx = canvas.getContext('2d');
  if (!ctx) return canvas;

  // Dark charcoal grout lines
  ctx.fillStyle = '#06080d';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const tileW = 110;
  const tileH = 50;
  const grout = 3.5;

  const rows = Math.ceil(canvas.height / (tileH + grout)) + 1;
  const cols = Math.ceil(canvas.width / (tileW + grout)) + 2;

  for (let r = 0; r < rows; r++) {
    const isShifted = r % 2 === 1;
    const xOffset = isShifted ? -(tileW / 2) : 0;
    const y = r * (tileH + grout);

    for (let c = 0; c < cols; c++) {
      const x = xOffset + c * (tileW + grout);
      const seed = Math.sin(r * 41 + c * 23) * 1000;
      const rand = seed - Math.floor(seed);

      // Sleek ceramic glazed slate
      const lum = 15 + Math.floor(rand * 6);
      ctx.fillStyle = `rgb(${lum}, ${lum + 2}, ${lum + 5})`;
      ctx.fillRect(x, y, tileW, tileH);

      // Pillowed bevel top/left glossy reflection
      const bevelGrad = ctx.createLinearGradient(x, y, x + tileW, y + tileH);
      bevelGrad.addColorStop(0, 'rgba(255, 255, 255, 0.08)');
      bevelGrad.addColorStop(0.3, 'rgba(255, 255, 255, 0.02)');
      bevelGrad.addColorStop(0.8, 'rgba(0, 0, 0, 0.15)');
      bevelGrad.addColorStop(1, 'rgba(0, 0, 0, 0.35)');
      ctx.fillStyle = bevelGrad;
      ctx.fillRect(x, y, tileW, tileH);
    }
  }

  cachedSubwayTileCanvas = canvas;
  return canvas;
}

/**
 * 5. Architectural Textured Raw Slate / Stone Wall
 */
function getSlatePattern(width: number, height: number): HTMLCanvasElement {
  if (cachedSlateCanvas && cachedSlateCanvas.width >= width && cachedSlateCanvas.height >= height) {
    return cachedSlateCanvas;
  }

  const canvas = document.createElement('canvas');
  canvas.width = Math.max(width, 1920);
  canvas.height = Math.max(height, 1080);
  const ctx = canvas.getContext('2d');
  if (!ctx) return canvas;

  ctx.fillStyle = '#0a0d13';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Split-face stone cleft horizontal bands
  const bandHeight = 24;
  const rows = Math.ceil(canvas.height / bandHeight);

  for (let r = 0; r < rows; r++) {
    const y = r * bandHeight;
    const rand = Math.sin(r * 73) * 0.5 + 0.5;
    const grey = 14 + Math.floor(rand * 14);
    ctx.fillStyle = `rgb(${grey}, ${grey + 2}, ${grey + 4})`;
    ctx.fillRect(0, y, canvas.width, bandHeight);

    // Stone fracture edges
    ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
    ctx.fillRect(0, y, canvas.width, 1.5);
    ctx.fillStyle = 'rgba(0, 0, 0, 0.35)';
    ctx.fillRect(0, y + bandHeight - 1.5, canvas.width, 1.5);
  }

  // Micro-fracture noise
  const noiseData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = noiseData.data;
  for (let i = 0; i < data.length; i += 12) {
    const n = (Math.random() - 0.5) * 18;
    data[i] = Math.max(0, Math.min(255, data[i] + n));
    data[i + 1] = Math.max(0, Math.min(255, data[i + 1] + n));
    data[i + 2] = Math.max(0, Math.min(255, data[i + 2] + n));
  }
  ctx.putImageData(noiseData, 0, 0);

  cachedSlateCanvas = canvas;
  return canvas;
}

/**
 * 6. Atmospheric Stage Smoke & Nebula Haze
 */
function getStudioSmokePattern(width: number, height: number): HTMLCanvasElement {
  if (cachedSmokeCanvas && cachedSmokeCanvas.width >= width && cachedSmokeCanvas.height >= height) {
    return cachedSmokeCanvas;
  }

  const canvas = document.createElement('canvas');
  canvas.width = Math.max(width, 1920);
  canvas.height = Math.max(height, 1080);
  const ctx = canvas.getContext('2d');
  if (!ctx) return canvas;

  // Midnight base
  const bgGrad = ctx.createRadialGradient(
    canvas.width / 2, canvas.height / 2, 50,
    canvas.width / 2, canvas.height / 2, Math.max(canvas.width, canvas.height) / 1.2
  );
  bgGrad.addColorStop(0, '#101322');
  bgGrad.addColorStop(1, '#05060a');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Soft atmospheric smoky clouds
  for (let i = 0; i < 35; i++) {
    const cx = Math.random() * canvas.width;
    const cy = Math.random() * canvas.height;
    const r = 180 + Math.random() * 400;
    const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
    const alpha = 0.03 + Math.random() * 0.05;
    grad.addColorStop(0, `rgba(180, 200, 240, ${alpha})`);
    grad.addColorStop(0.5, `rgba(120, 140, 180, ${alpha * 0.4})`);
    grad.addColorStop(1, 'transparent');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fill();
  }

  cachedSmokeCanvas = canvas;
  return canvas;
}

/**
 * 7. Modern Cyber Hex Mesh / Carbon Fiber
 */
function getHexCarbonPattern(width: number, height: number): HTMLCanvasElement {
  if (cachedHexCarbonCanvas && cachedHexCarbonCanvas.width >= width && cachedHexCarbonCanvas.height >= height) {
    return cachedHexCarbonCanvas;
  }

  const canvas = document.createElement('canvas');
  canvas.width = Math.max(width, 1920);
  canvas.height = Math.max(height, 1080);
  const ctx = canvas.getContext('2d');
  if (!ctx) return canvas;

  ctx.fillStyle = '#090b10';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const hexR = 14;
  const hexH = Math.sqrt(3) * hexR;
  const hexW = 2 * hexR;
  const colPitch = 1.5 * hexR;
  const rowPitch = hexH;

  const cols = Math.ceil(canvas.width / colPitch) + 2;
  const rows = Math.ceil(canvas.height / rowPitch) + 2;

  ctx.strokeStyle = '#181e2b';
  ctx.lineWidth = 1.2;

  for (let c = 0; c < cols; c++) {
    const isOdd = c % 2 === 1;
    const x = c * colPitch;
    const yOffset = isOdd ? hexH / 2 : 0;

    for (let r = 0; r < rows; r++) {
      const y = r * rowPitch + yOffset;
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i;
        const hx = x + hexR * Math.cos(angle);
        const hy = y + hexR * Math.sin(angle);
        if (i === 0) ctx.moveTo(hx, hy);
        else ctx.lineTo(hx, hy);
      }
      ctx.closePath();
      ctx.stroke();
    }
  }

  cachedHexCarbonCanvas = canvas;
  return canvas;
}

/**
 * Renders the chosen background texture, solid color, or custom image with lighting adjustments.
 */
export function renderBackground(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  settings: NeonBackgroundSettings,
  customImageEl?: HTMLImageElement | null
) {
  if (settings.type === 'transparent') {
    return;
  }

  ctx.save();

  // Draw background base
  switch (settings.type) {
    case 'black':
      ctx.fillStyle = '#06070a';
      ctx.fillRect(0, 0, width, height);
      break;

    case 'charcoal':
      ctx.fillStyle = '#11131a';
      ctx.fillRect(0, 0, width, height);
      break;

    case 'dark-blue': {
      const grad = ctx.createLinearGradient(0, 0, 0, height);
      grad.addColorStop(0, '#0d1527');
      grad.addColorStop(1, '#05070f');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);
      break;
    }

    case 'dark-purple': {
      const grad = ctx.createLinearGradient(0, 0, 0, height);
      grad.addColorStop(0, '#190e28');
      grad.addColorStop(1, '#07040d');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);
      break;
    }

    case 'brick-wall': {
      const brick = getBrickWallPattern(width, height);
      ctx.drawImage(brick, 0, 0, width, height);
      break;
    }

    case 'concrete': {
      const concrete = getConcretePattern(width, height);
      ctx.drawImage(concrete, 0, 0, width, height);
      break;
    }

    case 'dark-wood': {
      const wood = getDarkWoodPattern(width, height);
      ctx.drawImage(wood, 0, 0, width, height);
      break;
    }

    case 'subway-tile': {
      const tile = getSubwayTilePattern(width, height);
      ctx.drawImage(tile, 0, 0, width, height);
      break;
    }

    case 'textured-slate': {
      const slate = getSlatePattern(width, height);
      ctx.drawImage(slate, 0, 0, width, height);
      break;
    }

    case 'studio-smoke': {
      const smoke = getStudioSmokePattern(width, height);
      ctx.drawImage(smoke, 0, 0, width, height);
      break;
    }

    case 'hex-carbon': {
      const hex = getHexCarbonPattern(width, height);
      ctx.drawImage(hex, 0, 0, width, height);
      break;
    }

    case 'custom-color':
      ctx.fillStyle = settings.customColor || '#101015';
      ctx.fillRect(0, 0, width, height);
      break;

    case 'custom-image':
      if (customImageEl && customImageEl.complete && customImageEl.naturalWidth > 0) {
        const imgRatio = customImageEl.naturalWidth / customImageEl.naturalHeight;
        const canRatio = width / height;
        let dw = width, dh = height, dx = 0, dy = 0;
        if (canRatio > imgRatio) {
          dh = width / imgRatio;
          dy = (height - dh) / 2;
        } else {
          dw = height * imgRatio;
          dx = (width - dw) / 2;
        }
        ctx.drawImage(customImageEl, dx, dy, dw, dh);
      } else {
        ctx.fillStyle = '#0c0d12';
        ctx.fillRect(0, 0, width, height);
      }
      break;
  }

  // Apply Brightness & Contrast adjustments overlay
  if (settings.brightness !== 0 || settings.contrast !== 0) {
    if (settings.brightness > 0) {
      ctx.fillStyle = `rgba(255, 255, 255, ${settings.brightness / 200})`;
      ctx.fillRect(0, 0, width, height);
    } else if (settings.brightness < 0) {
      ctx.fillStyle = `rgba(0, 0, 0, ${Math.abs(settings.brightness) / 100})`;
      ctx.fillRect(0, 0, width, height);
    }
  }

  // Vignette overlay
  if (settings.vignette > 0) {
    const cx = width / 2;
    const cy = height / 2;
    const maxRadius = Math.sqrt(cx * cx + cy * cy);
    const vignetteGrad = ctx.createRadialGradient(cx, cy, maxRadius * 0.4, cx, cy, maxRadius);
    const vigAlpha = (settings.vignette / 100) * 0.85;
    vignetteGrad.addColorStop(0, 'rgba(0, 0, 0, 0)');
    vignetteGrad.addColorStop(1, `rgba(0, 0, 0, ${vigAlpha})`);
    ctx.fillStyle = vignetteGrad;
    ctx.fillRect(0, 0, width, height);
  }

  ctx.restore();
}

/**
 * Renders atmospheric ambient glow directly onto the wall surface.
 * Creates an immersive back-glow halo behind the neon sign that illuminates the wall textures.
 */
export function renderWallAmbientGlow(
  ctx: CanvasRenderingContext2D,
  strokeCanvas: HTMLCanvasElement,
  width: number,
  height: number,
  intensity: number = 100, // 0 - 200%
  spread: number = 220, // 50 - 500 px
  surfaceReflection: boolean = true,
  reflectionIntensity: number = 65,
  flickerFactor: number = 1.0
) {
  if (intensity <= 0) return;

  const baseAlpha = (intensity / 100) * 0.75 * flickerFactor;
  const safeSpread = Math.max(10, spread);

  ctx.save();

  // Pass 1: Broad atmospheric diffuse ambient wall bounce (wide wash illuminating the room/wall)
  ctx.globalCompositeOperation = 'screen';
  ctx.globalAlpha = Math.min(1.0, baseAlpha * 0.65);
  ctx.filter = `blur(${Math.round(safeSpread)}px)`;
  ctx.drawImage(strokeCanvas, 0, 0, width, height);

  // Pass 2: Medium concentrated halo directly radiating from the neon backplate
  ctx.globalCompositeOperation = 'lighter';
  ctx.globalAlpha = Math.min(1.0, baseAlpha * 0.85);
  ctx.filter = `blur(${Math.max(4, Math.round(safeSpread * 0.42))}px)`;
  ctx.drawImage(strokeCanvas, 0, 0, width, height);

  // Pass 3: Specular surface ridge illumination (highlights mortar, tile bevels, wood slats)
  if (surfaceReflection && reflectionIntensity > 0) {
    ctx.globalCompositeOperation = 'color-dodge';
    ctx.globalAlpha = Math.min(0.85, (reflectionIntensity / 100) * 0.6 * flickerFactor);
    ctx.filter = `blur(${Math.max(2, Math.round(safeSpread * 0.16))}px)`;
    ctx.drawImage(strokeCanvas, 0, 0, width, height);
  }

  ctx.restore();
}

/**
 * Renders contact shadows cast by neon glass tubes onto the background wall.
 */
export function renderContactShadow(
  ctx: CanvasRenderingContext2D,
  tubeCanvas: HTMLCanvasElement,
  offsetX: number = 6,
  offsetY: number = 10,
  blur: number = 12,
  opacity: number = 0.55,
  destWidth?: number,
  destHeight?: number
) {
  ctx.save();
  ctx.globalAlpha = opacity;
  ctx.globalCompositeOperation = 'multiply';
  ctx.filter = `blur(${blur}px) brightness(0)`;
  if (destWidth && destHeight) {
    ctx.drawImage(tubeCanvas, offsetX, offsetY, destWidth, destHeight);
  } else {
    ctx.drawImage(tubeCanvas, offsetX, offsetY);
  }
  ctx.restore();
}

/**
 * Renders realistic metallic wall standoff brackets/clips at key anchor points.
 */
export function renderStandoffClips(
  ctx: CanvasRenderingContext2D,
  anchors: { x: number; y: number }[]
) {
  if (anchors.length === 0) return;

  ctx.save();
  for (const pt of anchors) {
    // 1. Bracket drop shadow
    ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
    ctx.beginPath();
    ctx.ellipse(pt.x + 3, pt.y + 5, 8, 4, 0, 0, Math.PI * 2);
    ctx.fill();

    // 2. Black rubber standoff foot
    ctx.fillStyle = '#111216';
    ctx.beginPath();
    ctx.arc(pt.x, pt.y, 6.5, 0, Math.PI * 2);
    ctx.fill();

    // 3. Metallic chrome mounting screw/clamp
    const metalGrad = ctx.createLinearGradient(pt.x - 4, pt.y - 4, pt.x + 4, pt.y + 4);
    metalGrad.addColorStop(0, '#7a828e');
    metalGrad.addColorStop(0.5, '#e2e8f0');
    metalGrad.addColorStop(1, '#334155');
    ctx.fillStyle = metalGrad;
    ctx.beginPath();
    ctx.arc(pt.x, pt.y, 4, 0, Math.PI * 2);
    ctx.fill();

    // 4. Center slot/screw dot
    ctx.fillStyle = '#0f172a';
    ctx.beginPath();
    ctx.arc(pt.x, pt.y, 1.2, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}
