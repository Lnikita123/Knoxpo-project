
Project - Contacts API
Key points
●	Create contact management api where a user can register and login and then after can enter contacts.
●	A logged in user can create a contact and can add them in the groups. 
●	A user will also be able to create a contact group.
User APIs :
REGISTER
●	Create a user 
●	Create a user document from the request body.
●	Return HTTP status 201 on a successful user creation. Also return the user document. 
●	Return HTTP status 400 if no params or invalid params received in the request body. 
    LOGIN
●	Allow an user to login with their email and password.
●	On a successful login attempt, return a JWT token containing the userId, exp, iat. The response should be a JSON object like this
●	If the credentials are incorrect, return a suitable error message with a valid HTTP status code. 

Contact Group APIs :
*These group of apis are only accessible to logged in user*
CREATE
●	Create a contact group.
●	Create a contact group document from the request body.
GET
●	Fetching contact group.
     GET-ALL
●	Fetching all contact groups of the user.
     UPDATE
●	Update contact group field/fields.
●	Add a particular contact to the group.
DELETE
●	Delete a contact group.

Contact APIs :
*These group of apis are only accessible to logged in user*
CREATE
●	Create a contact.
●	Create a contact document from the request body.
     GET
●	Fetching a particular contact.
     GET-ALL
●	Fetching all contacts of a logged in user.
     UPDATE
●	Update a particular contact field/fields.
     DELETE
●	Delete a contact.

DB Relationship
●	A user can have multiple contacts.
●	A user can have multiple contact-groups.
●	A contact-group can have zero to many contacts.
●	A contact can have zero to many contact-groups.


