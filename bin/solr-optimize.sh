#!/bin/bash

curl -s http://localhost:8983/solr/update -H "Content-Type: text/xml" --data-binary '<optimize/>'
