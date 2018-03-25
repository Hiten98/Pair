	
	/*module.exports = {
		createCompany,
		createIntern,
		createEmployee,
		createPassword,
		createBasicPreferences,
		createRoommatePreferences,
		createHousingPreferences,
		createProfilePicture,
		addToLocationChat,
		addEmployeeToCompanyChat,
		addInternToCompanyChat,
		createGroupChat,
		addToGroupChat,
		createPrivateChat,
		addMessageToChat,
		createComplaint
	}*/

	//var update = require('./update.js');
	//var create = require('./create.js');

	function createCompany(companyRef, companyName, email, password, listOfLocations = "novalue", listOfEmployees = []) {
      companyRef.update({
        [companyName]: "novalue"
      });
      var pin = Math.floor(Math.random() * 9000) + 1000;
      companyRef.child(companyName).update({
        "pin": pin,
        "email": email,
        "password": password,
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
	    	"location": location,
	    	"listOfChatRooms": [2 + location, 1 + company + ", " + location],
	    	"ban": false
	    });
    }

    function createEmployee(employeeRef, companyRef, id, firstName, lastName, password, email, company, location, description, facebook, linkedin, twitter) {
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
	    	"links": [facebook, linkedin, twitter],
	    	"listOfChatRooms": [1 + company + ", " + location]
	    });
	    /*update.*/updateCompany(companyRef, company, firstName + " " + lastName);
    }

    function createPassword(relevantRef, ID, password) {
    	relevantRef.child(ID).update({
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

    function createProfilePicture(storageRef, relevantRef, ID, image) {
		var imageRef = relevantRef.child(ID).child("images");
	    storageRef.child(ID + "/").getDownloadURL().then(function(url) {
	        imageRef.child("image").set(url);
	    }); 
	    var task = storageRef.child(ID + "/").putString(image, 'base64').then(function(snapshot) {
	         console.log('Uploaded a base64 string!');
	    });
	}

	/*
    / @brief this function adds users to the area/city
    /        chat room
    /
    / @usage call this function after createIntern to add
    /        them to the area/city chat room
    */
	function addToLocationChat(locationChatRoomRef, internRef, location, user) {
		var item = user + "$:$";
		internRef.child(user).once("value").then(function(snapshot) {
			item += snapshot.val().firstName + " " + snapshot.val().lastName + "$:$";
			internRef.child(user).child("images").once("value").then(function(childSnapshot) {
				item += childSnapshot.val().image + "$:$";
				internRef.child(user).child("basic").once("value").then(function(babySnapshot) {
					item += babySnapshot.val().description;
					/*update.*/getSnapshot(locationChatRoomRef, 2 + location, "listOfUsers", item);
				});
			});
		});
	}

	function addEmployeeToCompanyChat(companyChatRoomRef, employeeRef, company, location, user) {
		var item = user + "$:$";
		employeeRef.child(user).once("value").then(function(snapshot) {
			item += snapshot.val().firstName + " " + snapshot.val().lastName + "$:$";
			employeeRef.child(user).child("images").once("value").then(function(childSnapshot) {
				item += childSnapshot.val().image + "$:$";
				item += snapshot.val().description;
				/*update.*/getSnapshot(companyChatRoomRef, 1 + company + ", " + location, "listOfMods", item);
			});
		});
	}

	function addInternToCompanyChat(companyChatRoomRef, internRef, company, location, user) {
		var item = user + "$:$";
		internRef.child(user).once("value").then(function(snapshot) {
			item += snapshot.val().firstName + " " + snapshot.val().lastName + "$:$";
			internRef.child(user).child("images").once("value").then(function(childSnapshot) {
				item += childSnapshot.val().image + "$:$";
				internRef.child(user).child("basic").once("value").then(function(babySnapshot) {
					item += babySnapshot.val().description;
					/*update.*/getSnapshot(companyChatRoomRef, 1 + company + ", " + location, "listOfUsers", item);
				});
			});
		});
	}

	function createGroupChat(groupChatRoomRef, internRef, ID, name, callback) {
		groupChatRoomRef.child(3 + name).once("value").then(function(snapshot) {
			if(snapshot.exists()) {
				callback(false);
			}
			else {
				var item = ID + "$:$";
				internRef.child(ID).once("value").then(function(snapshot) {
					item += snapshot.val().firstName + " " + snapshot.val().lastName + "$:$";
					internRef.child(ID).child("images").once("value").then(function(childSnapshot) {
						item += childSnapshot.val().image + "$:$";
						internRef.child(ID).child("basic").once("value").then(function(babySnapshot) {
							item += babySnapshot.val().description;
							groupChatRoomRef.child(3 + name).update({
								"listOfUsers": [item]
							});
						});
					});
				});
				/*update.*/getSnapshot(internRef, ID, "listOfChatRooms", 3 + name);
				callback(true);
			}
		});
	}

	function addToGroupChat(groupChatRoomRef, internRef, ID, name) {
		var item = ID + "$:$";
		internRef.child(ID).once("value").then(function(snapshot) {
			item += snapshot.val().firstName + " " + snapshot.val().lastName + "$:$";
			internRef.child(ID).child("images").once("value").then(function(childSnapshot) {
				item += childSnapshot.val().image + "$:$";
				internRef.child(ID).child("basic").once("value").then(function(babySnapshot) {
					item += babySnapshot.val().description;
					/*update.*/getSnapshot(groupChatRoomRef, name, "listOfUsers", item);
				});
			});
		});
		/*update.*/getSnapshot(internRef, ID, "listOfChatRooms", name);
	}

	function createPrivateChat(privateChatRoomRef, internRef, ID1, ID2, name, callback) {
		privateChatRoomRef.child(4 + name).once("value").then(function(snapshot) {
			if(snapshot.exists()) {
				callback(false);
			}
			else {
				var item = ID1 + "$:$";
				var item2 = ID2 + "$:$";
				internRef.child(ID1).once("value").then(function(snapshot) {
					item += snapshot.val().firstName + " " + snapshot.val().lastName + "$:$";
					internRef.child(ID1).child("images").once("value").then(function(childSnapshot) {
						item += childSnapshot.val().image + "$:$";
						internRef.child(ID1).child("basic").once("value").then(function(babySnapshot) {
							item += babySnapshot.val().description;
							internRef.child(ID2).once("value").then(function(snapshot) {
								item2 += snapshot.val().firstName + " " + snapshot.val().lastName + "$:$";
								internRef.child(ID2).child("images").once("value").then(function(childSnapshot) {
									item2 += childSnapshot.val().image + "$:$";
									internRef.child(ID2).child("images").once("value").then(function(babySnapshot) {
										item2 += babySnapshot.val().description;
										privateChatRoomRef.child(4 + name).update({
											"listOfUsers": [item, item2]
										});
									});
								});
							});
						});
					});
				});
				/*update.*/getSnapshot(internRef, ID1, "listOfChatRooms", 4 + name);
				/*update.*/getSnapshot(internRef, ID2, "listOfChatRooms", 4 + name);
				callback(true);
			}
		});
	}

	function addMessageToChat(chatRoomRef, name, message) {
		chatRoomRef.child(name).child("listOfMessages").once("value").then(function(snapshot) {
			if(snapshot.exists()) {
				var count = snapshot.val().number;
				count++;
				chatRoomRef.child(name).child("listOfMessages").update({
					"number": count,
					[count]: message,
				});
			}
			else {
				chatRoomRef.child(name).child("listOfMessages").update({
					"number": "1",
					"1": message
				});
			}
		});
	}

	function createComplaint(employeeRef, ID, complaint, complaintee, complainter, CID) {
		/*update.*/getSnapshot(employeeRef, ID, "listOfComplaints", CID + "$:$" + complainter + "$:$" + complaintee + "$:$" + complaint);
	}

