#!/bin/sh
# Usage: ./set-domain.sh yourdomain.com
[ -z "$1" ] && echo "usage: ./set-domain.sh yourdomain.com" && exit 1
grep -rl "horizen.example" . --include=*.html --include=*.xml --include=*.txt --include=*.webmanifest \
  | xargs sed -i "s#https://horizen.example#https://$1#g"
echo "Done. Deploy, then test https://$1/?v=2 in Discord."
