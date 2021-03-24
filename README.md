# OBLIG 3 - IDG2100
Import the file `oblig-3 backend.postman_collection.json` from the main folder into postman to create the request needed to test the application.

To get started run `npm install` in the terminal inside this folder to install all the dependencies needed.

Start MongoDB Compass to use the DB. When inserting a new user using the signup endpoint in postman, the collection will be created automaticly in mongodb. Make a few users, both students and teachers to test out the update.

You will need to run `node index.js` or `nodemon index.js` if you use nodemon, in the terminal to start the server. Then in postman, you can start testing out the requirements.

&nbsp;

## Signup:
### localhost:3000/signup
You need to add query params in postman.
Change the VALUE to what you want to insert a new user, also create a user with role `teacher` to be able to test out the updates only the teacher are able to do.

| KEY      | VALUE                |
| -------- | -------------------- |
| name     | Jostein              |
| surname  | Tollefsrud           |
| email    | josteot@stud.ntnu.no |
| role     | student              |
| password | Password123          |
| place    | on-campus            |
| status   | available            |

&nbsp;

## Login:
### localhost:3000/login
You need to add query params in postman.
Copy the token provided to insert in the other requests.

| KEY      | VALUE                |
| -------- | -------------------- |
| email    | josteot@stud.ntnu.no |
| password | Password123          |

&nbsp;

## User profile
### localhost:3000/user/
Here you will need to add the secret token to get access.
When logging in you can copy the token, and insert in the query params.

| KEY          | VALUE             |
| ------------ | ----------------- |
| secret_token | secret token here |

&nbsp;

## Dashboard
### localhost:3000/dashboard
Here you can get all of the users if you dont give a parameter of the email to find. If you give the email to find, you will retrieve that specific user.
You need to provide the token in the query params to get access.

| KEY          | VALUE              |
| ------------ | ------------------ |
| secret_token | secret token here  |
| emailToFind  | email to find here |

&nbsp;

## Update user
### localhost:3000/user
You need to provide the token in the query params to get access.
If you are a student, the only values you can change is status and place. If you are a teacher you can change all the other values exept passwords, for every user in the DB. You only need to add the email to find as a query param for the user you want to change.

| KEY          | VALUE              |
| ------------ | ------------------ |
| secret_token | secret token here  |
| emailToFind  | email to find here |

Then in the body you can set the new values (newName, newSurname, newEmail, newRole, newStatus, newPlace).
Make sure to use `raw` and `JSON` in postman body.

Examples:

```
{
    "newStatus": "busy"
}
```
or :
```
{
    "newName": "John"
}
```

&nbsp;

## Reset the password
### localhost:3000/resetpassword
You have to add the email to send the new password to in the query params.
If the email exist, you will get a notification. If not, you will get a message saying the email is not found.

| KEY          | VALUE              |
| ------------ | ------------------ |
| emailToFind  | email to find here |

&nbsp;

## Logout
### localhost:3000/user/logout
As i have understood, the logout should be done in the client side to remove the token.
So i am not shure if i should do this in the backend. But you will need to be logged in to be able to access the /logout endpoint.