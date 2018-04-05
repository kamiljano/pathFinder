'use strict';

const ipterate = require('ipterate');
const PathFinder = require('./bin/finder').PathFinder;
const commandLineArgs = require('command-line-args');

const options = commandLineArgs([
  { name: 'path', alias: 'p', type: String }
]);

const pathFinder = new PathFinder(options.path);

ipterate.range('0.0.0.0/0').iterateAsync(ip => {
  return pathFinder.find(ip);
});