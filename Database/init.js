
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

    // var image1 = new Image();
    // image1.src = "cyberduck-icon-384.png";
    // createProfilePicture(internRef, 1535, image1.src);
    //     var filename = "1535"; // image's name would be the intern's ID
    //     var storageRef = firebase.storage().ref('/ProfilePictures' + filename);
    //     var uploadTask = storageRef.put(image1);
    //     uploadTask.on('state_changed', function(snapshot) {

    //     }, function() {
    //       var downloadURL = uploadTask.snapshot.downloadURL;
    //       internRef.child("1535").update({
    //           "ProfilePicture": downloadURL
    //       });

    //     var filename = "1535"; // image's name would be the intern's ID
    //     var storageRef = firebase.storage().ref();
    //     var childRef = storageRef.child('cyberduck-icon-384');
    //     var anotherRef = storageRef.child('images/cyberduck-icon-384');
    //     var uploadTask = storageRef.put(image1);
    //     var downloadURL = uploadTask.snapshot.downloadURL;
    //     internRef.child("1535").update({
    //         "ProfilePicture": downloadURL
    //     });


    // var sref = firebase.storage().ref();
    // var message = 'data:image/jpeg;base64,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';
    //   sref.putString(message, 'data_url').then(function(snapshot) {
    //     console.log('Uploaded a data_url string!');
    //   });

    //createIntern(internRef, ,"kogut.ada.000@gmail.com", "Carrot", "IN");
        



