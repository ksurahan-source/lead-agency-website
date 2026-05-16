import fs from 'node:fs/promises';
import path from 'node:path';
import { createHash } from 'node:crypto';

import axios from 'axios';

function getFileExtension(url: string) {
  const pathname = new URL(url).pathname;
  const extension = path.extname(pathname);
  return extension || '.mp4';
}

export async function downloadRemoteAssetToPublic(url: string, folder: string) {
  const extension = getFileExtension(url);
  const fileName = `${createHash('sha1').update(url).digest('hex')}${extension}`;
  const outputDir = path.join(process.cwd(), 'public', folder);
  const outputPath = path.join(outputDir, fileName);

  await fs.mkdir(outputDir, { recursive: true });

  try {
    await fs.access(outputPath);
    return `${folder}/${fileName}`;
  } catch {
    // File does not exist yet. Continue to download.
  }

  const response = await axios.get<ArrayBuffer>(url, {
    responseType: 'arraybuffer',
  });

  await fs.writeFile(outputPath, Buffer.from(response.data));

  return `${folder}/${fileName}`;
}
