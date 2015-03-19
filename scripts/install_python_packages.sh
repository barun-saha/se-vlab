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

log 'Installing necessary Python packages'

sudo -E pip install Django==1.2.7
sudo -E pip install pygraphviz
sudo -E pip install MySQL-python
sudo -E pip install django-maintenancemode
sudo -E pip install django-ajaxcomments
sudo -E pip install django-tinymce
sudo -E pip install recaptcha-client
