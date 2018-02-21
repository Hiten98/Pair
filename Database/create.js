	
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

    function pad(n, width, z) {
	  z = z || '0';
	  n = n + '';
	  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
	}

	function hashCode(s) {
		return s.substring(0, s.indexOf("@"));
	};

    function getID(length) {
    	var characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
		var size = 5;
		var id = '';
		for (var i = 0; i < size; i++) {
		    id += characters.charAt(Math.floor(Math.random() * characters.length));
		}
		length = pad(length, 4);
		id += length;
		return(id);
    }

    function createIntern(firstName, lastName, email, company, location = "novalue") {
	  	var id = hashCode(email);
	  	internRef.update({
	   		[id]:"novalue"
	  	});
	  	internRef.child(id).update({
	  		"firstName": firstName,
	  		"lastName": lastName,
	  		"email": email,
	  		"company": company,
	    	"location": location
	    });
    }

    function createPassword(ID, password) {
    	internRef.child(ID).update({
    		"password": password
    	})
    }

    function createPreferences(ID, options) {
    	internRef.child(ID).update({
    		"options": "novalue"
    	});
    	for (var i = 0; i < options.length; i++) {
    		var name = "option" + i;
    		internRef.child(ID).child("options").update({
    			[name]: options[i]
    		});
    	}
    }

