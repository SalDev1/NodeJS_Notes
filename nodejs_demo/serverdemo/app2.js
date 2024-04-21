const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');

// Connecting our MongoDB URI 
// Add your username + password + database you want to interact with.
const dbURI = "mongodb+srv://admin1234:admin1234@cluster0.fssuhi4.mongodb.net/node-tuts?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(dbURI)
   .then(() => {
        console.log('connected to db')
        app.listen(3000)
   })
   .catch((error) => console.log(error.message))

const app = express()
// Understanding Views Engine using the different file named app1.js

// register view engine. 
app.set('view engine','ejs')
// app.set('views','myviews')  
// Where you want to keep your views is defined in second parameter.
// app.listen(3000);

// Using the morgan middleware. 
app.use(morgan('dev'));  
// Runs the development log console which shows you the current logs / requests made to the server.

// Understanding middleware + static files.
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'))  // Setting up the static files.

// routes
app.get('/',(req,res) => {
   res.redirect('/blogs')
})

app.get('/about',(req,res) => {
    // res.send('<p>about page</p>')
    // res.sendFile('./views/about.html', {root : __dirname})
    res.render('about' , {
        title : 'About Page'
    });
})

// blog routes

// Start using the blogRoutes , only if url starts from /blogs.
app.use(blogRoutes);

// 404 page
// This is an example of middleware in execution.
app.use((req,res)=> {
   // res.status(400).sendFile('./views/404.html',{root : __dirname})
   res.status(400).render('404' , {
    title : "Not Found Page"
   })
})
