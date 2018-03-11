	
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

    
    