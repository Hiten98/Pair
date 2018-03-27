
	createComplaint(employeeRef, 2509, "Complaint about Hiten");
    createComplaint(employeeRef, 2509, "Another complaint about Hiten");
    createComplaint(employeeRef, 2509, "More complaints about Hiten");
    getEmployee(employeeRef, 2509, (x) => {
        document.write(JSON.stringify(x));
    });
    removeComplaint(employeeRef, 2509, "Another complaint about Hiten");

    getIntern(internRef, 1822, (x) => {
        document.write(JSON.stringify(x));
    });

    createComplaint(adminRef, 4000, "Jack Stack", "Alfred X", "Complaint goes here");
    createComplaint(adminRef, 4000, "Person AB", "Json Pin", "Complaining about life");

    getAdmin(adminRef, (x) => {
        document.write(JSON.stringify(x));
    });

    getInvite(groupChatRoomRef, "3chatName2", 1001, (x) => {
        document.write(x);
    });
