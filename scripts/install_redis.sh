source ../scripts/common.sh

log '*** Executing install_redis.sh'

REDIS_PASSWD_FILE=$HOME_PATH/redis_passwd
REDIS_CONF_FILE=/etc/redis/redis.conf
TMP_FILE=$REDIS_CONF_FILE.tmp

log "Reading password for Redis from $REDIS_PASSWD_FILE"

if [[ -f "$REDIS_PASSWD_FILE" && -r "$REDIS_PASSWD_FILE" ]]
then
    REDIS_PASSWD=$(cat "$REDIS_PASSWD_FILE")
else
    REDIS_PASSWD=$(generate_password)
    echo "$REDIS_PASSWD" > "$REDIS_PASSWD_FILE"
    chmod -w "$REDIS_PASSWD_FILE"
fi

# Add (replace) password to the Redis configuration file
grep -v '^[[:space:]]*requirepass' "$REDIS_CONF_FILE" > "$TMP_FILE"
cat "$TMP_FILE" > "$REDIS_CONF_FILE"
echo "requirepass $REDIS_PASSWD" >> "$REDIS_CONF_FILE"
rm "$TMP_FILE"

sudo /etc/init.d/redis-server restart

echo '[program:django_rq_worker_se]
command=python /home/barun/codes/python/django/nb/ISAD/src/vlabs/manage.py rqworker q_se
autostart=true
autorestart=true
stderr_logfile=/var/log/django_rq_worker_se.err.log
stdout_logfile=/var/log/django_rq_worker_se.out.log' > /etc/supervisor/conf.d/django_rq_worker_se.conf

# Making it fail-safe
sudo /etc/init.d/supervisor stop
sudo unlink /tmp/supervisor.sock
sudo unlink /var/run/supervisor.sock
sudo /etc/init.d/supervisor start
# supervisor should be up by now; if not, the following would not have any effect
sudo supervisorctl reread
sudo supervisorctl update
sudo supervisorctl restart django_rq_worker_se
