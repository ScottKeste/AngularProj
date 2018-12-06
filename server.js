//Install express server
const express = require('express');
const path = require('path');

var bodyParser = require('body-parser');
var pg = require('pg');

const app = express();

    const { exec } = require('child_process');
// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/angular-tour-of-heroes'));

app.use(bodyParser.json());

app.get('/Angular', function(req,res) {





res.sendFile(path.join(__dirname+'/dist/angular-tour-of-heroes/index.html'));
});




app.get('/accounts', function(req,res) {
    /*console.log('api call');
    exec('pwd', (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
      console.log(`stderr: ${stderr}`);
    });*/
    pg.connect(process.env.DATABASE_URL, function (err, conn, done) {
        if (err) {
            console.log(err);
            }else{	
                conn.query(
                    'select * from salesforce.account order by name asc;',
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

app.post('/update', function(req,res){
    pg.connect(process.env.DATABASE_URL, function (err, conn, done) {
        var arrayLength = req.body.length;
        for(var i = 0; i < arrayLength; i++){
            var account = req.body[i];
            conn.query(
                    'UPDATE Salesforce.Account SET billingcountry = $2, billingstate = $3, billingstreet = $4, phone = $5 WHERE sfid = $1;',
                    [account.sfid, account.billingcountry, account.billingstate, account.billingstreet, account.phone]
                    );
        }
        done();
    });
    
    res.send('{"val" : "bbbb"}');
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080, () => {
  console.log('Server started!');
});
