
const puppeteer = require('puppeteer')
const { info } = require('console')

const RENDER_CACHE = new Map()

async function ssr(url) 
{
    if (RENDER_CACHE.has(url) && process.env.NODE_APP_ENV == "production") {
        return {html: RENDER_CACHE.get(url), ttRenderMs: 0}
    }

    const start = Date.now()

    const browser = await puppeteer.launch({ headless: 'new' })

    const page = await browser.newPage()

    try {
        await page.goto(url, {waitUntil: 'networkidle0'})
        await page.waitForSelector('#wait')
    } catch (err) {
        console.error(err)
        if (process.env.NODE_APP_ENV == "production") 
            throw new Error('waitForSelector timed out.')
    }

    let html = await page.content() // сериализованный HTML-код страницы
    await browser.close()

    const ttRenderMs = Date.now() - start

    if (process.env.NODE_APP_ENV == "develop")
        info(`Headless rendered page in: ${ttRenderMs}ms`)

    RENDER_CACHE.set(url, html) // кеширование страницы

    return {html, ttRenderMs}
}

module.exports = ssr
