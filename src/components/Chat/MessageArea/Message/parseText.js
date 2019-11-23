
function replaceUrls(text) {
  const pattern = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/g;
  const gMatches = text.match(pattern) || [];
  return gMatches.reduce((v, url) => v.replace(url, `<a href="${url}">${url}</a>`), text);
}

function replaceLinks(text) {
  const linkGPattern = /\[(.+)]\((.+)\)/g;
  const linkPattern = /\[(.+)]\((.+)\)/;
  const linkMatches = text.match(linkGPattern) || [];
  return linkMatches.reduce((v, link) => v.replace(link, link.replace(linkPattern, '<a href="$2">$1</a>')), text);
}

module.exports = function parseText(text) {
  return [ replaceLinks ].reduce((v, fn) => fn(v), text);
};
