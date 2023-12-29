
const express = require('express')
const ssr  = require('./ssr.js')
// const fs = require('fs')
const path = require('path')
const { log } = require('console')
const favicon = require('serve-favicon')

const app = express()

const PORT_REACT = process.env.NODE_APP_ENV == "production" ? 4000 : 4040
const PORT_PUPPETEER = 3000

app.get( /\.(js|css|map|ico|jpeg|jpg|png|woff|woff2|ttf|json)$/, express.static( path.resolve( __dirname, `..` ) ) )
app.use(favicon(path.join(__dirname,`../favicon.ico`)))


app.get('*', async (req, res, next) => {

    if (process.env.NODE_APP_ENV == "develop") {
        if (req.url.includes("static/js") ) {
            // log("Request: ", req.url)
            return res.status(404).send("404")
        }
    }    

    log("Request: ", req.url)

    // const {html, ttRenderMs} = await ssr(`${req.protocol}://${req.get('host')}/index.html`)
    let {html, ttRenderMs} = await ssr(`http://localhost:${PORT_REACT}${req.url}`)  
    
    res.set('Server-Timing', `Prerender;dur=${ttRenderMs};desc="Headless render time (ms)"`)

    // html = html.replace('script defer="defer"', 'script type="application/json"')   
    let initial_state = true
    html = html.replace('initial_state=null', `initial_state=${ JSON.stringify( initial_state ) }`)   

    return res.status(200).send(html)

});

app.listen(PORT_PUPPETEER, () => console.log(`Server started http://localhost:${PORT_PUPPETEER}. Press Ctrl+C to quit`))
