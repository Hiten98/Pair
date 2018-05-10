# Pair

A webapp created for our CS307 software engineering class at Purdue University. The frontend is written in javascript using the React framework and the elements are from material-ui, the server is written in javacript using nodejs and expressjs, and the database is in firebase. The app is also hosted in firebase with a shortened link at the end of the readme

It is a webapp that is supposed to help interns find other interns to live with during their time at their internship. 

There are 4 different types of accounts, admin, company, employee, and intern. The flow is that a company applies to the service where an admin has to accept them before they can add employees. When employees are added they are allowed to add interns. This structure allows for all users to be verified in one way or another, the company is verified by the admin, the employee is verified by the company, and the intern is verified by the employee. We did this structure because we only wanted interns to be able to contact and create housing groups with other interns instead of a random person off of the street trying to live with an intern, which increases security for the interns.

Interns are allowed to make groups and connections with other interns and after they have done that they go and look at housing under our housing tab. There they are allowed to see reviews of other interns who have stayed there and other information about that specific location. After they have found a house they like they can save that house to their group and the members can "like" different saved houses and see which location has the most "likes." An intern can also report and block other interns if they choose to. An intern can also see how much their preferences match with other interns through a percentage on the member's page.

Inside of the company chats there are moderators who are the employees and they have various powers over the interns. They can ban an intern which makes them not allowed to type in the company chat or they can remove the intern altogether. And because the intern is only tied to that company they are subsequently removed from the whole Pair service. 

The website can be accessed at bit.ly/PairInternHousing
