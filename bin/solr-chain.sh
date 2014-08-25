#! /bin/bash

SINCESPEC="${1-25 hours ago}";
FOLDERTOINDEX="${2-/mnt/westtoer}";
FNDARGS=" -type f ! -path \*/.\* ! -name .\* ! -name Thumbs.db ! -name header.shtml ! -name footer.shtml "
SCRIPTDIR="$(cd $(dirname "${BASH_SOURCE[0]}" ) && pwd)";

SOLRTEMP="/tmp/solr"
RUNLOG="/home/solr/log"
THISLOG="${RUNLOG}/chainlog-$(date --iso=seconds).log"

#decide how to list files
if [ "${SINCESPEC}" == "all" ] ; then
  echo "Looking for all files in ${FOLDERTOINDEX}";
  echo "Looking for all files in ${FOLDERTOINDEX}" >> ${THISLOG};
  TOTALSIZE=$(du -sh "${FOLDERTOINDEX}" | sed -r 's/^([^\s]*)\s.*$/\1/');
  echo "--> amounting to ${TOTALSIZE}"

  # erase all before start
  echo -e "\n\nDELETING ALL FROM INDEX"
  echo -e "\n\nDELETING ALL FROM INDEX" >> ${THISLOG};
  ${SCRIPTDIR}/solr-clear.sh >> ${THISLOG}

else
  echo "Looking for files in ${FOLDERTOINDEX} that changed less then ${SINCESPEC}";
  echo "Looking for files in ${FOLDERTOINDEX} that changed less then ${SINCESPEC}\n" >> ${THISLOG};

  cts=$(date --date="${SINCESPEC}" '+%Y%m%d%H%M.%S');

  mkdir -p ${SOLRTEMP}

  REFFILE="${SOLRTEMP}/FIND_REFERENCE_FILE";
  rm -rf ${REFFILE};
  touch -t ${cts} ${REFFILE};

  FNDARGS="-newer ${REFFILE} ${FNDARGS}";
fi


TOTALCOUNT=$(find "${FOLDERTOINDEX}" ${FNDARGS} |  wc -l);
echo "--> counting ${TOTALCOUNT} files."

echo -e "\n\nprocess files in ${FOLDERTOINDEX} with filter [${FNDARGS}] and feed to solr\n"; 
echo -e "\n\nprocess files in ${FOLDERTOINDEX} with filter [${FNDARGS}] and feed to solr\n" >> ${THISLOG};
find "${FOLDERTOINDEX}" ${FNDARGS} | while read f; do
  echo -e "\nprocessing ${f}" >> ${THISLOG};
  ${SCRIPTDIR}/solr-feed.sh "$f" >> ${THISLOG};
  echo -n ".";
done;



echo -e "\n\ncommit to solr\n";
echo -e "\n\ncommit to solr\n" >> ${THISLOG};
${SCRIPTDIR}/solr-commit.sh >> ${THISLOG};

echo -e "done.\n"
