
// require('dotenv').config()
// const express = require('express')
const path = require('path')
const fs = require('fs')
// const favicon = require('serve-favicon')
// const React = require('react')
const { renderToString } = require('react-dom/server')

// let folder = "build"
const connection = require(`../${folder}/utils/db`)
const routes = require(`../${folder}/utils/routes`)


module.exports = function(app) {
    
app.get('*', async (req, res) =>  {  

    let appHTML = renderToString(<div>hjhgjhgj</div>)

    let indexHTML = fs.readFileSync(path.join(__dirname, '..', folder, '/index.html'), { encoding: 'utf8' })
    indexHTML = indexHTML.replace('<div id="root"></div>', `<div id="app">${ appHTML }</div>`)
    indexHTML = indexHTML.replace(/(%PUBLIC_URL%)/g, ``)

    // const index = res.status(200).sendFile(path.join(__dirname, '..', folder, '/index.html'))    
    const index = res.status(200).send(indexHTML)

    const error = res.status(404).sendFile(path.join(__dirname, '..', folder, '/404.html'))

    // error
    if (req.url === "/error" || req.url === "/error/") {
        // return res.status(404).sendFile(path.join(__dirname, '..', '/404.html'))
        return error
    }


    // auth, public и роуты брендов
    await new Promise((resolve, reject) => {
        for (let i = 0; i < routes.length; i++) {
            if (req.url.split('?')[0] === routes[i].path) {
                // return res.send('send routes')
                // return res.status(200).sendFile(path.join(__dirname, '..', '/index.html'))
                return index
            }
        }
        resolve("успех")
    })


    // роут категорий - /nazvanie-kategorii
    try {
        let [ response ] = await connection.promise().query("SELECT * FROM categories")
        if (response) {
            await new Promise((resolve, reject) => {                
                for (let i = 0; i < response.length; i++) {
                    if (req.url === "/"+response[i].url || req.url === "/"+response[i].url+"/") {
                        // return res.send('send категория')
                        // return res.status(200).sendFile(path.join(__dirname, '..', '/index.html'))
                        return index
                    }
                }     
                resolve("успех")
            })
        }
    }catch(e) {
        console.log(e)
        // return res.send('send catch') 
        // return res.status(200).sendFile(path.join(__dirname, '..', '/index.html'))
        return index
    }


    // роуты товаров, начинаются с имени бренда - /nazvanie-brenda/nazvanie-tovara
    if (req.url.includes("redverg") || req.url.includes("concorde") || req.url.includes("kvalitet")) {
        // return res.send('send продукт3')
        // return res.status(200).sendFile(path.join(__dirname, '..', '/index.html'))
        return index
    }
    if (req.url.includes("esab") || req.url.includes("aeg") || req.url.includes("leon")) {
        if (req.url.split("/")[2] === undefined) {
            // return res.send('send 404')
            // return res.status(404).sendFile(path.join(__dirname, '..', '/404.html'))
            return error
        }else {
            // return res.send('send index')
            // return res.status(200).sendFile(path.join(__dirname, '..', '/index.html'))
            return index
        }
    }
    try {
        let [ response ] = await connection.promise().query("SELECT * FROM brands")
        if (response) {
            await new Promise((resolve, reject) => {                
                for (let i = 0; i < response.length; i++) {
                    if (req.url.includes(response[i].name.toLowerCase())) {
                        // return res.send('send продукт')
                        // return res.status(200).sendFile(path.join(__dirname, '..', '/index.html'))
                        return index
                    }
                }         
                resolve("успех")
            })
        }
    }catch(e) {
        console.log(e)
        // return res.send('send catch2') 
        // return res.status(200).sendFile(path.join(__dirname, '..', '/index.html'))
        return index
    }
    

    // return res.send('send фига')
    // return res.status(404).sendFile(path.join(__dirname, '..', '/404.html'))
    return error
})

}
