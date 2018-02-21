
	function getMasterListOfInterns(company) {
		var JSONArray = []
		internRef.once("value").then(function(snapshot) {
			snapshot.forEach(function(childSnapshot) {
    			var item = childSnapshot.val().company;
    			if(item == company)
    				JSONArray.push(item);
    		});
    		// document.write(JSONArray);
    	});
	}

	function getIntern(ID) {
		internRef.child(ID).once("value").then(function(snapshot) {
			document.write(snapshot.val());
		});
		//Figure out how to return a JSON
	}