#!/bin/sh
#
# Install several software required by the Software Engineering
# Virtual Lab.
#
# The package versions are specific to Ubuntu 12.04
# and may differ with other OS versions.
#
# Barun Saha (http://barunsaha.me)
# 18 March 2015, IIT Kharagpur
#

LOG_FILE=cse08.log
CURRENT_DIR=$(pwd)
TIMESTAMP=$(date +'%F %T')
SYSTEM=$(hostname)
PROXY=$(echo $http_proxy)


# Utility functions
log() {
	echo "$@" >> "$LOG_FILE"
}

error() {
	echo '* Error: ' "$@" | tee --append "$LOG_FILE"
	exit 1
}
#

log ''
log "$TIME_STAMP  Host: $SYSTEM Current dir: $CURRENT_DIR Proxy: $PROXY"
log 'Installing necessary packages'

sudo -E apt-get -y install python python-dev python-setuptools python-pip
sudo -E apt-get -y install build-essential
sudo -E apt-get -y install graphviz graphviz-dev
sudo -E apt-get -y install libmysqlclient18 libmysqlclient-dev
sudo -E apt-get -y install pkg-config
sudo -E apt-get -y install bash
sudo -E apt-get -y install debconf-utils
sudo -E apt-get -y install libapache2-mod-wsgi
sudo -E apt-get -y install gcc

sudo -E apt-get -y install --fix-missing


log 'Installing necessary Python packages'

sudo -E pip install Django==1.2.7
sudo -E pip install pygraphviz
sudo -E pip install MySQL-python
sudo -E pip install django-maintenancemode
sudo -E pip install django-ajaxcomments
sudo -E pip install django-tinymce
sudo -E pip install recaptcha-client
