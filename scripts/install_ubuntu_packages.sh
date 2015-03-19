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
sudo -E apt-get -y install build-essential
# A defensive step
sudo -E apt-get -y install --fix-missing
sudo -E apt-get -y install graphviz graphviz-dev
# A defensive step
sudo -E apt-get -y install --fix-missing
sudo -E apt-get -y install libmysqlclient18 libmysqlclient-dev
# A defensive step
sudo -E apt-get -y install --fix-missing
sudo -E apt-get -y install pkg-config
sudo -E apt-get -y install debconf-utils
sudo -E apt-get -y install libapache2-mod-wsgi
# A defensive step
sudo -E apt-get -y install --fix-missing
sudo -E apt-get -y install gcc
# A defensive step
sudo -E apt-get -y install --fix-missing
