
	function getMasterListOfInterns() {
		return internRef;
	}

	function getIntern(ID) {
		return internRef.child(ID);
		//Figure out how to return a JSON
	}