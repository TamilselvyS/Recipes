const http = require('http');
const url = require('url');
 //creating a server
 const server = http.createServer ((req, res)=>{
    const pathName = req.url;
    if(pathName === '/' || pathName === '/home'){
        res.end("This is home!");
    }else if(pathName === '/recipe'){
        res.end("This is recipe!");
 }
 else{
    res.writeHead(404, {
        'Content-type' : 'text/html',
        'Own-header' : 'Hello'
    });
    res.end('<h1>Page Not Found!!</h1>');
}

});
 //starting the server
 server.listen(8000, '127.0.0.1', ()=>{
     console.log('Listing to request on port 8000');
 });