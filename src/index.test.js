import chai, { expect } from 'chai';
import proxyquire from 'proxyquire';
import sinonChai from 'sinon-chai';

chai.use(sinonChai);

describe('requestJSONs', () => {
  let requestJSONsStub;

  beforeEach(() => {
    ({ default: requestJSONsStub } = proxyquire
      .noCallThru()
      .load('./index.js', {
        'node-fetch': (url) =>
          new Promise((resolve, reject) => {
            const [, data] = url.split('.com/');
            if (parseInt(data) > 1) {
              reject({ message: 'test' });
            }
            resolve({ json: () => ({ data }) });
          }),
      }));
  });

  describe('validation', () => {
    it('validates arguments are the correct shape', async () => {
      const { message: messageSingle } = await requestJSONsStub(123).catch(
        (err) => err
      );
      expect(messageSingle).to.equal(
        'Please provide a single url string or array of url strings'
      );

      const { message: messageArr } = await requestJSONsStub([123]).catch(
        (err) => err
      );
      expect(messageArr).to.equal(
        'Please provide a single url string or array of url strings'
      );
    });

    it('validates arguments are URLs', async () => {
      const invalidUrl = 'invalidURL';

      const { message } = await requestJSONsStub(invalidUrl).catch(
        (err) => err
      );

      expect(message).to.equal(`${invalidUrl} is not a valid url`);
    });
  });

  it('returns results in the correct shape', async () => {
    const link = 'http://url.com/1';
    const link2 = 'http://url.com/2';

    const result = await requestJSONsStub(link);
    expect(result).to.deep.equal([
      {
        url: link,
        data: link.split('.com/')[1],
      },
    ]);

    const resultArr = await requestJSONsStub([link, link2]);
    expect(resultArr).to.deep.equal([
      {
        url: link,
        data: link.split('.com/')[1],
      },
      {
        url: link2,
        reason: 'test',
      },
    ]);
  });
});
