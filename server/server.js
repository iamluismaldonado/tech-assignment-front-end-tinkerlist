var http = require('http');

const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";
const KEY = "207b94499e68f7a49f0750abf2167cb4";

var server = http.createServer((req, res) => {
  if (req.url == '/weather') {

  }
});

server.listen(5000);
console.log('Node.js web server at port 5000 is running');