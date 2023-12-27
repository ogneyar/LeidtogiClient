
const express = require('express')
const ssr  = require('./ssr.js')
const fs = require('fs')
const path = require('path')

const app = express()

app.get('*', async (req, res, next) => {

    let folder = "public"

    // const {html, ttRenderMs} = await ssr(`${req.protocol}://${req.get('host')}/index.html`)
    // const {html, ttRenderMs} = await ssr(path.resolve(__dirname, `../${folder}/index.html`)) 
    const {html, ttRenderMs} = await ssr("http://localhost:3000" + req.originalUrl)
    
    res.set('Server-Timing', `Prerender;dur=${ttRenderMs};desc="Headless render time (ms)"`)

    return res.status(200).send(html)

});

app.listen(8080, () => console.log('Server started http://localhost:8080. Press Ctrl+C to quit'))
