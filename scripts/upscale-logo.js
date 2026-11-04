const sharp = require("sharp");

(async () => {
  const { data, info } = await sharp("public/assets/logo.png")
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const light = Buffer.from(data);
  const dark = Buffer.from(data);

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    if (r < 45 && g < 45 && b < 45) {
      light[i + 3] = 0;
      dark[i + 3] = 0;
      continue;
    }
    if (r > 210 && g > 210 && b > 210) {
      dark[i] = 11;
      dark[i + 1] = 27;
      dark[i + 2] = 50;
    }
  }

  const lightBuf = await sharp(light, {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .trim()
    .png()
    .toBuffer();

  const darkBuf = await sharp(dark, {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .trim()
    .png()
    .toBuffer();

  await sharp(lightBuf).resize({ width: 400 }).png().toFile("public/assets/logo-on-dark.png");
  await sharp(darkBuf).resize({ width: 400 }).png().toFile("public/assets/logo-on-light.png");

  const d = await sharp("public/assets/logo-on-dark.png").metadata();
  const l = await sharp("public/assets/logo-on-light.png").metadata();
  console.log("dark", `${d.width}x${d.height}`);
  console.log("light", `${l.width}x${l.height}`);
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
