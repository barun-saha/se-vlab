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
# Barun Saha (http://barunsaha.me)
# IIT Kharagpur
# 06 March 2014
#

import os
import random
import stat
import sys


def generate_secret(output_file):
	secret = "".join(
		[random.choice("abcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*(-_=+)") \
			for i in range(50)]
	)

	try:
		file_exists = os.path.exists(output_file)
		if not file_exists:
			open(output_file, 'w').write(secret)
	except IOError, ioe:
		#print ioe
		sys.exit(1)
		
