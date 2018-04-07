'use strict';

const rewire = require('rewire');
const chai = require('chai');
const spies = require('chai-spies');
chai.use(spies);
const expect = chai.expect;

describe('GIVEN a correctly configured path finder', () => {

  let finder;
  let reportingService;
  let request;

  beforeEach(() => {
    request = chai.spy.interface({
      get(url) {
        if (url === 'http://0.0.0.0:80/path')
          return Promise.resolve();
        return Promise.reject();
      }
    });
    reportingService = chai.spy.interface({
      updateReport() {

      }
    });
    const file = rewire('../../bin/finder');
    file.__set__({request, reportingService});
    finder = new file.PathFinder('/path');
  });

  it('WHEN the path returns a successful result, THEN the path should be properly returned', async () => {
    await finder.find('0.0.0.0');
    expect(reportingService.updateReport).to.have.been.called.exactly(1);
    expect(reportingService.updateReport).to.have.been.called.with('http://0.0.0.0:80/path');
  });

});