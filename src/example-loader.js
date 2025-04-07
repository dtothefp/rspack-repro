module.exports = function (content, map, meta) {
  this.importModule('import-module-example!./non-existent-module');
  return content;
};
