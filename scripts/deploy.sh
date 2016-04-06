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

#export HOME_PATH=/home/"$USER_ID"
#export SE_PATH=$HOME_PATH/codes/python/django/nb/ISAD/src/vlabs

log ' 3. Deploying code'
log "Moving codes to $HOME_PATH/codes"
mkdir -p "$HOME_PATH/codes"
cp -r codes/* "$HOME_PATH/codes/"

# Collect the static files
log ' 4. Collecting static files'
# The static_media directory must exist to collect the files
# mkdir -p "$SE_PATH"/static_media
#log 'manage.py collectstatic --clear --noinput'
#python "$SE_PATH"/manage.py collectstatic --clear --noinput
#log 'exit status: ' $?
log 'manage.py collectstatic --noinput'
python "$SE_PATH"/manage.py collectstatic --noinput
log 'exit status: ' $?
log 'manage.py collectstatic_js_reverse'
python "$SE_PATH"/manage.py collectstatic_js_reverse
log 'exit status: ' $?

# Create symlinks (force if already exists)
ln -sf /var/vlabs/isad/ "$SE_PATH"/static_media/isad_erd
#ln -sf /var/vlabs/isad/uploads "$SE_PATH"/media/uploads
ln -sf /var/vlabs/ "$SE_PATH"/static_media/vlabs

# Create a .htaccess file to prevent browsing files
echo 'Options -Indexes' > $SE_PATH/static_media/.htaccess

# Set ownership of files
chown -R barun:www-data "$HOME_PATH/codes"
# Apache needs write permission on vlabs/ to generate two files
chmod g+w "$SE_PATH"

# Copying Apache configuration files
APACHE_DEFAULT_FILE=/etc/apache2/sites-available/default
APACHE_DEFAULT_SSL_FILE=/etc/apache2/sites-available/default-ssl
log ' 5. Copying Apache configuration file'
echo '' > /etc/apache2/httpd.conf

# Remove the default configuration files
[ -f "$APACHE_DEFAULT_FILE" ] && rm "$APACHE_DEFAULT_FILE"
[ -f "$APACHE_DEFAULT_SSL_FILE" ] && rm "$APACHE_DEFAULT_SSL_FILE"
cp conf/default "$APACHE_DEFAULT_FILE"

apache2ctl restart
