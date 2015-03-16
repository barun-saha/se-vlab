HOME_PATH=/home/barun
#SRC_PATH="$HOME_PATH"/codes/python/django/nb/ISAD/src/vlabs
LOG_FILE=cse08.log
CURRENT_DIR=$(shell pwd)
TIMESTAMP=$(shell date)
SYSTEM=$(shell hostname)
IP_ADDRESS=$(shell ip addr show eth0 | grep 'inet ')

deploy:
	echo 'Executing make' >> ${LOG_FILE}
	echo ${TIMESTAMP} ${SYSTEM} ${IP_ADDRESS} >> ${LOG_FILE}
	echo 'Current directory is ' ${CURRENT_DIR} >> ${LOG_FILE}
	
	echo "Moving codes to ${HOME_PATH}/codes" >> ${LOG_FILE}
	mv codes ${HOME_PATH}/codes
	
	echo "Copying Apache configuration file" >> ${LOG_FILE}
	cp conf/httpd.conf /etc/apache2/
	
	echo "Moving other configuration files" >> ${LOG_FILE}
	mv conf/www /usr/local/

init:
	echo "Executing configuration script ../scripts/configure.sh" >> ${LOG_FILE}
	sh ../scripts/configure.sh
