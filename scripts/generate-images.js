import sharp from "sharp";

const variants = [
  { source: "images/1x1-pic.webp", widths: [480, 960] },
  { source: "images/sulyap.webp", widths: [480, 960] },
  { source: "images/news.webp", widths: [640, 1280] },
  { source: "images/ov.webp", widths: [640, 1280] },
  { source: "images/wt.webp", widths: [640, 1280] },
  { source: "images/PSITS.webp", widths: [640, 1280] },
  { source: "images/ext.webp", widths: [640, 1280] },
  { source: "images/sksu-logo.webp", widths: [188] },
];

await Promise.all(
  variants.flatMap(({ source, widths }) =>
    widths.map((width) => {
      const output = source.replace(/\.webp$/, `-${width}.webp`);
      return sharp(source)
        .resize({ width, withoutEnlargement: true })
        .webp({ quality: 80 })
        .toFile(output);
    }),
  ),
);
