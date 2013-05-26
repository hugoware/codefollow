#!/bin/bash
echo
echo
echo Usage
echo -p: deploy presentations
echo -c: deploy code

if [ "$1" == "-p" ]; then
  echo
  echo Deploying presentations
  scp -r ./presentations/* root@hugoware.net:/srv/www/codefollow/presentations
elif [ "$1" == "-c" ]; then
  echo
  echo Deploying code
  scp -r ./src/* root@hugoware.net:/srv/www/codefollow/src/
fi

echo
echo