#!/bin/bash

curl -s http://localhost:8983/solr/update?commit=true -H "Content-Type: text/xml" --data-binary '<delete><query>*:*</query></delete>'
