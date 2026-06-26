import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const inputDir = path.join(root, "public", "images", "products");
const outputDir = path.join(inputDir, "polished");
const width = 1400;
const height = 1050;

const jobs = [
  {
    source: "guardian-mint.jpg",
    output: "angel-of-peace.jpg",
    gravity: "north",
    backdrop: 0.08,
  },
  {
    source: "sports-skate.jpg",
    output: "disc-dasher.jpg",
    extract: { left: 420, top: 40, width: 900, height: 675 },
    gravity: "center",
  },
  {
    source: "hero-gear-pack.png",
    output: "battle-brawler.jpg",
    extract: { left: 160, top: 40, width: 920, height: 690 },
    gravity: "center",
    backdrop: 0.055,
  },
  {
    source: "hero-action.jpg",
    output: "skate-spark.jpg",
    extract: { left: 455, top: 135, width: 760, height: 570 },
    gravity: "center",
  },
  {
    source: "hero-gear-pack.png",
    output: "hero-gear-pack.jpg",
    gravity: "center",
    backdrop: 0.055,
  },
  {
    source: "starter-squad.jpg",
    output: "winged-guardian-poster.jpg",
    gravity: "center",
    backdrop: 0.09,
  },
  {
    source: "hero-action.jpg",
    output: "starter-action-set.jpg",
    extract: { left: 455, top: 135, width: 760, height: 570 },
    gravity: "center",
  },
  {
    source: "accessory-pack.jpg",
    output: "starter-action-set-full.jpg",
    fit: "contain",
    gravity: "center",
    backdrop: 0.05,
  },
  {
    source: "shadow-squad.jpg",
    output: "custom-hero.jpg",
    extract: { left: 360, top: 125, width: 920, height: 690 },
    gravity: "center",
    backdrop: 0.075,
  },
];

function overlaySvg(job = {}) {
  const backdropOpacity = job.backdrop ?? 0;

  return Buffer.from(`
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="backdrop" cx="48%" cy="38%" r="78%">
          <stop offset="0%" stop-color="#2d261f" stop-opacity="${backdropOpacity * 0.18}"/>
          <stop offset="58%" stop-color="#2d261f" stop-opacity="${backdropOpacity * 0.72}"/>
          <stop offset="100%" stop-color="#2d261f" stop-opacity="${backdropOpacity}"/>
        </radialGradient>
        <radialGradient id="key" cx="34%" cy="18%" r="62%">
          <stop offset="0%" stop-color="#ffffff" stop-opacity="0.2"/>
          <stop offset="50%" stop-color="#ffffff" stop-opacity="0.045"/>
          <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
        </radialGradient>
        <radialGradient id="floor" cx="50%" cy="105%" r="72%">
          <stop offset="0%" stop-color="#000000" stop-opacity="0.12"/>
          <stop offset="60%" stop-color="#000000" stop-opacity="0.03"/>
          <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
        </radialGradient>
        <radialGradient id="vignette" cx="50%" cy="44%" r="78%">
          <stop offset="0%" stop-color="#000000" stop-opacity="0"/>
          <stop offset="72%" stop-color="#000000" stop-opacity="0.015"/>
          <stop offset="100%" stop-color="#000000" stop-opacity="0.085"/>
        </radialGradient>
        <linearGradient id="rim" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#ffffff" stop-opacity="0.2"/>
          <stop offset="42%" stop-color="#ffffff" stop-opacity="0"/>
          <stop offset="100%" stop-color="#000000" stop-opacity="0.08"/>
        </linearGradient>
      </defs>
      <rect width="${width}" height="${height}" fill="url(#backdrop)"/>
      <rect width="${width}" height="${height}" fill="url(#key)"/>
      <rect width="${width}" height="${height}" fill="url(#floor)"/>
      <rect width="${width}" height="${height}" fill="url(#vignette)"/>
      <rect x="1" y="1" width="${width - 2}" height="${height - 2}" rx="34" fill="none" stroke="url(#rim)" stroke-width="2"/>
    </svg>
  `);
}

async function preparedBuffer(job) {
  let image = sharp(path.join(inputDir, job.source)).rotate();

  if (job.extract) {
    image = image.extract(job.extract);
  }

  return image
    .modulate({ brightness: 1.02, saturation: 0.97 })
    .linear(1.025, -3)
    .sharpen({ sigma: 0.5, m1: 0.28, m2: 0.95 })
    .toBuffer();
}

async function render(job) {
  const input = await preparedBuffer(job);

  await sharp(input)
    .resize(width, height, {
      fit: job.fit ?? "cover",
      position: job.gravity ?? "center",
      background: "#d8d0c6",
    })
    .composite([{ input: overlaySvg(job), left: 0, top: 0 }])
    .jpeg({ quality: 90, mozjpeg: true })
    .toFile(path.join(outputDir, job.output));

  console.log(`polished ${job.output}`);
}

await fs.mkdir(outputDir, { recursive: true });

for (const job of jobs) {
  await render(job);
}
