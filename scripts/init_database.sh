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
# HOME_PATH and SE_PATH are inherited from the invoking script.

ROOT_PASSWD_FILE=$HOME_PATH/mysql_root_passwd
SE_USR_PASSWD_FILE=$HOME_PATH/se_mysql_usr_passwd
DUMP_FILE=$SE_PATH/../../../../../../../content/cse08-se_db.sql
DB=db_isad
USR=u_isad
MYSQL=$(which mysql)
PYTHON=$(which python)

ROOT_PASSWD=x
USR_PASSWD=x


# A function to generate a random password
# http://serverfault.com/a/261417/58453
generate_password() {
	cat /dev/urandom | tr -dc 'a-zA-Z0-9-_!@#$+=' | fold -w 12 | head -n 1
}

# If the root password file exists, read the root password
# Otherwise, create the file
if [[ -f "$ROOT_PASSWD_FILE" && -r "$ROOT_PASSWD_FILE" ]]
then
	ROOT_PASSWD=$(cat "$ROOT_PASSWD_FILE")
else
	ROOT_PASSWD=generate_password()
	echo "$ROOT_PASSWD" > "$ROOT_PASSWD_FILE"
	chmod -w "$ROOT_PASSWD_FILE"
fi


if [[ -f "$SE_USR_PASSWD_FILE" && -r "$SE_USR_PASSWD_FILE" ]]
then
	USR_PASSWD=$(cat "$SE_USR_PASSWD_FILE")
else
	USR_PASSWD=generate_password()
	echo "$USR_PASSWD" > "$SE_USR_PASSWD_FILE"
	chmod -w "$SE_USR_PASSWD_FILE"
fi


# SQL
Q1="CREATE DATABASE IF NOT EXISTS $DB;"
Q2="GRANT SELECT, INSERT, UPDATE, DELETE, CREATE, DROP, REFERENCES, INDEX, ALTER, LOCK TABLES ON \`$DB\`.* TO '$USR'@'localhost' IDENTIFIED BY '$USR_PASSWD';"
Q3="FLUSH PRIVILEGES;"

SQL="${Q1}${Q2}${Q3}"

$MYSQL --user=root --password=$ROOT_PASSWD --execute="$SQL"

## Now initialize the databse with contents
$MYSQL --user=root --password=$ROOT_PASSWD < "$DUMP_FILE"

## Invoke syncdb to create tables necessary for django -- but has the code been
## deployed yet?
#$PYTHON $SE_PATH/manage.py syncdb
