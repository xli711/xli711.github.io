// set width and height of graphic
var width = 960,
    height = 500;

var years = [2000, 2004, 2008, 2012, 2016];
var inputValue = years[4];

var projection = d3.geoAlbersUsa()
    .scale(1000)
    .translate([width / 2, height / 2]);

// d3 geopath for projection
var geoPath = d3.geoPath()
    .projection(projection);

// create SVG elements in map HTML element
var svg = d3.select("#map-svg")
    .attr("width", width)
    .attr("height", height);

// queue up the datasets, run 'ready' when loaded
// d3.queue()
//     .defer(d3.json, "data/us.json")
//     .defer(d3.json, "data/election_results_2000_2016.json")
//     .await(ready);

// create the graphic with this runction
// function ready(error, us, election_results_2000_2016) {
//   if (error) throw error;

//   var winner = {}; // Create empty object for holding dataset
//   election_results_2000_2016.forEach(function(d) {
//     winner[d.id] = +d.victory_margin; // Create property for each ID, give it value from rate
//     // important: cast rate to numeric value (+)
//   });
//   console.log(rateById);

  // set color
  var color = d3.scaleOrdinal()
      .domain(["R", "D"])
      .range(['#b2182b','#2166ac']);

  // create and style states
  var g = svg.append( "g" );

  g.selectAll( "path" )
    .data( election_results_json.features )

    .enter()
    .append( "path" )
    .attr("class", "states")
    .attr( "fill", function(d) { return color(d.properties.elect2000); } )
    .attr( "d", geoPath );

  // when the input range changes update the value
  d3.select("#timeslide").on("input", function(d) {
      update(+this.value);
  });

  // update the fill of each SVG of class "incident"
  function update(value) {
      document.getElementById("range").innerHTML=years[value];
      inputValue = years[value];
      d3.selectAll(".states")
            .attr("fill", function(d){return yearMatch(d, value);});
  }

  function yearMatch(data, value){
    var results = [data.properties.elect2000, data.properties.elect2004, data.properties.elect2008, data.properties.elect2012, data.properties.elect2016];
    var propertyValue = results[value];
    
    return color(propertyValue);
    
  }



  // svg.append("g")
  //     .attr("class", "states")
  //   .selectAll("path")
  //     .data(topojson.feature(us, us.objects.states).features)
  //   .enter().append("path")
  //     .attr("d", path)
  //     .style("fill", function(d) { return color(rateById[d.id]); });

  // create state outlines
//   svg.append("path")
//       .datum(topojson.mesh(us, us.objects.states, function(a, b) { return a.id !== b.id; }))
//       .attr("class", "states")
//       .attr("d", path);
// }
