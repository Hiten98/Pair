	
	function createCompany(companyName, listOfLocations = "novalue", listOfEmployees = "novalue") {
      companyRef.update({
        [companyName]: "novalue"
      });
      var pin = Math.floor(Math.random() * 9000) + 1000;
      companyRef.child(companyName).update({
        "pin": pin,
        "listOfLocations": listOfLocations,
        "listOfEmployees": listOfEmployees
      });
    }

    function createIntern(name, password, email = "novalue", location = "novalue") {
      var newLength = 0;
      internRef.child('AAlength').once('value', function(snapshot) {
        newLength = snapshot.val();
        newLength = newLength + 1;
        internRef.update({
          "AAlength": newLength
        });
      });
      internRef.update({
        [name]:"novalue"
      })
      internRef.child(name).update({
        "email": email,
        "password": password,
        "location": location
      });
    }

    