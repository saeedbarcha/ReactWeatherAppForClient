const express = require('express')
const {spawn} = require('child_process');
const app = express();
const http = require('http');
const https = require('https');
const fs=require('fs');
const port = 3001
var cors = require('cors');
const { response } = require('express');
const privateKey = fs.readFileSync('./cetificate/privkey.pem', 'utf8');
const certificate = fs.readFileSync('./cetificate/cert.pem', 'utf8');
const ca = fs.readFileSync('./cetificate/chain.pem', 'utf8');

const credentials = {
	key: privateKey,
	cert: certificate,
	ca: ca
};
app.use(cors());
app.get('/',(req,res)=>{
    console.log("test");
    res.status(200).json('test');
})
app.post('/data/:city', (req, res) => {
 
 var dataToSend;
 console.log(req.params.city)
 // spawn new child process to call the python script
 const python = spawn('python3', ['main.py',req.params.city]);
 // collect data from script
 python.stdout.on('data', function (data) {
  console.log('Pipe data from python script ...');
  dataToSend = data.toString();
 });
 // in close event we are sure that stream from child process is closed
 python.on('close', (code) => {
 console.log(`child process close all stdio with code ${code}`);
 // send data to browser
 console.log(dataToSend);
 res.status(200).json(dataToSend);
 });
 
})
// app.listen(port, () => console.log(`Example app listening on port 
// ${port}!`))

const httpServer = http.createServer(app);
// httpServer.listen(3001, () => {
// 	console.log('HTTP Server running on port 80');
// });
const httpsServer = https.createServer(credentials,app);
httpsServer.listen(3001, () => {
	console.log('HTTP Server running on port 80');
});

