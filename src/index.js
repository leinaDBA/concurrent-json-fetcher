import fetch from 'node-fetch';
import { URL } from 'url';

const validateArgs = (urls) => {
  let urlArr;

  if (typeof urls === 'string') {
    urlArr = [urls];
  } else if (Array.isArray(urls)) {
    urlArr = [...urls];
  } else {
    throw new Error('Please provide a single url or array of urls');
  }

  urlArr.forEach((url) => {
    try {
      new URL(url);
    } catch (err) {
      throw new Error(`${err.input} is not a valid url`);
    }
  });

  return urlArr;
};

const requestJSONs = async (urls) => {
  const validUrls = validateArgs(urls);
  const response = await Promise.allSettled(validUrls.map((url) => fetch(url)));

  return await Promise.all(
    response.map(async ({ reason, status, value }, index) => {
      const result = { url: validUrls[index] };

      if (status === 'fulfilled') {
        const { data } = await value.json();
        result.data = data;
      } else {
        result.reason = reason.message;
      }

      return result;
    })
  );
};

export default requestJSONs;
