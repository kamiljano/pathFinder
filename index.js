'use strict';

const ipterate = require('ipterate');
const finder = require('./bin/finder');

ipterate.range('0.0.0.0/0').iterateAsync(ip => {
  return finder.findRepositories(ip);
});