
// require('dotenv').config()
const express = require('express')
const path = require('path')
const favicon = require('serve-favicon')

const connection = require('./db')
  
const port = 3000
// const PORT = process.env.PORT || 3000

const app = express()

app.use(express.static(path.resolve(__dirname)))
app.use(favicon(path.join(__dirname,'favicon.ico')))

connection.query("SELECT * FROM users WHERE id=1",
    function(err, results, fields) {
        if (err) console.log(err)
        if (results) {
            // console.log(results) // собственно данные
            if (false) {
                app.get('*', (req, res) => res.sendFile(__dirname + '/index.html'))
                connection.end()
            }else {
                
                // connection.query("SELECT * FROM users WHERE id=1",
                //     function(err, results, fields) {
                //         if (results) {
                //             app.get('*', (req, res) => res.status(404).sendFile(__dirname + '/404.html'))
                //             connection.end()
                //         }
                //     }
                // )

                // app.get('*', (req, res) => res.status(404).sendFile(__dirname + '/404.html'))
            }
        }
        // console.log(fields) // мета-данные полей 
    }
)

app.get('/error', (req, res) => res.status(404).sendFile(__dirname + '/404.html'))
app.get('*', (req, res) => res.sendFile(__dirname + '/index.html'))

app.listen(port, () => console.log(`Starting server. http://localhost:${port}`))
