# Command for creating a database 
$  createdb -U $(whoami) satelliteAnalysis 

# Accessing the database table 
$ psql -d satelliteAnalysis -U $(whoami) 