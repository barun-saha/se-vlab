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

source ../scripts/common.sh

log 'Installing necessary Ubuntu packages'

#sudo -E apt-get -y remove python python-dev python-setuptools python-pip build-essential graphviz graphviz-dev libmysqlclient18 libmysqlclient-dev pkg-config debconf-utils libapache2-mod-wsgi gcc
#sudo apt-get clean
#sudo apt-get autoclean
#sudo apt-get update

sudo -E apt-get -y install python python-dev python-setuptools python-pip
# https://github.com/Homebrew/homebrew/issues/28083#issuecomment-39432641
sudo -E pip install --upgrade setuptools
sudo -E apt-get -y install build-essential
# A defensive step in case anything went wrong
sudo -E apt-get -y install --fix-missing
sudo -E apt-get -y install graphviz graphviz-dev
sudo -E apt-get -y install --fix-missing
sudo -E apt-get -y install libmysqlclient18
sudo -E apt-get -y install libmysqlclient-dev
sudo -E apt-get -y install --fix-missing
sudo -E apt-get -y install pkg-config
sudo -E apt-get -y install debconf-utils
sudo -E apt-get -y install apache2 libapache2-mod-wsgi
sudo -E apt-get -y install --fix-missing
sudo -E apt-get -y install gcc
sudo -E apt-get -y install --fix-missing
sudo -E apt-get -y install default-jre
sudo -E apt-get -y install --fix-missing
sudo -E apt-get -y install libgraph-easy-perl
sudo -E apt-get -y install --fix-missing

# Enable WSGIScriptAlias for Apache2
sudo a2enmod wsgi
