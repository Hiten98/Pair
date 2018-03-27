	
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

    getMessages(groupChatRoomRef, "3Dogs and Doges", (x) => {
        document.write(JSON.stringify(x));
    });

    addToLocationChat(locationChatRoomRef, internRef, "Atlanta", 1822);
    addInternToCompanyChat(companyChatRoomRef, internRef, "Scarred", "Atlanta", 1822);
    createGroupChat(groupChatRoomRef, internRef, 1822, "Burning Hearts", (x) => {});
    addToGroupChat(groupChatRoomRef, internRef, 1761, "3Time and other concepts");
    addToGroupChat(groupChatRoomRef, internRef, 1822, "3Time and other concepts");
    addToGroupChat(groupChatRoomRef, internRef, 1115, "3Time and other concepts");
	createPrivateChat(privateChatRoomRef, internRef, 1822, 1115, "Private times", (x) => {});
    removeIntern(internRef, chatRoomRef, 11111);

    addToLocationChat(locationChatRoomRef, internRef, "Up here", 1480);
    createPrivateChat(privateChatRoomRef, internRef, 1822, 1761, "Old school club", (x) => {
        document.write(x);
    });

    addLocationChat(chatRoomRef, "Gog-gle", "CA", "Swami");
    createPassword(internRef, "1600", "passw!@#$%^ord");
    createIntern(internRef, "1000", "!@#$%^&*()~`\\{}:>\";'<>?,./;'[]\\=-™", "Gog-gle");
    createPassword(internRef, 1000, "!@#$.com");
    
    createCompany(companyRef, "ChatterBox", ["CA", "IN", "MO"]);
    createEmployee(employeeRef, companyRef, 2468, "Jack", "Haas", null, null, "ChatterBox", "IN", null, null, null, null);
    createEmployee(employeeRef, companyRef, 2459, "David", "Bunns", null, null, "ChatterBox", "MO", null, null, null, null);
    updateCompany(companyRef, "ChatterBox", [], "P9");
    createEmployee(employeeRef, companyRef,  200021, "Roro", "Goopta", "poot", "bangER@gmail.com", "ChatterBox", "IN", "", "", "", "");
    createEmployee(employeeRef, companyRef, 24668, "Jack", "Haas", "pass", "wrfe3@gmailcom", "ChatterBox", "IN", null, null, null, null);
    createEmployee(employeeRef, companyRef, 24559, "David", "Bunns", "Wordd", "wsdfg@mai", "ChatterBox", "IN", null, null, null, null);
    createIntern(internRef, 1003, "alab@gmail.com", "ChatterBox", "IN");
    createIntern(internRef, 1039, "dolce@gmail.com", "ChatterBox", "IN");

    addEmployeeToCompanyChat(companyChatRoomRef, "ChatterBox", "IN", "Jack Haas");
    addEmployeeToCompanyChat(companyChatRoomRef, "ChatterBox", "IN", "David Bunns");
    addEmployeeToCompanyChat(companyChatRoomRef, "ChatterBox", "IN", "Harr");
    addEmployeeToCompanyChat(companyChatRoomRef, "ChatterBox", "IN", "Ted");
    addEmployeeToCompanyChat(companyChatRoomRef, "ChatterBox", "IN", "Bundy");

    addInternToCompanyChat(companyChatRoomRef, "ChatterBox", "IN", ["Alab", "Folce"]);
    addInternToCompanyChat(companyChatRoomRef, "ChatterBox", "IN", "Dolce");
    addToLocationChat(locationChatRoomRef, "IN", "Alab");
    addToLocationChat(locationChatRoomRef, "IN", "Dolce");

    addToLocationChat(locationChatRoomRef, "IN", "Bansen");
    addInternToCompanyChat(companyChatRoomRef, "ChatterBox", "IN", "Dolce");

    createGroupChat(groupChatRoomRef, internRef, 1115, "Square Enix", (x) => {
        document.write(x);
    });
    
    addMessageToChat(locationChatRoomRef, "IN", "hey guys");
    addMessageToChat(locationChatRoomRef, "IN", "hello");
    addMessageToChat(locationChatRoomRef, "IN", "watsup");
    addMessageToChat(locationChatRoomRef, "IN", "no u");

    addMessageToChat(locationChatRoomRef, "IN", "msg1");
    setTimeout('addMessageToChat(locationChatRoomRef, "IN", "hs2ewa")', 100);
    setTimeout('addMessageToChat(locationChatRoomRef, "IN", "another one")', 200);
    setTimeout('addMessageToChat(locationChatRoomRef, "IN", "last one")', 300);

    addMessageToChat(groupChatRoomRef, "3Dogs and Doges", "hey guys");
    setTimeout('addMessageToChat(groupChatRoomRef, "3Dogs and Doges", "th is message")', 1000);
    setTimeout('addMessageToChat(groupChatRoomRef, "3Dogs and Doges", "th is messagener sd r one")', 2000);
    setTimeout('addMessageToChat(groupChatRoomRef, "3Dogs and Doges", "the")', 3000);

    removeFromChat(groupChatRoomRef, internRef, "3chat4", 1761);
    addToGroupChat(groupChatRoomRef, internRef, 1822, "3newChat ?");
    updateEmployeeChatDetails(chatRoomRef, employeeRef, 2436);

    createEmployeeChat(privateChatRoomRef, internRef, employeeRef, 1761, 2436, "Student", (x) => {
        document.write(x);
    });

    getMessages(locationChatRoomRef, "IN", (x) => {
        document.write(JSON.stringify(x));
    })

    addMessageToChat(groupChatRoomRef, "Sqaure Ensix", "hey guys");
    addMessageToChat(groupChatRoomRef, "Sqaure Ensx", "hello");

    createGroupChat(groupChatRoomRef, internRef, 1822, "Spicy meat-", (x) => {
        console.log(x);
    });
    addToGroupChat(groupChatRoomRef, internRef, 1761, "Spicy meat-");
    getChatrooms(internRef, 1003, (x) => {
        document.write(JSON.stringify(x));
    });
    removeFromChat(groupChatRoomRef, internRef, "3Spicy meat-", 1761);

    removeIntern(internRef, chatRoomRef, 1480);

    getInvite(groupChatRoomRef, "3chatName2", 1001, (x) => {
        document.write(x);
    });

    createEmployeeChat(privateChatRoomRef, internRef, employeeRef, 1115, 2436, "AASDF", (x) => {
        document.write(x);
    });


