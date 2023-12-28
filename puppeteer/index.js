
const express = require('express')
const ssr  = require('./ssr.js')
// const fs = require('fs')
const path = require('path')
const { log } = require('console')
const favicon = require('serve-favicon')

const app = express()

// const PORT_REACT = 8080
// const PORT_PUPPETEER = 3000
const PORT_REACT = 3000
const PORT_PUPPETEER = 8080

let folder = "public"
folder = "build"

app.use(express.static(path.resolve(__dirname, `../${folder}`)))
app.use(favicon(path.join(__dirname,`../${folder}/favicon.ico`)))

app.get('*', async (req, res, next) => {

    if (req.url.includes("static/js") || req.url.includes("manifest.json")) {
        log(req.url)
        return res.status(404).send("404")
    }

    // const {html, ttRenderMs} = await ssr(`${req.protocol}://${req.get('host')}/index.html`)
    const {html, ttRenderMs} = await ssr(`http://localhost:${PORT_REACT}${req.url}`)  
    
    res.set('Server-Timing', `Prerender;dur=${ttRenderMs};desc="Headless render time (ms)"`)

    return res.status(200).send(html)

});

app.listen(PORT_PUPPETEER, () => console.log(`Server started http://localhost:${PORT_PUPPETEER}. Press Ctrl+C to quit`))
