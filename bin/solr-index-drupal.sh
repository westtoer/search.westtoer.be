#!/bin/bash
drupaldir="/var/www/html/intranet.westtoer.be/"
DRUPALHASH="1phcfa";


cd ${drupaldir}
drush vset apachesolr_site_hash ${DRUPALHASH} >> /dev/null 2>&1


function do_index(){
	retry=$1
	if [[ $retry -eq 0 ]]; then
		echo "Failed: Solr Instance was not available"
		exit
	fi
	
	let "retry-=1"
	err=$(drush solr-index 2>&1 | grep "No Solr instance available" | wc -l)

	if [[ $err -ne 0 ]];then
		do_index $retry
	fi
}

marc=$(drush solr-mark-all)
do_index 5
