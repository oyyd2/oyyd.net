#!/bin/bash
#Server for oyyd.net

case $1 in
pull) `git pull https://github.com/oyyd/oyyd.net.git`;;
refresh) `git pull https://github.com/oyyd/oyyd.net.git`
pkill node
node server.js;;
showPath) echo $0;;
*) echo "Bad param.">&2 ;;
esac

