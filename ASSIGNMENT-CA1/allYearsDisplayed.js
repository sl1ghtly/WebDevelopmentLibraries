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

  // select only the rows where Month field is equal to "2019Mxx"
  let filteredData1 = inputData.filter(function(d) {
    return (d.Month === "2019M01" || d.Month === "2019M02" || d.Month === "2019M03" || d.Month === "2019M04" || d.Month === "2019M05" || d.Month === "2019M06" || d.Month === "2019M07" || d.Month === "2019M08" || d.Month === "2019M09" || d.Month === "2019M10" || d.Month === "2019M11" || d.Month === "2019M12");
  }) // map function to extract the VALUE field
  .map(function(d) {
    return +d.VALUE; // + operator before d.VALUE to convert from string to number
  });

  console.log(filteredData1); // check filtered data

  let filteredData2019 = []; // empty array to store 2019 month data

  // for loop to get 14 of the datas
  for(let j = 0; j < 14; j++) {
    let sum = 0;
    for(let i = j; i < filteredData1.length; i += 14) {
      sum += filteredData1[i];
    }
    filteredData2019.push(sum);
  }

  console.log(filteredData2019); // check filtered data 2019

  // select only the rows where Month field is equal to "2020Mxx"
  let filteredData2 = inputData.filter(function(d) {
    return (d.Month === "2020M01" || d.Month === "2020M02" || d.Month === "2020M03" || d.Month === "2020M04" || d.Month === "2020M05" || d.Month === "2020M06" || d.Month === "2020M07" || d.Month === "2020M08" || d.Month === "2020M09" || d.Month === "2020M10" || d.Month === "2020M11" || d.Month === "2020M12");
  }) // map function to extract the VALUE field
  .map(function(d) {
    return +d.VALUE; // + operator before d.VALUE to convert from string to number
  });

  let filteredData2020 = []; // empty array to store 2020 month data

  // for loop to get 14 of the datas
  for(let j = 0; j < 14; j++) {
    let sum = 0;
    for(let i = j; i < filteredData2.length; i += 14) {
      sum += filteredData2[i];
    }
    filteredData2020.push(sum);
  }

  console.log(filteredData2020); // check filtered data 2020

  // select only the rows where Month field is equal to "2021Mxx"
  let filteredData3 = inputData.filter(function(d) {
    return (d.Month === "2021M01" || d.Month === "2021M02" || d.Month === "2021M03" || d.Month === "2021M04" || d.Month === "2021M05" || d.Month === "2021M06" || d.Month === "2021M07" || d.Month === "2021M08" || d.Month === "2021M09" || d.Month === "2021M10" || d.Month === "2021M11" || d.Month === "2021M12");
  }) // map function to extract the VALUE field
  .map(function(d) {
    return +d.VALUE; // + operator before d.VALUE to convert from string to number
  });

  let filteredData2021 = []; // empty array to store 2021 month data

  // for loop to get 14 of the datas
  for(let j = 0; j < 14; j++) {
    let sum = 0;
    for(let i = j; i < filteredData3.length; i += 14) {
      sum += filteredData3[i];
    }
    filteredData2021.push(sum);
  }

  console.log(filteredData2021); // check filtered data 2021

  // select only the rows where Month field is equal to "2022Mxx"
  let filteredData4 = inputData.filter(function(d) {
    return (d.Month === "2022M01" || d.Month === "2022M02" || d.Month === "2022M03" || d.Month === "2022M04" || d.Month === "2022M05" || d.Month === "2022M06" || d.Month === "2022M07" || d.Month === "2022M08" || d.Month === "2022M09" || d.Month === "2022M10" || d.Month === "2022M11" || d.Month === "2022M12");
  }) // map function to extract the VALUE field
  .map(function(d) {
    return +d.VALUE; // + operator before d.VALUE to convert from string to number
  });

  let filteredData2022 = []; // empty array to store 2022 month data

  // for loop to get 14 of the datas
  for(let j = 0; j < 14; j++) {
    let sum = 0;
    for(let i = j; i < filteredData4.length; i += 14) {
      sum += filteredData4[i];
    }
    filteredData2022.push(sum);
  }

  console.log(filteredData2022); // check filtered data 2022

  // select only the rows where Month field is equal to "2022Mxx"
  let filteredData2023 = inputData.filter(function(d) {
    return (d.Month === "2023M01")
  }) // map function to extract the VALUE field
  .map(function(d) {
    return +d.VALUE; // + operator before d.VALUE to convert from string to number
  });

  console.log(filteredData2023); // check filtered data 2023

  // get the max value of the filtered VALUE column
  let maximum = d3.max(filteredData2019);
  console.log(maximum); // check maximum number

  // set xScale using scaleBand and set left and right margins
  const xScale = d3.scaleBand()
    .domain(d3.range(filteredData2019.length))
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
      .ticks(null, filteredData2019.format))
      .attr('font-size', '16px');
  }

  // append a group element and add a circle to it for 2019 data
  svg.append('g')
    .selectAll('circle')
    .data(filteredData2019)
    .join('circle')
    .attr('class', 'highLight')
    .attr('cx', (d, i) => xScale(i) + 36)
    .attr('cy', (d) => yScale(d))
    .attr('r', 4)
    .attr('fill', 'blue');

  // append a group element and add a circle to it for 2020 data
  svg.append('g')
    .selectAll('circle')
    .data(filteredData2020)
    .join('circle')
    .attr('class', 'highLight')
    .attr('cx', (d, i) => xScale(i) + 36)
    .attr('cy', (d) => yScale(d))
    .attr('r', 4)
    .attr('fill', 'green');

  // append a group element and add a circle to it for 2021 data
  svg.append('g')
    .selectAll('circle')
    .data(filteredData2021)
    .join('circle')
    .attr('class', 'highLight')
    .attr('cx', (d, i) => xScale(i) + 36)
    .attr('cy', (d) => yScale(d))
    .attr('r', 4)
    .attr('fill', 'red');

  // append a group element and add a circle to it for 2022 data
  svg.append('g')
    .selectAll('circle')
    .data(filteredData2022)
    .join('circle')
    .attr('class', 'highLight')
    .attr('cx', (d, i) => xScale(i) + 36)
    .attr('cy', (d) => yScale(d))
    .attr('r', 4)
    .attr('fill', 'white');

  // append a group element and add a circle to it for 2022 data
  svg.append('g')
    .selectAll('circle')
    .data(filteredData2023)
    .join('circle')
    .attr('class', 'highLight')
    .attr('cx', (d, i) => xScale(i) + 36)
    .attr('cy', (d) => yScale(d))
    .attr('r', 4)
    .attr('fill', 'black');

  // append a group element and add text to bottom
  svg.append("g")
    .attr("transform", `translate(0, ${height - margin.bottom})`)
    .call(xAxis);
  
  // append a group element and add text to left
  svg.append("g")
    .attr("transform", `translate(${margin.left}, 0 )`)
    .call(yAxis);
}
