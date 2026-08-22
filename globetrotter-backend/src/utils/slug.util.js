const { nanoid } = require('nanoid');

function generateShareSlug() {
  return nanoid(10);
}

module.exports = { generateShareSlug };