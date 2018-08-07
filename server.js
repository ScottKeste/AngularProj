//Install express server
const express = require('express');
const path = require('path');

var bodyParser = require('body-parser');
var pg = require('pg');

const app = express();

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/angular-tour-of-heroes'));

app.get('/Angular', function(req,res) {
    
res.sendFile(path.join(__dirname+'/dist/angular-tour-of-heroes/index.html'));
});

var databaseurl = 'postgres://nswclifegblitx:597cfe4bfb7502885f6404f82189812c41b268fda0bb9ed5c6ac266db2b11b91@ec2-54-243-54-6.compute-1.amazonaws.com:5432/d5ng6knqu0upae'

console.log('the database url is' + process.env.DATABASE_URL);


app.get('/contacts', function(req,res) {
	console.log('bbb');
	
    pg.connect(process.env.DATABASE_URL, function (err, conn, done) {
		
        if (err) {
			console.log(err);
		}else{
			
				
			conn.query(
				'select * from salesforce.contact;',
				function(err, result) {
					console.log(result);
					if (err != null || result.rowCount == 0) {
						console.log('was an error');
						console.log(err);
					}
					else {
						done();
						res.json(result);
					}
				}
			);
			
		}
	});
	
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);