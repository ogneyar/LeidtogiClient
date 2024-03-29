
const path = require('path')

// ignore `.css` imports
require('ignore-styles')

// transpile imports on the fly
require('@babel/register')({
    configFile: path.resolve(__dirname, '../babel.config.js'),
})

// import ssr server
require('./ssr.js')
