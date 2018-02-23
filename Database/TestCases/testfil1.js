
	createCompany(companyRef, "Goggle", ["GA", "MI", "CA"], ["Jack Stone", "Jake Harden"]);
    createCompany(companyRef, "Carrot", ["IN", "MO", "CA"], ["Chef Curry", "Mike Tyson"]);
    updateCompany(companyRef, "Carrot", ["Scott Jones"], ["IN2", "MO2"]);

    createIntern(internRef, "DJW3e123", "hiten@purdue.edu", "Goggle", "CA");
    createIntern(internRef, "VFgf21wF", "tiwari7@purdue.edu", "Goggle", "MA");
    createPassword(internRef, "DJW3e123", "password");
    createPassword(internRef, "VFgf21wF", "password");		
    updateIntern(internRef, "DJW3e123", "Hiten", "Rathod", "765412333");
    updateIntern(internRef, "VFgf21wF", "Mihir", "Tiwari", "328934443");

    createEmployee(employeeRef, "S1we4ed", "Case", "Right", "password", "case@box.com", "Goggle", ["China", "Beijing", "Seoul"], "I like chipotle", "case.5", "case-right", "@case");
    createEmployee(employeeRef, "Kdl3rf", "Johnnyy", "Cash", "password", "cash@goggle.com", "Goggle", ["India", "Beijing", "Pyeongcheng"], "I like chipotle", null, "linkedin.com/cash", "@Cash");
    updateEmployee(employeeRef, "Kdl3rf", null, null, null, null, "face.book", null, "@newTwit");

    createPreferences(internRef, "DJW3e123", ["chess", "dogs", "soup", "12", "trump", "sauce"]);
    createIntern(internRef, "VFgf213wF", "tiwari7@purdue.edu", "Goggle", "MA");
    removeIntern(internRef, "VFgf213wF", null);
  
    var x = getMasterListOfInterns(internRef, "Goggle", function(x) {
      document.write(JSON.stringify(x));
    });

    getCompany(companyRef, "9566", (x) => {
      document.write(x);
    });
    
    verifyIntern(internRef, "VFgf21wF", "password", (x) => {
      document.write(x);
    });
