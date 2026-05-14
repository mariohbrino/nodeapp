# Overview

This is an example of node application for research and development for show case purposes. It
is a simple application to demonstrate how to create a node application that uses TypeScript, Express, and
PostgreSQL with Prisma. The project has Vitest for testing suite with Units, Features, Integrations, and Build 
Tests configured under the `tests` folder and GitHub Actions for Continuous Integration pipelines configured
for Linting, Formatting, and Type Checks.

# Web Pages

There are 4 pages in the application home page, users page, view post page, and create post page to demonstrate
the relationship between users and posts like a simple blog application. The home page show a list of posts with
some metadata like the author and the created at date. The users page show a list of users with a count of posts
the user has created. The users can interact with the pages by clicking on the post title to view the posts details
and clicking on the user name to view the user details with a list of posts titles created by the user.

# Development Environment

The application is build using nodejs with typescript and express along with other dependencies like Prisma ORM
for database, BrowserSync for hot module replacement in development, and Vitest for testing suite. The database
used is postgreSQL running in a Docker container or another host with the proper credentials configured in the
`.env` file.

## Initial Set up

Create and start a the PostgreSQL database container:

```bash
docker-compose up -d
```

Install dependencies:

```bash
npm install
```

Copy the .env file from the example template:

```bash
cp .env.example .env
```

Generate Prisma schema and client:

```bash
npm run schema:generate
```

Set up the database and seed it with initial data:

```bash
npm run db:dev
npm run db:seed
```

Start development server with BrowserSync for hot module replacement in development:

```bash
npm run dev
```

> Open the application in the browser at [http://localhost:3001](http://localhost:3001).
> To use the hot module replacement feature.

## Deployment of Application

Build and start the application:

```bash
npm run build
npm start
```

> Open the application in the browser at [http://localhost:3000](http://localhost:3000).
> Depends on the PORT configured in the `.env` file.

# Useful Websites

* [vscode](https://code.visualstudio.com/)
* [nodejs](https://nodejs.org/en)
* [npm](https://www.npmjs.com/)
* [docker](https://www.docker.com/)
* [podman](https://podman.io/)
* [express](https://expressjs.com/)
* [postgresql](https://www.postgresql.org/)
* [prisma](https://www.prisma.io/)
* [browsersync](https://www.browsersync.io/)
* [vitest](https://vitest.dev/)
