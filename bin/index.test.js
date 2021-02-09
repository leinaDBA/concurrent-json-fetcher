import chai, { expect } from 'chai';
import proxyquire from 'proxyquire';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

chai.use(sinonChai);

describe('bin script', () => {
  const returnedData = 'done';
  let requestJSONsStub;
  let consoleLogSpy;

  beforeEach(() => {
    consoleLogSpy = sinon.spy(console, 'log');
    requestJSONsStub = sinon.stub().resolves(returnedData);
    process.argv[2] = undefined;
  });

  afterEach(() => {
    sinon.restore();
  });

  const runBinWithArgs = (args) => {
    process.argv[2] = args;
    proxyquire('./index.js', {
      '../dist/index.js': { default: requestJSONsStub },
    });
  };

  it('splits URLs', () => {
    const urls = 'first;second;third';

    runBinWithArgs(urls);

    expect(requestJSONsStub).to.have.been.calledOnceWithExactly(
      urls.split(';')
    );
  });

  it('prints the results', async () => {
    await runBinWithArgs('foo');

    expect(consoleLogSpy).to.have.been.calledOnceWithExactly(
      `\u001b[32m'${returnedData}'\u001b[39m`
    );
  });
});
