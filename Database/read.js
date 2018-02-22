
	function getMasterListOfInterns(company) {
		var master = {};
		internRef.once("value").then(function(snapshot) {
			snapshot.forEach(function(childSnapshot) {
    			if(childSnapshot.val().company == company){
    				var key = childSnapshot.key;
    				master[key] = {};
    				master[key]["firstName"] = childSnapshot.val().firstName;
    				master[key]["lastName"] = childSnapshot.val().lastName;
    				master[key]["email"] = childSnapshot.val().email;
    				master[key]["location"] = childSnapshot.val().lcoation;
    				master[key]["phone"] = childSnapshot.val().phone;
    			}
    		});
    		document.write(JSON.stringify(master));
    	});
	}

	function getIntern(ID) {
		internRef.child(ID).once("value").then(function(snapshot) {
			document.write(snapshot.val());
		});
		//Figure out how to return a JSON
	}