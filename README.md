# Group H - BookMQ

> Members: Henrietta Guo, Tatianna Lee, William Pei, Dong Hyun Lee

[![Work in Repl.it](https://classroom.github.com/assets/work-in-replit-14baed9a392b3a25080506f3b7b6d57f295ec2978f6f33ec97e36a161684cbe9.svg)](https://classroom.github.com/online_ide?assignment_repo_id=295530&assignment_repo_type=GroupAssignmentRepo)

- [Group H - BookMQ](#group-h---bookmq)
  - [Application Outline](#application-outline)
    - [Purpose](#purpose)
    - [Target User Group](#target-user-group)
    - [Data Sources](#data-sources)
  - [Milestones](#milestones)
    - [Minimal Viable Product](#minimal-viable-product)
    - [Additional features implemented](#additional-features-implemented)
  - [Source Code Guide](#source-code-guide)
    - [`server`](#server)
    - [`src`](#src)
  - [Next Steps](#next-steps)
  - [Main Roles and Communication](#main-roles-and-communication)

## Application Outline

### Purpose

The main purpose of this application is to provide a tutoring / buddying system for Macquarie University Students and Teachers.

### Target User Group

The target audience is Macquarie University students and teachers. There are two user classes: event organizers and event attendees.

Event organizers:

- Create a tutoring or other type of service
  - Specify availability
  - Set description / title
  - Set fee
  - Set max attendees

Event attendees:

- Book in a day and time slot for a tutoring service or event
- Leave feedback for attended services and events

We originally intended for the events to have the option for one-off or recurring. However we deemed the recurring events too complex for the MVP. As such, event organizers are only able to create an one-off event, and event attendees are only able to book a time for the entire event's duration.

### Data Sources

It was originally planned to use the Google Places / Maps APIs to display event location and autocomplete addresses, as well as Google federated login so that users can use their Macquarie University user accounts to sign into the website. However, the Google APIs cost money to use, and we did not have the permissions to implement federated login for Macquarie University google accounts.

The React component for Google ReCAPTCHA v2 is utilised to authenticate users and prevent the application against spam and automated abuse. The google recaptcha script loads and instantiates a reCAPTCHA that users can interact with. We needed to signup for an API key pair where the site key (public key) is used in our application, and the secret key is stored with google servers to authenticate the script.

## Milestones

Overall, we were able to implement most features we deemed necessary for the Minimal Viable Product (MVP), with a couple extra features listed below.

### Minimal Viable Product

Please see below for a table of our MVP milestones.

| Milestone / Feature   | Description                                                                                                                                    | Achieved | Comments                                                                |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- | -------- | ----------------------------------------------------------------------- |
| User registration     | Ability to create an user account                                                                                                              | &check;  |                                                                         |
| User login            | Ability to sign in with created user account                                                                                                   | &check;  |                                                                         |
| User profile          | Each user shall have their own user profile page where they can set a biography and view the list of events they have created                  | &check;  |                                                                         |
| Create event          | An authenticated user shall have the ability to create a new event                                                                             | &check;  |                                                                         |
| Edit event            | An event owner shall be able to edit the details of their event                                                                                | &cross;  | Deemed not needed for MVP                                               |
| Delete event          | An event owner shall be able to delete their events                                                                                            | &cross;  | Deemed not needed for MVP                                               |
| View event            | An authenticated user shall have the ability to view created events                                                                            | &check;  |                                                                         |
| Book event            | An authenticated user shall have the ability to book themselves into an event                                                                  | &check;  |                                                                         |
| View bookings         | An event owner shall be able to view bookings for their event. Each booking shall display the name of the attendee and the number of attendees | &check;  | The MVP allows any authenticated user to view the attendees of an event |
| View attending events | An authenticated user shall be able to view a list of events they are attending                                                                | &check;  |                                                                         |
| Leave a review        | A user who has booked and attended an event shall have the ability to leave a review on the event page                                         | &cross;  | Deemed not necessary for MVP                                            |

### Additional features implemented

During development, we implemented the additional features below.

| Milestone / Feature | Description                                                                                                                            | Achieved | Comments |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------------------- | -------- | -------- |
| Follow other users  | An authenticated user shall be able to follow another user                                                                             | &check;  |          |
| Promote event       | An event owner shall be able to promote / feature their event. A promoted event is displayed before an unpromoted events               | &check;  |          |
| reCAPTCHA           | A user can be authenticated to prevent against spam and automated abuse on the site. The reCAPTCHA v2 checkbox widget was implemented. | &check;  |

## Source Code Guide

Our code is split into the server code located in the `server` folder, and the frontend code located in the `src` folder.

### `server`

Please see below descriptions for what each folder in the `server` folder is used for.

| `foldername` | description                                                                                        |
| ------------ | -------------------------------------------------------------------------------------------------- |
| `__tests__`  | contains test suites for all of the routers provided by the api                                    |
| `middleware` | contains custom middleware for making sure users are authenticated                                 |
| `models`     | contains our MongoDB models for Bookings, Events, Profiles, and Users                              |
| `routers`    | contains all the routing logic for the API                                                         |
| `services`   | contains logic for creating, updating or deleting bookings, events, profiles and users             |
| `utils`      | contains utilities for getting tokens from requests, configuration, logging, and object validation |

### `src`

Please see below descriptions for what each folder in the `src` folder is used for.

| `foldername` | description                                                                                  |
| ------------ | -------------------------------------------------------------------------------------------- |
| `assets`     | contains all the assets used in the frontend, i.e. illustrations from unDraw                 |
| `components` | contains all the components that help make up the app                                        |
| `hooks`      | contains custom hooks for loading events, bookings, and getting viewport size                |
| `layouts`    | contains reusable layouts for use in pages                                                   |
| `pages`      | contains all the individual pages in the app                                                 |
| `security`   | contains the authentication context for the app                                              |
| `services`   | contains service logic for interfacing with the API                                          |
| `theme`      | contains the theme definitions used by the theme-ui library                                  |
| `utils`      | contains utilties such as axios util, config, datetime util, and local storage (for cookies) |

## Next Steps

Our next steps in the project would be as follows:

1. complete implementation for editing / deleting events
2. complete implementation for editing / deleting bookings
3. complete implementation of user menu options, i.e. account, notifications
4. add the ability to export events into Outlook, iCal, or Google calendar
5. add payment processing integration with a payment gateway, i.e. Stripe
6. add email notifications to remind users of upcoming events
7. add a Google Map alternative to the site to display event locations
8. add validation / autocomplete to address inputs to ensure valid addresses are entered
9. add a page to manage the user's account like resetting password, managing contact information privary, etc
10. add a notification system for when new bookings are added to an event the user owns, and a page to view these notifications

## Main Roles and Communication

We originally decided on the below roles:

- William Pei: backend expert
- Henrietta Guo: frontend expert
- Tatianna Lee: database expert

- Dong Hyun Lee: testing expert

However, Dong Hyun has been absent for the entirity of this project, and so the testing role was split between the three remaining group members. In terms of communication, the team set up a Messenger group where users could communicate freely with each other. We used this group to delegate tasks as well as make sure each person was on track.
