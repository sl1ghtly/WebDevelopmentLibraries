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

// read csv vehicles data
d3.csv("vehicles.csv")
  .then(data => {
    // function to show the data on a bar chart
    differencePrivateSecondVehicles(data);
  });

// function to show the data on a bar chart
function differencePrivateSecondVehicles(inputData) {
  console.log(inputData); // check input data

  // select only the rows where Month field is equal to "Regs_For_Year"
  let filteredData = inputData.filter(function(d) {
    return (d.Taxation_Class === "New_Private_Cars" || d.Taxation_Class === "Secondhand_Vehicles") && (d.Month === "2019M01" || d.Month === "2020M01" || d.Month === "2021M01" || d.Month === "2022M01" || d.Month === "2023M01");
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
  
  // declare in yearmonth variable
  let monthVar = ["2019M01NEW", "2019M01OLD", "2020M01NEW", "2020M01OLD", "2021M01NEW", "2021M01OLD", "2022M01NEW", "2022M01OLD", "2023M01NEW", "2023M01OLD"];
  
  // add the text at the bottom
  function xAxis(g) {
    g.call(d3.axisBottom(xScale)
      .tickFormat(i => monthVar[i]))
      .attr('font-size', '16px');
  }

  // add text to the left side
  function yAxis(g) {
    g.call(d3.axisLeft(yScale)
      .ticks(null, filteredData.format))
      .attr('font-size', '16px');
  }
  // append a group element and add a rectangle to it
  svg.append('g')
    .selectAll('rect')
    .data(filteredData)
    .join('rect')
    .attr('class', 'highLight')
    .attr('x', (d, i) => xScale(i))
    .attr('y', (d, i) => yScale(filteredData[i]))
    .attr('height', (d, i) => yScale(0) - yScale(filteredData[i]))
    .attr('width', xScale.bandwidth())
    .attr('fill', 'green');

  // append a group element and add text to bottom
  svg.append("g")
    .attr("transform", `translate(0, ${height - margin.bottom})`)
    .call(xAxis);
  
  // append a group element and add text to left
  svg.append("g")
    .attr("transform", `translate(${margin.left}, 0 )`)
    .call(yAxis);
}
