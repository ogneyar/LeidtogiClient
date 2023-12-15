
const express = require('express')
const fs = require('fs')
const path = require('path')
const React = require('react')
const ReactDOMServer = require('react-dom/server')
const favicon = require('serve-favicon')

// create express application
const app = express()

// import App component
const { App } = require('../src/AppSSR')

// serve static assets
// app.use(express.static(path.resolve(__dirname, '../build' )))
app.get( /\.(js|css|map|ico|jpeg|jpg)$/, express.static( path.resolve( __dirname, '../build' ) ) )
app.use(favicon(path.resolve(__dirname, '../build/favicon.ico')))

// for any other requests, send `index.html` as a response
app.get('*', async (req, res) => {

    // read `index.html` file
    let indexHTML = fs.readFileSync(path.resolve(__dirname, '../build/index.html'), {
        encoding: 'utf8',
    })
   
    // get HTML string from the `App` component
    let appHTML = ReactDOMServer.renderToString(<App />)

    // populate `#app` element with `appHTML`
    indexHTML = indexHTML.replace('<div id="root"></div>', `<div id="root">${ appHTML }</div>`)   
    
    res.contentType( 'text/html' )

    // error
    if (req.url === "/error" || req.url === "/error/") {
        return res.status(404).sendFile(path.resolve(__dirname, '../build/404.html'))
        // return error
    }

    if (req.url === "/") {
        return res.status(200).send(indexHTML)
        // return index
    }

    return res.status(200).send(indexHTML)
    // return res.status(404).sendFile(path.resolve(__dirname, '../build/404.html'))
    // return error
} )

// run express server on port 9000
app.listen('9000', () => {
    console.log( 'Express server started at http://localhost:9000' )
})
