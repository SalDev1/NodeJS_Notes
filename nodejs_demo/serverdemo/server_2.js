const http = require('http')
const fs = require('fs')

/*
  Understanding status code over here 
  + 
  How to redirect the users if they went to 
  the wrong page.
*/
const server = http.createServer((req,res) => {
    console.log('request made');
    console.log(req.url , req.method);

    // Understanding the basic routing over here.
    // We need to figure out the path the user visits + defining a switch case over here.
    res.setHeader('Content-Type','text/html')

    let path = './views'
    switch(req.url) {
        case '/':
            path += '/index.html';
            res.statusCode = 200;
            break;
        case '/about':
            path += '/about.html';
            res.statusCode = 200;
            break
        
        case '/about-me':
            res.statusCode = 301;
            res.setHeader('Location','/about');
            res.end()
            break;
        
        default:
            path += '/404.html';
            res.statusCode = 404;
            break;   
    }

    fs.readFile(path, (err , data) => {
        if(err) {
            console.log(err)
            res.end()
        } else {
            res.write(data);
            res.statusCode = 200
            res.end();
            // res.end(data);
        }
    })
});


server.listen(3001,'localhost', () => {
    console.log('Server has started on port')
})