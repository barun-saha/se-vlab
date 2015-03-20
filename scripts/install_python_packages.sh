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

. ../scripts/common.sh

APT_CONF_FILE=/etc/apt/apt.conf

proxy=$(grep -i '^Acquire::http::proxy' $APT_CONF_FILE | cut -d' ' -f2 | tr -d '"' | tr -d ';')
export http_proxy=$proxy
export https_proxy=$proxy

echo $http_proxy
echo $https_proxy

log 'Installing necessary Python packages'

sudo -E pip install Django==1.2.7
sudo -E pip install pygraphviz
sudo -E pip install MySQL-python
sudo -E pip install django-maintenancemode
sudo -E pip install django-ajaxcomments
sudo -E pip install django-tinymce
sudo -E pip install recaptcha-client
sudo -E pip install PIL
