const fs = require('fs');

// Types of Streams :-
/*
  1) Read Stream.
  2) Write Stream.
*/

// ReadStream
// This help us create a Read Stream + pass in the file path signifies from where you 
//  are reading the data.

// Defining the utf-8 encoding will translate the buffer (stream of data) into plain txt.
const readStream = fs.createReadStream('./docs/blog3.txt' , {encoding : 'utf8'});
/*
   readStream --> it is an instance of event emitters.
   Currently , we are listing / subscribe to the data event.

   This is where we get the chunk of data that we can use from 
   the stream. Every time we get a new chunk of data , this on method is been invoked + 
   we can read that chunk of data.
*/
readStream.on('data',(chunk)=>{
    console.log('------- NEW CHUNK -------')
    console.log(chunk)
});

// WriteStream
// Even if the blog4.txt doesn't exists, it creates one for you.
const writeStream = fs.createWriteStream('./docs/blog4.txt');

readStream.on('data',(chunk) => {
    console.log('----- NEW CHUNK ------');
    console.log(chunk);
    /*
      Every time we are getting a new piece of data from the readStream
      we are going to write NEW CHINK + we are also going to paste the 
      plain text chunk in the blog4.txt
    */
    writeStream.write('\nNEW CHUNK\n')
    writeStream.write(chunk);
})

// pipeing.
/*
    Pipeing is where we take the readStream that reads the data  
    and I want you to pipe whatever you read from the read stream into the writestream.

    Everytime we get the chunk of data from the readStream , we are piping 
    it to the writeStream.
*/
readStream.pipe(writeStream);