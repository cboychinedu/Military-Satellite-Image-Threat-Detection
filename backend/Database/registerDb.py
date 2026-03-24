# Importing the necessary modules 
import os 
import json
from cryptography.fernet import Fernet 

# Getting the encryption key
# encryptionKey = bytes(os.getenv("ENCRYPTION_KEY"))

# Creating the register database class 
class RegisterDatabase: 
    # Init method to load the db object 
    def __init__(self, db):
        # Load the database object 
        self.db = db 
        self.encryptionKey = bytes(os.getenv("ENCRYPTION_KEY").encode())
        self.cipherSuite = Fernet(self.encryptionKey)
        
    # Creating a method for decrypting the clearance code data 
    def decryptClearanceCode(self, clearanceCode): 
        # Decrypt the incoming data by using try except block 
        try:
            # Decrypt the clearance code  
            decryptedBytes = self.cipherSuite.decrypt(clearanceCode.encode())
            clearanceData = json.loads(decryptedBytes.decode())
        
            # Building the clearance response data 
            clearanceResponseData = {
                "status": "success", 
                "clearanceData": clearanceData, 
                "message": "|Clearance data decrypted."
            }
            
            # Returning the results 
            return clearanceResponseData; 
        
        # Except there was an error decrypting the clearance code 
        # Execut this block of code 
        except Exception as error: 
            # Create the error message 
            clearanceResponseData = {
                "status": "error", 
                "message": str(error), 
                "clearanceData": None 
            }
            
            # Returning the clearance response data 
            return clearanceResponseData; 

    # Creating a method to get data from the database to check if the 
    # user is registered 
    def getUserDataForRegistration(self, email): 
        # Creating the sql statement 
        sqlStatement = """
            SELECT id, fullname, email, password FROM users WHERE email = %s;
        """

        # Using try catch block to make the connection 
        try: 
            # Checking if the database is connected 
            if self.db.cursor:
                # Execute the search 
                self.db.cursor.execute(sqlStatement, (email,))

                # Fetch just one data 
                userData = self.db.cursor.fetchone() 

                # Checking if the user data is not empty 
                if (userData): 
                    # if the user data is not empty, execute 
                    # the block of code below 
                    responseData = {
                        "status": "success", 
                        "exists": True, 
                        "message": "User found!", 
                        "data": userData
                    }

                    # Returning the user data 
                    return responseData
                
                # if the user data is empty, execute the block of code below 
                else: 
                    # Create the response data 
                    responseData = {
                        "status": "error", 
                        "exists": False, 
                        "message": "User not found!"
                    }

                    # Returning the response data 
                    return responseData 
                
            # Else if there is no connection to the database 
            else: 
                # Creating the response data 
                responseData = {
                    "status": "error", 
                    "message": "Database not connected!", 
                    "connection": False 
                }

                # Sending the response data 
                return responseData 
            
        # On error generated, display the error message 
        except Exception as error: 
            # Display the error to the console 
            print(f"[Error]: {error}")

            # Rollback the data in case of error to keep the database in a consistent state 
            if self.db.conn: 
                self.db.conn.rollback() 

            # Returning the error message 
            databaseResponse = {
                "connection": False, 
                "status": "error", 
                "message": str(error)
            }

            # Returning the error message 
            return databaseResponse 
        
    # Creating a method to insert a user into the database 
    def insertNewUser(self, fullname, email, password, clearanceCode): 
        # Validating the clearance code 
        clearanceData = self.decryptClearanceCode(clearanceCode)
        
        # Checking if the clearance data was decrypted 
        if (clearanceData["status"] == "success"):
            # Getting the clearance level and number 
            clearanceLevel = clearanceData["clearanceData"]["level"]
            clearanceLevelNumber = clearanceData["clearanceData"]["number"] 
        
            # Creating the sql statement 
            sqlStatement = """
                INSERT INTO users (fullname, email, password, clearanceLevel, clearanceLevelNumber) 
                VALUES (%s, %s, %s, %s, %s); 
            """

            # Using the try except block to save the user's data into the database 
            try: 
                # Check if the cursor is active(connected) 
                if self.db.cursor: 
                    # if the database if connected, execute the block of code below 
                    self.db.cursor.execute(sqlStatement, (fullname, email, password, clearanceLevel, clearanceLevelNumber))

                    # Commit the changes to save the data 
                    self.db.conn.commit() 

                    # Create an object response 
                    databaseResponse = {
                        "connection": True, 
                        "status": "success", 
                        "message": "User registered!"
                    }

                    # Returning the database response 
                    return databaseResponse
                
                # Else if the cursor is not connected, execute this block 
                # of code below 
                else: 
                    # Create an object response 
                    databaseResponse = {
                        "connection": False, 
                        "status": "error", 
                        "message": "Database not connected!"
                    }

                    # Returning the database error response 
                    return databaseResponse 
            
            # On error generated, execute this block of code below 
            except Exception as error:
                # Display the error 
                print(f"[Error]: {error}")

                # Rollback in case of an error, to keep the database 
                # in a consistent state 
                if self.db.conn: 
                    self.db.conn.rollback() 

                # Returning an error message 
                databaseResponse = {
                    "connection": False, 
                    "status": "error", 
                    "message": str(error)
                } 

                # Returning the error message 
                return databaseResponse

        # Else if the clearance data status was not successful 
        else: 
            # Execute the block of code below if the clearance code was not decrypted 
            # Create the error message 
            databaseResponse = {
                "connection": False, 
                "status": "error", 
                "message": "Invalid clearance access code."
            }
            
            # Returning the error message 
            return databaseResponse

    

    