import psycopg2
from dotenv import load_dotenv
import os
from tables import createProfileTable,createRecipeTable,createTokenTable
from insert import insertProfile, insertToken, insertRecipe

load_dotenv('./.env.db')
print(os.getenv('POSTGRES_DB'))

connection = psycopg2.connect(
    database=os.getenv('POSTGRES_DB'),
    user=os.getenv('POSTGRES_USER'),
    password=os.getenv('POSTGRES_PASSWORD'),
    host="localhost",
    port="5432"
)

def main():
    #? creating the connection
    cursor = connection.cursor()
    cursor.execute("select version()")
    data = cursor.fetchone()
    print("connection established to: ", data)
    
    #?create profileTable
    createProfileTable(cursor,connection)

    #?create recipeTable
    createRecipeTable(cursor, connection)

    #?create tokenTable
    createTokenTable(cursor, connection)

    #? Insert Profile    
    insertProfile(cursor,connection)

    #? Insert Recipe
    insertRecipe(cursor,connection)

    #? Insert Token
    insertToken(cursor,connection)


    #?closing the connection
    cursor.close()
    connection.close()
    print("connection closed")


if __name__ == "__main__":
    main()