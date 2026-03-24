# Command for creating a database 
$  createdb -U $(whoami) satelliteAnalysis 

# Accessing the database table 
$ psql -d satelliteAnalysis -U $(whoami) 

# View all databases 
4 \l 

# View all tables in the database 
\dt 

# View table structure 
\d users

# Delete entire table 
$ DROP TABLE users; 

# Exit the postgresql shell 
\q 
