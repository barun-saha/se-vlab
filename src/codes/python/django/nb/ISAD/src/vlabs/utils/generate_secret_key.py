#!/usr/bin/python

#
# Generate a secret key to be used by the Django app. This creates a
# read-only file secret.txt that contains the secret key.
#
# NOTE: This script should be execute once (and only once) after an app
# is deployed to a new server machine. Even if the source code is
# modified, a given instance of the lab should continue using the same 
# secret key. A new secret key should be generated if a new instance of 
# this app is deployed to a new server.
#
# In short, the secret key is unique for each installation of this lab.
#
# The secret.txt file should be located inside the vlabs/ directory,
# which also contains the settings.py file.
#
# Source: http://blog.leosoto.com/2008/04/django-secretkey-generation.html
#
# Barun Saha (barun.saha04@gmail.com)
# IIT Kharagpur
# 06 March 2014
#

import random
import os
import stat
import sys


secret = "".join(
	[random.choice("abcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*(-_=+)") \
		for i in range(50)]
)

#print secret

file_name = 'secret.txt'

try:
	
	#with open(file_name, 'w') as sfile:
	open(file_name, 'w').write(secret)
	
	# Read-only by owner and group
	os.chmod(file_name, stat.S_IRUSR | stat.S_IRGRP)
	
except IOError, ioe:
	print ioe
	sys.exit(1)



#
# The secret key has been generated. Read it from the settings.py file
# as open('secret.txt', 'r').read()
#
