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
cipher_suite = Fernet(SECRET_KEY)

def process_new_user(encrypted_data):
    try:
        # 1. Decrypt the incoming data
        decrypted_bytes = cipher_suite.decrypt(encrypted_data.encode())
        user_data = json.loads(decrypted_bytes.decode())
        
        # 2. Extract Values
        level_name = user_data.get("level")
        level_num = user_data.get("number")
        
        # 3. Simulate Database Save
        # database.save(username, level_name, level_num)
        
        return {
            "status": "SUCCESS",
            "msg": f"Operator Registered: {level_name}",
            "db_entry": {"clearance": level_num, "sector": "A3"}
        }
    except Exception as e:
        return {"status": "ERROR", "msg": "Decryption Failure: Invalid Token"}

# --- Example Usage ---
# This is what the frontend (or a secure service) would generate:
raw_data = json.dumps({"level": "SECRET", "number": 3})
encrypted_val = cipher_suite.encrypt(raw_data.encode()).decode()

print(f"Encrypted Value (Sent to Backend): {encrypted_val}")
# print(process_new_user(encrypted_val))