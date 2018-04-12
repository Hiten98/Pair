
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
    var houseRef = ref.child("Houses");

    // updateInternChatDetails(chatRoomRef, internRef, 1838);
    // createGroupChat(groupChatRoomRef, internRef, 1264, "Science Talk", (x) => {
    //     console.log(x);
    // })

    // removeIntern(internRef, chatRoomRef, 1449)

    // addHouse(groupChatRoomRef, houseRef, internRef, "3Video Games", "Ball park");
    // addHouse(groupChatRoomRef, houseRef, internRef, "3My Housing", "Ball park");
    // getNotifications(internRef, 1534, (x) => {
    //     document.write(JSON.stringify(x));
    // })

    // likeHouse(groupChatRoomRef, "3My Housing", "Ball Park", 1731, (x) => {
    //     document.write(x);
    // })
        
    // var house = "1301 3rd St.; West Lafayette, IN 47906";
    // var split = house.split(" ");
    // var state = split[split.length - 2];
    // var zip = split[split.length - 1];
    // console.log(state + " " + zip);

    // addHouse(groupChatRoomRef, houseRef, internRef, "3Books", 1115, "Zimmermann Dr; HOUSTON, TX 77088");
    // likeHouse(groupChatRoomRef, "3Books", "Zimmermann Dr; HOUSTON, TX 77088", 1115, (x) => {});

    // getCompanyFromName(companyRef, "test", (x) => {
    //     document.write(JSON.stringify(x));
    // });

    // houseRef.child("NY").child(10021).once("value").then(function(snapshot) {
    //     document.write(JSON.stringify(snapshot.val()));
    // });

    // getHouses(houseRef, "NY", (x) => { document.write(JSON.stringify(x)); });
    getSavedHouses(groupChatRoomRef, houseRef, "3Games", (x) => { document.write(JSON.stringify(x)); });
