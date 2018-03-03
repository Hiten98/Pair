	
	/*module.exports = {
		createCompany,
		createIntern,
		createEmployee,
		createPassword,
		createBasicPreferences,
		createRoommatePreferences,
		createHousingPreferences,
		createProfilePicture,
		addEmployeeToCompanyChat,
		addInternToCompanyChat
	}*/

	//var update = require('./update.js');
	//var create = require('./create.js');

	function createCompany(companyRef, companyName, listOfLocations = "novalue", listOfEmployees = "novalue") {
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

    function createIntern(internRef, id, email, company, location = "novalue") {
	  	internRef.update({
	   		[id]:"novalue"
	  	});
	  	internRef.child(id).update({
	  		"email": email,
	  		"company": company,
	    	"location": location
	    	"listofChatRooms": [company, company + ", " + location]
	    });
    }

    function createEmployee(employeeRef, id, firstName, lastName, password, email, company, location, description, facebook, linkedin, twitter) {
	  	employeeRef.update({
	   		[id]:"novalue"
	  	});
	  	employeeRef.child(id).update({
	  		"firstName": firstName,
	  		"lastName": lastName,
			"password": password,
	  		"email": email,
	  		"company": company,
	  		"description": description,
	    	"location": location,
	    	"links": [facebook, linkedin, twitter]
	    	"listOfChatRooms": [company, company + ", " + location]
	    });
	    /*update.*/updateCompany(companyRef, company, firstName + " " + lastName);
    }

    function createPassword(internRef, ID, password) {
    	internRef.child(ID).update({
    		"password": password
    	});
    }

    function createBasicPreferences(internRef, ID, firstName, lastName, description, fbLink, twitterLink, linkedin) {
	  	internRef.child(ID).child('basic').update({
			"description": description,
			"fbLink": fbLink,
			"twitterLink": twitterLink,
			"linkedInLink": linkedin
	  	});
	  	/*update.*/updateIntern(internRef, ID, firstName, lastName, "novalue");
	}

	function createRoommatePreferences(internRef, ID, youguest, themguest, youpet, thempet, sharing, smoke, bedtime, waketime, lights, clean) {
	  	internRef.child(ID).child('roommate').update({
			"youguest": youguest,
	 		"themguest": themguest,
	 		"youpet": youpet,
	 		"thempet": thempet,
		 	"sharing": sharing,
		 	"smoke": smoke,
		 	"bedtime": bedtime,
		 	"waketime": waketime,
		 	"lights": lights,
		 	"clean": clean
	  });
	}

	function createHousingPreferences(internRef, ID, price, roommates, distance, duration) {
	  	internRef.child(ID).child('housing').update({
	  		"desiredPrice": price,
	        "desiredRoommate": roommates,
	        "desiredDistance": distance,
	        "desiredDuration": duration
	  });
	}

    function createProfilePicture(internRef, ID, image) {
		var filename = [ID]; // image's name would be the intern's ID
		var storageRef = firebase.storage().ref('/ProfilePictures' + filename);
		var uploadTask = storageRef.put(image);
		uploadTask.on('state_changed', function(snapshot) {
		}, function() {
			var downloadURL = uploadTask.snapshot.downloadURL;
			internRef.child(ID).update({
    			"ProfilePicture": downloadURL
    		});
		})
	}

	/*
    / @brief this function add employees/moderators to the
    /        main company chat room
    /
    / @usage call this function after createEmployee to add
    /        them to the company chat room
    */
	function addEmployeeToCompanyChat(chatRoomRef, company, listOfEmployees) {
		/*update.*/getSnapshot(chatRoomRef, company, "listOfMods", listOfEmployees);
	}

	function addInternToCompanyChat(chatRoomRef, company, user) {
		/*update.*/getSnapshot(chatRoomRef, company, "listOfUsers", user);
	}

	function addEmployeeToLocationChat(chatRoomRef, company, location, listOfEmployees) {
		/*update.*/getSnapshot(chatRoomRef, company + ", " + location, "listOfMods", listOfEmployees);
	}

	function addInternToLocationChat(chatRoomRef, company, location, user) {
		/*update.*/getSnapshot(chatRoomRef, company + ", " + location, user);
	}

	//make sure room names dont overlap
	function createChat(chatRoomRef, ID, name) {
		chatRoomRef.child(name).update({
			"listOfUsers": [name]
		});
	}

