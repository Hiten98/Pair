
    createGroupChat(groupChatRoomRef, internRef, 11111, "Dogs and Doges", (x) => {});
    addToGroupChat(groupChatRoomRef, internRef, 12222, "3Dogs and Doges");
    addToGroupChat(groupChatRoomRef, internRef, 12221, "3Dogs and Doges");
    addToGroupChat(groupChatRoomRef, internRef, 12231, "3Dogs and Doges");
    createGroupChat(groupChatRoomRef, internRef, 11111, "Even God has dreams", (x) => {});
    addToGroupChat(groupChatRoomRef, internRef, 12222, "3Even God has dreams");
    addToGroupChat(groupChatRoomRef, internRef, 12221, "3Even God has dreams");
    addToGroupChat(groupChatRoomRef, internRef, 12231, "3Even God has dreams");
    createGroupChat(groupChatRoomRef, internRef, 11111, "Time and other concepts", (x) => {});
    addToGroupChat(groupChatRoomRef, internRef, 12222, "3Time and other concepts");
    addToGroupChat(groupChatRoomRef, internRef, 12221, "3Time and other concepts");
    addToGroupChat(groupChatRoomRef, internRef, 12231, "3Time and other concepts");
	
	getChatRooms(internRef, 12221, (x) => {
        document.write(JSON.stringify(x));
    });
    getUsersInChatRoom(groupChatRoomRef, "3Dogs and Doges", (x) => {
        document.write(JSON.stringify(x));
    });
    removeFromChat(groupChatRoomRef, internRef, "3Dogs and Doges", 12221, (x) => {
        document.write(JSON.stringify(x));
    })
    getUsersInChatRoom(groupChatRoomRef, "3Dogs and Doges", (x) => {
        document.write(JSON.stringify(x));
    });
    getChatRooms(internRef, 12221, (x) => {
        document.write(JSON.stringify(x));
    });