var fs = require('fs');
var path = require('path');

var babelrc = fs.readFileSync( path.join(__dirname, '../.babelrc') );
var config;

try {
  config = JSON.parse(babelrc);
} catch (err) {
  console.error('==>     ERROR: Error parsing your .babelrc.');
  console.error(err);
}

require('babel-core/register')(config);
require('../server/server.js');
