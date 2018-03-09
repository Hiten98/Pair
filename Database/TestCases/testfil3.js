
	createCompany(companyRef, "Mind Readers Inc", ["Atlanta", "Alaska"], "Tick Larson");
    createEmployee(employeeRef, 2432, "Miles", "Turner", "cho0cl133", "miles@turner.com", "Mind Readers Inc", "Atlanta", null, null, "/miles", null);
    createEmployee(employeeRef, 2339, "David", "Bunn", "b0n2n", "bunn@turner.com", "Mind Readers Inc", "Alaska", "I like taco bell", null, null, "@bunn");
    createEmployee(employeeRef, "2496", "Case", "Right", "p@ssword", "case@box.com", "Goggle", ["China", "Beijing", "Seoul"], "I like chipotle", "case.5", "case-right", "@case");
    createEmployee(employeeRef, "2944", "Johnnyy", "Cash", "passw0rd", "cash@goggle.com", "Goggle", ["India", "Beijing", "Pyeongcheng"], "I like chipotle", null, "linkedin.com/cash", "@Cash");

    createIntern(internRef, 1020, "swami@gmail.com", "BMI", "San Hose");
    createIntern(internRef, 1535, "ujjak@gmail.com", "Google", "San Hose");
    createIntern(internRef, 1953, "swapbil@gmail.com", "Mind Readers Inc", "San Hose");
    createIntern(internRef, 1400, "uiuc@gmail.com", "Carrot", "San Hose");

    createPassword(internRef, 1020, "werED");
    createPassword(internRef, 1535, "JNH6f");
    createPassword(internRef, 1953, "vfrgh7");
    createPassword(internRef, 1400, "yup890");

	verifyEmployee(employeeRef, 2339, "b0n2n", (x) => {
      document.write(x);
      document.write("one");
    })
    verifyEmployee(employeeRef, 2339, "FADS", (y) => {
      document.write(y);
      document.write("two");
    });

    getMasterListOfInterns(internef, "Goggle", (x) => {
      document.write(JSON.stringify(x));
    })
    getMasterListOfInterns(internRef, "Carrot",(y) => {
      document.write(JSON.stringify(y));
    });

    getBasicPreferences(internRef, 1340, (x) => {
      document.write(JSON.stringify(x));
    })
    getHousingPreferences(internRef, 1340, (x) => {
      document.write(JSON.stringify(x));
    })
    getRoommatePreferences(internRef, 1340, (x) => {
      document.write(JSON.stringify(x));
    })

    updateIntern(internRef, 1713, "Bob", "Janiel", "765223934");
    updateIntern(internRef, 1340, "Darwin", "Vaz", "765412131");

    