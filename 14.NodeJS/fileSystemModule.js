const fs = require('fs');

// fs.readFile('./NodeJS/file.txt', 'utf8', (err, data)=>{
//     console.log(err, data);
// })

const a = fs.readFileSync('./file.txt'); 
//Unlike readFile, readFileSync blocks the upcomming code to run untill it completes its code. Whenever we want nodeJS to block we use readFileSync
console.log(a);
console.log(a.toString());

fs.writeFile('./file.txt', "This is a data2", ()=>{
    console.log("This is a modified file.");
})      //non_blocking IO model

console.log("Finished reading file.");   //Yeh terminal me upar wale se phle print hoga this is because readfile function jab call hoga toh baki toh chalega lekin callback function pe bolega jb tk file ready nhi hoti tb tk agge ka code run kro yhi toh hai multithread
// It works on non-blocking IO model.