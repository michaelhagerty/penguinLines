var penguinPromise = d3.json("classData.json")
penguinPromise.then(
function(students)
	{console.log("worked", students);
	drawGraph(students)},
	function(err)
	{console.log("failed", err);}
)

var quizes = function(student)
	{return student.quizes}
	
//labels
var createLabels = function(screen,margins,graph,students)
	{
		var labels = d3.select("svg")
			.append("g")
			.classed("labels", true)
			
		labels.append("text")
			.text("Student Quiz Scores")
			.classed("title", true)
			.attr("text-anchor", "middle")
			.attr("x", margins.left+(graph.width/2))
			.attr("y", margins.top)
		labels.append("text")
			.text("Day")
			.classed("label", true)
			.attr("text-anchor","middle")
			.attr("x", margins.left+(graph.width/2))
			.attr("y", screen.height)
		labels.append("g")
			.attr("transform", "translate(20,"+(margins.top+(graph.height/2))+")")
			.append("text")
			.text("Quiz Score")
			.classed("label", true)
			.attr("text-anchor", "middle")
			.attr("transform","rotate(90)")
	}
//lines
var drawLines = function(students,graph,xScale,yScale)
{
	var lineGenerator = d3.line()
	.x(function(quiz){return xScale(quiz.day);})
	.y(function(quiz){return yScale(quiz.grade);})

	var lines = d3.select("svg")
		.select(".graph")
		.selectAll("g")
		.data(students)
		.enter()
		.append("g")
		.classed("line", true)
		.attr("fill","none")
		.attr("stroke","blue")
		.on("mouseover", function(student)
		   {
			if(! d3.select(this).classed("off"))
				{
				d3.selectAll(".line")
					.classed("fade", true)
				d3.select(this)
					.classed("fade", false)
					.raise();
				}
		})
		.on("mouseout", function(student)
		   {
			if(! d3.select(this).classed("off"))
				{
					d3.select(".line")
						.classed("fade", false);
				}
		})
	lines.append("path")
		.datum(quizes)
		.attr("d",lineGenerator)}

//axis
var createAxes = function(screen,margins,graph,xScale,yScale)
{
	var xAxis = d3.axisBottom(xScale)
	var yAxis = d3.axisLeft(yScale)
	var axes = d3.select("svg")
				.append("g")
		axes.append("g")
			.attr("transform","translate("+margins.left+","+(margins.top+graph.height)+")")
			.call(xAxis)
		axes.append("g")
			.attr("transform","translate("+margins.left+","+(margins.top)+")")
			.call(yAxis)
}




//drawgraph
var drawGraph = function(students)
{
	var screen = {width:500, height:500};
	var margins = {top: 20, bottom: 40, left: 70, right: 40};
	var graph = {width: screen.width-margins.left-margins.right, height: screen.height-margins.top-margins.bottom};

	//creating svg
var svg = d3.select("body")
		.append("svg")
		.attr("width", screen.width)
		.attr("height", screen.height);
var g = d3.select("svg")
		.append("g")
		.classed("graph", true)
		.attr("transform", "translate("+margins.left+","+margins.top+")")

//scales
var xScale = d3.scaleLinear()
				.domain([0,40])
				.range([0, graph.width])
	var yScale = d3.scaleLinear()
				.domain([0,10])
				.range([graph.height,0])
	
	createLabels(screen,margins,graph,students)
	drawLines(students,graph,xScale,yScale)
	createAxes(screen,margins,graph,xScale,yScale)
	}


