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
		.attr("student",line)
}




//axis
var xAxis = d3.axisBottom()
	.scale(xScale);

svg.append("g")
	.call(xAxis)
	.attr("class", "xaxis")
	.attr("transform", "translate")
	