var Manager;

(function($){
    $(function (){
        Manager = new AjaxSolr.Manager({
            solrUrl: 'http://192.168.0.98:8983/solr/'
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
        Manager.init();
        Manager.store.addByValue('q', '*:*');
        Manager.doRequest();



    });
})(jQuery);