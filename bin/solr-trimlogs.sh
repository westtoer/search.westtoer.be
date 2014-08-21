#! /bin/bash

SCRIPTDIR="$(cd $(dirname "${BASH_SOURCE[0]}" ) && pwd)";

RUNLOG="/home/solr/log"


find "${RUNLOG}" -mtime +3 -type f -exec rm {} \;
