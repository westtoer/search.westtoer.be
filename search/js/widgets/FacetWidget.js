(function ($){
    AjaxSolr.FacetWidget = AjaxSolr.AbstractFacetWidget.extend({

        afterRequest: function () {
            if (this.manager.response.facet_counts.facet_fields[this.field] === undefined) {
                $(this.target).html('no items found in current selection');
                return;
            }

            var maxCount = 0;
            var objectedItems = [];
            for (var facet in this.manager.response.facet_counts.facet_fields[this.field]) {
                var count = parseInt(this.manager.response.facet_counts.facet_fields[this.field][facet]);
                if (count > maxCount) {
                    maxCount = count;
                }
                objectedItems.push({ facet: facet, count: count });
            }
            objectedItems.sort(function (a, b) {
                return a.facet < b.facet ? -1 : 1;
            });

            $(this.target).empty();

            $(this.target).append($('<li class="facet-title"></li>').text(this.translation));

            var me = this;
            var $excess = $();
            var $more;
            var amount;
            objectedItems.forEach(function(item, i){
                var cnt = item.count;
                var facet = item.facet;
                if (facet) {
                    var fctLabel = facet.trim() || "<<onbekend>>"
                    if(item.count > 0){
                        var $li = $('<li></li>').append(
                            $('<a href="#"></a>').attr('id', me.field + '-' + facet).text(fctLabel + ' (' + cnt + ')').click(me.clickHandler(facet))
                        );
                        $(me.target).append($li);
                        if (i>5) {
                            $excess = $excess.add($li); $li.hide();
                            if ($more === undefined) {
                                $more = $('<li>>> meer</li>').toggle(function(){
                                    $more.text('<< minder');
                                    $excess.show();
                                }, function(){
                                    $more.text('>> meer');
                                    $excess.hide();
                                });
                            }
                        }
                    }
                }
            });

            if ($more !== undefined) {
                $(me.target).append($more);
            }
        }
    });
})(jQuery);