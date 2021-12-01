# Project overview

This is my attempt at Web and API exam, fall 2021.

This application lets you, as a visitor, browse the different travel destinations available right now. As a logged in user, you are able to create new, delete or edit destinations.

I did not pay a lot attention to design, though the setup should be clean and understandable. I've listed improvements at the bottom of the file. 

## How to run

1. `npm i`
2. `npm run build`
3. `npm start`

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

`over and out`
