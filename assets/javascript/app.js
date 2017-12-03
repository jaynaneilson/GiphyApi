$(document).ready(function(){
	renderButtons();
});
	

var movies = [
	"My Neighbor Totoro", "Spirited Away", "Princess Mononoke", "Howl's Moving Castle", "Kiki's Delivery Service", 
	"Castle in the Sky", "Ponyo", "The Secret World of Arrietty", "Studio Ghibli"
];

function captureMovieName() {
	var movieName = $(this).attr("data-name");

	alert(movieName);
};

	
function renderButtons() {
	$("#movie-buttons").empty();

	for (var i = 0; i < movies.length; i++) {
		var button = $("<button>");
		button.addClass("movie");
		button.attr("data-name", movies[i]);
		button.text(movies[i]);
		$("#movie-buttons").append(button);

	} 

}; 

$('#movie-buttons').on('click', '.movie', function(event){
	
	var giphs = $(this).attr("data-name");
	var cleanGiphs = giphs.replace(/ /g, "+");
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + cleanGiphs + "&api_key=tKmNzS9RHGwk30AxkxDmIHDl0Cuczd1H&limit=10";
	
	ajaxNewMovie(queryURL);

});


$("#add-movie").on("click", function(event) {
	
	event.preventDefault();
	
	var movie = $("#movie-input").val().trim();

	if (movie != '') {

		movies.push(movie);

		renderButtons();

		$("#movie-input").val('');
	}
});


function ajaxNewMovie(queryURL){
	
	$.ajax({

			url: queryURL,

			method: "GET",

			})

	.done(function(response) {

		var results = response.data;

		console.log(results);

		$("#gif-container").empty();

		for (i = 0; i < results.length; i++) {

			var movieDiv = $("<div class='movie-item'>");
			var rating = results[i].rating;
			var p = $("<p>").text("Rating: " + rating);
			var movieImage = $("<img>");
			var imgSrc = results[i].images.fixed_height.url;
			var stillSrc = imgSrc.replace(/\.gif/i, "_s.gif");

			movieImage.attr("src", stillSrc);
			movieImage.attr("data-state", "still");
	        movieDiv.append(movieImage);
	        movieDiv.append(p);
	        
	        $("#gif-container").append(movieDiv);

		}
	});


	$("#gif-container").on("click", 'img', function() {

		var state = $(this).attr("data-state");
		var src = $(this).attr("src");

		if (state === "still") {
			
			$(this).attr("data-state", "animate");
			$(this).attr('src', src.replace(/\_s.gif/i, ".gif"));
			
			} else {

			$(this).attr("data-state", "still");
			$(this).attr('src', src.replace(/\.gif/i, "_s.gif"));

		} 

	});
}