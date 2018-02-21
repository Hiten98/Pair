//listening to server
var express = require('express');
var app = express();
var port = 9090;
var axios = require('axios');
var create = require('./create.js')

//setting up dtaabase
var admin = require("firebase-admin");
//var firebase_app = admin.initializeApp();
//serviceAccount
var serviceAccount = require("./pair-ab7d0-firebase-adminsdk-3wjxh-99b0bb40ab.json");
//initializeApp
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://pair-ab7d0.firebaseio.com"
});

//get a database reference
var db = admin.database();
var ref = db.ref("/NEW");
var companyRef = db.ref("/Company");
var kunalRef = db.ref("/Kunal");

function test()
{
      create.createCompany('GOGGLE', listOfLocations = "novalue", listOfEmployees = "novalue", companyRef);
      var test = ref.child("NEW_HITEN");
      test.set({
        Hiten: {
        date_of_birth: "May 30, 1998",
        full_name: "Hiten Rathod"
      },
      Darwin: {
        date_of_birth: "Jan 11, 1999",
        full_name: "Darwin Vaz"
      }
    });
}
function testKunal()
{
  var test = kunalRef.child("NEW_HITEN");
  test.set({
    Hiten: {
    date_of_birth: "May 30, 1998",
    full_name: "Hiten Rathod"
  },
  Darwin: {
    date_of_birth: "Jan 11, 1999",
    full_name: "Darwin Vaz"
  }
});
}

app.post('/LOGIN',function( req, res) {
  res.json({
    //pass these two tokens to database
    "User":"Hiten",
    "Pass":"Pass",
    //if database accepts, generate a login token and track it
    "Login Token":"12345"
  });
});

app.post('/REGISTER',function( req, res) {
  res.json({
    //check for errors from database:
    //if(!error)
    "STATUS": "SUCCESSFUL"
    //else
    //"STATUS": "ERROR CODE" + error
  });
});

app.post('/GET-MASTER-LIST',function( req, res) {
  res.json({
    //check for authority
    //if(authority)
    //get appropriate master list
    "LIST": ["Adam", "Arvindh", "Darwin", "Hiten", "Kunal"]
    //else
    //"STATUS": "ERROR CODE" + error
  });
});



app.listen(port, function () {
  console.log('Testing adding to database');
  test();
  console.log('Testing done');
  testKunal();
  console.log('Kuanl done');
  console.log('Database setup done');
  console.log('App listening on port: ' + port + '!');
});
