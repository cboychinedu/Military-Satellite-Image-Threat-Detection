# Importing the necessary modules 
from cryptography.fernet import Fernet
import json

# Setting the clearance level 
clearanceLevel = {
    "UNCLASSIFIED": 0,    # Publicly available data
    "RESTRICTED": 1,      # Internal use only
    "CONFIDENTIAL": 2,    # Low-level sensitive data
    "SECRET": 3,          # Potential for serious damage if leaked
    "TOP SECRET": 4,      # Potential for exceptionally grave damage
    "SCI": 5
}

# In a real app, save this key in your .env file!
# Generate one using Fernet.generate_key()
SECRET_KEY = b'VhnA0LsUjY430S_gTd3B65pazAZZF7md5wfQDDMjb74='
cipherSuite = Fernet(SECRET_KEY)

# Creating a function for encrypting the new user data 
def encryptNewUser(clearanceData): 
    # Using try except block 
    try:
        # Create the raw data 
        clearanceData = json.dumps(clearanceData) 
        
        # Encrypt the data 
        encryptedData = cipherSuite.encrypt(clearanceData.encode()).decode()
        
        # returning the encrypted data 
        return encryptedData
    
    # Exception as error 
    except Exception as error: 
        return "Error encrypting the data"
        

# Creating a function for decrypting the new user enctypted data
def decryptNewUser(encryptedData): 
    # Using try except block 
    try:
        # Decrypt the incoming data 
        decryptedBytes = cipherSuite.decrypt(encryptedData.encode())
        userData = json.loads(decryptedBytes.decode())
        
        # Extract values 
        levelName = userData.get('level')
        levelNumber = userData.get('number')
        
        # Save the data 
        ###############
        
        # Return the success 
        return {
            "status": "SUCCESS", 
            "message": f"Operator Registered: {levelName}"
        }
    
    # Except 
    except Exception as error: 
        # Return the error message 
        return {
            "status": "ERROR", 
            "message": "Decryption Failure: Invalid Token"
        }
        
        
# Setting the clearance data 
clearanceData = {
    "level": "SECRET", 
    "number": 3
}

# Getting the result
result = encryptNewUser(clearanceData)
print(result) 