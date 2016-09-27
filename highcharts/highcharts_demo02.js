function createPrimaryChart(self) {
    self.high_chart = Highcharts.chart(self.$primary_chart[0], {
        chart: {
            type: 'line',
            events: {
                load: function(event) {
                    var chart = this;
                    setTimeout(function() {
                        //reflow the size
                        chart.reflow();

                        // to hide the series at the begining
                        for (var i = 0; i < chart.series.length; i++) {
                            var pathDom = chart.series[i].group.element;
                            pathDom.addClass('path-init');
                            if (i === 0 && platform.isIE) {
                                // pathDom.addClass('active');
                                TweenMax.to(pathDom, self.time_ie_svg, {
                                    'stroke-dashoffset': 0
                                });
                            } else {
                                pathDom.addClass('no-ani-seriers');
                            }
                            chart.series[i].options.enableMouseTracking = false;
                        }

                    }, 0);
                }
            },
            backgroundColor: '#f1f1f1',
        },

        legend: {
            enabled: false
        },

        credits: {
            enabled: false
        },

        plotOptions: {
            lineCap: 'square',
            marker: {
                enabled: false,
            },
            series: {
                lineWidth: 4,
                // enableMouseTracking: false,
                marker: {
                    enabled: false
                },
            }
        },

        title: {
            text: 'Growth Areas and Emissions, 1980-2014',
            margin: 30,
            style: {
                'font-size': '13px',
                'line-height': '18px'
            },
        },

        tooltip: {
            formatter: function() {
                return this.series.name + ':' + this.y + "%";
            }
        },

        xAxis: {
            tickPositions: [1980, 1990, 1995, 2000, 2005, 2010, 2014],
            gridLineWidth: 2,
            gridLineColor: '#d1d1d1',
            lineWidth: 3,
            lineColor: '#272727',
            // alternateGridColor: 'green',
            tickWidth: 0,
            min: 1980,
            max: 2014,
            offset: -2,
            breaks: [{
                from: 1980,
                to: 1990,
                breakSize: 2
            }, {
                from: 1990.00001,
                to: 1995,
                breakSize: 2
            }],
            labels: {
                formatter: function() {
                    return this.value.toString().slice(2);
                },
            },
            plotBands: [{ // visualize the weekend
                from: 1980,
                to: 1995,
                color: '#d1d1d1'
            }]
        },

        yAxis: {
            tickPositions: [-80, -60, -20, 0, 60, 120, 180],
            lineWidth: 3,
            lineColor: '#272727',
            min: -80,
            max: 180,
            tickInterval: 20,
            breaks: [{
                from: -60,
                to: -20,
                breakSize: 60
            }, {
                from: -19.99999,
                to: 0,
                breakSize: 60
            }],
            title: {
                style: {
                    'display': 'none',
                },
            },
            showFirstLabel: false,
            labels: {
                formatter: function() {
                    return this.value + '%';
                }
            },
            gridLineWidth: 0,
        },
        series: self.chart_series
    });
}
