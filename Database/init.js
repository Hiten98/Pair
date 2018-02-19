
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


    //createCompany("Mind Readers Inc", ["Place1", "Drace1", "Trace1"], ["P1", "P2"]);
    //createCompany("Telefrags", ["US", "UK", "UV"]);
    //updateCompany("Mind Readers Inc", ["France", "Trance", "Drance"], ["Person", "Persona"]);
    //updateCompany("Telefrags", [] , "Atlan");

    internRef.update({
      "AAlength": 0
    });

    // createIntern("Andrew", "Bass", "$!@#$", "bass1purduedu", "Hawaii");
    // createIntern("Mihir", "Tirwrai", "paswrod", "tiwar@purdue.d", "NeYrok");
    // createIntern("Hitena", "Rathod", "Sseptu", "rarho@prud.2");
    // updateIntern("QxRAi0003", null, "Calif");

    