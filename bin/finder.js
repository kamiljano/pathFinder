'use strict';

const request = require('request-promise');

const PORT_PROTOCOL_MATRIX = Object.freeze({
  http: [80, 8080, 9080],
  https: [443, 9443]
});

module.exports.findRepositories = address => {
  return Promise.all(Object.entries(PORT_PROTOCOL_MATRIX).map(([protocol, ports]) => {
    return Promise.all(ports.map(async port => {
      const url = `${protocol}://${address}:${port}/.git/HEAD`;
      try {
        await request.get(url);
        console.log(`Positive result at ${url}.`);
      } catch (err) {
        console.debug(`Nothing found for ${url}`);
      }
    }));
  }));
};