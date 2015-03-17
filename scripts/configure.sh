#!/bin/sh
#
# User account required for hosting the source code
# Note: The default user is barun -- if you change this, you need to
# manually update the settings.py file
#
# [Originally created by Chandan Gupta (IIIT-H)]
# Updated by Barun Saha (http://barunsaha.me)
# 16 March 2015
# IIT Kharagpur
#

LOG_FILE=cse08.log
CURRENT_DIR=$(pwd)
TIMESTAMP=$(date +'%F %T')
SYSTEM=$(hostname)

echo '*** Executing configure.sh' >> "$LOG_FILE"
echo $TIMESTAMP 'Host: ' $SYSTEM >> "$LOG_FILE"
echo 'Current directory is: ' $CURRENT_DIR >> "$LOG_FILE"

echo '1. Creating user barun' >> "$LOG_FILE"
USER=barun
useradd -m "$USER"

HOME_PATH=/home/"$USER"
SE_PATH=$HOME_PATH/codes/python/django/nb/ISAD/src/vlabs
CUR_PATH=$(pwd)


# Directories where intermediate files would be created
echo '2. Creating directories' >> "$LOG_FILE"
mkdir -p /var/vlabs/isad/uml/img
mkdir -p /var/vlabs/isad/cfg
mkdir -p /var/vlabs/isad/uploads/image_uploads
chown -R www-data /var/vlabs

# Code movement goes to Makefile
##mv ../codes /home/barun/codes
#mv ../codes "$HOME_PATH"/codes
#cp ../conf/httpd.conf /etc/apache2/
#mv ../conf/www /usr/local/
echo '3. Invoking make deploy for deploying code' >> "$LOG_FILE"
make deploy
#echo "Cur dir is: $(pwd)"


# Initialize the database
# Note: You must have the following two SQL files available
# Create user and catalog -- *TEMPORARILY* disabled
##mysql -u root < cse08-se_init.sql
# Create tables and populate data
##mysql -u root db_isad < cse08-se_db.sql


# Create symlinks
echo '4. Creating symlinks' >> "$LOG_FILE"
#ln -s /var/vlabs/isad/ /home/barun/codes/python/django/nb/ISAD/src/vlabs/media/isad_erd
ln -s /var/vlabs/isad/ "$SE_PATH"/media/isad_erd
#ln -s /var/vlabs/isad/uploads /home/barun/codes/python/django/nb/ISAD/src/vlabs/media/uploads
ln -s /var/vlabs/isad/uploads "$SE_PATH"/media/uploads
#ln -s /var/vlabs/ /home/barun/codes/python/django/nb/ISAD/src/vlabs/media/vlabs
ln -s /var/vlabs/ "$SE_PATH"/media/vlabs

# Generate the secret key -- No more required; invoked from settings.py
#cd "$SE_PATH" && python utils/generate_secret_key.py
#cd "$CUR_PATH"


echo '5. Invoking script for creating database' >> "$LOG_FILE"
source init_database.sh
