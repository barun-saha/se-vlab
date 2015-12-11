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

import os
import random
import stat
import sys


ALPHABET = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^(-_=+)"
MIN_LENGTH = 8
MAX_LENGTH = 15

# The name of the output Python module
#file_name = 'credentials.py'

# Locations where various passwords are stored
HOME_PATH = '/home/barun'
SE_USR_PASSWD_FILE = '/'.join([HOME_PATH, 'se_mysql_usr_passwd',])


def generate_credentials(secret_key_file, output_file):
	header_string = '''#
# Warning: credentials.py should NOT go into version control
#
# Barun Saha (http://barunsaha.me)
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
		key_file = open('%s', 'r')
	except IOError, ioe:
		#print 'Failed to read secret key file', str(ioe)
		sys.exit(1)

	with key_file:
		key = key_file.read().strip()

	return key



# A list of all passwords and other sensitive information. The
# dictionary keys below should be exactly same as used in settings.py
app_credentials = {
	'db_name': 'db_isad',
	'db_user': 'u_isad',
''' % (secret_key_file,)

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
#	password_length = random.randint(MIN_LENGTH, MAX_LENGTH)
#	password = "".join(
#		[random.choice(ALPHABET) \
#			for i in xrange(password_length + 1)])
	
	# Read the password from file
	pfile = None
	try:
		pfile = open(SE_USR_PASSWD_FILE, 'r')
	except IOError, ioe:
		#print 'Could not read', SE_USR_PASSWD_FILE, ':', str(ioe)
		sys.exit(1)

	with pfile:
		password = pfile.read().strip()

	password_string = ''.join(
		[password_string, cred_name, '\'', password, '\',',]
	)


	# Generate the final contents
	final_string = ''.join(
		[header_string, import_string, body, password_string, final_string,]
	)

	# Create the Python module
	file_exists = os.path.exists(output_file)
	pfile = None
	try:
		if not file_exists:
			with open(output_file, 'w') as pfile:
				pfile.write(final_string)
	except IOError, ioe:
		#print 'Failed to write to file', output_file, ':', str(ioe)
		sys.exit(1)
