var Manager;

(function($){
    $(function (){
        Manager = new AjaxSolr.Manager({
            solrUrl: 'http://search.westtoer.be:8983/solr/'
        });
        //Define the widgets

        Manager.addWidget(
            new AjaxSolr.ResultWidget({
                id: 'result',
                target: '#docs'
            })
        );

        Manager.addWidget(
            new AjaxSolr.PagerWidget({
                id: 'pager',
                target: '#pager',
                prevLabel: 'Vorige',
                nextLabel: 'Volgende',
                innerWindow: 1,
                renderHeader: function(perPage, offset, total){
                    $('#pager-header').html($('<span></span>').text('Toont resultaten van ' + Math.min(total, offset + 1) + ' tot ' + Math.min(total, offset + perPage) + ' van alle' + total + ' documenten.'));
                }
            }));

        Manager.addWidget(
            new AjaxSolr.CurrentSearchWidget({
                id: 'currentsearch',
                target: '#selection'
            })
        );

        Manager.addWidget(new AjaxSolr.TextWidget({
            id: 'text',
            target: '#search'
        }));

        /*var facetTypes = ['ss_name', 'entity_type', 'ds_created', 'content_type'];
        var facetTranslations = ['Auteur', 'Entiteit Type', 'Datum', 'Bestandstype'];
        for (var i = 0, l = facetTypes.length; i < l; i++){
            Manager.addWidget(new AjaxSolr.FacetWidget({
                id: facetTypes[i],
                target: '#'. facerTypes[i],
                field: fields[i],
                translation: facetTranslations[i]
            }));
        }*/

        var fields = [ 'ss_name', 'content_type', 'entity_type' ];
        var translations = ['Auteur', 'Bestandstype', 'Entiteitstype']
        for (var i = 0, l = fields.length; i < l; i++) {
            Manager.addWidget(new AjaxSolr.FacetWidget({
                id: fields[i],
                target: '#' + fields[i],
                field: fields[i],
                translation: translations[i]
            }));
        }

        /*Manager.addWidget(new AjaxSolr.TextWidget({
            id: 'text',
            target: '#search',
            fields: ['ss_name', 'label', 'entity_type']
        }));*/

        Manager.init();
        var params = {
            facet: true,
            'facet.field': [ 'ss_name', 'entity_type', 'ds_created', 'content_type'],
            'facet.mincount': 0,
            'f.ss_name.facet.limit': 50,
            'json.nl': 'map'
        };
        for (var name in params) {
            Manager.store.addByValue(name, params[name]);
        }

        Manager.store.addByValue('q', '*:*');
        Manager.doRequest();


    });
})(jQuery);