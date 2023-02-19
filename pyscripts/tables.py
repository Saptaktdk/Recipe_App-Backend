PROFILE_TABLE = "profiles"
RECIPE_TABLE = "recipes"
TOKEN_TABLE = "tokens"


def createRecipeTable(cursor,connection): 
    query = "create table {} (id bigserial primary key not null, name varchar(128) not null, ingredients varchar(256) not null, directions varchar(256) not null, profile_id int not null);".format(RECIPE_TABLE)

    #? initialise the recipe table
    cursor.execute(query)

    #? migrate the changes
    connection.commit()

def createProfileTable(cursor, connection): 
    query = "create table {} (id bigserial primary key not null, name varchar(128) not null, email varchar(128) not null, password varchar(256) not null);".format(PROFILE_TABLE)

    #? initialise the profile table
    cursor.execute(query)
    
    #? migrate the changes
    connection.commit()

def createTokenTable(cursor, connection): 
    query = "create table {} (id bigserial primary key not null, token varchar(256) not null, profile_id int not null);".format(TOKEN_TABLE)

    #? initialise the token table
    cursor.execute(query)

    #? migrate the changes
    connection.commit()
