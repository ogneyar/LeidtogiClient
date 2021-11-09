var express = require('express');
var	port = 80;

const app = express()

app.get('*', (req, res) => res.sendFile(__dirname + '/index.html'))
	
app.listen(port, () => console.log(`Starting server. http://localhost:${ port }`))