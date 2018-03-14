
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
    var companyChatRoomRef = ref.child("ChatRooms/Company");
    var locationChatRoomRef = ref.child("ChatRooms/Location");
    var groupChatRoomRef = ref.child("ChatRooms/Group");

    // addMessageToChat(groupChatRoomRef, "Sqaure Ensix", "hey guys");
    // addMessageToChat(groupChatRoomRef, "Sqaure Ensx", "hello");

    //compareInterns(internRef, 1502, 1600);
    var score = compareInterns(internRef, 1502, 1600, function(score) {
        document.write(score);
    })




    //compareInterns(internRef, 1502, 1600);
    var score = compareInterns(internRef, 1502, 1600, function(score) {
      document.write(score);
    })
