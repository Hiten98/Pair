	
	/*
    / @brief this function retrieves the already existent
    /        items from a list and adds the new ones to it
    /        can be used to update lists and arrays
    /
    / @param relevantRef a reference to the appropriate object header
    / @param childName the name of the object you want to update
    / @param itemName the item you want to update
    / @param newValue the values you want to add
    */
    function getSnapshot(relevantRef, childName, itemName, newValue) {
      var ref = relevantRef.child(childName).child(itemName);
      var oldlist = [];
      ref.once("value").then(function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
          var item = childSnapshot.val();
          oldlist.push(item);
        });
        var newList = oldlist.concat(newValue);
        relevantRef.child(childName).update({
          [itemName]: newList
        })
      });
    }

    function updateCompany(companyName, employees, locations = null) {
      getSnapshot(companyRef, companyName, "listOfLocations", locations);
      getSnapshot(companyRef, companyName, "listOfEmployees", employees);
    };

    function updateIntern(ID, location, phone) {
      if(location != null) {
        internRef.child(ID).update({
          "location": location
        });
      }
      if(phone != null) {
      	internRef.child(ID).update({
      		"phone": phone
      	});
      }
    }

    function updatePassword(ID, newPassword, oldPassword) {
    	var ref = internRef.child(ID).child("password");
    	ref.once("value").then(function(snapshot) {
    		var item = snapshot.val();
    		if(item == oldPassword)
    			internRef.child(ID).update({
    				"password": newPassword
    			});
    	});
    }