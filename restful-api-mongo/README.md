# Example Mongo RESTful API

RESTful service power most any website today that receives and trasmits data via HTTP or HTTPS protocol. What you'll find below is what's used from express to run a simple set of Create, Read, Update, and Delete (CRUD) methods.

Only the bare essentials are used to create the API service, and only the feature used by express and mongoose (mongodb client) will be explained in this documentation guide.

_Caveats: Running this app assumes you have a working mongodb instance preinstalled on you machine_

## What you'll find

| Direcotry   | Description                                           |
| ----------- | ----------------------------------------------------- |
| models      | Representations of data to be used in mongodb.        |
| controllers | Functions to be bound and executed on routes.         |
| routes      | A series of routes for handling HTTP requests.        |
| middleware  | Other helful functions necessary for running the app. |



## MongoDB Setup and Installation

Follow the instructions below to get mongo installed.

For Windows users, follow the setup and install on the [MongoDB website](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/)

For Mac/Linux users:

```bash
# Install using brew
brew install mongodb

# Create the database directory
mkdir -p /data/db

# Give write ownership for the directory
# You will be prompted to enter your password
sudo chown -R `id -un` /data/db

# Run the service
mongod
```

In another terminal window, you can access the mongo shell with:

```bash
mongo
```

You'll know you sucessfuly ran the service and connected given the logs it presents you.

**NOTE: once configured, move onto the next steps.**

## Setup and Install

1. Install all packages:

```bash
npm install
```

2. Spin up the mongodb instance:

```bash
mongod
```

3. Run server instance (either one works):

```bash
npm start
```

## MongoDB Shell

Running the shell allows you to directly manage you databases and collections. *This is for advanced use and shouldn't be used without looking at the documentation or googling further instructions.*

In one terminal run:

```bash
mongod
# exit with CTRL + C
```

In another terminal window run:

```bash
mongo
# close the shell with
quit()
```
