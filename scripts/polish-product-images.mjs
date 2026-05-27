import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const inputDir = path.join(root, "public", "images", "products");
const outputDir = path.join(inputDir, "polished");
const width = 1400;
const height = 1050;

const jobs = [
  { source: "guardian-mint.jpg", output: "angel-of-peace.jpg", gravity: "north" },
  { source: "sports-skate.jpg", output: "disc-dasher.jpg", gravity: "center" },
  {
    source: "accessory-pack.jpg",
    output: "battle-brawler.jpg",
    extract: { left: 800, top: 0, width: 800, height: 600 },
    gravity: "north",
  },
  { source: "hero-action.jpg", output: "skate-spark.jpg", gravity: "center" },
  { source: "hero-gear-pack.png", output: "hero-gear-pack.jpg", gravity: "center" },
  { source: "starter-squad.jpg", output: "winged-guardian-poster.jpg", gravity: "center" },
  { source: "accessory-pack.jpg", output: "starter-action-set.jpg", gravity: "center" },
  { source: "hero-action.jpg", output: "custom-hero.jpg", gravity: "center" },
];

function overlaySvg() {
  return Buffer.from(`
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="warm" cx="48%" cy="32%" r="78%">
          <stop offset="0%" stop-color="#fffaf0" stop-opacity="0.30"/>
          <stop offset="48%" stop-color="#f6ead6" stop-opacity="0.10"/>
          <stop offset="100%" stop-color="#14100d" stop-opacity="0.34"/>
        </radialGradient>
        <linearGradient id="rim" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#ffffff" stop-opacity="0.36"/>
          <stop offset="45%" stop-color="#ffffff" stop-opacity="0"/>
          <stop offset="100%" stop-color="#000000" stop-opacity="0.16"/>
        </linearGradient>
      </defs>
      <rect width="${width}" height="${height}" fill="url(#warm)"/>
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
    .modulate({ brightness: 1.08, saturation: 1.05 })
    .linear(1.04, -5)
    .sharpen({ sigma: 0.72, m1: 0.55, m2: 1.7 })
    .toBuffer();
}

async function render(job) {
  const input = await preparedBuffer(job);

  await sharp(input)
    .resize(width, height, { fit: "cover", position: job.gravity ?? "center" })
    .composite([{ input: overlaySvg(), left: 0, top: 0 }])
    .jpeg({ quality: 90, mozjpeg: true })
    .toFile(path.join(outputDir, job.output));

  console.log(`polished ${job.output}`);
}

await fs.mkdir(outputDir, { recursive: true });

for (const job of jobs) {
  await render(job);
}
