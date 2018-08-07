//Install express server
const express = require('express');
const path = require('path');

var bodyParser = require('body-parser');
const { Client } = require('pg');

const app = express();

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/angular-tour-of-heroes'));

app.get('/Angular', function(req,res) {
    
res.sendFile(path.join(__dirname+'/dist/angular-tour-of-heroes/index.html'));
});

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

client.connect();

app.get('/contacts', function(req,res) {
	console.log('bbb');
	
	client.query('SELECT * FROM salesforce', (err, res) => {
	  if (err) throw err;
	  for (let row of res.rows) {
		console.log(JSON.stringify(row));
	  }
	  client.end();
	});
	
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);