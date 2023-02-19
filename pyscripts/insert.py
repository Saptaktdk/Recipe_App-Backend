PROFILE_TABLE = "profiles"
RECIPE_TABLE = "recipes"
TOKEN_TABLE = "tokens"

def insertRecipe(cursor,connection):
    query = "insert into {} (name,ingredients,directions,profile_id) values('Biriyani', 'rice, chicken, onions, turmeric, ghee', 'step1,step2,step3','1')".format(RECIPE_TABLE)

    #? initialise the recipe table
    cursor.execute(query)

    #? migrate the changes
    connection.commit()

def insertProfile(cursor,connection):
    query = """insert into {} (name,email,password) values('Saptak Das','saptak@gmail.com','testing@123')""".format(PROFILE_TABLE)

    #? initialise the recipe table
    cursor.execute(query)

    #? migrate the changes
    connection.commit()

def insertToken(cursor,connection):
    query = "insert into {} (token,profile_id) values('srtsrtsrwtrrseawaw22342q43254','1')".format(TOKEN_TABLE)

    #? initialise the recipe table
    cursor.execute(query)

    #? migrate the changes
    connection.commit()