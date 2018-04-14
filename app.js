'use strict';

const ipterate = require('ipterate');
const PathFinder = require('./bin/finder').PathFinder;
const reportingService = require('./bin/reportingService');
const commandLineArgs = require('command-line-args');

const options = commandLineArgs([
  { name: 'path', alias: 'p', type: String, defaultOption: true},
  { name: 'starting', alias: 's', type: String },
  { name: 'contentRegex', alias: 'r', type: String }
]);

if (!options.path) {
  throw new Error('The parameter "path" is mandatory');
}

const pathFinder = new PathFinder(options.path, options.contentRegex ? new RegExp(options.contentRegex) : undefined);
const range = ipterate.range('0.0.0.0/0');
if (options.starting) {
  range.startWith(options.starting);
}
range.iterateAsync(async (ip, data) => {
  const result = await pathFinder.find(ip);
  if (data.iteration % 256 === 0) {
    reportingService.saveMilestone(ip, options.path);
  }
});