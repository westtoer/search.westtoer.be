(function ($){
    AjaxSolr.ResultWidget = AjaxSolr.AbstractWidget.extend({

        start: 0,

        beforeRequest: function () {
            $(this.target).html($('<img>').attr('src', 'images/ajax-loader.gif'));
        },

        facetLinks: function (facet_field, facet_values) {
            var links = [];
            if (facet_values) {
                for (var i = 0, l = facet_values.length; i < l; i++) {
                    if (facet_values[i] !== undefined) {
                        links.push(
                            $('<a href="#"></a>')
                                .text(facet_values[i])
                                .click(this.facetHandler(facet_field, facet_values[i]))
                        );
                    }
                    else {
                        links.push('Niet beschikbaar met deze selectie');
                    }
                }
            }
            return links;
        },

        facetHandler: function (facet_field, facet_value) {
            var self = this;
            return function () {
                self.manager.store.remove('fq');
                self.manager.store.addByValue('fq', facet_field + ':' + AjaxSolr.Parameter.escapeValue(facet_value));
                self.doRequest();
                return false;
            };
        },

        afterRequest: function(){
            $(this.target).empty();

            for (var i = 0, l = this.manager.response.response.docs.length; i < l; i++){
                var doc = this.manager.response.response.docs[i];

                $(this.target).append(this.template(doc));
            }
        },

        template: function(doc){
            var snippet = '';

            if(doc.teaser.length > 300){
                snippet += '<div class="row"><div class="col-md-9">' + doc.teaser.substring(0,300) + '</div><div class="col-md-3 right">'+ doc.ds_created +'</div></div>';
                snippet += '<span style="display: none">' + doc.teaser.substring(300) + '</span><a href="#" class="more">Meer</a>';
            } else {
                snippet += '<div class="row"><div class="col-md-9">' + doc.teaser + '</div><div class="col-md-3 right">'+ doc.ds_created +'</div></div>';
            }

            var output = '';
            output += '<div class="result"><a href="' + doc.path + '"><h3>' + doc.label +'</h3></a></div>';
            output += '<ul id="links_' + encodeURIComponent(doc.id) + '" class="links"></ul>';
            output += '<p>' + snippet +'</p>'

            return output;
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