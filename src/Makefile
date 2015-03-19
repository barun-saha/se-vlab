HOME_PATH=/home/barun
#SE_PATH=$HOME_PATH/codes/python/django/nb/ISAD/src/vlabs
LOG_FILE=cse08.log
CURRENT_DIR=$(shell pwd)
LS_CURRENT_DIR=$(shell ls)
TIMESTAMP=$(shell date +'%F %T')
SYSTEM=$(shell hostname)
IP_ADDRESS=$(shell ip addr show eth0 | grep 'inet ')
APT_FILE=/etc/apt/sources.list


deploy:
	echo '*** Executing make deploy' >> $(LOG_FILE)
	
	echo "Moving codes to $(HOME_PATH)/codes" >> $(LOG_FILE)
	mkdir -p $(HOME_PATH)/codes
	cp -r codes/* $(HOME_PATH)/codes/
	cp -r content $(HOME_PATH)/
	
	echo "Copying Apache configuration file" >> $(LOG_FILE)
	cp conf/httpd.conf /etc/apache2/
	
	echo "Moving other configuration files" >> $(LOG_FILE)
	cp -r conf/www /usr/local/

init: repo bash
	echo "Executing make init" >> $(LOG_FILE)
	bash ../scripts/configure.sh

repo:
	echo '' >> $(LOG_FILE)
	echo $(TIMESTAMP) 'Host: ' $(SYSTEM) 'IP: ' $(IP_ADDRESS) >> $(LOG_FILE)
	echo 'Current directory is: ' $(CURRENT_DIR) >> $(LOG_FILE)
	echo 'Contents of current directory: ' $(LS_CURRENT_DIR) >> $(LOG_FILE)
	
	echo "*** Executing make repo" >> $(LOG_FILE)
	# Explicitly setting repositories here since the default repos resulted 
	# in installation failure of some software
	sudo echo '###### Ubuntu Main Repos' > $(APT_FILE)
	##sudo echo 'deb http://archive.ubuntu.com/ubuntu/ precise main restricted universe' >> $(APT_FILE)
	sudo echo 'deb http://archive.ubuntu.com/ubuntu/ precise main restricted' \
		>> $(APT_FILE)
	sudo echo '###### Ubuntu Update Repos' >> $(APT_FILE)
	sudo echo 'deb http://security.ubuntu.com/ubuntu precise-security' \
		' main restricted' >> $(APT_FILE)
	##sudo echo 'deb http://security.ubuntu.com/ubuntu precise-security universe' >> $(APT_FILE)
	sudo apt-get clean
	sudo rm -fR /var/lib/apt/lists/*
	sudo echo 'APT::Get::Assume-Yes "true";' >> /etc/apt/apt.conf.d/90forceyes
	sudo echo 'APT::Get::force-yes "true";' >> /etc/apt/apt.conf.d/90forceyes
	sudo echo 'Acquire::Languages "none";' >> /etc/apt/apt.conf.d/00aptitude
	echo "Updating Ubuntu repository" >> $(LOG_FILE)
	sudo apt-get update

bash:
	sudo apt-get install bash

install_packages: install_python_packages install_ubuntu_packages

install_python_packages:
	echo "*** Executing make: installing Python packages" >> $(LOG_FILE)
	bash ../scripts/install_python_packages.sh

install_ubuntu_packages:
	echo "*** Executing make: installing Ubuntu packages" >> $(LOG_FILE)
	bash ../scripts/install_ubuntu_packages.sh

test:
	bash ../test/test_installation.sh
