(function ($){
    AjaxSolr.ResultWidget = AjaxSolr.AbstractWidget.extend({

        afterRequest: function(){
            $(this.target).empty();

            for (var i = 0, l = this.manager.response.response.docs.length; i < l; i++){
                var doc = this.manager.response.response.docs[i];

                var items = [];
                items = items.concat(this.facetLinks(doc.entity_type));
                items = items.concat(this.facetLinks(doc.ss_name));

                var $links = $('#links_' + doc.id);

                $links.empty();

                for(var j = 0, m = items.length; j < m; j++){
                    $links.append($('<li></li>').append(items[j]));
                }

                $(this.target).append(this.template(doc));
            }
        },

        template: function(doc){
            var snippet = '';

            if(doc.teaser.length > 300){
                snippet += doc.ds_created + ' ' + doc.teaser.substring(0,300);
                snippet += '<span style="display: none">' + doc.teaser.substring(300) + '</span><a href="#" class="more">Meer</a>';
            } else {
                snippet += doc.ds_created + ' ' + doc.teaser;
            }

            var output = '';
            output += '<div class="result"><h3>' + doc.label +'</h3></div>';
            output += '<p id="links_' + doc.id + '" class="links"></p>';
            output += '<p>' + snippet +'</p>'

            return output;
        },

        facetLinks: function(facet_field, facet_values){

            var links = [];

            if(facet_values){
                for(var i = 0, l = facet_values.length; i < l; i++){
                    links.push($('<a href="#"></a>').text(facet_values[i]).click(this.facetHandler(facet_field, facet_values[i])));
                }
            }

            return links;

        },

        facetHandler: function (facet_field, facet_value){
            var self = this;

            return function(){
                self.manager.store.remove('fq');
                self.manager.store.addByValue('fq', facet_field + ':' + AjaxSolr.Parameter.escapeValue(facet_value));
                self.doRequest();
                return false;
            };
        },

        init: function(){
            $(document).on('click', 'a.more', function(){
                var $this = $(this), span = $this.parent().find('span');

                if (span.is(':visible')){
                    span.hide();
                    $this.text('more');
                } else {
                    span.show();
                    $this.text('less');
                    return false;
                }
            })
        },

        beforeRequest: function(){
            $(this.target).html($('<img>').attr('src', 'img/ajax-loader.gif'));
        }

    });
})(jQuery);