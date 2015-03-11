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

ROOT_PASSWD_FILE=$HOME_PATH/mysql_root_passwd
USR_PASSWD_FILE=mysql_usr_passwd

# If the root password file exists, read the root password
# Otherwise, create the file
ROOT_PASSWD=$(cat $ROOT_PASSWD_FILE)
DB=db_isad
USR=u_isad
USR_PASSWD=abcd
MYSQL=$(which mysql)

Q1="CREATE DATABASE IF NOT EXISTS $DB;"
Q2="GRANT SELECT, INSERT, UPDATE, DELETE, CREATE, DROP, REFERENCES, INDEX, ALTER, LOCK TABLES ON \`$DB\`.* TO '$USR'@'localhost' IDENTIFIED BY '$USR_PASSWD';"
Q3="FLUSH PRIVILEGES;"

SQL="${Q1}${Q2}${Q3}"

$MYSQL -uroot -p$ROOT_PASSWD -e "$SQL"
