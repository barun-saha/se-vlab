#!/bin/bash
#
# This script creates the MySQL database, a user ID and password, and provides
# privileges to the user on the tables of the database. The contents would be
# inserted into the tables of the database created.
#
# Source: http://clubmate.fi/shell-script-to-create-mysql-database/
#
# Barun Saha (http://barunsaha.me)
# 11 March 2015, IIT Kharagpur
#

# The root password for MySQL database is shared by both SE and ANT in case
# they are hosted in the same container.
# HOME_PATH and SE_PATH are inherited from the invoking script (configure.sh).

source ../scripts/common.sh

log '*** Executing init_database.sh'
log $TIMESTAMP 'Host: ' $SYSTEM
log 'Current directory is: ' $CURRENT_DIR
log 'Proxy is: ' $PROXY

ROOT_PASSWD_FILE=$HOME_PATH/mysql_root_passwd
SE_USR_PASSWD_FILE=$HOME_PATH/se_mysql_usr_passwd
DUMP_FILE=$SE_PATH/../../../../../../../content/cse08-se_db.sql
DB=db_isad
USR=u_isad

ROOT_PASSWD=x
USR_PASSWD=x

# If the root password file exists, read the root password
# Otherwise, create the file
log '6. Reading password for MySQL root user'

if [[ -f "$ROOT_PASSWD_FILE" && -r "$ROOT_PASSWD_FILE" ]]
then
	ROOT_PASSWD=$(cat "$ROOT_PASSWD_FILE")
else
	ROOT_PASSWD=$(generate_password)
	echo "$ROOT_PASSWD" > "$ROOT_PASSWD_FILE"
	chmod -w "$ROOT_PASSWD_FILE"
fi


log '7. Reading password for MySQL user'

if [[ -f "$SE_USR_PASSWD_FILE" && -r "$SE_USR_PASSWD_FILE" ]]
then
	USR_PASSWD=$(cat "$SE_USR_PASSWD_FILE")
else
	USR_PASSWD=$(generate_password)
	echo "$USR_PASSWD" > "$SE_USR_PASSWD_FILE"
	chmod -w "$SE_USR_PASSWD_FILE"

	# Since the MySQL user's password is generated again, it is possible that
	# credentials.py used by Django contains an old database password. So,
	# remove that file to better be safe.
	rm -f "$SE_PATH/credentials.py"
fi



## Database installation
sudo -E apt-get -y install debconf debconf-utils
# For purging debconf settings
echo PURGE | debconf-communicate mysql-server

log '8. Installing MySQL'
sudo apt-get remove --purge -y "^mysql.*"
#sudo apt-get autoremove
#sudo apt-get autoclean
sudo rm -rf /var/lib/mysql
sudo rm -rf /var/log/mysql 

#ROOT_PASSWD=$(cat "$ROOT_PASSWD")
echo mysql-server mysql-server/root_password password $ROOT_PASSWD | debconf-set-selections
echo mysql-server mysql-server/root_password_again password $ROOT_PASSWD | debconf-set-selections
sudo DEBIAN_FRONTEND=noninteractive apt-get -y install mysql-server

if [[ $? -ne 0 ]]
then
	error 'Installation of mysql-server failed!'
fi


## Database creation
# SQL
Q1="CREATE DATABASE IF NOT EXISTS $DB;"
Q2="GRANT SELECT, INSERT, UPDATE, DELETE, CREATE, DROP, REFERENCES, INDEX, ALTER, LOCK TABLES ON \`$DB\`.* TO '$USR'@'localhost' IDENTIFIED BY '$USR_PASSWD';"
Q3="FLUSH PRIVILEGES;"

SQL="${Q1}${Q2}${Q3}"

log '9. Creating database'
MYSQL=$(which mysql)
log "mysql location is $MYSQL"
$MYSQL --user=root --password=$ROOT_PASSWD --execute="$SQL"

if [[ $? -ne 0 ]]
then
	error 'Failed to create MySQL database!'
fi

log "Database $DB created."


# Now initialize the databse with contents
log '10. Restoring database dump'
$MYSQL --user=root --password=$ROOT_PASSWD "$DB" < "$DUMP_FILE"

if [[ $? -ne 0 ]]
then
	error 'Failed to initialize database with SQL dump!'
fi


## Invoke syncdb to create tables necessary for Django -- but has Django been
## installed yet?
#log '11. Executing syncdb'
#PYTHON=$(which python)
#$PYTHON $SE_PATH/manage.py syncdb

#if [[ $? -ne 0 ]]
#then
#	error 'Failed to run syncdb!'
#fi
