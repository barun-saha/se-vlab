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

sudo -E apt-get -y install python python-dev python-setuptools python-pip
sudo -E apt-get -y install build-essential
sudo -E apt-get -y install graphviz graphviz-dev
sudo -E apt-get -y install libmysqlclient18 libmysqlclient-dev
sudo -E apt-get -y install pkg-config
sudo -E apt-get -y install bash
sudo -E apt-get -y install debconf-utils
sudo -E apt-get -y install libapache2-mod-wsgi
sudo -E apt-get -y install gcc

# A defensive step
sudo -E apt-get -y install --fix-missing
