// Importing the fs module to play around with the file system.
const fs = require('fs')

// reading files 
/* readFile --> Two Parameters -->
  String (Relative File Path) + Callback function (err , data) 

  It is a non-blocking operation + and it reads the content of the 
  selected file in the asynchoronous manner.
*/

fs.readFile('./docs/blog1.txt', (err, data) => {
    if(err) {
        console.log(err);
    }
    // When we try to read a file , we get a buffer --> it is stream of data.

    /*
      Buffer is something a stream / package of data sent to us when 
      we read the file now.
      
      To Convert the Buffer Data into the string format , we use the toString method.
    */
    console.log(data.toString());
})
console.log('last line')


// writing files 
// This allow to modify / update the content defined the blog1.txt file permanently.
fs.writeFile('./docs/blog1.txt','hello,salman',() => {
    console.log('file1 was written');
})

/*
   What if the defined file doesn't exits , 
   So it will create a new file and add the content that we have 
   describe in the arrow function. 
*/
fs.writeFile('./docs/blog2.txt','hello,again',() => {
    console.log('file2 was written');
})

// directory files
// fs.mkdir is an asychornous function and it creates a folder for you.
/*
  If the folder already exists , it is good idea to check if the folder 
  exists or not + putting a condition to it.
*/
if(!fs.existsSync("./assets")) {
    fs.mkdir('./assets', (err) => {
        if(err) {
            console.log(err);
        }
        console.log('folder created');
    })    
} else {
    /*
      This is an asychoronous operation + it removes the specified 
      directory if it exists. 
    */
    fs.rmdir('./assets',(err) => {
        if(err) {
            console.log(err)
        }
        console.log('folder deleted');
    })
}

// deleting files
/*
  Before deleting the files , I want to make sure that 
  the file already exists.

  We are checking if the deleteme.txt file exists or not.
*/

if(fs.existsSync('./docs/deleteme.txt')) {
   // This is a method that allows you to delete the files from 
   // the selected file path.
   fs.unlink("./docs/deleteme.txt", (err) => {
       if(err) {
         console.log(err)
       }
       console.log('file deleted')
   })
}