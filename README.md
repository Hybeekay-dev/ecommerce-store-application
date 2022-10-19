# Ecommerce Store Application - Enyata Assessment Test (Backend Engineer)

## Requirements

For development, you will only need Node.js, a node global package, npm, MySQL and Docker installed in your development environment.

### Node
- #### Node installation on Windows

  Just go on [official Node.js website](https://nodejs.org/) and download the installer.
  Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

- #### Node installation on Ubuntu

  You can install nodejs and npm easily with apt install, just run the following commands.

      $ sudo apt install nodejs
      $ sudo apt install npm

- #### Node installation on macOS

  You can install nodejs and npm easily with brew install, just run the following commands.

      $ brew install node

### MySQL
- ### Installation

  Visit [MySQL official documentation](https://dev.mysql.com/doc/mysql-installer/en/) for installation guide.

### Docker
- ### Installation

  Visit [Docker official website](https://docs.docker.com/engine/install/) for installation guide.
---

## Clone

    $ git clone https://github.com/pastorcode/ecommerce-store-application
    $ cd ecommerce-store-application

## Configure app
- Create a ```.env``` file
- Copy the contents of ```.env.sample``` into the ```.env``` file
- Replace the database credentials if necessary
- Create the database on your local MySQL instance
- Run the ````setup.sh```` file in the project root. \
    If you got a permission error, please run ```chmod +x setup.sh``` to change permission, then try again.\
    The ```setup.sh``` file does the following:

  - Install project dependencies
  - Runs the project build



## Assumption
- Only the Customer & Order module is to be implemented.


## Run app

- Run ```npm start``` to start the app (app runs on PORT 3001 by default).
- [Published Postman Collection URL](https://documenter.getpostman.com/view/23960434/2s847JuCZu)

## Docker

```bash
# start container
npm run docker:up

# stop container
npm run docker:down
