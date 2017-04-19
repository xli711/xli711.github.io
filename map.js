// set width and height of graphic
var width = 960,
    height = 500;

var projection = d3.geoAlbersUsa()
    .scale(1000)
    .translate([width / 2, height / 2]);

// d3 geopath for projection
var path = d3.geoPath()
    .projection(projection);

// create SVG elements in map HTML element
var svg1 = d3.select("#map-svg")
    .attr("width", width)
    .attr("height", height);

// queue up the datasets, run 'ready' when loaded
d3.queue()
    .defer(d3.json, "data/us.json")
    .defer(d3.csv, "data/election_2016_county_results.csv")
    .await(ready);

// create the graphic with this runction
function ready(error, us, election_2016_county_results) {
  if (error) throw error;

  var rateById = {}; // Create empty object for holding dataset
  election_2016_county_results.forEach(function(d) {
    rateById[d.id] = +d.victory_margin; // Create property for each ID, give it value from rate
    // important: cast rate to numeric value (+)
  });
  console.log(rateById);

  var max = d3.max(election_2016_county_results, function(d) { return +d.victory_margin; });
  var min = d3.min(election_2016_county_results, function(d) { return +d.victory_margin; });
  console.log(max);
  console.log(min);

  // set color
  var color = d3.scaleLinear()
      .domain([0.5, 0.25, 0.1, 0, -0.1, -0.25, -0.5])
      .range(['#b2182b','#d6604d','#f4a582','#fddbc7','#d1e5f0','#92c5de','#4393c3','#2166ac']);

  // create and style counties
  svg1.append("g")
      .attr("class", "counties")
    .selectAll("path")
      .data(topojson.feature(us, us.objects.counties).features)
    .enter().append("path")
      .attr("d", path)
      .style("fill", function(d) { return color(rateById[d.id]); });

  // create state outlines
  svg1.append("path")
      .datum(topojson.mesh(us, us.objects.states, function(a, b) { return a.id !== b.id; }))
      .attr("class", "states")
      .attr("d", path);
}
