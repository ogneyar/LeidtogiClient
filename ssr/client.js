'use strict'
require('babel-register')({
    presets: ['es2015', 'react']
});

require('dotenv').config()
const express = require('express')
const path = require('path')
// const fs = require('fs')
const favicon = require('serve-favicon')
// const React = require('react')
// const { renderToString } = require('react-dom/server')

let folder = "build"
// const connection = require(`../${folder}/utils/db`)
// const routes = require(`../${folder}/utils/routes`)

// const { App } = require( '../src/components/App' )

let renderReact = require('./renderReact.js')

  

const PORT = process.env.PORT || 3000

const app = express()

app.use(express.static(path.resolve(__dirname, '..', folder)))
app.use(favicon(path.join(__dirname, '..', folder, 'favicon.ico')))

renderReact(app)

// app.get('/error', (req, res) => res.status(404).sendFile(__dirname + '/404.html'))
// app.get('*', (req, res) => res.sendFile(__dirname + '/index.html'))

app.listen(PORT, () => console.log(`Starting server. http://localhost:${PORT}`))
