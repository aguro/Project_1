# KinoBambinoApp

## Angular + Express + PostgreSQL Project
This project was generated with Angular CLI version 15.2.6. In addition, it is based on PostgreSQL and Express technologies. The project uses various solutions, which are presented below.

### Description of functionality
The project is used for searching movies and adding ratings by users. Some data is retrieved from an external API while other data is taken from the PostgreSQL database. Users can register and log into the system. Error handling has been implemented for security reasons.

### Technologies used
The project utilizes the following technologies:

* Angular - a framework for building web applications
* Express - a framework for building servers in Node.js
* PostgreSQL - a relational database

### External API
To retrieve movie data, an external API has been used. The API provides various endpoints that allow for retrieving movie information.

### PostgreSQL database
The project uses a relational PostgreSQL database to store user information and ratings added by them to movies.

### User registration and login
Users can register and log into the system. User data is stored in the PostgreSQL database and their passwords are encrypted for security reasons.

### Adding and displaying ratings
Users can add ratings to movies and their entries are stored in the PostgreSQL database. Rated movies and their ratings are displayed to users.

### Error handling
For security reasons, error handling has been implemented in the project. Errors are handled at the application level and server level.

### Summary
The project utilizes Angular, PostgreSQL and Express technologies, allowing users to search for movies, add and display ratings, register and log into the system. Error handling has been implemented for security reasons.

## STARTING PROJECT

### Development server Angular

`cd kino-bambino-app/src/app`

Run `npm  start` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

### Development server Express

`cd server`

Run `npm  start` for a dev server. Navigate to `http://localhost:3000/api`. The application will automatically reload if you change any of the source files.

### DB PostgreSQL

`cd server/database`

**Running the database schema:**
* Install PostgreSQL on your computer.
* Create an empty database in PostgreSQL.
* Run the schema.sql file to create the database schema in the new database.

## TESTING DATA
**Users:**
* login: test1@test password: test1
* login: test2@test password: test2
* login: test3@test password: test3
* login: test4@test password: test4
* login: test5@test password: test5
* login: test6@test password: test6

**Movies:**
* http://localhost:4200/movie-details/9259
* http://localhost:4200/movie-details/46189
* http://localhost:4200/movie-details/28526
* http://localhost:4200/movie-details/2349
