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

var databaseurl = 'postgres://nswclifegblitx:597cfe4bfb7502885f6404f82189812c41b268fda0bb9ed5c6ac266db2b11b91@ec2-54-243-54-6.compute-1.amazonaws.com:5432/d5ng6knqu0upae'

console.log('the database url is' + process.env.DATABASE_URL);

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