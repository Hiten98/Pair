
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

    createProfilePicture(internRef, 11111, "iVBORw0KGgoAAAANSUhEUgAAAQsAAAC9CAMAAACTb6i8AAAALVBMVEUAAAD////q6urLy8v5+fnOzs5TU1OPj49+fn7l5eXd3d3FxcWgoKAYGBhjY2PxHvqkAAABIUlEQVR4nO3QOQ6EQAxFQTcwrAP3Py4RgXHQAWn9+MmyKuLZ1dLOeO+fg6MEMaVgr8GWTwzdYi3BnIO2dIpf78021oIFCxYsWLBgwYIFCxYsWLBgwYIFCxYsWLBgwYIFCxYsWLBgwYIFCxYsWLBgwYIFCxYsWLBgwYIFCxYsWLBgwYIFCxYsWLBgwYIFCxYsWLBgwYIFCxYsWLBgwYIFCxYsWLBgwYIFCxYsWLBgwYIFCxYsWLBgwYIFCxYsWLBgwYIFCxYsWLBgwYIFCxYsWLBgwYIFCxYsWLBgwYIFCxYsWLBgwYIFCxYsWLBgwYIFCxYsWLBgwYIFCxYsWLBgwYIFCxYsWLBgwYIFCxYsWLBgwYIFCxYsWLBgwYIFCxZfLW7VPqzD24Hr0wAAAABJRU5ErkJggg==");
    createProfilePicture(internRef, 1822, "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");
    getImage(internRef, 1822, (x) => {
        document.write(JSON.stringify(x));
    });

    compareInterns(internRef, 1761, 1600, (x) => {
        console.log(x);
    });

	createComplaint(employeeRef, 2509, "Complaint about Hiten");
    createComplaint(employeeRef, 2509, "Another complaint about Hiten");
    createComplaint(employeeRef, 2509, "More complaints about Hiten");
    getEmployee(employeeRef, 2509, (x) => {
        document.write(JSON.stringify(x));
    });
    removeComplaint(employeeRef, 2509, "Another complaint about Hiten");

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

    compareInterns(internRef, 1600, [1761, 1600, 1761], (x) => {
      document.write(JSON.stringify(x));
    });
    compareInterns(internRef, 1600, [1822, 1600, 1761], (x) => {
      document.write(JSON.stringify(x));
    });

    getCompanyFromPin(companyRef, "3135", (x) => {
        document.write(JSON.stringify(x));
    });
    getCompanyFromName(companyRef, "Carrot", (x) => {
        document.write(JSON.stringify(x));
    });

    verifyCompany(companyRef, "head@carrot.com", "something", (x) => {
        console.log(x);
    });
    verifyCompany(companyRef, "head@carrot.com", "somthing", (x) => {
        console.log(x);
    });
	verifyCompany(companyRef, "head@carrot.com", "something", (x) => {
        document.write(x);
    })

    getIntern(internRef, 1822, (x) => {
        document.write(JSON.stringify(x));
    });

    

    addToLocationChat(locationChatRoomRef, internRef, "Up here", 1480);
    createPrivateChat(privateChatRoomRef, internRef, 1822, 1761, "Old school club", (x) => {
        document.write(x);
    });

    getAdmin(adminRef, (x) => {
        document.write(JSON.stringify(x));
    });


	getCompany(companyRef, 3135, (x) => {
        document.write(JSON.stringify(x));
    });

    getEmployee(employeeRef, 2658, (x) => {
        document.write(JSON.stringify(x));
    });

    getIntern(internRef, 1340, (x) => {
        document.write(JSON.stringify(x));
    });

    document.write(removeIntern(internRef, 1340));

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








