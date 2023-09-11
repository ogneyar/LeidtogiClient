
require('dotenv').config()
const express = require('express')
const path = require('path')
const favicon = require('serve-favicon')

const connection = require('./utils/db')
const routes = require('./utils/routes')
  

const PORT = process.env.PORT || 3000

const app = express()

app.use(express.static(path.resolve(__dirname)))
app.use(favicon(path.join(__dirname,'favicon.ico')))



app.get('*', async (req, res) =>  {  

    // error
    if (req.url === "/error" || req.url === "/error/") {
        return res.status(404).sendFile(__dirname + '/404.html')
    }


    // auth, public и роуты брендов
    await new Promise((resolve, reject) => {
        for (let i = 0; i < routes.length; i++) {
            if (req.url.split('?')[0] === routes[i].path) {
                // return res.send('send routes')
                return res.sendFile(__dirname + '/index.html')
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
                        return res.sendFile(__dirname + '/index.html')
                    }
                }     
                resolve("успех")
            })
        }
    }catch(e) {
        console.log(e)
        // return res.send('send catch') 
        return res.sendFile(__dirname + '/index.html')
    }


    // роуты товаров, начинаются с имени бренда - /nazvanie-brenda/nazvanie-tovara
    if (req.url.includes("redverg") || req.url.includes("concorde") || req.url.includes("kvalitet")) {
        // return res.send('send продукт3')
        return res.sendFile(__dirname + '/index.html')
    }
    if (req.url.includes("esab") || req.url.includes("aeg") || req.url.includes("leon")) {
        if (req.url.split("/")[2] === undefined) {
            // return res.send('send 404')
            return res.status(404).sendFile(__dirname + '/404.html')
        }else {
            // return res.send('send index')
            return res.sendFile(__dirname + '/index.html')
        }
    }
    try {
        let [ response ] = await connection.promise().query("SELECT * FROM brands")
        if (response) {
            await new Promise((resolve, reject) => {                
                for (let i = 0; i < response.length; i++) {
                    if (req.url.includes(response[i].name.toLowerCase())) {
                        // return res.send('send продукт')
                        return res.sendFile(__dirname + '/index.html')
                    }
                }         
                resolve("успех")
            })
        }
    }catch(e) {
        console.log(e)
        // return res.send('send catch2') 
        return res.sendFile(__dirname + '/index.html')
    }
    

    // return res.send('send фига')
    return res.status(404).sendFile(__dirname + '/404.html')
})


// app.get('/error', (req, res) => res.status(404).sendFile(__dirname + '/404.html'))
// app.get('*', (req, res) => res.sendFile(__dirname + '/index.html'))

app.listen(PORT, () => console.log(`Starting server. http://localhost:${PORT}`))
