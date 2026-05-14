#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const ROOT = path.resolve(__dirname, '..');
const ENV_ID = process.argv.find(arg => !arg.startsWith('--') && arg !== process.argv[0] && arg !== process.argv[1]) || process.env.TCB_ENV_ID;
const DRY_RUN = process.argv.includes('--dry-run');
const PROCESSED_ROOT = path.join(ROOT, '.history', 'processed-personality');

const MBTI_TYPES = [
  'INTJ', 'INTP', 'ENTJ', 'ENTP',
  'INFJ', 'INFP', 'ENFJ', 'ENFP',
  'ISTJ', 'ISFJ', 'ESTJ', 'ESFJ',
  'ISTP', 'ISFP', 'ESTP', 'ESFP',
];

const SBTI_FILES = {
  ATM: 'ATM-er.png',
  BOSS: 'BOSS.png',
  CTRL: 'CTRL.png',
  DEAD: 'DEAD.png',
  DIOR: 'Dior-s.png',
  DRUNK: 'DRUNK.png',
  FAKE: 'FAKE.png',
  FIRE: 'FUCK.png',
  GOGO: 'GOGO.png',
  HHHH: 'HHHH.png',
  IMFW: 'IMFW.png',
  IMSB: 'IMSB.png',
  JOKER: 'JOKE-R.png',
  LOVER: 'LOVE-R.png',
  MALO: 'MALO.png',
  MONK: 'MONK.png',
  MUM: 'MUM.png',
  OHNO: 'OH-NO.png',
  OJBK: 'OJBK.png',
  POOR: 'POOR.png',
  SEXY: 'SEXY.png',
  MESS: 'SHIT.png',
  SOLO: 'SOLO.png',
  THANK: 'THAN-K.png',
  THINK: 'THIN-K.png',
  WOC: 'WOC!.png',
  ZZZZ: 'ZZZZ.png',
};

const assets = [
  ...MBTI_TYPES.map(type => ({
    key: `mbti_${type}`,
    localPath: path.join(PROCESSED_ROOT, 'mbti', `${type}.png`),
    cloudPath: `personality/mbti/${type}.png`,
  })),
  ...Object.keys(SBTI_FILES).map((type) => ({
    key: `sbti_${type}`,
    localPath: path.join(PROCESSED_ROOT, 'sbti', `${type}.png`),
    cloudPath: `personality/sbti/${type}.png`,
  })),
];

function usage() {
  console.error('Usage: node scripts/upload-personality-images.js <envId> [--dry-run]');
  console.error('Example: node scripts/upload-personality-images.js test');
}

function assertInputs() {
  if (!ENV_ID) {
    usage();
    process.exit(1);
  }
  const missing = assets.filter(asset => !fs.existsSync(asset.localPath));
  if (missing.length) {
    console.error('Missing processed local assets:');
    missing.forEach(asset => console.error(`- ${asset.localPath}`));
    console.error('Run the image processing step first; do not upload the original source images with backgrounds.');
    process.exit(1);
  }
}

function tcb(args) {
  const bin = process.platform === 'win32' ? 'npx.cmd' : 'npx';
  const result = spawnSync(bin, ['--yes', '--package', '@cloudbase/cli', 'tcb', ...args], {
    cwd: ROOT,
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe'],
    shell: process.platform === 'win32',
  });
  return {
    status: result.status,
    output: [result.stdout, result.stderr].filter(Boolean).join('\n'),
  };
}

function parseJsonOutput(output) {
  const starts = [];
  for (let i = 0; i < output.length; i += 1) {
    if (output[i] === '{' || output[i] === '[') starts.push(i);
  }
  for (const start of starts) {
    const raw = output.slice(start).trim();
    try {
      return JSON.parse(raw);
    } catch (e) {
      // Try next possible JSON boundary.
    }
  }
  return null;
}

function findFileID(value) {
  if (!value) return '';
  if (typeof value === 'string') return value.startsWith('cloud://') ? value : '';
  if (Array.isArray(value)) {
    for (const item of value) {
      const found = findFileID(item);
      if (found) return found;
    }
    return '';
  }
  if (typeof value === 'object') {
    for (const key of ['fileID', 'fileId', 'fileid']) {
      if (typeof value[key] === 'string' && value[key].startsWith('cloud://')) return value[key];
    }
    for (const item of Object.values(value)) {
      const found = findFileID(item);
      if (found) return found;
    }
  }
  return '';
}

function extractFileID(output) {
  const parsed = parseJsonOutput(output);
  const fromJson = findFileID(parsed);
  if (fromJson) return fromJson;
  const match = output.match(/cloud:\/\/[^\s"',}]+/);
  return match ? match[0] : '';
}

function extractTempURL(output) {
  const parsed = parseJsonOutput(output);
  const url = parsed && parsed.data && parsed.data.url;
  if (typeof url === 'string' && /^https?:\/\//.test(url)) return url;
  const match = output.match(/https?:\/\/[^\s"',}]+/);
  return match ? match[0] : '';
}

function getBucketFromURL(output) {
  const url = extractTempURL(output);
  if (!url) return '';
  try {
    return new URL(url).hostname.replace(/\.tcb\.qcloud\.la$/, '');
  } catch (e) {
    return '';
  }
}

function resolveFileID(asset) {
  const urlRes = tcb(['storage', 'url', asset.cloudPath, '--json', '-e', ENV_ID]);
  if (urlRes.status !== 0) {
    console.error(urlRes.output);
    throw new Error(`Could not resolve URL for: ${asset.cloudPath}`);
  }
  const bucket = getBucketFromURL(urlRes.output);
  if (!bucket) {
    console.error(urlRes.output);
    throw new Error(`Could not parse storage bucket for: ${asset.cloudPath}`);
  }
  return `cloud://${ENV_ID}.${bucket}/${asset.cloudPath}`;
}

function uploadAll() {
  const mapping = {};

  for (const asset of assets) {
    console.log(`Uploading ${asset.cloudPath}`);
    const res = tcb([
      'storage', 'upload',
      asset.localPath,
      asset.cloudPath,
      '--json',
      '--times', '3',
      '--interval', '1000',
      '-e', ENV_ID,
    ]);

    if (res.status !== 0) {
      console.error(res.output);
      throw new Error(`Upload failed: ${asset.cloudPath}`);
    }

    const fileID = extractFileID(res.output) || resolveFileID(asset);

    mapping[asset.key] = fileID;
  }

  return mapping;
}

function updateMappingFile(mapping) {
  const file = path.join(ROOT, 'code', 'data', 'personalityImages.js');
  let content = fs.readFileSync(file, 'utf8');

  for (const [key, fileID] of Object.entries(mapping)) {
    const escaped = fileID.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
    const pattern = new RegExp(`(${key}:\\s*)'[^']*'`);
    if (!pattern.test(content)) throw new Error(`Missing key in personalityImages.js: ${key}`);
    content = content.replace(pattern, `$1'${escaped}'`);
  }

  fs.writeFileSync(file, content, 'utf8');
}

assertInputs();

if (DRY_RUN) {
  console.log(`Ready to upload ${assets.length} images to env ${ENV_ID}:`);
  assets.forEach(asset => console.log(`${asset.key} <- ${asset.cloudPath}`));
  process.exit(0);
}

const mapping = uploadAll();
updateMappingFile(mapping);
console.log(`Uploaded ${Object.keys(mapping).length} images and updated code/data/personalityImages.js`);
