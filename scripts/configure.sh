#!/bin/sh
#
# User account required for hosting the source code
# Note: The default user is barun -- if you change this, you need to
# manually update the settings.py file
#
# [Originally created by Chandan Gupta (IIIT-H)]
# Updated by Barun Saha (http://barunsaha.me)
# 16 March 2015, IIT Kharagpur
#

source ../scripts/common.sh

log '*** Executing configure.sh'
log $TIMESTAMP 'Host: ' $SYSTEM
log 'Current directory is: ' $CURRENT_DIR


log ' 1. Creating user barun'
USER_ID=barun
useradd -m -s /bin/bash "$USER_ID"
#* Only used for testing -- should be disabled later
echo $USER_ID:abcd | chpasswd
#* Takes effect in the next login
sudo adduser $USER_ID sudo
#*

export HOME_PATH=/home/"$USER_ID"
export SE_PATH=$HOME_PATH/codes/python/django/nb/ISAD/src/vlabs
APACHE_DEFAULT_FILE=/etc/apache2/sites-available/default
APACHE_DEFAULT_SSL_FILE=/etc/apache2/sites-available/default-ssl


# Directories where intermediate files would be created
log ' 2. Creating directories'
mkdir -p /var/vlabs/isad/uml/img
mkdir -p /var/vlabs/isad/cfg
mkdir -p /var/vlabs/isad/uploads/image_uploads
chown -R www-data /var/vlabs


# Copying Apache configuration files
log ' 3. Copying Apache configuration file'
echo '' > /etc/apache2/httpd.conf

# Remove the default configuration files
[ -f "$APACHE_DEFAULT_FILE" ] && rm "$APACHE_DEFAULT_FILE"
[ -f "$APACHE_DEFAULT_SSL_FILE" ] && rm "$APACHE_DEFAULT_SSL_FILE"
cp conf/default "$APACHE_DEFAULT_FILE"

apache2ctl restart
