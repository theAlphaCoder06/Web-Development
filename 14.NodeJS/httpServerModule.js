const http = require('http');
const fs = require('fs');

const port = process.env.PORT || 3000;

const server = http.createServer((req, res)=>{
    console.log(req.url);
    res.setHeader('Content-Type', 'text/html');
    if(req.url == '/home'){
        res.statusCode = 200;
        res.end('<h1>This is Shubham Singh</h1> <p>This is my server</p>');
    }
    else if(req.url == '/about'){
        res.statusCode = 200;
        res.end('<h1>This is Sunny Singh</h1> <p>This is my server</p>');
    }
    else if(req.url == '/hello'){
        res.statusCode = 200;
        const data = fs.readFileSync('index.html');
        res.end(data.toString());
    }
    else if(req.url == '/abcd'){
        res.statusCode = 200;
        res.end('<h1>This is Shubh Singh</h1> <p>This is my server</p>');
    }
    else{
        // res.shubham();  using node instead of nodemon doesn't require to restart the server after bug fixes.
        res.statusCode = 404;
        res.end('The page is not found on the server');
    }
});

server.listen(port, ()=>{
    console.log(`Server is listening on port ${port}`);
});



// Kitna hi if else statement use kr lenge bahut sare links ko add krna hota hai to make a website this is the reason why we use express