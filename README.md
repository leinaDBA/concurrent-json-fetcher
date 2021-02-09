# concurrent-json-fetcher
A fetcher that will return a promise of json data

- [Description](#description)
- [Run](#run-with-npx)
    - [CLI](#CLI)
- [Usage](#Usage)
    - [API](#concurrent-json-fetcher-api)
- [NPM Commands](#npm-commands)

## Description

The `concurrent-json-fetcher` will fetch json data from a url or an array of urls

## Prerequisites

This project requires `node 14` to be able to use [Promise.allSettled](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled)
```sh
    nvm use 14
```

## Run with npx

There is no need to clone or install this package, it can be run directly from the terminal:
```sh
    nvm use 14
    npx leinadba/concurrent-json-fetcher [url || "url;url;url;url"]
```

### CLI
```sh
    npx leinadba/concurrent-json-fetcher [url || "url;url;url;url"]
    
    [url || "url;url;url;url"] required string or semi colon deliminated array of strings for the fetcher to request
    npx leinadba/concurrent-json-fetcher https://ft-tech-test-example.s3-eu-west-1.amazonaws.com/ftse-fsi.json
    npx leinadba/concurrent-json-fetcher "https://ft-tech-test-example.s3-eu-west-1.amazonaws.com/ftse-fsi.json;https://ft-tech-test-example.s3-eu-west-1.amazonaws.com/gbp-hkd.json;https://ft-tech-test-example.s3-eu-west-1.amazonaws.com/gbp-usd.json"
```

Or to run a branch:
```sh
    npx leinadba/concurrent-json-fetcher#name-of-branch [url || "url;url;url;url"]
```

#### Usage

For use with local development

```js
  // fetcherTask.js
  import requestJSONs from 'concurrent-json-fetcher';

  await requestJSONs('https://ft-tech-test-example.s3-eu-west-1.amazonaws.com/ftse-fsi.json');
  await requestJSONs([
    'https://ft-tech-test-example.s3-eu-west-1.amazonaws.com/ftse-fsi.json',
    'https://ft-tech-test-example.s3-eu-west-1.amazonaws.com/gbp-hkd.json',
    'https://ft-tech-test-example.s3-eu-west-1.amazonaws.com/gbp-usd.json'
  ]);
```

#### concurrent-json-fetcher API

requestJSONs
```js
  /**
  * fetches json data from url(s)
  * @param (string || [string]): urls
  *
  * @return Promise<[{
  *   url:string,
  *   (data: {}) || (reason: string)
  * }]>
  */
  await requestJSONs(urls);
```

### Npm Commands
#### Install dependencies
```sh
    npm ci
```

#### Tests

```sh
    npm test
```
