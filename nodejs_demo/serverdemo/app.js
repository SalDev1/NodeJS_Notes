const express = require('express')

// Initialize the express app. 

const app = express()

// register view engine. 
app.set('view engine','ejs')
//app.set('views','myviews')  // Where you want to keep your views is defined in second parameter.

// listen for requests.

// This returns the instance of the server.
app.listen(3000);

app.get('/',(req,res) => {
    // If you want to send the response back based on the client request. 

    // res.end('<p>Home Page</p>')
    // res.json("Hello World");
    
    // If we want to directly send the HTML page as the response back to the client.

    /*
      The Problem with this is that it going to look for an absolute path , so
      we defined the options method over here 

      We have to tell the express where is it relative from.
      root --> It signifies what is the file path relative to.
    */
    res.sendFile('./views/index.html', {root : __dirname })
})

app.get('/about',(req,res) => {
    // res.send('<p>about page</p>')
    res.sendFile('./views/about.html', {root : __dirname})
})

// redirects
app.get('/about-us' , (req,res) => {
    res.redirect('/about')
})

// 404 page

/*
   use() --> It is used to create middleware and fire middleware function in Express.
   This function will be invoked whenever this is a mismatch between the
   routes that we have defined.

   Positioning of defining routes also plays an important role.
*/
app.use((req,res)=> {
    res.status(400).sendFile('./views/404.html',{root : __dirname})
})