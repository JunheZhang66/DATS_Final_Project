import { dropdownMenu } from './dropdownMenu.js'
import { scatterPlot } from './scatterPlot.js'
// render section 2 line chart
google.charts.load('current', {
    packages: ['corechart', 'line', 'bar']
});
console.log('inside jsssssssssssssss')
let data
let columns = [
    'Close',
    'NetIncomeContinuousOperations',
    'NormalizedEBITDA',
    'TotalExpenses',
    'MarketCap',
    'InvestedCapital',
    'NormalizedIncome',
    'TotalCapitalization',
    'NetTangibleAssets',
    'GrossProfit',
    'DepreciationAmortizationDepletion'
]
let xColumn = columns[0]
let yColumn = columns[0]
const svg = d3.select('#section1 .section1-scatter')
const width = svg.attr('width')
console.log('width=' + width)
const height = svg.attr('height')
$(() => {
    console.log('js linked')
    d3.json("/data").then(function(loadeddata) {
        console.log('inside data')

        data = JSON.parse(loadeddata)

        render_scatter1()

    })
})

// render section 1 scatter plot
const render_scatter1 = () => {
    const onXColumnClicked = (column) => {
        xColumn = column
        render_scatter1()
    }
    const onYColumnClicked = (column) => {
        yColumn = column
        render_scatter1()
    }
    dropdownMenu(d3.selectAll('#y-menu'), {
        options: columns,
        onOptionClicked: onYColumnClicked
    })
    dropdownMenu(d3.selectAll('#x-menu'), {
        options: columns,
        onOptionClicked: onXColumnClicked
    })
    svg.call(scatterPlot, {
        title: 'Y vs x',
        xValue: d => d[xColumn],
        xAxisLabel: xColumn,
        yValue: d => d[yColumn],
        yAxisLabel: yColumn,
        circleRadius: 10,
        margin: { top: 60, right: 40, bottom: 88, left: 150 },
        width: width,
        height: height,
        data: data
    })
}

// draw line charts
google.charts.setOnLoadCallback(drawLineCharts);

function drawLineCharts() {
    console.log('insied line chart')
    var query = 'SELECT *'
    var queryString = encodeURIComponent(query);
    var query = new google.visualization.Query(
        'https://docs.google.com/spreadsheets/d/1wA5mOwLrGa0XUA_tCZdSEpQmS1scHmEedl8IHztN4i8/gviz/tq?sheet=' + '&headers=1&tq=' + queryString);
    query.send(linechartResponseHandler);
}

function linechartResponseHandler(response) {
    var data = response.getDataTable();
    var options = {
        chart: {
            title: 'Top 10 Features Increase Rate',
            subtitle: 'Data scaled using Min-Max Scaler'
        },
        width: 1000,
        height: 500,
        axes: {
            x: {
                0: { side: 'top' }
            }
        },
        crosshair: {
            color: '#000',
            trigger: 'selection'
        }
    };

    var chart = new google.charts.Line(document.getElementById('line-chart'));

    chart.draw(data, google.charts.Line.convertOptions(options));
}

// draw scatter plot for predict and actual close value
google.charts.setOnLoadCallback(drawScatterPlot);

function drawScatterPlot() {
    console.log('insied scatter chart')
    var query = 'SELECT *'
    var queryString = encodeURIComponent(query);
    var query = new google.visualization.Query(
        'https://docs.google.com/spreadsheets/d/1gzTLDUEyyBWhruy6_JXC3-pWUGcOKaHTgYDm6duYjkg/gviz/tq?sheet=' + '&headers=1&tq=' + queryString);
    query.send(scatterPlotResponseHandler);
}

function scatterPlotResponseHandler(response) {
    var data = response.getDataTable();
    var options = {
        width: 1000,
        height: 500,
        crosshair: {
            color: '#000',
            trigger: 'selection'
        },
        title: 'Stock Close Price\nActual value vs Predicted Value in (USD)',
        hAxis: { title: 'Year' },
        vAxis: { title: 'Stock Close Price' },
    };


    var chart = new google.visualization.ScatterChart(document.getElementById('scatter-plot'));

    chart.draw(data, options);
}

// draw bar chart for coefficients
google.charts.setOnLoadCallback(drawBarChart);

function drawBarChart() {
    console.log('insied Bar chart')
    var query = 'SELECT *'
    var queryString = encodeURIComponent(query);
    var query = new google.visualization.Query(
        'https://docs.google.com/spreadsheets/d/1iw0POFzNz6wsvbdUW7X0VTzU727s2EjPkadmvFuIl6I/gviz/tq?sheet=' + '&headers=1&tq=' + queryString);
    query.send(barChartResponseHandler);
}

function barChartResponseHandler(response) {
    var data = response.getDataTable();
    var options = {
        width: 1000,
        height: 500,

        title: 'Data Model Coefficient\nScaled using Min-Max Scaler',

        hAxis: { title: 'Magnitude' },
        vAxis: { title: 'Data Model Coefficient' },
    };


    var chart = new google.visualization.BarChart(document.getElementById('bar-chart'));

    chart.draw(data, options);
}