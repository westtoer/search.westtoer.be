#search.westtoer.be

An search engine for the Westtoer Intranet, based upon [Ajax Solr](https://github.com/evolvingweb/ajax-solr).

##Why is this on Github?

Westtoer's development has a sharing-is-caring mentality. We believe that our project code could be of good use for people setting up an intranet solution for a SMB with Drupal and Apache Solr. 

Our usage case differs from how most people use Drupal in tandem with Apache Solr. Most installations just put the Drupal nodes in the Solr index, and this creates a very fast index for Drupal, but the functionality isn't actually very useful for an intranet, where files are equally as important.

The Drupal Solr plugins don't like to search through files, so therefore we went for a search UI outside of Drupal. 

The scripts will allow for modular files indexing, ranging from a full index to incremental updates of the index.

We hope you can use this project as a lead on how to create a good intranet solution. If you had some good guidelines, please share a comment on Twitter or send a mail to im@nielsvermaut.eu
