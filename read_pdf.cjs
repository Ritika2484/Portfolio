const fs = require('fs');
const pdf = require('pdf-parse');

let dataBuffer = fs.readFileSync('jerryKaCV2.pdf');
pdf(dataBuffer).then(function(data) {
    console.log("PDF_TEXT_START");
    console.log(data.text);
    console.log("PDF_TEXT_END");
}).catch(console.error);
