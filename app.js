'use strict';

const ipterate = require('ipterate');
const PathFinder = require('./bin/finder').PathFinder;
const reportingService = require('./bin/reportingService');
const commandLineArgs = require('command-line-args');

const options = commandLineArgs([
  { name: 'path', alias: 'p', type: String }
]);

const pathFinder = new PathFinder(options.path);

ipterate.range('0.0.0.0/0').iterateAsync(async (ip, data) => {
  const result = await pathFinder.find(ip);
  if (data.iteration % 256 === 0) {
    reportingService.saveMilestone(ip, options.path);
  }
});