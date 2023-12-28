
const express = require('express')
const fs = require('fs')
const path = require('path')
const React = require('react')
const ReactDOMServer = require('react-dom/server')
const { StaticRouter } = require('react-router')
const favicon = require('serve-favicon')

const { App } = require('../src/App')
const { fetchBrands } = require('../src/http/brandAPI')

// create express application
const app = express()

// const PORT = process.env.NODE_APP_ENV == "production" ? 3000 : 9000
const PORT = 3000

let folder = "build"
if (process.env.NODE_APP_ENV == "develop") folder = "public"

// serve static assets
app.get( /\.(js|css|map|ico|jpeg|jpg|png|woff|woff2|ttf)$/, express.static( path.resolve( __dirname, `../${folder}` ) ) )

app.use(favicon(path.resolve(__dirname, `../${folder}/favicon.ico`)))

// for any other requests, send `index.html` as a response
app.get('*', async (req, res) => {

    // read `index.html` file
    let indexHTML = fs.readFileSync(path.resolve(__dirname, `../${folder}/index.html`), {
        encoding: 'utf8',
    })
       
    let brand_store = await fetchBrands()
    let initial_state = {
        brand_store
    }
    indexHTML = indexHTML.replace('initial_state=null', `initial_state=${ JSON.stringify( initial_state ) }`);

    // get HTML string from the `App` component
    let appHTML = ReactDOMServer.renderToString(
        <StaticRouter location={req.url} context={initial_state} >
            <App />
        </StaticRouter>
    )

    // populate `#app` element with `appHTML`
    indexHTML = indexHTML.replace('<div id="root"></div>', `<div id="root">${ appHTML }</div>`)   

    if (process.env.NODE_APP_ENV == "develop") {
        indexHTML = indexHTML.replace(/(%PUBLIC_URL%)/g, ``)
        // if (req.url === "/") {
            let indexCSS = fs.readFileSync(path.resolve(__dirname, `../src/styles/index.css`))
            indexHTML = indexHTML.replace(`</head>`, `<style>${indexCSS}</style></head>`)
            indexCSS = fs.readFileSync(path.resolve(__dirname, `../src/styles/App.css`))
            indexHTML = indexHTML.replace(`</head>`, `<style>${indexCSS}</style></head>`)
            
            indexCSS = fs.readFileSync(path.resolve(__dirname, `../node_modules/bootstrap/dist/css/bootstrap.css`))
            indexHTML = indexHTML.replace(`</head>`, `<style>${indexCSS}</style></head>`)

            indexCSS = fs.readFileSync(path.resolve(__dirname, `../src/components/header/Header.css`))
            indexHTML = indexHTML.replace(`</head>`, `<style>${indexCSS}</style></head>`)
            indexCSS = fs.readFileSync(path.resolve(__dirname, `../src/components/header/top/Top.css`))
            indexHTML = indexHTML.replace(`</head>`, `<style>${indexCSS}</style></head>`)
            indexCSS = fs.readFileSync(path.resolve(__dirname, `../src/components/header/navbar/NavBar.css`))
            indexHTML = indexHTML.replace(`</head>`, `<style>${indexCSS}</style></head>`)
            indexCSS = fs.readFileSync(path.resolve(__dirname, `../src/components/header/address/Address.css`))
            indexHTML = indexHTML.replace(`</head>`, `<style>${indexCSS}</style></head>`)
            indexCSS = fs.readFileSync(path.resolve(__dirname, `../src/components/header/aside/Aside.css`))
            indexHTML = indexHTML.replace(`</head>`, `<style>${indexCSS}</style></head>`)
            indexCSS = fs.readFileSync(path.resolve(__dirname, `../src/components/header/banner/Banner.css`))
            indexHTML = indexHTML.replace(`</head>`, `<style>${indexCSS}</style></head>`)
            indexCSS = fs.readFileSync(path.resolve(__dirname, `../src/components/header/carousel/Carousel.css`))
            indexHTML = indexHTML.replace(`</head>`, `<style>${indexCSS}</style></head>`)

            indexCSS = fs.readFileSync(path.resolve(__dirname, `../src/components/footer/Footer.css`))
            indexHTML = indexHTML.replace(`</head>`, `<style>${indexCSS}</style></head>`)
            indexCSS = fs.readFileSync(path.resolve(__dirname, `../src/components/footer/End.css`))
            indexHTML = indexHTML.replace(`</head>`, `<style>${indexCSS}</style></head>`)
            indexCSS = fs.readFileSync(path.resolve(__dirname, `../src/components/footer/FooterLogo.css`))
            indexHTML = indexHTML.replace(`</head>`, `<style>${indexCSS}</style></head>`)
            indexCSS = fs.readFileSync(path.resolve(__dirname, `../src/components/footer/FooterContacts.css`))
            indexHTML = indexHTML.replace(`</head>`, `<style>${indexCSS}</style></head>`)
            indexCSS = fs.readFileSync(path.resolve(__dirname, `../src/components/footer/FooterInformation.css`))
            indexHTML = indexHTML.replace(`</head>`, `<style>${indexCSS}</style></head>`)
            indexCSS = fs.readFileSync(path.resolve(__dirname, `../src/components/footer/FooterSocialNetwork.css`))
            indexHTML = indexHTML.replace(`</head>`, `<style>${indexCSS}</style></head>`)

            indexCSS = fs.readFileSync(path.resolve(__dirname, `../src/components/search/Search.css`))
            indexHTML = indexHTML.replace(`</head>`, `<style>${indexCSS}</style></head>`)

            indexCSS = fs.readFileSync(path.resolve(__dirname, `../src/components/filter/noImages/NoImages.css`))
            indexHTML = indexHTML.replace(`</head>`, `<style>${indexCSS}</style></head>`)
            indexCSS = fs.readFileSync(path.resolve(__dirname, `../src/components/filter/mix/mix.css`))
            indexHTML = indexHTML.replace(`</head>`, `<style>${indexCSS}</style></head>`)
            indexCSS = fs.readFileSync(path.resolve(__dirname, `../src/components/filter/limit/Limit.css`))
            indexHTML = indexHTML.replace(`</head>`, `<style>${indexCSS}</style></head>`)
            indexCSS = fs.readFileSync(path.resolve(__dirname, `../src/components/filter/filters/FilterPrice.css`))
            indexHTML = indexHTML.replace(`</head>`, `<style>${indexCSS}</style></head>`)

            indexCSS = fs.readFileSync(path.resolve(__dirname, `../src/pages/main/MainPage.css`))
            indexHTML = indexHTML.replace(`</head>`, `<style>${indexCSS}</style></head>`)
            indexCSS = fs.readFileSync(path.resolve(__dirname, `../src/pages/main/ShopButton.css`))
            indexHTML = indexHTML.replace(`</head>`, `<style>${indexCSS}</style></head>`)
            indexCSS = fs.readFileSync(path.resolve(__dirname, `../src/pages/shop/ShopPage.css`))
            indexHTML = indexHTML.replace(`</head>`, `<style>${indexCSS}</style></head>`)
            indexCSS = fs.readFileSync(path.resolve(__dirname, `../src/pages/category/CategoryPage.css`))
            indexHTML = indexHTML.replace(`</head>`, `<style>${indexCSS}</style></head>`)

            indexCSS = fs.readFileSync(path.resolve(__dirname, `../src/pages/dealer/DealerPage.css`))
            indexHTML = indexHTML.replace(`</head>`, `<style>${indexCSS}</style></head>`)
            indexCSS = fs.readFileSync(path.resolve(__dirname, `../src/pages/catalogs/CatalogsPage.css`))
            indexHTML = indexHTML.replace(`</head>`, `<style>${indexCSS}</style></head>`)
            indexCSS = fs.readFileSync(path.resolve(__dirname, `../src/pages/support/SupportPage.css`))
            indexHTML = indexHTML.replace(`</head>`, `<style>${indexCSS}</style></head>`)

            indexCSS = fs.readFileSync(path.resolve(__dirname, `../src/pages/info/InfoPage.css`))
            indexHTML = indexHTML.replace(`</head>`, `<style>${indexCSS}</style></head>`)
            indexCSS = fs.readFileSync(path.resolve(__dirname, `../src/pages/info/Payment.css`))
            indexHTML = indexHTML.replace(`</head>`, `<style>${indexCSS}</style></head>`)
            indexCSS = fs.readFileSync(path.resolve(__dirname, `../src/pages/info/Specials.css`))
            indexHTML = indexHTML.replace(`</head>`, `<style>${indexCSS}</style></head>`)
            indexCSS = fs.readFileSync(path.resolve(__dirname, `../src/pages/info/news/NewsPage.css`))
            indexHTML = indexHTML.replace(`</head>`, `<style>${indexCSS}</style></head>`)
            indexCSS = fs.readFileSync(path.resolve(__dirname, `../src/pages/info/Delivery.css`))
            indexHTML = indexHTML.replace(`</head>`, `<style>${indexCSS}</style></head>`)
            indexCSS = fs.readFileSync(path.resolve(__dirname, `../src/pages/info/Contacts.css`))
            indexHTML = indexHTML.replace(`</head>`, `<style>${indexCSS}</style></head>`)
            indexCSS = fs.readFileSync(path.resolve(__dirname, `../src/pages/info/AboutUs.css`))
            indexHTML = indexHTML.replace(`</head>`, `<style>${indexCSS}</style></head>`)
            indexCSS = fs.readFileSync(path.resolve(__dirname, `../src/pages/info/ReturnsPolicy.css`))
            indexHTML = indexHTML.replace(`</head>`, `<style>${indexCSS}</style></head>`)
            indexCSS = fs.readFileSync(path.resolve(__dirname, `../src/pages/info/Warranty.css`))
            indexHTML = indexHTML.replace(`</head>`, `<style>${indexCSS}</style></head>`)
            indexCSS = fs.readFileSync(path.resolve(__dirname, `../src/pages/info/PrivacyPolicy.css`))
            indexHTML = indexHTML.replace(`</head>`, `<style>${indexCSS}</style></head>`)
            indexCSS = fs.readFileSync(path.resolve(__dirname, `../src/pages/info/TermsOfUse.css`))
            indexHTML = indexHTML.replace(`</head>`, `<style>${indexCSS}</style></head>`)
        // }
    }
    
    res.contentType( 'text/html' )

    // error
    if (req.url === "/error" || req.url === "/error/") {
        return res.status(404).sendFile(path.resolve(__dirname, `../${folder}/404.html`))
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

// run express server on PORT
app.listen(PORT, () => {
    console.log(`Express server started at http://localhost:${PORT}`)
})
