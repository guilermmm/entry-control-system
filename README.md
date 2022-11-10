# Entry control system

## Objective

Store entries of visitors in a determined unit of an institution, each unit containing n sectors and each sector containing n employees

## Functionalities

- Each unit store only their visits, but share the visitors data.

- Visit is composed by a visitor that can be registered or fetched from the database by CPF.

- Employees have 3 levels of permission:
  - Admin: Register units, sectors and employees in general, including other admins.
  - Attendant: Register visitor and controls visits of your respective unit.
  - Employee: Can access the list of visitors in your respective sector and finalize the visit.

## Technologies

- [ExpressJS](https://expressjs.com/)
- [ReactJS](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)

## TODOS

- [x] Back-End
  - [x] Database
  - [x] CRUD of all tables
  - [x] User Auth with password encryption
  - [ ] Deploy in production
- [ ] Front-End
  - [ ] Login screen and user auth for the rest
  - [ ] User permission level access to each area
  - TBD
