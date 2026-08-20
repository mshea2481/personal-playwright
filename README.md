# README

A personal Ruby on Rails portfolio app with contact and inquiry forms, an admin
dashboard, and Playwright tests.

## Setup

You will need Ruby, Node.js, and SQLite installed.

```bash
bundle install
npm install
```

Create a `.env` file with an admin login for local development:

```dotenv
ADMIN_TEST_USERNAME=xxxx
ADMIN_TEST_PASSWORD=xxxx
```

Prepare the database and start the app:

```bash
bin/rails db:prepare
bin/dev
```

Visit [http://localhost:3000](http://localhost:3000).

## Tests

For Playwright tests, create `.env.test` with the same admin credentials, then
run:

```bash
npx playwright install
npx playwright test
```

Playwright starts the Rails test server automatically at
`http://127.0.0.1:3100` and uses a separate test database.
