const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose');
const Blog = require('./models/blog');
const blog = require('./models/blog');

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
app.use(express.static('public'))  // Setting up the static files.
/*
  Whatever you declare inside of the public folder , will be made available to the 
  as a static file to the frontend.
*/

// Understanding some middleware examples. 
// app.use((req,res,next) => {
//     console.log('new request made : ');
//     console.log('host: ', req.hostname);
//     console.log('path: ', req.path);
//     console.log('method: ', req.method)

//     // Write now the nodejs doesn't know what to execute next + browser hangs for a long time 
//     // and this is where we use the next() method.

//     /*
//       next() --> It tells the express that we are done with our work + its time 
//       to move on.
//     */
//     next();
// })

// mongoose and mongo sandbox routes. 

// Add a New Unique Blog.
app.get('/add-blog', (req,res) => {
    // Creating an instance of the Blog Model
    const blog = new Blog({
        title:'new blog 2',
        snippet:'about my new blog',
        body:'more about my new blog'
    });

    blog.save().then((result) => {
        res.send(result)
    }).catch((err) => {
        console.log(err);
    })
})

// Retrieve all the blogs.
app.get('/all-blogs',(req,res) => {
    Blog.find()
    .then((result) => {
        res.send(result)
    }).catch((err) => {
        console.log(err);
    })
})

// Retrieve a blog based on the Blog Id.
// Remember these are all asynchronous in nature.
app.get('/single-blog', (req,res) => {
    Blog.findById('661bdd855eac2f4060156e56')
    .then((result) => {
        res.send(result)
    }).catch((err) => {
        console.log(err);
    })
})

app.get('/',(req,res) => {
    /*
      render() --> It takes the view , render it and send it 
      back to the browser and pass in the view file without the extension.

      If we want to show some dynamic data into the index.ejs view template , 
      we pass the information to the 
    */
   // Passing the blogs as dynamic content to the index.ejs page.

   const blogs = [
      {title:'Yoshi finds eggs', snippet:'Lorem ipsum dolor sit amet, consectetur adipiscing elit'},
      {title:'Yoshi finds stars', snippet:'Lorem ipsum dolor sit amet, consectetur adipiscing elit'},
      {title:'How to defeat bowser', snippet:'Lorem ipsum dolor sit amet, consectetur adipiscing elit'}
   ];

    res.render('index',{
        title: 'Home Page',
        blogs
    });
   // res.sendFile('./views/index.html', {root : __dirname })
})

// 2nd example of middleware.
// app.use((req,res,next) => {
//     console.log('in the next middleware')
//     next();
// })



app.get('/about',(req,res) => {
    // res.send('<p>about page</p>')
    //res.sendFile('./views/about.html', {root : __dirname})

    res.render('about' , {
        title : 'About Page'
    });
})

app.get('/blogs/create',(req,res) => {
    res.render('create' , {
        title : 'Create Page'
    })
})


// 404 page
// This is an example of middleware in execution.
app.use((req,res)=> {
   // res.status(400).sendFile('./views/404.html',{root : __dirname})
   res.status(400).render('404' , {
    title : "Not Found Page"
   })
})
