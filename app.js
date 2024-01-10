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



// const http = require('http');
// const url = require('url');

// const server = http.createServer((req, res) => {
//   // Parse the request URL
//   const parsedUrl = url.parse(req.url, true);

//   // Set the response headers
//   res.setHeader('Content-Type', 'text/plain');
//   res.statusCode = 200;

//   // Determine the response based on the URL
//   if (parsedUrl.pathname === '/home') {
//     res.end('Welcome home');
//   } else if (parsedUrl.pathname === '/about') {
//     res.end('Welcome to About Us page');
//   } else if (parsedUrl.pathname === '/node') {
//     res.end('Welcome to my Node Js project');
//   } else {
//     // Handle other URLs with a generic response
//     res.end('Welcome to my Node Js project'); // You can change this message if needed
//   }
// });

// const port = 4000;

// server.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });




// const http = require('http');

// const server = http.createServer((req, res) => {
//   const url = req.url;
//   if(url === '/') {
//     res.write('<html>');
//     res.write('<head><title>Enter Message</title></head>');
//     res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></input></form></body>');
//     res.write('<html>');
//     res.end();
//     return res.end();
//   }
//   res.setHeader('Content-type', 'text/html');
//   res.write('<html>');
//   res.write('<head><title>My first Page</title></head>');
//   res.write('<body><h1>Hello from my Node.js Server!</h1></body>');
//   res.write('</html>')
//   res.end();
// });

// server.listen(4000);





const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === '/') {
    res.write('<html>');
    res.write('<head><title>Messages</title></head>');
    res.write('<body>');

    // Read messages from the file and display them
    fs.readFile('message.txt', 'utf8', (err, data) => {
      if (!err) {
        const messages = data.split('\n').filter(msg => msg.trim() !== '');
        res.write('<ul>');
        messages.forEach(msg => {
          res.write(`<li>${msg}</li>`);
        });
        res.write('</ul>');
      }

      res.write('<form action="/message" method="POST">');
      res.write('<input type="text" name="message"><button type="submit">Send</button>');
      res.write('</form>');
      res.write('</body></html>');
      return res.end();
    });
  }

  if (url === '/message' && method === 'POST') {
    const body = [];
    req.on('data', chunk => {
      body.push(chunk);
    });
    return req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split('=')[1];

      // Read existing messages, add the new message, and write back to the file
      fs.readFile('message.txt', 'utf8', (err, data) => {
        const messages = data.split('\n');
        messages.unshift(message); // Add the new message at the beginning
        const updatedMessages = messages.filter(msg => msg.trim() !== '').join('\n');
        
        fs.writeFile('message.txt', updatedMessages, err => {
          res.statusCode = 302;
          res.setHeader('Location', '/');
          return res.end();
        });
      });
    });
  }

  res.setHeader('Content-Type', 'text/html');
  res.write('<html>');
  res.write('<head><title>My First Page</title></head>');
  res.write('<body><h1>Hello from my Node.js Server!</h1></body>');
  res.write('</html>');
  res.end();
});

server.listen(3000);
