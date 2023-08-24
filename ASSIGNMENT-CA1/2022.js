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

// function to show the data on a bar chart
function allRegsInYear(inputData) {
  console.log(inputData); // check input data

  // select only the rows where Month field is equal to "Regs_For_Year"
  let filteredData = inputData.filter(function(d) {
    return (d.Month === "2022M01" || d.Month === "2022M02" || d.Month === "2022M03" || d.Month === "2022M04" || d.Month === "2022M05" || d.Month === "2022M06" || d.Month === "2022M07" || d.Month === "2022M08" || d.Month === "2022M09" || d.Month === "2022M10" || d.Month === "2022M11" || d.Month === "2022M12");
  }) // map function to extract the VALUE field
  .map(function(d) {
    return +d.VALUE; // + operator before d.VALUE to convert from string to number
  });

  console.log(filteredData); // check filtered data

  let superFilteredData = []; // empty array to store extra filtered data

  // for loop to get 14 of the datas
  for(let j = 0; j < 14; j++) {
    let sum = 0;
    for(let i = j; i < filteredData.length; i += 14) {
      sum += filteredData[i];
    }
    superFilteredData.push(sum);
  }

  console.log(superFilteredData); // check super filtered data

  // get the max value of the filtered VALUE column
  let maximum = d3.max(superFilteredData);
  console.log(maximum); // check maximum number

  // set xScale using scaleBand and set left and right margins
  const xScale = d3.scaleBand()
    .domain(d3.range(superFilteredData.length))
    .range([margin.left, width - margin.right])
    .padding(0.1);
  
  // set yScale using scaleLinear and set the top and bottom margins
  const yScale = d3.scaleLinear()
    .domain([0, maximum])
    .range([height - margin.bottom, margin.top]);

  // add the text at the bottom
  function xAxis(g) {
    g.call(d3.axisBottom(xScale)
      .tickFormat(i => i + 1))
      .attr('font-size', '16px');
  }

  // add text to the left side
  function yAxis(g) {
    g.call(d3.axisLeft(yScale)
      .ticks(null, superFilteredData.format))
      .attr('font-size', '16px');
  }

  // append a group element and add a circle to it
  svg.append('g')
    .selectAll('circle')
    .data(superFilteredData)
    .join('circle')
    .attr('class', 'highLight')
    .attr('cx', (d, i) => xScale(i) + 36)
    .attr('cy', (d) => yScale(d))
    .attr('r', 4)
    .attr('fill', 'white');

  // append a group element and add text to bottom
  svg.append("g")
    .attr("transform", `translate(0, ${height - margin.bottom})`)
    .call(xAxis);
  
  // append a group element and add text to left
  svg.append("g")
    .attr("transform", `translate(${margin.left}, 0 )`)
    .call(yAxis);
}
