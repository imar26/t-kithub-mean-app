# T-Kithub 

A complete web application that allows anyone to search, view and book ticket for any events.
This application fetches a wide range of events from Ticket master API and has events across various categories like Music, Films, Sports and Arts & Theatre.
The application allows users to sign up and book tickets for any event seamlessly and with a great user experience.

### Overview of the application
* This web application allows user to sign up/login. Error handling has been done for the login/register use case. Incorrect username/password won't allow the user to login. 
* The application also allows user to login using facebook & google. User also has the privilege to request a new password if he/she forgets it. 
* On successful registration, email is sent to the registered email address of the user. 
* User can view top three events based on his/her location, can view all events, search for events, filter events by name, location, category, price and date, sort events by name, location and date, view details of a single event, add to cart, select package and quantity of seats and book ticket.
* User can also download a pdf copy of his/her ticket and can view order history.
* Users can add coupons while making final payment. 
* Application allows admin user to download a csv report of all the active users. Admin performs CRUD operation to add/read/update & delete coupon codes.

### Features/functionalities
* CRUD Operations performed by admin on deals
* CRUD Operations performed by user on cart
* Login, Logout, Registration, Reset Password, Google+ sign in, Facebook Sign in using Passport JS
* Authentication/Authorisation using passport js
* Performed search, sorting, filtering & pagination on the list of events
* Detailed view of every event
* View top three events based on location
* Update(Allow or Block) user's location using geolocation
* Displayed count down timer for top three upcoming events
* View events based on category
* Sent mail upon successful registration and forget password using nodemailer
* Fetched events from ticket master API
* Marked event location on Maps using Angular2-google maps
* Upon successful booking of order, users can download pdf copy of their ticket
* Admin can view and download list of active users 
* Display dates and time based on time zone of a particular location using moment js

## Steps to Setup and Run the Application

### Installation and Running
1. You need to have **angular cli**, **node.js** and **npm** installed on your machine. Once installed, you can check the versions using the below commands

```sh
node -v
npm -v
```
Links for reference:
* [install node.js](https://nodejs.org/en/download/)
* [install angular-cli](https://github.com/angular/angular-cli)

2. Clone the project from GitHub Repository and Install all the necessary packages
```sh
git clone https://github.com/neu-mis-info6150-spring-2018/final-project-techcratofficial.git
cd final-project-techcratofficial
npm install
```
3. Start node.js server
```sh
node server.js
```

4. Start angular server
```
ng serve
```

5. Start Mongo server
    1. In one shell run
        ```
        mongod.exe
        ```
    2. In another shell run
        ```
        mongo
        ```

6. Open your browser and go to [http://localhost:4200/](http://localhost:4200/)

### Technologies Used

* Node.js
* Angular 4
* Mongo DB
* Express JS
* REST API
* Ticketmaster API
* Moment JS
* Passport JS
* Google maps API
* SCSS

### Production

Application deployed on: https://t-kithub.herokuapp.com/
