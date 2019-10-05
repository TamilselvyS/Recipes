const http = require('http');
const fs = require('fs');
const url = require('url');

const replaceTemplate = (temp, recipe) => {
    let output = temp.replace(/{%RECIPENAME%}/g, recipe.name);
    output = output.replace(/{%IMAGE%}/g, recipe.image);  
    // output = output.replace(/{%AMOUNT%}/g, recipe.ingredient.amount);    
    // output = output.replace(/{%RECIPEINGREDIENT%}/g, recipe.ingredient.name);    
    output = output.replace(/{%DESCRIPTION%}/g, recipe.description);    
    output = output.replace(/{%STEPS%}/g, recipe.step);    
    output = output.replace(/{%NOTE%}/g, recipe.notes);    
    output = output.replace(/{%TAG%}/g, recipe.tag);    
    return output;
}

//Templates
const templateHome = fs.readFileSync(`${__dirname}/templates/home.html`, 'utf-8');
const templateDetails = fs.readFileSync(`${__dirname}/templates/details.html`, 'utf-8');
const templateCard = fs.readFileSync(`${__dirname}/templates/card.html`, 'utf-8');

//Json file
const data = fs.readFileSync(`${__dirname}/data/recipes.json`, 'utf-8');
const dataObject = JSON.parse(data);
console.log(dataObject)

//creating a server
const server = http.createServer((req, res) => {
    const pathName = req.url;
    //Home
    if (pathName === '/' || pathName === '/home') {
        res.writeHead(200, { 'Content-type': 'text/html' });

        const cardsHtml = dataObject.map(el => replaceTemplate(templateCard, el)).join('');
        const output = templateHome.replace('{%RECIPES_CARDS%}', cardsHtml);

        res.end(output);
    //Recipe-details
    } else if (pathName === '/recipe') {
        res.end("This is recipe!");
    }
    //API
    else if (pathName === '/api') {
        res.writeHead(200, { 'Content-type': 'application/json' });
        res.end(data);
    }
    //Not found
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