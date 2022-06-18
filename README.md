# Team Treehouse Project 9 - REST API

This is a REST API to access a courses database.

To use run `npm install` then `npm start`. If you'd like nodemon running use `npm dev`

Runs on localhost:5000

| URI        | verb   | functionality                                                             |
| ---------- | ------ | ------------------------------------------------------------------------- |
| users      | GET    | Returns information for the currently authenticated user                  |
| users      | POST   | Creates a new user                                                        |
| courses    | GET    | Returns a list of courses and associated user with that course            |
| courses    | POST   | Creates a new course for the authenticated user                           |
| courses/id | GET    | Returns information about one individual course where id is the course id |
| courses/id | PUT    | Updates an invidual course for the authenticated user                     |
| courses/id | DELETE | Deletes an invidual course for the authenticated user                     |
