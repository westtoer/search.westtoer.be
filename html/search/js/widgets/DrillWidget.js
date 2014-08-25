(function ($){
    AjaxSolr.DrillWidget = AjaxSolr.AbstractFacetWidget.extend({

        addByValue: function (name, value) {
            return this.changeSelection(function () {
                return this.manager.store.addByValue(name, value);
            });
        },

        unset: function (name,index) {
            return this.changeSelection(function () {
                return this.manager.store.remove(name, index);
            });
        },

        afterRequest: function() {
            var self = this;
            var dates = self.manager.response.facet_counts.facet_dates[self.field];
            var $excessDates = $();
            var $moreDates;
            var v = 0;

            $(self.target).empty();

            $(self.target).append($('<li class="facet-title"></li>').text('Datum'));

            Object.keys(dates).reverse().forEach(function(date,i){
                v++;
                var filter = ['start', 'end', 'gap'];
                var translations = {between: ' tussen ', after: 'Na', before: 'Voor'};
                var cnt = dates[date];
                var description = '';
                var dateBoundaries = [];
                var dateRange = [];
                var momGap = self.gaps[self.depth()].mom;

                if(moment(date).isValid() === false){
                    description = translations[date];
                    filter.forEach(function(item, x){
                        if(item == date){
                            v--;
                            description = null;
                        }
                    });
                } else {
                    description = self.gaps[self.depth()].format(date);
                    dateBoundaries = [moment(date).toJSON(), moment(date).add(momGap[0], momGap[1]).toJSON()];
                    dateRange = '[' + dateBoundaries.join(' TO ') +']';
                }
                if(description !== null){
                    var $Dateli = $('<li class="date"></li>').append(
                        $('<a></a>').append(description + ' <span class="count">' + cnt + '</span>').click(function(){
                            console.log(dateBoundaries);
                            self.remove('depth');
                            self.addByValue('depth', self.depth() + 1);

                            if(self.add(dateRange)){
                                if(self.depth() >= 3){
                                    self.manager.store.addByValue('depth', 3);
                                }
                                self.remove('facet.date.start');
                                self.addByValue('facet.date.start', dateBoundaries[0]);
                                self.remove('facet.date.end');
                                self.addByValue('facet.date.end', dateBoundaries[1]);
                                self.updateGap();

                                self.doRequest();
                            }

                            return false;

                        })
                    );

                    $(self.target).append($Dateli);
                    if (v>5) {
                        $excessDates = $excessDates.add($Dateli); $Dateli.hide();
                        if ($moreDates === undefined) {
                            $moreDates = $('<li>>> meer</li>').toggle(function(){
                                $moreDates.text('<< minder');
                                $excessDates.show();
                                $moreDates.show();
                            }, function(){
                                $moreDates.text('>> meer');
                                $excessDates.hide();
                            });
                        }
                    }
                }
            });

            if ($moreDates !== undefined) {
                $(self.target).append($moreDates);
            }

            if(v < 5){
                $(self.target).hide();
            }

            },

            init: function(){
                this.manager.store.addByValue('facet.date.start', 'NOW-7YEAR/YEAR');
                this.manager.store.addByValue('facet.date.end', 'NOW+1DAY/DAY');
                this.manager.store.addByValue('depth', 0);
                this.updateGap();
            },
            updateGap: function(){
                var x = this.depth();
                this.manager.store.addByValue('facet.date.gap', this.gaps[x].solr);
            },

            gaps: [
                {   //YEAR
                    solr: "+1YEAR", mom: ['y', 1], format: function(date) {return moment(date).format('YYYY')}
                },{ //MONTH
                    solr: '+1MONTH', mom: ['M', 1], format: function(date) {return moment(date).format('MMMM')}
                },{ //WEEK
                    solr: '+7DAYS', mom: ['d', 7], format: function(date) {return moment(date).format('DD')}
                },{ // DAY
                    solr: '+1DAY', mom: ['d', 1], format: function(date) {return moment(date).format('DD')}
                }
            ],
            depth: function() {
                return this.manager.store.get('depth').val()
            },
            dateFormat: function() {},
            momGaps: function() {}

        });
})(jQuery);