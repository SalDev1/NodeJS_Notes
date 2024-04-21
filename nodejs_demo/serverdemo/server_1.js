const http = require('http')
const fs = require('fs')

/*
  We are trying to understand a bit of basic routing over here.
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
            break;
        case '/about':
            path += '/about.html';
            break
        default:
            path += '/404.html';
            break;
        
    }

    fs.readFile(path, (err , data) => {
        if(err) {
            console.log(err)
            res.end()
        } else {
            res.write(data);
            res.end();
            // res.end(data);
        }
    })
});


server.listen(3001,'localhost', () => {
    console.log('Server has started on port')
})