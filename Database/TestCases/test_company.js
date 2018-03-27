	
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