HOME_PATH=/home/barun
#SRC_PATH="$HOME_PATH"/codes/python/django/nb/ISAD/src/vlabs

deploy:
	mv codes ${HOME_PATH}/codes
	cp conf/httpd.conf /etc/apache2/
	mv conf/www /usr/local/

init:
	sh ../scripts/configure.sh
