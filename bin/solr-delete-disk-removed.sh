#!/bin/bash
RESET=$1
SEARCHDIR="/mnt/westtoer/"
WORKDIR="/home/solr/filedumps/"
SCRIPTDIR="$(cd $(dirname "${BASH_SOURCE[0]}" ) && pwd)";

FNDARGS=" -type f ! -path \*/.\* ! -name .\* ! -name Thumbs.db ! -name header.shtml ! -name footer.shtml "

mkdir -p ${WORKDIR} >> /dev/null
cd ${WORKDIR}

if [[ $RESET == "reset" ]]; then
  rm dump-previous.txt
fi

echo "find '${SEARCHDIR}' ${FNDARGS}" | sh | sort > dump-current.txt 2>>/dev/null

if [[ -f dump-previous.txt ]]; then
  comm -23 dump-previous.txt dump-current.txt | while read removed; do
    echo "$removed";
    ${SCRIPTDIR}/solr-delete-one.sh "$removed";
  done
  mv dump-previous.txt dump-previous-backup.txt
fi

mv dump-current.txt dump-previous.txt
