var penguinPromise = d3.json("classData.json")
penguinPromise.then(
function(students)
	{console.log("worked", students);
	drawGraph(students)},
	function(err)
	{console.log("failed", err);}
)

//initiate graph
var drawGraph = function(students)
{
	
	
//not sure about this part screen size and stuff?
//got ride of the SVG and PATHvvvv
	var screen = {width:500, height:400};
	var margins = {top:15, bottom:40, left:70, right:40};
	var graph = 
		{
			width: screen.width-margins.left-margins.right,
			height: screen.height-margins.top-margins.bottom,
		}
	d3.select(student)
		.attr("width", screen.width)
		.attr("height", screen.height)
	var g = d3.select(student)
			.append("g")
			.classed("graph", true)
			.attr("transform", "translate("+margins.left+","+margins.top+")");
	//DELETE THIS ^^^
	
	
	
	//Scales
	var xScale = d3.scaleLinear()
				.domain([0,40])
				.range([0,250])
	var yScale = d3.scaleLinear()
				.domain([0,10])
				.range([0,250])
//Line generator	
var line = d3.line()
	.x(function(student){return xScale(student.quiz.day);})
	.y(function(student){return yScale(student.quiz.grade);})


//creating SVG element
var svg = d3.select("body")
		.append("svg")
		.attr("width", 500)
		.attr("height", 500);
	
//new path 
svg.append("path")
		.datum(students)
		.attr("class","line")
		.attr("student",line);
	
}




//axis
var xAxis = d3.axisBottom()
	.scale(xScale);

svg.append("g")
	.call(xAxis)
	.attr("class", "xaxis")
	.attr("transform", "translate")
	