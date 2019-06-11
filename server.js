const express = require('express');
const redirect = require('express-redirect');
const path = require('path');
const port = process.env.PORT || 8080;
const app = express();
redirect(app);

// the __dirname is the current directory from where the script is running
app.use(express.static(__dirname + '/dist'));

// send the user to index html page inspite of the url
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname + '/dist'));
});

// Use for verifying own ssl certificates
// app.get('/.well-known/acme-challenge/:content', function(req, res) {
//   res.send('xxxxxxx');
// });

app.redirect('*', '/', 301);

app.listen(port);
