#!/bin/bash

term=$1
SOLRBASE="http://localhost:8983/solr";
SOLRSELECTURI="${SOLRBASE}/select"

qs="wt=json&q=content:${term}*~0.5"

cmd="curl --url ${SOLRSELECTURI}?${qs}"
echo ${cmd}
${cmd}
