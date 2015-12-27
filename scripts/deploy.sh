#!/bin/sh
#
# This script copies the source code to the target location, and creates the
# symlinks pointing to /var. This should be executed before database
# initialization.
#
# Barun Saha (http://barunsaha.me)
# 27 December 2015, IIT Kharagpur
#

source ../scripts/common.sh

log ' 4. Deploying code'
log "Moving codes to $HOME_PATH/codes"
mkdir -p "$HOME_PATH/codes"
cp -r codes/* "$HOME_PATH/codes/"
cp -r content "$HOME_PATH/"

# Set ownership of files
chown -R barun:www-data "$HOME_PATH/codes"
# Apache needs write permission on vlabs/ to generate two files
chmod g+w "$SE_PATH"

# Create symlinks (force if already exists)
log ' 5. Creating symlinks'
ln -sf /var/vlabs/isad/ "$SE_PATH"/static_media/isad_erd
#ln -sf /var/vlabs/isad/uploads "$SE_PATH"/media/uploads
ln -sf /var/vlabs/ "$SE_PATH"/static_media/vlabs
