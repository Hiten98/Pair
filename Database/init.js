
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
    var storageRef = firebase.storage().ref();

    //Setup references to Object headers
    var companyRef = ref.child("Company");
    var internRef = ref.child("User/Interns");
    var employeeRef = ref.child("User/Employees");
    var adminRef = ref.child("Admin");
    var chatRoomRef = ref.child("ChatRooms");
    var companyChatRoomRef = ref.child("ChatRooms/Company");
    var locationChatRoomRef = ref.child("ChatRooms/Location");
    var groupChatRoomRef = ref.child("ChatRooms/Group");
    var privateChatRoomRef = ref.child("ChatRooms/Private");

    removeIntern(internRef, chatRoomRef, 1480);

    getInvite(groupChatRoomRef, "3chatName2", 1001, (x) => {
        document.write(x);
    });

    createEmployeeChat(privateChatRoomRef, internRef, employeeRef, 1115, 2436, "AASDF", (x) => {
        document.write(x);
    });



    







