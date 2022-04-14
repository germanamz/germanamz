#!/usr/bin/env zx
const path = require('path');
const { fs: memfs } = require('memfs');
const { ufs } = require('unionfs');
const { promisify } = require('util');
const webpack = require('webpack');
const archiver = require('archiver');
const { createHash } = require('crypto');
const { pipeline } = require('stream');
const recursiveFileWalking = require('./recursiveFileWalking');

ufs.use(memfs).use(fs);

const BUILD_PATH = path.resolve(__dirname, '../build');
const LAMBDAS_BUILD_PATH = path.resolve(BUILD_PATH, './lambdas');
const ARCHIVES_PATH = path.resolve(BUILD_PATH, './archives');
const NEXT_PAGES_PATH = path.resolve(__dirname, '../.next/serverless/pages');

const asyncPipeline = promisify(pipeline);

const indexCode = (pagePath) => `const serverlessHttp = require('serverless-http');
const page = require('${pagePath}');

module.exports.handler = serverlessHttp(page.render);
`;

const ensureDir = async (dirPath, fileSys = memfs) => {
  try {
    return fileSys.promises.mkdir(dirPath, { recursive: true });
  } catch (e) {
    console.error(e);
  }
};

const buildPage = async ({ lambdaName, filename, directoryPath }) => {
  console.time(`Build ${lambdaName}`);
  const entry = path.join(directoryPath, `handler.${lambdaName}.js`);

  await ensureDir(directoryPath, memfs);

  await memfs.promises.writeFile(
    entry,
    indexCode(`./${filename}`),
  );

  const compiler = webpack({
    entry,
    context: process.cwd(),
    output: {
      filename,
      path: LAMBDAS_BUILD_PATH,
      library: {
        type: 'umd',
      },
    },
    resolve: {
      symlinks: false,
      extensions: ['.js'],
    },
    node: false,
    target: 'node',
    externalsPresets: {
      node: true,
    },
    optimization: {
      minimize: false,
      nodeEnv: false,
    },
    mode: 'production',
  });
  compiler.inputFileSystem = ufs;
  compiler.outputFileSystem = memfs;
  const run = promisify(compiler.run.bind(compiler));
  const close = promisify(compiler.close.bind(compiler));
  const stats = await run();
  await close();

  if (stats?.errors) {
    throw stats.errors;
  }

  console.timeEnd(`Build ${lambdaName}`);
  return path.join(LAMBDAS_BUILD_PATH, filename);
};

const archiveLambda = async ({ lambdaName, buildFile }) => {
  console.time(`Archive ${lambdaName}`);
  const archiveFile = path.join(ARCHIVES_PATH, `${lambdaName}.zip`);
  const archiveChecksumFile = path.join(ARCHIVES_PATH, `${lambdaName}.zip.checksum`);
  const archive = archiver('zip', {
    zlib: { level: 9 },
  });

  await fs.promises.mkdir(ARCHIVES_PATH, { recursive: true });

  archive.pipe(fs.createWriteStream(archiveFile));

  archive.append(memfs.createReadStream(buildFile), { name: 'index.js' });

  await archive.finalize();

  const hash = createHash('sha256').setEncoding('base64');
  await asyncPipeline(fs.createReadStream(archiveFile), hash, fs.createWriteStream(archiveChecksumFile));

  console.timeEnd(`Archive ${lambdaName}`);
  return archiveFile;
};

const build = async () => {
  await recursiveFileWalking(NEXT_PAGES_PATH, ['.js'], async (directoryPath, filename) => {
    const lambdaName = path.basename(filename, '.js');

    const buildFile = await buildPage({
      lambdaName,
      directoryPath,
      filename,
    });

    await archiveLambda({
      lambdaName,
      buildFile,
    });
  });
};

await build();
