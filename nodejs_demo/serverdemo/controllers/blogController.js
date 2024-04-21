const Blog = require('../models/blog');

const getBlogs = (req,res) => {
    // sort() --> Sort all the blogs in the descending order 
    // (from newest to the oldest blog).
    Blog.find().sort({createdAt : -1})
       .then((result) => {
          res.render('index',{
            title:'All Blogs', 
            blogs: result
          })
       })
       .catch((err) => {
          console.log(err);
       })
}

const createBlog = (req,res) => {
    /*
      Whenever we are using the post method , always defined 
      this middleware 
      app.use(express.urlencoded({extended: true}));
    */
    console.log(req.body);
    const blog = new Blog(req.body);

    blog.save()
       .then((result) => {
           res.redirect('/blogs'); 
        }).catch((err) => {
            console.log(err)
        })
}

const redirectBlog = (req,res) => {
    res.render('create' , {
        title : 'Create Page'
    })
}

const getBlogById = (req,res) => {
    const id = req.params.id;
    Blog.findById(id)
      .then(result => {
        res.render('details', { blog : result, title : 'Blog Details'})
      }).catch(err => {
        console.log(err);
      })
}

const deleteBlogById = (req,res)=> {
    const id = req.params.id;
    // In delete method , we can't perform the redirect property.
    Blog.findByIdAndDelete(id)
    .then(result => {
        res.json({redirect : "/blogs"});
    }).catch(err => {
        console.log(err);
    })
}


module.exports = {
    getBlogs,
    createBlog,
    redirectBlog,
    getBlogById,
    deleteBlogById
}