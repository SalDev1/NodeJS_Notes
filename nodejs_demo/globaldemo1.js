// Global Object.

/*
  This is more of a window objet when we work 
  with Javascript inside the browser.
  
  In Node js , our global object is not window but global.
  And it represents the global context in a node environment 
*/
// console.log(global);

// global.setTimeout(() => {
//     console.log('in the timeout');
//     clearInterval(int)  // It stops the function after 3 seconds.
// },3000) 

// // setInterval --> this runs the function after every 1 second.
// const int = setInterval(() => {
//     console.log('in the interval');
// },1000);

console.log(__dirname);
console.log(__filename)