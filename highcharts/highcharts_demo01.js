// import Highcharts from 'highcharts';
// import BA from 'highcharts/modules/broken-axis.js';

Number.prototype.formatMoney = function(c, d, t) {
    var n = this;

    c = isNaN(c = Math.abs(c)) ? 2 : c;
    d = d === undefined ? "." : d;
    t = t === undefined ? "," : t;

    var s = n < 0 ? "-" : "";
    var i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "";
    var j = (j = i.length) > 3 ? j % 3 : 0;

    return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
};

var chart1 = Highcharts.chart('container', {

        chart: {
            type: 'line',
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
            }
        },

        title: {
            text: '<b>Growth Areas and Emissions, 1980-2014</b>',
            margin: 50
        },

        xAxis: {
            tickPositions: [1980, 1990, 1995, 2000, 2005, 2010, 2014],
            gridLineWidth: 4,
            gridLineColor: '#e3e3e3',
            lineWidth: 6,
            lineColor: '#000',
            // alternateGridColor: 'green',
            tickWidth: 0,
            min: 1980,
            max: 2014,
            offset: -3,
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
                }
            },
            plotBands: [{ // visualize the weekend
                from: 1980,
                to: 1995,
                color: '#e3e3e3'
            }]
        },

        yAxis: {
            tickPositions: [-80, -60, -20, 0, 60, 120, 180],
            lineWidth: 6,
            lineColor: '#000',
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
        series: [{
            name: 'GDP',
            marker: {
                symbol: 'square',
                enabled: false
            },
            enableMouseTracking: false,
            id: 'no1',
            color: 'green',
            data: [
                [1980, 0],
                [1995, 60],
                [2000, 60],
                [2005, 61],
                [2010, 120],
                [2014, 125]
            ],
        }]
    });

    $('.add-series').on('click', function() {
        if (chart1.series.length === 1) {
            chart1.addSeries({
                name: 'Vehicle Miles Traveled',
                marker: {
                    symbol: 'square',
                    enabled: false
                },
                color: '#e2c102',
                data: [
                    [1980, 0],
                    [1995, 60],
                    [1998, 55],
                    [2001, 59],
                ]
            });
        }

        console.log(chart1.series[1].group.element);

    });

    chart1.series[0].group.element.classList.add('path-init');

    $('.remove-series').on('click', function() {
        var pathDom = chart1.series[0].group.element;

        $(pathDom).addClass('path-go').removeClass('active');

        console.log(pathDom);

        // chart1.series[0].setOptions({
        //     enableMouseTracking: false,
        // });

        chart1.series[0].options.enableMouseTracking = false;


        // setTimeout(function() {
        //     chart1.series[0].hide();
        //
        // }, 2000);

        console.log(chart1.series[0]);
    });

    $('.readd').on('click',function() {
        var pathDom = chart1.series[0].group.element;

        $(pathDom).addClass('path-go').addClass('active');
    });

    var chart2 = Highcharts.chart('chart2', {
        chart: {
            backgroundColor: '#56be6c',
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie',
        },
        title: {
            text: '<b style=\"color:#000\">NOW</b><br><b style=\"color:#56be6c\">2015</b>',
            align: 'center',
            verticalAlign: 'middle',
            style: {
                'position': 'relative',
                'transform': 'translateY(-14px)',
                'letter-spacing': '1px',
                'font-weight': 'bold',
            }
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                borderWidth: 1,
                borderColor: null,
                startAngle: 150,
                size: '60%',
                dataLabels: {
                    enabled: true,
                    distance: 80,
                    // softConnector: false,
                    connectorColor: '#fff',
                    // format: '55,800',
                    formatter: function() {
                        var value = this.total.toString();
                        for (var i = value.length - 1, count = 0; i >= 0; i--) {
                            count++;
                            if (count % 3 === 0 && i !== 0) {
                                var front = value.slice(0, i);
                                var behind = value.slice(i, value.length);
                                value = front + ',' + behind;
                                // string[i] += ',';
                                count = 0;
                            }
                        }
                        return value;
                    },
                    x: -15,
                    style: {
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'white',
                        // color: 'white',
                        fontSize: 20,
                        fontWeight: 'bold',
                        textShadow: '0'
                    }
                }
            }
        },
        series: [{
            name: 'Brands',
            colorByPoint: true,
            boderWidth: 0,
            colors: ['#fff'],
            data: [{
                name: 'NOW',
                y: 55800
            }]
        }]
    });

    var chart3 = new Highcharts.Chart('chart3', {
        chart: {
            renderTo: 'container',
            type: 'column',
            backgroundColor: 'rgb(242, 137, 41)'
        },
        title: {
            text: 'Pollution Declines from the Power Sector',
            style: {
                visibility: 'hidden'
            }
        },
        legend: {
            symbolWidth: 12,
            symbolHeight: 12,
        },
        xAxis: {
            categories: [
                'CO',
                'NOX',
                'PM10Primary',
                'PM25Primary',
                'SO2',
                'VOC',
                'NH3'
            ],
            labels: {
                style: {
                    color: 'black'
                },
            },
            lineWidth: 3,
            lineColor: 'black',
            tickWidth: 0
        },
        yAxis: {
            title: {
                text: 'Thousands of tons',
                align: 'high',
                offset: -48,
                rotation: 0,
                y: -20,
                style: {
                    color: 'black'
                }
            },
            labels: {
                style: {
                    color: 'black'
                },
                formatter: function() {
                    return parseInt(this.value).formatMoney(0);
                }
            },
            gridLineWidth: 0,
            lineWidth: 3,
            lineColor: 'black',
        },
        plotOptions: {
            column: {
                grouping: false,
                borderWidth: 0,
                pointWidth: 30
            }
        },
        series: [{
            name: '1990',
            color: 'white',
            data: [210000, 40000, 50000, 20000, 40000, 50000, 10000],
        }, {
            name: '2014',
            color: 'black',
            data: [150000, 30000, 35000, 16000, 35000, 35000, 0],
        }]
    });
