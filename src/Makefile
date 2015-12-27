export HOME_PATH=/home/barun
export SE_PATH=$(HOME_PATH)/codes/python/django/nb/ISAD/src/vlabs
export LOG_FILE=cse08.log
CURRENT_DIR=$(shell pwd)
LS_CURRENT_DIR=$(shell ls)
TIMESTAMP=$(shell date +'%F %T')
SYSTEM=$(shell hostname)
PYTHON=$(shell which python)
IP_ADDRESS=$(shell ip addr show eth0 | grep 'inet ')
APT_SRC_FILE=/etc/apt/sources.list
APT_CONF_FILE=/etc/apt/apt.conf


install:
	echo '' > $(LOG_FILE)
	echo '*** Executing make install' >> $(LOG_FILE)
	$(MAKE) init
	$(MAKE) install_packages
	$(MAKE) deploy
	$(MAKE) init_db

init: repo bash
	echo "Executing make init" >> $(LOG_FILE)
	bash ../scripts/configure.sh

deploy:
	echo "Executing make deploy" >> $(LOG_FILE)
	bash ../scripts/deploy.sh

init_db:
	echo "Executing make init_db" >> $(LOG_FILE)
	bash ../scripts/init_database.sh

repo:
	echo '' >> $(LOG_FILE)
	echo $(TIMESTAMP) 'Host: ' $(SYSTEM) 'IP: ' $(IP_ADDRESS) >> $(LOG_FILE)
	echo 'Current directory is: ' $(CURRENT_DIR) >> $(LOG_FILE)
	echo 'Contents of current directory: ' $(LS_CURRENT_DIR) >> $(LOG_FILE)
	
	echo "*** Executing make repo" >> $(LOG_FILE)
	# Explicitly setting repositories here since the default repos resulted 
	# in installation failure of some software
	sudo echo '###### Ubuntu Main Repos' > $(APT_SRC_FILE)
	sudo echo 'deb http://archive.ubuntu.com/ubuntu precise main'\
		' restricted universe' >> $(APT_SRC_FILE)
	sudo echo 'deb http://archive.ubuntu.com/ubuntu precise-updates main'\
		' restricted universe' >> $(APT_SRC_FILE)
	sudo echo 'deb http://security.ubuntu.com/ubuntu precise-security main'\
		' restricted universe' >> $(APT_SRC_FILE)
	
	sudo echo 'APT::Get::Assume-Yes "true";' >> /etc/apt/apt.conf.d/90forceyes
	sudo echo 'APT::Get::force-yes "true";' >> /etc/apt/apt.conf.d/90forceyes
	sudo echo 'Acquire::Languages "none";' >> /etc/apt/apt.conf.d/00aptitude
	
#	$(MAKE) reset_packages
	echo "Updating Ubuntu repository" >> $(LOG_FILE)
	sudo rm -rf /var/lib/apt/lists/*
	sudo apt-get clean
	sudo apt-get autoremove
	# To prevent exiting when update fails
	# WARNING: Package installation may fail because of this; needs to be
	# handled manually in such a scenario
	sudo -E apt-get update || true

bash:
	sudo -E apt-get install bash

install_packages:
	$(MAKE) install_ubuntu_packages
	$(MAKE) install_python_packages

install_python_packages:
	echo "*** Executing make: installing Python packages" >> $(LOG_FILE)
	bash ../scripts/install_python_packages.sh

install_ubuntu_packages:
	echo "*** Executing make: installing Ubuntu packages" >> $(LOG_FILE)
	bash ../scripts/install_ubuntu_packages.sh

upgrade:
	sudo -E apt-get update
	sudo -E apt-get -y upgrade
	
##reset_packages:
##	echo "*** Executing make: reset packages" >> $(LOG_FILE)
##	sudo -E apt-get -y remove python python-dev python-setuptools build-essential graphviz graphviz-dev libmysqlclient18 libmysqlclient-dev pkg-config debconf-utils libapache2-mod-wsgi gcc
##	sudo apt-get clean
##	sudo apt-get autoclean
##	echo "Updating Ubuntu repository" >> $(LOG_FILE)
##	sudo apt-get clean
##	sudo rm -fR /var/lib/apt/lists/*
##	sudo apt-get update

test:
	bash ../test/test_installation.sh

syncdb:
	echo '*** Executing syncdb' >> $(LOG_FILE)
	$(PYTHON) $(SE_PATH)/manage.py syncdb

clean:
	# Clean (remove) the source code of the Django app
	rm -rf $(HOME_PATH)/codes

clean_all:
	echo 'Not yet supported'
