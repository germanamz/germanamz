const path = require('path');

const recursiveFileWalking = async (directoryPath, extensions, cb) => {
  const dir = await fs.promises.opendir(directoryPath);

  for await (let dirent of dir) {
    if (dirent.isDirectory()) {
      await recursiveFileWalking(path.join(directoryPath, dirent.name), extensions, cb);
    }
    if (dirent.isFile()) {
      const ext = path.extname(dirent.name);
      if (extensions.indexOf(ext) > -1) {
        await cb(directoryPath, dirent.name);
      }
    }
  }
};

module.exports = recursiveFileWalking;
