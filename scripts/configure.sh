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

LOG_FILE=cse08.log
CURRENT_DIR=$(pwd)
TIMESTAMP=$(date +'%F %T')
SYSTEM=$(hostname)


# Utility functions
log() {
	echo "$@" >> "$LOG_FILE"
}

error() {
	echo '* Error: ' "$@" | tee --append "$LOG_FILE"
	exit 1
}
#


log '*** Executing configure.sh'
log $TIMESTAMP 'Host: ' $SYSTEM
log 'Current directory is: ' $CURRENT_DIR


log '1. Creating user barun'
USER_ID=barun
useradd -m -s /bin/bash "$USER_ID"
#* Only used for testing -- should be disabled later
echo $USER_ID:abcd | chpasswd
#* Takes effect in the next login
sudo adduser $USER_ID sudo
#*

HOME_PATH=/home/"$USER_ID"
SE_PATH=$HOME_PATH/codes/python/django/nb/ISAD/src/vlabs
CUR_PATH=$(pwd)


# Directories where intermediate files would be created
log '2. Creating directories'
mkdir -p /var/vlabs/isad/uml/img
mkdir -p /var/vlabs/isad/cfg
mkdir -p /var/vlabs/isad/uploads/image_uploads
chown -R www-data /var/vlabs

# Code movement goes to Makefile
log '3. Invoking make deploy for deploying code'
make deploy


# Create symlinks
log '4. Creating symlinks'
ln -s /var/vlabs/isad/ "$SE_PATH"/media/isad_erd
ln -s /var/vlabs/isad/uploads "$SE_PATH"/media/uploads
ln -s /var/vlabs/ "$SE_PATH"/media/vlabs


log '5. Invoking script for creating database'
source init_database.sh
