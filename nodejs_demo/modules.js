// This helps you to import the people file into the modules file.

const { peopleArr , ages } = require("./people");
const xyz = require('./people')

/*
  Just because you import a file , you don't get access the specific methods
  and variables defined with the imported file. 

  The only way to access those specific methods is inside the file.

  But if we want to access them , we have to manually export them + 
  use the syntax module.exports
*/
// console.log(xyz);
// console.log(xyz:people, xyz.ages)

console.log(peopleArr);
console.log(ages)

// Understanding some of the core / built-in modules.
const os = require('os');
// Provides you information about current operating system. 
console.log(os);
// Provides you information about current operating system platform + homedir. 
console.log(os.platform(),os.homedir())