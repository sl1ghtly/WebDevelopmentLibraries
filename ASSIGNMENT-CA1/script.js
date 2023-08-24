// set the height, width and margin variables
const height = 700;
const width = 1300;
const margin = { top: 20, bottom: 20, left: 80, right: 80 }

// select the container class and append svg materials to it.
const svg = d3.select(".container")
  .append("svg")
  .attr("width", width - margin.left - margin.right)
  .attr("height", height - margin.top - margin.bottom)
  .attr("viewBox", [0, 0, width, height])
  .style("border", "1px solid black");

d3.csv("vehicles.csv")
  .then(data => {
    // do something here
    allRegsInYear(data);
  });

// function to show the data on a line chart
function allRegsInYear(inputData) {
  console.log(inputData); // check input data

  // select only the rows where Taxation_Class field is equal to "Regs_For_Year"
  let filteredData = inputData.filter(function(d) {
    return d.Taxation_Class === "Regs_For_Year";
  }) // map function to extract the VALUE field
  .map(function(d) {
    return +d.VALUE; // + operator before d.VALUE to convert from string to number
  });

  console.log(filteredData); // check filtered data

  // get the max value of the filtered VALUE column
  let maximum = d3.max(filteredData);
  console.log(maximum); // check maximum number

  // set xScale using scaleBand and set left and right margins
  const xScale = d3.scaleBand()
    .domain(d3.range(filteredData.length))
    .range([margin.left, width - margin.right])
    .padding(0.1);

  // set yScale using scaleLinear and set the top and bottom margins
  const yScale = d3.scaleLinear()
    .domain([0, maximum])
    .range([height - margin.bottom, margin.top]);

  // Define the line function
  const line = d3.line()
    .x((d, i) => xScale(i) + xScale.bandwidth() / 2) // set x position
    .y((d) => yScale(d)); // set y position

  // append a group element and add a line to it
  svg.append('g')
    .append('path')
    .datum(filteredData) // set data
    .attr('fill', 'none')
    .attr('stroke', 'green')
    .attr('stroke-width', 2)
    .attr('d', line)
    .attr('class', 'highLight');

  // declare year variable
  let year = 2019;

  // add the text at the bottom
  function xAxis(g) {
    g.call(d3.axisBottom(xScale)
      .tickFormat(i => year++))
      .attr('font-size', '16px');
  }

  // add text to the left side
  function yAxis(g) {
    g.call(d3.axisLeft(yScale)
      .ticks(null, filteredData.format))
      .attr('font-size', '16px');
  }

  // append a group element and add text to bottom
  svg.append("g")
    .attr("transform", `translate(0, ${height - margin.bottom})`)
    .call(xAxis);

  // append a group element and add text to left
  svg.append("g")
    .attr("transform", `translate(${margin.left}, 0 )`)
    .call(yAxis);
}