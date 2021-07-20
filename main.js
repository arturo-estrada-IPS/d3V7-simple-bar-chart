(function (d3) {
  "use strict";

  /**
   * Canvas Dimensions
   */
  const margin = { top: 5, bottom: 50, left: 50, right: 5 };
  const width = 600 - margin.left - margin.right;
  const height = 500 - margin.top - margin.bottom;

  /**
   * Create SVG Element
   */
  const svg = d3
    .select("#myCanvas")
    .append("svg")
    .attr("class", "canvas")
    .attr("height", height + margin.top + margin.bottom)
    .attr("width", width + margin.left + margin.right)
    .append("g")
    .attr("class", "chart-area")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // Draw Axis labels (Bottom and Left) 
    svg
      .append("text")
      .attr("class", "x axis-label")
      .attr(
        "transform",
        `translate(${width / 2}, ${height + margin.bottom - 10})`
      )
      .attr("text-anchor", "middle")
      .text("Competitors");
    svg
      .append("text")
      .attr("class", "y axis-label")
      .attr("transform", "rotate(-90)")
      .attr("x", `${-height / 2}`)
      .attr("y", `${-margin.left}`)
      .attr("dy", "1em")
      .attr("text-anchor", "middle")
      .text("Marshmallows Eaten");

  /**
   * Fetch Data and create chart
   */
  d3.json("/data.json").then((data) => {
    // Set Scales dimensions
    const x = d3
      .scaleBand()
      .range([0, width])
      .domain(data.map((d) => d.name))
      .padding(0.1);
    const y = d3
      .scaleLinear()
      .range([height, 0])
      .domain([0, d3.max(data, (d) => d.marshmallowsEaten)]);

    // Draw x and y axis
    svg
      .append("g")
      .attr("class", "x axis")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(x));
    svg.append("g").attr("class", "y axis").call(d3.axisLeft(y));

    // Draw bars
    svg
      .selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", (d) => x(d.name))
      .attr("y", (d) => y(d.marshmallowsEaten))
      .attr("width", () => x.bandwidth())
      .attr("height", (d) => height - y(d.marshmallowsEaten))
      .attr("fill", "steelblue");
  });
})(d3);
