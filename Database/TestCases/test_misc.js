
	updateInternChatDetails(chatRoomRef, internRef, 1838);
    createGroupChat(groupChatRoomRef, internRef, 1264, "Science Talk", (x) => {
        console.log(x);
    })

    removeIntern(internRef, chatRoomRef, 1449)

    addHouse(groupChatRoomRef, houseRef, internRef, "3Video Games", "Zimmermann Dr; HOUSTON, TX 77088");
    addHouse(groupChatRoomRef, houseRef, internRef, "3My Housing", "Zimmermann Dr; HOUSTON, TX 77088");

    getNotifications(internRef, 1534, (x) => {
        document.write(JSON.stringify(x));
    });

    likeHouse(groupChatRoomRef, "3My Housing", "Zimmermann Dr; HOUSTON, TX 77088", 1731, (x) => {
        document.write(x);
    })

    var house = "1301 3rd St.; West Lafayette, IN 47906";
    var split = house.split(" ");
    var state = split[split.length - 2];
    var zip = split[split.length - 1];
    console.log(state + " " + zip);

    getCompanyFromName(companyRef, "test", (x) => {
        document.write(JSON.stringify(x));
    });

    houseRef.child("NY").child(10021).once("value").then(function(snapshot) {
        document.write(JSON.stringify(snapshot.val()));
    });

    internRef.orderByChild("firstName").once("value").then(function(snapshot) {
        var list = snapshot.val();
        function sortResults(prop, asc) {
            list = list.sort(function(a, b) {
                if (asc) {
                    return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0);
                } else {
                    return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0);
                }
            });
            showResults();
        }
        sortResults('firstName', true);
        document.write(list);
    });

    getReviews(houseRef, "11 Franklin St UNIT 602; San Francisco, CA 94102", (x) => {
    	document.write(JSON.stringify(x));
    });
    getReviews(houseRef, "11 Franklin St UNIT 602; San Francisco, CA 94102", (x) => {
    	document.write(JSON.stringify(x));
    });

    removeIntern(internRef, chatRoomRef, 1750);

    getSavedHouses(groupChatRoomRef, houseRef, "3Games", (x) => {
        document.write((JSON.stringify(x)));
    });

    blockUser(internRef, 1509, 1733);
    blockUser(internRef, 1509, 1822);
    getBlockedUsers(internRef, 1509, (x) => {
        document.write(JSON.stringify(x));
    });
    getIntern(internRef, 1509, (x) => {
        document.write(JSON.stringify(x));
    });
    unblockUser(internRef, 1509, 1733);
    getBlockedUsers(internRef, 1509, (x) => {
        document.write(JSON.stringify(x));
    });
    getIntern(internRef, 1509, (x) => {
        document.write(JSON.stringify(x));
    });