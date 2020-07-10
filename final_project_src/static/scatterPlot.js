// d3.js scatter plot implementation
export const scatterPlot = (selection, props) => {
    // distruct properties
    const {
        xValue,
        xAxisLabel,
        yValue,
        circleRadius,
        yAxisLabel,
        margin,
        width,
        height,
        data
    } = props;
    // initialize margin
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    // create scale for x-axis
    const xScale = d3.scaleLinear()
        .domain(d3.extent(data, xValue))
        .range([0, innerWidth])
        .nice();
    // create scale for y-axis
    const yScale = d3.scaleLinear();
    yScale.domain(d3.extent(data, yValue));
    yScale.range([innerHeight, 0]);
    yScale.nice();
    // create plot container group 
    const g = selection.selectAll('.container').data([null]);
    const gEnter = g
        .enter().append('g')
        .attr('class', 'container');
    gEnter
        .merge(g)
        .attr('transform',
            `translate(${margin.left},${margin.top})`
        );
    // create x-axis object
    const xAxis = d3.axisBottom(xScale)
        .tickSize(-innerHeight)
        .tickPadding(15);
    // create y-axis object
    const yAxis = d3.axisLeft(yScale)
        .tickSize(-innerWidth)
        .tickPadding(10);
    // apply d3.js general update pattern to axis
    const yAxisG = g.select('.y-axis');
    const yAxisGEnter = gEnter
        .append('g')
        .attr('class', 'y-axis');
    yAxisG
        .merge(yAxisGEnter)
        .call(yAxis)
        .selectAll('.domain').remove();
    // append label for axis
    const yAxisLabelText = yAxisGEnter
        .append('text')
        .attr('class', 'axis-label')
        .attr('y', -93)
        .attr('fill', 'black')
        .attr('transform', `rotate(-90)`)
        .attr('text-anchor', 'middle')
        .merge(yAxisG.select('.axis-label'))
        .attr('x', -innerHeight / 2)
        .text(yAxisLabel);


    const xAxisG = g.select('.x-axis');
    const xAxisGEnter = gEnter
        .append('g')
        .attr('class', 'x-axis');
    xAxisG
        .merge(xAxisGEnter)
        .attr('transform', `translate(0,${innerHeight})`)
        .call(xAxis)
        .selectAll('.domain').remove();

    const xAxisLabelText = xAxisGEnter
        .append('text')
        .attr('class', 'axis-label')
        .attr('y', 75)
        .attr('fill', 'black')
        .merge(xAxisG.select('.axis-label'))
        .attr('x', innerWidth / 2)
        .text(xAxisLabel);

    // plot circles to plot, add animation on update
    const circles = g.merge(gEnter)
        .selectAll('circle').data(data);
    circles
        .enter().append('circle')
        .attr('cx', innerWidth / 2)
        .attr('cy', innerHeight / 2)
        .attr('r', 0)
        .merge(circles)
        .transition().duration(1000)
        .delay((d, i) => i * 10)
        .attr('cy', d => yScale(yValue(d)))
        .attr('cx', d => xScale(xValue(d)))
        .attr('r', circleRadius);
};