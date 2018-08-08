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




app.get('/accounts', function(req,res) {
    pg.connect(process.env.DATABASE_URL, function (err, conn, done) {
        if (err) {
            console.log(err);
            }else{	
                conn.query(
                    'select * from salesforce.account;',
                    function(err, result) {
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