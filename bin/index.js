#!/usr/bin/env node
const requestJSONs = require('../dist/index.js').default;
const util = require('util');

const [, , urls] = process.argv;

requestJSONs(urls.split(';')).then((data) =>
  console.log(util.inspect(data, false, null, true))
);
