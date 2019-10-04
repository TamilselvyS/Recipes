const http = require('http');

 //creating a server
 const server = http.createServer ((req, res)=>{
    console.log(req);
    res.end("Hello from the server!");
 });
 //starting the server
 server.listen(8000, '127.0.0.1', ()=>{
     console.log('Listing to request on port 8000');
 });