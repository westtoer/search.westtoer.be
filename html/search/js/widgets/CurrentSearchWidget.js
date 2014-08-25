(function ($) {

    AjaxSolr.CurrentSearchWidget = AjaxSolr.AbstractWidget.extend({
        start: 0,

        afterRequest: function () {
            var self = this;
            var links = [];
            var dsCreated = [];

            var q = this.manager.store.get('q').val();
            if (q != '*:*') {
                links.push($('<a href="#"></a>').text('(x) ' + q).click(function () {
                    self.manager.store.get('q').val('*:*');
                    self.doRequest();
                    return false;
                }));
            }

            var fq = this.manager.store.values('fq');
            for (var i = 0, l = fq.length; i < l; i++) {
                if(fq[i].substr(0,10) == 'ds_created'){
                    dsCreated.push(fq[i]);
                } else {
                    links.push($('<a href="#"></a>').text('(x) ' + fq[i]).click(function(){

                        self.removeFacet(fq[i]);


                    }));
                }

                if(i == fq.length - 1){
                    if(dsCreated.length != 0){
                        links.push($('<a href="#"></a>').text('(x) ' + dsCreated[dsCreated.length - 1]).click(
                            function(){
                                self.manager.store.addByValue('depth', this.manager.store.get('depth').val() - 1);
                                self.removeFacet(dsCreated[dsCreated.length - 1]);
                                return false;
                            }


                        ));
                    }
                }
            }

            if (links.length > 1) {
                links.unshift($('<a href="#"></a>').text('Verwijder filters').click(function () {
                    self.manager.store.get('q').val('*:*');
                    self.manager.store.remove('fq');
                    self.doRequest();
                    return false;
                }));
            }

            if (links.length) {
                var $target = $(this.target);
                $target.empty();
                for (var i = 0, l = links.length; i < l; i++) {
                    $target.append($('<li></li>').append(links[i]));
                }
            }
            else {
                $(this.target).html('<li>Er is geen filter actief</li>');
            }
        },

        removeFacet: function (facet) {
            var self = this;
            return function () {
                if (self.manager.store.removeByValue('fq', facet)) {
                    self.doRequest();
                }
                return false;
            };
        }
    });

})(jQuery);
