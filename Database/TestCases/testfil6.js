
	createGroupChat(groupChatRoomRef, internRef, 1509, "Summers", (x) => {
        console.log(x);
    });
    addHouse(groupChatRoomRef, houseRef, internRef, "Summers", 1331, "11 Franklin St UNIT 602; San Francisco, CA 94102");
    addHouse(groupChatRoomRef, houseRef, internRef, "3Summers", 1331, "Zimmermann Dr; HOUSTON, TX 77088");

    getNotifications(internRef, 1534, (x) => {
        document.write(JSON.stringify(x));
    });
    getNotifications(internRef, 1761, (x) => {
        document.write(JSON.stringify(x));
    });
    getNotifications(internRef, 1331, (x) => {
        document.write(JSON.stringify(x));
    });

    addHouse(groupChatRoomRef, houseRef, internRef, "3Books", 1115, "Zimmermann Dr; HOUSTON, TX 77088");
    likeHouse(groupChatRoomRef, "3Summers", "Zimmermann Dr; HOUSTON, TX 77088", 1115, (x) => {
        console.log(x);
    });
    likeHouse(groupChatRoomRef, "3Summers", "Zimmermann Dr; HOUSTON, TX 77088", 1115, (x) => {
        console.log(x);
    });
    likeHouse(groupChatRoomRef, "3Summers", "Zimmermann Dr; HOUSTON, TX 77088", 1115, (x) => {
        console.log(x);
    });

    getHouses(houseRef, "NY", (x) => {
    	document.write(JSON.stringify(x));
    });
    getSavedHouses(groupChatRoomRef, houseRef, "3Summers", (x) => {
    	document.write(JSON.stringify(x));
    });
    getSavedHouses(groupChatRoomRef, houseRef, "3Summers", (x) => {
    	document.write(JSON.stringify(x));
    });

    getSavedHouses(groupChatRoomRef, houseRef, "3Games", (x) => {
        document.write((JSON.stringify(x)));
    });
    getSavedHouses(groupChatRoomRef, houseRef, "3Books", (x) => {
        document.write((JSON.stringify(x)));
    });

    addHouse(groupChatRoomRef, houseRef, internRef, "3Video Games", 1115, "Zimmermann Dr; HOUSTON, TX 77088");
    removeHouse(groupChatRoomRef, houseRef, internRef, "3Video Games", 1115, "Zimmermann Dr; HOUSTON, TX 77088");

    getSavedHouses(groupChatRoomRef, houseRef, "3Games", (x) => {
        document.write((JSON.stringify(x)));
    });
