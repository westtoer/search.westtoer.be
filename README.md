#search.westtoer.be

An search engine for the Westtoer Intranet, based upon [Ajax Solr](https://github.com/evolvingweb/ajax-solr).

Our Intranet is using DRUPAL with the SOLR search-module to let the managed content be indexable threough solr.
We added this project next to it to (compliant to the drupal-solr-schema)
- also index the files on the shared company disk in the same SOLR instance
- provide a UI to drill into the bulk of content

You don't need Drupal to be running this project though, it only explains some origins of the constructs you can find in the solr config files we include.


##How does this work

To enjoy this you will need to:

* checkout this code somewhere
* setup a SOLR4 instance
* add our included (see ./conf) solrconfig.xml and schema.xml to the solr-core you want to use
* hook up the shell scripts (see ./bin) in your cron to regularly update the index with changed files. Example:
```
# m h  dom mon dow   command
# each week a full index on friday-evening
5 21 * * 5           ~/bin/solr-index-disk-full.sh
# each day (except friday) an incremental index update
5 21 * * 0,1,2,3,4,6 ~/bin/solr-index-disk-incr.sh

```
* hook up the web-page assets (see ./html) in some web-server




##Why is this on Github?

Westtoer's development has a sharing-is-caring mentality. We believe that our project code could be of good use for people setting up an intranet solution for a SMB with Drupal and Apache Solr. 

Our usage case differs from how most people use Drupal in tandem with Apache Solr. Most installations just put the Drupal nodes in the Solr index, and this creates a very fast index for Drupal, but the functionality isn't actually very useful for an intranet, where files are equally as important.

The Drupal Solr plugins don't like to search through files, so therefore we went for a search UI outside of Drupal. 

The scripts will allow for modular files indexing, ranging from a full index to incremental updates of the index.

We hope you can use this project as a lead on how to create a good intranet solution. If you had some good guidelines, please share a comment on Twitter or send a mail to im@nielsvermaut.eu
