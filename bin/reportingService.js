'use strict';

const fs = require('fs');
const pathUtils = require('path');

const appDir = pathUtils.dirname(require.main.filename);

module.exports = {
  saveMilestone: (address, path) => {
    fs.writeFileSync(pathUtils.join(appDir, 'milestone.json'), JSON.stringify({ path, address }), 'utf8');
  },
  updateReport: (path, url) => {
    const reportPath = pathUtils.join(appDir, 'report.json');
    const data = fs.existsSync(reportPath) ? JSON.parse(fs.readFileSync(reportPath)) : {};
    if (!data[path]) {
      data[path] = [];
    }
    data[path].push(url);
    fs.writeFileSync(reportPath, JSON.stringify(data), 'utf8');
  }
};