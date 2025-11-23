#!/bin/sh
printenv | sed 's/^\(.*\)$/export \1/g' > /etc/environment
cron -f
