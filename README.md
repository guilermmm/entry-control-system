# Entry control system

## Objective

Store entries of visitors in a determined unit of an institution, each unit containing n sectors and each sector containing n employees

## Functionalities

- Each unit store only their visits, but share the visitors data.

- Visit is composed by a visitor that can be registered or fetched from the database by CPF, the unit and sector which they're visiting and the time of finalization.

- Employees have 3 levels of permission:
  - Admin: Register units, sectors and employees in general, including other admins.
  - Attendant: Register visitor and controls visits of your respective unit and access finalized visits history.
  - Employee: Can access the list of visitors in your respective sector and finalize the visit.

## Technologies

- [TypeScript](https://www.typescriptlang.org/)
- [ExpressJS](https://expressjs.com/)
- [Prisma](https://www.prisma.io/)
- [Vite](https://vitejs.dev/)
- [ReactJS](https://reactjs.org/)
- [TailwindCSS](https://tailwindcss.com/)

## TODOS

- [x] Back-End initialized
  - [x] Database
  - [x] CRUD of all tables
  - [x] User auth with password encryption
  - [x] Deploy in production
- [x] Front-End
  - [x] User auth
  - [x] Finish axios fetches
  - [x] Login screen
  - [x] Home screen
  - [x] User permission level access to each area
    - [x] Admin area screen
    - [x] Attendant area screen
    - [x] Employee area screen
  - [ ] Finalized visits history on attendant
