# Project overview

This application lets you, as a visitor, browse the different travel destinations available right now. As a logged in user, you are able to create new, delete or edit destinations.

I did not pay a lot attention to design, though the setup should be clean and understandable. I've listed improvements at the bottom of the file. 

## How to run

* `npm i`
* `npm start`

### Testuser

- username: `agent`
- password: `agent`

## Requirements overview

* R1: Completed
* R2: Completed
* R3: Completed
* R4: Partly-completed (Endpoints handles authentication (401) but not authorization (403). Have not written security checks.)
* R5: Not completed

* T1: Completed
* T2: Completed
* T3: Completed
* T4: Not attempted

## Endpoints overview

### Destinations API

* `GET /api/destinations`
* `GET /api/destinations/:id`
* `DELETE /api/destinations/:id`
* `POST /api/destinations`
* `PUT /api/destinations/:id`

### User Authorization API

* `POST /api/login`
* `POST /api/signup`
* `POST /api/logout`
* `GET /api/user`

## Test coverage

* run `npm run test`

* `32%`

Didn't quite reach my goal for coverage. I had some trouble with packages and versions, which made the tests not complete for a while. Got to fix it but doesn't seem I master testing well yet. Always room for improvements.

## Improvements overview

If I would have had time, I would make the following improvements:

### /server

* Make another API for activities that communicates with destinations. And here the user could add to the API or add activities to destination while creating a new destination. 

### /client

* Would make the file and folder structure a little more clean. 
* Use styled-components and styled-system for easier access to styling on the go(for efficency)
* More visual feedback to the user (for example, when login is successful, when a new destination is created/edited/deleted)

### other

* Better test coverage
* More attention to UI