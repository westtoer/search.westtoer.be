#!/bin/bash 
file="$1"


relfile=$(echo "${file}" | sed -e 's/^\/mnt\/westtoer//')
path=$(echo "$relfile" | sed -e 's/ /\\ /g')
qval=$(echo "$relfile" | sed -e "s/%/%25/g;s/ /%20/g;s/'/%27/g;s/(/%28/g;s/)/%29/g;s/&/%26/g;s/;/%3B/g")

echo "deleting id == ${relfile}"

SOLRBASE="http://localhost:8983/solr";
SOLRUPDATEURI="${SOLRBASE}/update";


cmd="curl -s ${SOLRUPDATEURI} -H \"Content-Type: text/xml\" --data-binary \"<delete><id>${relfile}</id></delete>\""
echo $cmd
echo $cmd | sh
