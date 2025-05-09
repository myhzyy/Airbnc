# AirBNC

This project is a simple relational database modeled after Airbnb, using seeding as the primary method for populating tables. It simulates the backend data structure of a property rental platform. The seeded sample data supports testing, development, and demonstration purposes.

## Connecting to the Database

To connect to the database; run psql -f createDb.sql.

This will DROP the database, CREATE a new instance of the database, then finally connect to the new database via the /c command.

## How it connects

In the dbConnectionPool.js file, the PostgreSQL connection pool accesses credentials through environment variables.

When you create a new Pool instance without parameters (const pool = new Pool()), it automatically looks for standard PostgreSQL environment variables (PGUSER, PGHOST, PGPASSWORD, PGDATABASE, PGPORT).

These variables are loaded from the .env file using the dotenv package.
