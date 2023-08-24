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

// create a new <g> element for the pie chart
const pieChart = svg.append("g")
  .attr("transform", `translate(${width / 2}, ${height / 2})`);

d3.csv("vehicles.csv")
  .then(data => {
    // do something here
    tracktorsPerMonth(data);
  });

// function to show the data on a pie chart
function tracktorsPerMonth(inputData) {
  console.log(inputData); // check input data

  // select only the rows where Month Taxation_Class is equal to "New_Tractors" or "Secondhand_Tractors"
  let filteredData = inputData.filter(function(d) {
    return (d.Taxation_Class === "New_Tractors" || d.Taxation_Class === "Secondhand_Tractors");
  }) // map function to extract the VALUE field
  .map(function(d) {
    return +d.VALUE; // + operator before d.VALUE to convert from string to number
  });

  console.log(filteredData); // check filtered data

  let superFilteredData = []; // empty array to store extra filtered data

  // for loop to get 14 of the datas
  for(let i = 0; i < filteredData.length; i += 2) {
    let sum = filteredData[i] + filteredData[i + 1]; // add current and next together
    superFilteredData.push(sum);
  }

  console.log(superFilteredData); // check super filtered data

  // create a pie generator function
  let pie = d3.pie()
    .sort(null)
    .value(d => d);

  // generate the pie chart data
  let pieData = pie(superFilteredData);

  console.log(pieData); // check pie data

  // create an arc generator function
  let arcAngle = d3.arc()
    .innerRadius(0)
    .outerRadius(360);
  
  // add the pie slices to the chart
  pieChart.selectAll('path')
    .data(pieData)
    .enter()
    .append('path')
    .attr('d', arcAngle)
    .attr('fill', 'green')
    .attr('stroke', 'orange')
    .attr('stroke-width', 1)
    .attr('class', 'highLight');
}
