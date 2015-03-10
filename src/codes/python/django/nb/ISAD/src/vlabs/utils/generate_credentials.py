#!/usr/bin/python

#
# Generate a credentials.py file containing all required credentials
# including those for MySQL database.
#
# NOTE: This script would be executed once when the Django app is first
# used (invoked by Apache). If you change the login ID/password of any
# related software, you *MUST* update this file accordingly.
#
# The credentials.py file should be located inside the vlabs/ directory,
# which also contains the settings.py file.
#
# Source: http://blog.leosoto.com/2008/04/django-secretkey-generation.html
#
# Barun Saha (http://barunsaha.me)
# IIT Kharagpur
# 10 March 2015
#

import random
import os
import stat
import sys


ALPHABET = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^(-_=+)"
MIN_LENGTH = 8
MAX_LENGTH = 15


file_name = 'credentials.py'


def generate_credentials():
	header_string = '''#
# Warning: credentials.py should NOT go into version control
#
# Barun Saha (barun.saha04@gmail.com)
# IIT Kharagpur
# 06 March 2014
#
'''

	import_string = '''
import random
import sys
'''

	body = '''
# Read the key from the vlabs/secret.txt file. The secret key should be
# generated beforehand using utils/generate_secret_key.py and moved
# inside the vlabs/ directory
def __get_secret_key():
	key = None

	try:
		key = open('secret.txt', 'r').read()
	except IOError, ioe:
		print ioe
		sys.exit(1)

	return key



# A list of all passwords and other sensitive information. The
# dictionary keys below should be exactly same as used in settings.py
app_credentials = {
	'db_name': 'db_isad',
	'db_user': 'u_isad',
'''

	final_string = '''
	'db_host': 'localhost',
	'db_port': '3306',
	'secret_key': __get_secret_key(),
}
'''

	password_string = ''

	# Generate credentials for each type
	# In SE Virtual Lab, we only need database credentials

	cred_name = '\t\'db_password\': '
	password_length = random.randint(MIN_LENGTH, MAX_LENGTH)
	password = "".join(
		[random.choice(ALPHABET) \
			for i in xrange(password_length + 1)])

	password_string = ''.join(
		[password_string, cred_name, '\'', password, '\',',]
	)
	#print password_string


	# Generate the final contents
	final_string = ''.join(
		[header_string, import_string, body, password_string, final_string,]
	)

	# Create the file
	try:

		file_exists = os.path.exists(file_name)

		if not file_exists:
			open(file_name, 'w').write(final_string)

		# Read-only by owner and group
		os.chmod(file_name, stat.S_IRUSR | stat.S_IRGRP)

	except IOError, ioe:
		print ioe
		sys.exit(1)
