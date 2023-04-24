# Recipe_App_Backend
A Backend implementation of a Recipe App in node.js and postgresql.

# Install and Run:
Docker is the most convenient way to build and run the `Recipe_App_Backend`
To install and run using docker, run docker-compose:

> In Developement Mode:

    docker-compose -f docker-compose.dev.yml up -d --build


or using Makefile:

    make compose_dev_up_linux (If using linux)

    make compose_dev_up_rest (If using mac or windows)

    make compose_stage_up_linux (If using linux)

    make compose_stage_up_rest (If using mac or windows)

## Environment
Recipe_App supports the following environments:

- local

- dev

- staging

## Routes:

### Auth:

1. `POST /auth/register`: Register a new profile

2. `POST /auth/login`: Login into the account

3. `Post /auth/token`: Generate Access Token

4. `POST /auth/logout`: Logout from the account



### API(Profile):

1. `GET /api/profile?name=''`: Get profile by name

2. `GET /api/profile/:id`: Get profile by id

3. `PUT /api/profile/update`: Update profile

### API(Recipe):

1. `GET /api/recipe/all`: Get all recipes

2. `GET /api/recipe/:id`: Get recipe by id

3. `GET /api/recipe?name=''`: Get recipe by name

4. `POST /api/recipe/add`: Add a new Recipe Item

5. `PUT /api/recipe/update/:id`: Update recipe by id

6. `DELETE /api/recipe/delete/:id`: Delete recipe by id

7. `DELETE /api/recipe/`: Delete all recipes