#! /bin/bash

SCRIPTDIR="$(cd $(dirname "${BASH_SOURCE[0]}" ) && pwd)";
NICE="nice -n 15"

${NICE} ${SCRIPTDIR}/solr-chain.sh               >> /dev/null
${NICE} ${SCRIPTDIR}/solr-index-drupal.sh        >> /dev/null
${NICE} ${SCRIPTDIR}/solr-delete-disk-removed.sh >> /dev/null
${NICE} ${SCRIPTDIR}/solr-commit.sh              >> /dev/null
${NICE} ${SCRIPTDIR}/solr-optimize.sh            >> /dev/null
${NICE} ${SCRIPTDIR}/solr-trimlogs.sh            >> /dev/null
