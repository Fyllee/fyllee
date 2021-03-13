#!/bin/bash

function start {
  tput sc
  echo -e "$1"
}

function end {
  tput rc
  tput el
  echo -e "$1"
}

# Get MONGO_URI from .env file
eval "$(grep ^MONGO_URI= .env)"

if [ -z $MONGO_URI ]; then
  echo "MONGO_URI has not been find in the .env file.";
  echo "CLEANUP ABORTED."
else
  echo "Start cleaning of bild. Database and Disk."

  # Drop 'bild' DB from database, in silence
  start "\033[4mStart\033[0m dropping 'bild' database."
  mongo --host $MONGO_URI --eval "db.getSiblingDB('bild').dropDatabase();" > /dev/null
  end "\033[4mDone\033[0m dropping 'bild' database."

  # Delete 'upload' directory from disk
  start "\033[4mStart\033[0m deleting 'bild' disk content."
  if [ -d "./uploads" ] ; then rm -r "./uploads"; fi
  end "\033[4mDone\033[0m deleting 'bild' disk content."

  echo -e "Bild cleaning database and disk \033[1mhas been successful.\033[0m"
fi

