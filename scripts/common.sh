#!/bin/bash
#
# Common functions and variables used by other scripts.
#
# Barun Saha (http://barunsaha.me)
# 18 March 2015, IIT Kharagpur
#

LOG_FILE=cse08.log
CURRENT_DIR=$(pwd)
TIMESTAMP=$(date +'%F %T')
SYSTEM=$(hostname)

# Utility functions
log() {
	echo "$@" >> "$LOG_FILE"
}

error() {
	echo '* Error: ' "$@" | tee --append "$LOG_FILE"
	exit 1
}

# A function to generate a random password
# http://serverfault.com/a/261417/58453
generate_password() {
	cat /dev/urandom | tr -dc 'a-zA-Z0-9-_!@#$+=' | fold -w 12 | head -n 1
}
#

