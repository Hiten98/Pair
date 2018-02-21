
	function getMasterListOfInterns() {
		internRef.once("value").then(function(snapshot) {
			document.write(snapshot.val());
		});
	}

	function getIntern(ID) {
		internRef.child(ID).once.then(function(snapshot) {
			document.write(snapshot.val());
		});
		//Figure out how to return a JSON
	}