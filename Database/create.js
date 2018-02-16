	
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

    function getID(length) {
    	var characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
		var size = 3;
		var id = '';
		for (var i = 0; i < size; i++) {
		    id += characters.charAt(Math.floor(Math.random() * characters.length));
		}
		id += length;
		return(id);
    }

    function createIntern(name, password, email = "novalue", location = "novalue") {
      internRef.update({
        [name]:"novalue"
      })
      var newLength = 0;
      internRef.child('AAlength').once('value', function(snapshot) {
        newLength = snapshot.val();
        newLength = newLength + 1;
        internRef.update({
          "AAlength": newLength
        });
      	var id = getID(newLength);
      	internRef.child(name).update({
      		"id": id,
      		"email": email,
        	"password": password,
        	"location": location
	    });
      });
    }

