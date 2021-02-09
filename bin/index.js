#!/usr/bin/env node
const requestJSONs = require('../dist/index.js').default;

const [, , urls] = process.argv;

requestJSONs(urls.split(';')).then((data) => console.log(data));
