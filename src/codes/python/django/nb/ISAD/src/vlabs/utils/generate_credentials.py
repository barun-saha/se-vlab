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
SE_DB_USR_PASSWD_FILE = '/'.join([HOME_PATH, 'se_mysql_usr_passwd',])
REDIS_PASSWD_FILE = '/'.join([HOME_PATH, 'redis_passwd',])


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

	intermediate_string = '''
	'db_host': 'localhost',
	'db_port': '3306',
'''

	final_string = '''
	'secret_key': __get_secret_key(),
}
'''

	db_password_string = ''
	redis_password_string = ''

	# Generate credentials for each type
	# In ANT Virtual Lab, we need credentials for database and rabbitmq

	db_cred_name = '\t\'db_password\': '
	redis_cred_name = '\t\'redis_password\': '
#	password_length = random.randint(MIN_LENGTH, MAX_LENGTH)
#	password = "".join(
#		[random.choice(ALPHABET) \
#			for i in xrange(password_length + 1)])

	# Read the password from file
	db_pfile = None
	redis_pfile = None
	try:
		db_pfile = open(SE_DB_USR_PASSWD_FILE, 'r')
		redis_pfile = open(REDIS_PASSWD_FILE, 'r')
	except IOError, ioe:
		#print 'Could not read', SE_USR_PASSWD_FILE, ':', str(ioe)
		sys.exit(1)

	with db_pfile:
		database_password = db_pfile.read().strip()
	with redis_pfile:
		redis_password = redis_pfile.read().strip()

	db_password_string = ''.join(
		[db_password_string, db_cred_name, '\'', database_password, '\',',]
	)
	redis_password_string = ''.join(
		[redis_password_string, redis_cred_name, '\'', redis_password, '\',',]
	)


	# Generate the final contents
	final_string = ''.join(
		[header_string, import_string, body, db_password_string, intermediate_string, redis_password_string, final_string,]
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
