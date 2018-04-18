
	createCompany(adminRef, companyRef, "Make More", "makemore@gmail.com", "something", ["Paula Atlo, CA", "Loss Angels, CA"]);
	getCompanyFromName(companyRef, "Make More", (x) => {
		document.write(JSON.stringify(x));
	});
	createCompany(adminRef, companyRef, "Potatoes United", "potatoes@gmail.com", "something", ["Paula Atlo, CA", "Loss Angels, CA"]);
	getCompanyFromName(companyRef, "Potatoes United", (x) => {
		document.write(JSON.stringify(x));
	});

	getAdmin(adminRef, (x) => {
		document.write(JSON.stringify(x));
	});
	getAdminCompanies(adminRef, (x) => {
		document.write(JSON.stringify(x));
	});

	acceptCompany(adminRef, companyRef, "Make More");
    denyCompany(companyRef, "Potatoes United");

    getAdmin(adminRef, (x) => {
    	document.write(JSON.stringify(x));
    });
	getAdminCompanies(adminRef, (x) => {
		document.write(JSON.stringify(x));
	});

	getCompanyFromName(companyRef, "test", (x) => {
        document.write(JSON.stringify(x));
    });

    