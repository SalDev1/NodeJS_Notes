const http = require('http')
const fs = require('fs')

// HTTP module helps you to build a real-time server and listening for the client-requests.
/*
   http.createServer() --> It helps us create a server for us.

   We will have a callback with the two important parameters. 

   req --> Client Request --> It contains a load of information that comes along with the client request  + It is of type 
   ClientRequest.
   res --> Client Response --> It helps to set a relevant response based on the client request + It is of type 
   ClientResponse.
*/
// This will store the instance of the server in the const server variable.
const server = http.createServer((req,res) => {
    // For Now , we are going to log the message to the console , whenever a request comes in.
    console.log('request made');

    // Understanding the req object.
    console.log(req.url , req.method);   // This returns you the current URL + method you are currently at.

    // set header content type.
    // res.setHeader('Content-Type','text/plain')

    // If we want to send the HTML Document as a response.
    res.setHeader('Content-Type','text/html')

    // The way we send back the data to the browser is using the write method of res 
    // + end method to commit the changes.
    // res.write('<h1>Hello, Coders</h1>');
    // res.write('<p>Hi, its me Salman</p>')
    // res.end() 

    // Let's understand another way of sending HTML file as the response + using the fs module.
    fs.readFile('./views/index.html' , (err , data) => {
        if(err) {
            console.log(err)
            res.end()
        } else {
            res.write(data);
            res.end();

            // You can also send your HTML page directly into your end() method.
            // res.end(data);
        }
    })
});

// We have to invoke the listen method to it by assigning a port number to it + explicting defining the localhost + 
// callback function to invoke when we go into the defined localhost

// Everytime we make a small change to the function , we have to restart the server.
server.listen(3000,'localhost', () => {
    console.log('Server has started on port')
})