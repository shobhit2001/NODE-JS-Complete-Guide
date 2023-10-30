// const http = require('http');

// const server = http.createServer((req, res) => {
//     console.log(req.url, req.method, req.headers);
//     res.setHeader('content-type', 'text/html');
//     res.write('<html>');
//     res.write('<head><title>My First Page</text></html>');
//     res.write('<body><h1>Hello</h1></body>');
//     res.write('</html>');
// });

// server.listen(3000);



const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
  // Parse the request URL
  const parsedUrl = url.parse(req.url, true);

  // Set the response headers
  res.setHeader('Content-Type', 'text/plain');
  res.statusCode = 200;

  // Determine the response based on the URL
  if (parsedUrl.pathname === '/home') {
    res.end('Welcome home');
  } else if (parsedUrl.pathname === '/about') {
    res.end('Welcome to About Us page');
  } else if (parsedUrl.pathname === '/node') {
    res.end('Welcome to my Node Js project');
  } else {
    // Handle other URLs with a generic response
    res.end('Welcome to my Node Js project'); // You can change this message if needed
  }
});

const port = 4000;

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
