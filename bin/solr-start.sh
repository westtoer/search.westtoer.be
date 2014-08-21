#@!/bin/bash


SOLRLOG=/home/solr/log
mkdir -p ${SOLRLOG}

SOLRPATH=/home/solr/server
cd ${SOLRPATH}
java -jar start.jar > ${SOLRLOG}/runlog-$(date --iso=seconds).out.log &

