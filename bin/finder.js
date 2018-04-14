'use strict';

let request = require('request-promise');
const urlUtil = require('url');
let reportingService = require('./reportingService');

const PORT_PROTOCOL_MATRIX = Object.freeze({
  http: [80, 8080, 9080],
  https: [443, 9443]
});

class PathFinder {
  constructor(path, contentRegex) {
    this.path = path;
    this.contentRegex = contentRegex;
  }

  find(ipAddress) {
    return Promise.all(Object.entries(PORT_PROTOCOL_MATRIX).map(([protocol, ports]) => {
      return Promise.all(ports.map(async port => {
        const url = urlUtil.resolve(`${protocol}://${ipAddress}:${port}`, this.path);
        try {
          const result = await request.get({
            url,
            timeout: 3000
          });
          if ((typeof result === 'string' && (!this.contentRegex || result.match(this.contentRegex))) || (typeof result !== 'undefined' && typeof result !== 'string')) {
            console.log(`Positive result at ${url}.`);
            reportingService.updateReport(this.path, url);
          } else {
            console.debug(`Content found at ${url} does not meet the content check requirements`);
          }
        } catch (err) {
          console.debug(`Nothing found for ${url}`);
        }
      }));
    }));
  }
}

module.exports.PathFinder = PathFinder;