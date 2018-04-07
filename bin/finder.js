'use strict';

let request = require('request-promise');
const urlUtil = require('url');
let reportingService = require('./reportingService');

const PORT_PROTOCOL_MATRIX = Object.freeze({
  http: [80, 8080, 9080],
  https: [443, 9443]
});

class PathFinder {
  constructor(path) {
    this.path = path;
  }

  find(ipAddress) {
    return Promise.all(Object.entries(PORT_PROTOCOL_MATRIX).map(([protocol, ports]) => {
      return Promise.all(ports.map(async port => {
        const url = urlUtil.resolve(`${protocol}://${ipAddress}:${port}`, this.path);
        try {
          await request.get(url);
          console.log(`Positive result at ${url}.`);
          reportingService.updateReport(this.path, url);
        } catch (err) {
          console.debug(`Nothing found for ${url}`);
        }
      }));
    }));
  }
}

module.exports.PathFinder = PathFinder;