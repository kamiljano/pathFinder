'use strict';

const request = require('request-promise');
const AWS = require('aws-sdk');

const PORT_PROTOCOL_MATRIX = Object.freeze({
  http: [80, 8080, 9080],
  https: [443, 9443]
});

const publish = url => {
  const sns = new AWS.SNS({region: 'eu-west-1'});
  const params = {
    Message: 'Found VCS at ' + url,
    MessageStructure: 'string',
    PhoneNumber: '+358406673825'
  };
  return sns.publish(params).promise();
};

module.exports.findRepositories = address => {
  return Promise.all(Object.entries(PORT_PROTOCOL_MATRIX).map(([protocol, ports]) => {
    return Promise.all(ports.map(async port => {
      const url = `${protocol}://${address}:${port}/.git/HEAD`;
      try {
        await request.get(url);
        console.log(`Positive result at ${url}.`);
        await publish(url);
      } catch (err) {
        console.debug(`Nothing found for ${url}`);
      }
    }));
  }));
};