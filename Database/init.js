
      /*TODO @Darwin clean up and organize code
        TODO @Darwin move functions to appropriate place
        TODO @Darwin database security
        TODO @Darwin make separate javascript files*/
  

    //Initialize Firebase
    const config = {
      apiKey: "AIzaSyCpow5onc7CzR9ekowLsK_VA_UbK1FnWoM",
      authDomain: "pair-ab7d0.firebaseapp.com",
      databaseURL: "https://pair-ab7d0.firebaseio.com",
      projectId: "pair-ab7d0",
      storageBucket: "pair-ab7d0.appspot.com",
      messagingSenderId: "553932382090"
    };

    //Setup references to database
    var defaultApp = firebase.initializeApp(config);
    var ref = firebase.database().ref();

    //Setup references to Object headers
    var companyRef = ref.child("Company");
    var internRef = ref.child("User/Interns");
    var employeeRef = ref.child("User/Employees");

    // createCompany(companyRef, "Goggle", ["GA", "MI", "CA"], ["Jack Stone", "Jake Harden"]);
    // createCompany(companyRef, "Carrot", ["IN", "MO", "CA"], ["Chef Curry", "Mike Tyson"]);
    // updateCompany(companyRef, "Carrot", ["Scott Jones"], ["IN2", "MO2"]);

    // createIntern(internRef, "DJW3e123", "hiten@purdue.edu", "Goggle", "CA");
    // createIntern(internRef, "VFgf21wF", "tiwari7@purdue.edu", "Goggle", "MA");
    // createPassword(internRef, "DJW3e123", "password");
    // createPassword(internRef, "VFgf21wF", "password");
    // updateIntern(internRef, "DJW3e123", "Hiten", "Rathod", "765412333");
    // updateIntern(internRef, "VFgf21wF", "Mihir", "Tiwari", "328934443");

    // createEmployee(employeeRef, "S1we4ed", "Case", "Right", "password", "case@box.com", "Goggle", ["China", "Beijing", "Seoul"], "I like chipotle", "case.5", "case-right", "@case");
    // createEmployee(employeeRef, "Kdl3rf", "Johnnyy", "Cash", "password", "cash@goggle.com", "Goggle", ["India", "Beijing", "Pyeongcheng"], "I like chipotle", null, "linkedin.com/cash", "@Cash");
    // updateEmployee(employeeRef, "Kdl3rf", null, null, null, null, "face.book", null, "@newTwit");

    // createPreferences(internRef, "DJW3e123", ["chess", "dogs", "soup", "12", "trump", "sauce"]);
    // createIntern(internRef, "VFgf213wF", "tiwari7@purdue.edu", "Goggle", "MA");
    // removeIntern(internRef, "VFgf213wF", null);
  
    // var x = getMasterListOfInterns(internRef, "Goggle", function(x) {
    //   document.write(JSON.stringify(x));
    // });

    // getCompany(companyRef, "9566", (x) => {
    //   document.write(x);
    // });
    
    verifyIntern(internRef, "VFgf21wF", "password", (x) => {
      document.write(x);
    });

    //document.write(getLocations(companyRef, "Goggle"));