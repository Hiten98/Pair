
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
		});
		updateCompany(companyRef, company, firstName + " " + lastName);
	}

	function createPassword(internRef, ID, password) {
		internRef.child(ID).update({
			"password": password
		})
	}

	function createPreferences(internRef, ID, options) {
		internRef.child(ID).update({
			"options": options
		});
		/*for (var i = 0; i < options.length; i++) {
			var name = "option" + i;
			internRef.child(ID).child("options").update({
				[name]: options[i]
			});
		}*/
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
