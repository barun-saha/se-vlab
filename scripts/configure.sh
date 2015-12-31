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
passwd -l "$USER_ID"

# Directories where intermediate files would be created
log ' 2. Creating directories'
mkdir -p /var/vlabs/isad/uml/img
mkdir -p /var/vlabs/isad/cfg
mkdir -p /var/vlabs/isad/uploads/image_uploads
chown -R www-data /var/vlabs
