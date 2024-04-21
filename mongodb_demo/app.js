const express = require('express');
const {connectDB , getConnectDB2 , connectDB2} = require('./db');

// init app & middleware. 
const app = express();
app.use(express.json()) // This middlware allows you to use the json client request 
// to be use over i.e body-parser.
connectDB();
// use() --> a method allows you to integrate middleware. 


// Invoking the second way of connecting DB.

/*
  The function is going to connect to the database for us
  and it also expects us to pass in a callback function and 
  that will be fire.

  1) After the connection is successful + the argument will be null since 
  it is a success.
  OR
  2) If there is an error.
*/

// let db;
// connectDB2((err) => {
//     if(!err) {
//         app.listen(3000, () => {
//             console.log('app listening on port 3000')
//         })
//         // This will return us the database object + This is the object we 
//         // are going to use when interacting with the database.
//         db = getDb();
//         console.log(db);
//     }
// })

app.get('/' , (req,res) => {
    res.json("Hello World");
})

app.listen(3000 , () => {
    console.log("Server listening to the port 3000");
})

// routes 

// This example is for the understanding purposes.

// AN GET REQUEST.
app.get("/books" , (req,res) => {
    let books = []
    res.json({msg : "Welcome to the Books API"});
    /*
      Understanding the cursor.
      find() --> This is the method where it doesn't the documents , but it returns what it is known
      as a cursor.

      Cursor is an object that essentially points to a set of documents outlined by our query 
      so without any arguments inside this find method , it's going to point to the whole
      collection of documents. 

      If we add a filter as a argument , it's going to then point to a subset of documents
      based on that filter and the cursor object it returns from the find method exposes
      methods to fetch the data the cursor points to. 

      MongoDB fetches the documents in batches. 

      find() + sort() methods are all cursors in natures.
    */
    db.collection('authors').find().sort({author : 1});

    db.collection('books')
    .find()
    .sort({ author : 1})
    .forEach(book => books.push(book))
    .then(() => {
        res.status(200).json(books);
    })
    .catch(() => {
        res.status(500).json({error : 'Could not fetch the documents'})
    })
})

// Showing a book by a specific id.
app.get('/books/:id' , (req,res) => {
    if(ObjectId.isValid(req.params.id)) {
        db.collections('books')
            .findOne({_id : ObjectId(req.params.id)})
            .then((doc) => {
                res.status(200).json(doc)
            }).catch(err => {
                res.status(500).json({error : 'Could not fetch the document'})
            })
    } else {
        res.status(500).json({error : 'Connected in USA'})
    }
})

// Inserting a new books by getting the info from the request.
app.post('/books', (req,res) => {
    const book = req.body;

    db.collection('books')
       .insertOne(book)
       .then(result => {
          res.status(201).json(result)
       }).catch(err => {
          res.status(500).json({err : "Couldn't add the books document"});
       })
})

// Setting a delete method. 
app.post('/books/:id', (req,res) => {
    if(Object.isValid(req.params.id)) {
        db.collection('books')
        .deleteOne({_id: ObjectId(req.params.id)})
        .then(result => {
           res.status(201).json(result)
        }).catch(err => {
           res.status(500).json({err : "Couldn't add the books document"});
        })
    } else {
        res.status(500).json({error : 'Not a valid doc id'})
    }
})

// Setting up a PATCH Method. 
app.post('/books/:id', (req,res) => {
    const updates = req.body;

    if(Object.isValid(req.params.id)) {
        db.collection('books')
        .updates({_id: ObjectId(req.params.id)} , {$set:updates})
        .then(result => {
           res.status(201).json(result)
        }).catch(err => {
           res.status(500).json({err : "Could not update the document"});
        })
    } else {
        res.status(500).json({error : 'Not a valid doc id'})
    }
})
