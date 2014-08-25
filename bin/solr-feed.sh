#!/bin/bash 
file="$1"

urlencode() {
  python -c "import sys, urllib as ul; print ul.quote_plus(sys.argv[1])" "${1}"
}

relfile=$(echo "${file}" | sed -e 's/^\/mnt\/westtoer//')
path=$(echo "$relfile" | sed -e 's/ /\\ /g')
qval=$(urlencode "$relfile")
filename=$(urlencode ${path##*/})
#qval=$(echo "$relfile" | sed -e "s/%/%25/g;s/ /%20/g;s/'/%27/g;s/(/%28/g;s/)/%29/g;s/&/%26/g;s/;/%3B/g")

echo "indexing ${file} as qparam = ${qval} and path= ${path}"

SOLRBASE="http://localhost:8983/solr";
SOLREXTRACTURI="${SOLRBASE}/update/extract";

DRUPALHASH="1phcfa";

MODIF_DATE=$(stat -c %y "${file}" | sed -r 's/([0-9]{4}(-[0-9]{2}){2}) ([0-9]{2}(:[0-9]{2}){2})\.([0-9]* )/\1T\3/')
CREATE_DATE=${MODIF_DATE} 

qs="literal.id=${qval}\&literal.ds_created=${CREATE_DATE}\&literal.ds_changed=${MODIF_DATE}\&literal.hash=${DRUPALHASH}\&literal.site=http://localhost/solr-sailor\&literal.path=/lokaal${qval}\&literal.label=${filename}\&literal.entity_type=file\&literal.url=http://intranet.westtoer.be/lokaal${qval}\&fmap.author=ss_name\&literal.teaser=Bestand:+${qval}";


cmd="curl --silent --url ${SOLREXTRACTURI}?${qs} -F myfile=@\"${file}\"";
echo ${cmd};
echo ${cmd} | sh;
