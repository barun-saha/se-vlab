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

sudo apt-get -y install python python-dev python-setuptools python-pip
sudo apt-get -y install build-essential
sudo apt-get -y install graphviz graphviz-dev
sudo apt-get -y install libmysqlclient-dev
sudo apt-get -y install pkg-config
sudo apt-get -y install bash
sudo apt-get -y install debconf-utils
sudo apt-get -y install libapache2-mod-wsgi
sudo apt-get -y install gcc

sudo apt-get -y install --fix-missing


log 'Installing necessary Python packages'

sudo pip install Django==1.2.7
sudo pip install pygraphviz
sudo pip install MySQL-python
sudo pip install django-maintenancemode
sudo pip install django-ajaxcomments
sudo pip install django-tinymce
sudo pip install recaptcha-client
