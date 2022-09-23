const path = require('node:path');

const a1 = path.basename('C:\\temp\\myfile.html');
const a2 = path.dirname('C:\\temp\\myfile.html');
const a3 = path.extname(__filename);
console.log(a1, a2, a3);
