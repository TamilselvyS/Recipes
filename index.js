const http = require('http');
const fs = require('fs');
const url = require('url');


//Json file
const data = fs.readFileSync(`${__dirname}/recipes.json`, 'utf-8');
const dataObject = JSON.parse(data);

//creating a server
const server = http.createServer((req, res) => {
    const pathName = req.url;
    if (pathName === '/' || pathName === '/home') {
        res.end("This is home!");
    } else if (pathName === '/recipe') {
        res.end("This is recipe!");
    }
    else if (pathName === '/api') {
        res.writeHead(200, { 'Content-type': 'application/json' });
        res.end(data);
    }
    else {
        res.writeHead(404, {
            'Content-type': 'text/html',
            'Own-header': 'Hello'
        });
        res.end('<h1>Page Not Found!!</h1>');
    }

});
//starting the server
server.listen(8000, '127.0.0.1', () => {
    console.log('Listing to request on port 8000');
});