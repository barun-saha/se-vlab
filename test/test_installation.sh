#!/bin/bash
#
# Test whether the installation is alright. Should be executed
# using the bash shell.
#
# Barun Saha (http://barunsaha.me)
# 18 March 2015, IIT Kharagpur
#

NSUCCESS=0
NFAILURE=0
SE_PATH=/home/barun/codes/python/django/nb/ISAD/src/vlabs

# Color codes for Bash
# https://stackoverflow.com/questions/5947742/how-to-change-the-output-color-of-echo-in-linux
SWITCH="\033["
NORMAL="${SWITCH}0m"
GREEN="${SWITCH}0;32m"
RED="${SWITCH}0;31m"

# Utility functions
success() {
    echo -e "$GREEN[ OK ]$NORMAL $@"
    NSUCCESS=$(expr $NSUCCESS + 1)
}

failure() {
    echo -e "$RED[FAIL]$NORMAL $@"
    NFAILURE=$(expr $NFAILURE + 1)
}
#

USER=barun
HOME_PATH=/home/"$USER"
SE_PATH=$HOME_PATH/codes/python/django/nb/ISAD/src/vlabs

# Check if user exists
id $USER > /dev/null 2>&1
[[ $? -eq 0 ]] && success "User $USER exists" || \
                  failure "User $USER does not exist"


# Check user home exists
ls $HOME_PATH > /dev/null 2>&1
[[ $? -eq 0 ]] && success "$HOME_PATH exists" || \
                  failure "$HOME_PATH does not exist"


# Check path to source code exists
ls $SE_PATH > /dev/null 2>&1
[[ $? -eq 0 ]] && success "$SE_PATH exists" || \
                  failure "$SE_PATH does not exist"


# Check all necessary directories exists
x=/var/vlabs/isad/uml/img
ls $x > /dev/null 2>&1
[[ $? -eq 0 ]] && success "$x exists" || \
                  failure "$x does not exist"

x=/var/vlabs/isad/cfg
ls $x > /dev/null 2>&1
[[ $? -eq 0 ]] && success "$x exists" || \
                  failure "$x does not exist"

x=/var/vlabs/isad/uploads/image_uploads
ls $x > /dev/null 2>&1
[[ $? -eq 0 ]] && success "$x exists" || \
                  failure "$x does not exist"


# Check symlinks exists
x="$SE_PATH"/media/isad_erd
ls $x > /dev/null 2>&1
[[ $? -eq 0 ]] && success "Symlink $x exists" || \
                  failure "Symlink $x does not exist"

x="$SE_PATH"/media/uploads
ls $x > /dev/null 2>&1
[[ $? -eq 0 ]] && success "Symlink $x exists" || \
                  failure "Symlink $x does not exist"

x="$SE_PATH"/media/vlabs
ls $x > /dev/null 2>&1
[[ $? -eq 0 ]] && success "Symlink $x exists" || \
                  failure "Symlink $x does not exist"


# Configuration files
cfile=/etc/apache2/httpd.conf
ls "$cfile" >/dev/null 2>&1
[[ $? -eq 0 ]] && success "$cfile exists" || \
                  failure "$cfile does not exist"

cfile=/usr/local/www/wsgi-scripts/isad.wsgi
ls "$cfile" >/dev/null 2>&1
[[ $? -eq 0 ]] && success "$cfile exists" || \
                  failure "$cfile does not exist"


# Check database password files exist
x=$HOME_PATH/mysql_root_passwd
ls $x > /dev/null 2>&1
[[ $? -eq 0 ]] && success "$x exists" || \
                  failure "$x does not exist"

MYSQL_USR_PASSWD=$HOME_PATH/se_mysql_usr_passwd
ls $MYSQL_USR_PASSWD > /dev/null 2>&1
[[ $? -eq 0 ]] && success "$MYSQL_USR_PASSWD exists" || \
                  failure "$MYSQL_USR_PASSWD does not exist"


# Check MySQL
dpkg --get-selections | grep mysql-server >/dev/null
[[ $? -eq 0 ]] && success "mysql-server found" || \
                  failure "mysql-server was not found"

dpkg --get-selections | grep mysql-client >/dev/null
[[ $? -eq 0 ]] && success "mysql-client found" || \
                  failure "mysql-client was not found"

U_PASS=$(cat $MYSQL_USR_PASSWD 2>/dev/null)
mysql --user=u_isad --password="$U_PASS" db_isad \
      -e 'SELECT 1 FROM isad_theory LIMIT 1' > /dev/null 2>&1
[[ $? -eq 0 ]] && success "Table isad_theory exist and can be queried" || \
                  failure "Table isad_theory does not exist/cannot be queried"


# Check whether other required packages were installed
pkg=build-essential
dpkg --get-selections | grep "$pkg" >/dev/null
[[ $? -eq 0 ]] && success "$pkg found" || \
                  failure "$pkg was not found"

pkg=graphviz-dev
dpkg --get-selections | grep "$pkg" >/dev/null
[[ $? -eq 0 ]] && success "$pkg found" || \
                  failure "$pkg was not found"

pkg=libmysqlclient-dev
dpkg --get-selections | grep "$pkg" >/dev/null
[[ $? -eq 0 ]] && success "$pkg found" || \
                  failure "$pkg was not found"

pkg=pkg-config
dpkg --get-selections | grep "$pkg" >/dev/null
[[ $? -eq 0 ]] && success "$pkg found" || \
                  failure "$pkg was not found"

pkg=debconf-utils
dpkg --get-selections | grep "$pkg" >/dev/null
[[ $? -eq 0 ]] && success "$pkg found" || \
                  failure "$pkg was not found"

pkg=libapache2-mod-wsgi
dpkg --get-selections | grep "$pkg" >/dev/null
[[ $? -eq 0 ]] && success "$pkg found" || \
                  failure "$pkg was not found"

pkg=gcc
dpkg --get-selections | grep "^$pkg" >/dev/null
[[ $? -eq 0 ]] && success "$pkg found" || \
                  failure "$pkg was not found"


# Check Python packages
pkg=Django
pip freeze | grep "$pkg" >/dev/null
[[ $? -eq 0 ]] && success "$pkg found" || \
                  failure "$pkg was not found"

pkg=pygraphviz
pip freeze | grep "$pkg" >/dev/null
[[ $? -eq 0 ]] && success "$pkg found" || \
                  failure "$pkg was not found"

pkg=MySQL-python
pip freeze | grep "$pkg" >/dev/null
[[ $? -eq 0 ]] && success "$pkg found" || \
                  failure "$pkg was not found"

cd "$SE_PATH"  >/dev/null 2>&1 && success "Source code directory found" || \
                 failure "Source code directory not found"

python manage.py runserver >/dev/null 2>&1 && \
                 success "Django app working" || \
                 failure "Django app not working"

# Display summary
TOTAL=$(expr $NSUCCESS + $NFAILURE)
echo ''
echo "$NSUCCESS/$TOTAL test cases succeeded."
