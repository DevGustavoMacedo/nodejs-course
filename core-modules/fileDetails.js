const fs = require('fs')

fs.stat('routes.js', (err, stats) => err ? console.log(err) : console.log(stats.isFile()))