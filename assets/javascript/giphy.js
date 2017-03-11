var gifChoices = ["Dog", "Bird", "Fish", "Cat", "Turtle", "Snake"];

function addGifButton(){
	
	i++;
	
	var userButtonInput = $("#buttonContent").val().trim().toLowerCase().replace(/\b[a-z]/g, function(letter) {
		return letter.toUpperCase();
	})
	
	$("#gifOptions option").attr("selected", false);
	
	var gifOption = $("<option>")
		.attr("value", "gifOptionsToPickFrom")
		.attr("id", "option-" + i)
		
		.html(userButtonInput)
		
		.attr("selected", "selected");
	
	gifChoices.push(gifOption.text());
	
	$("#gifOptions").append(gifOption);

	console.log("This is gifChoices array: " + gifChoices);
	console.log(userButtonInput + " was added to the list.");
} 

var i = 3;

$("#addButton").on("click", function(){
	
	if ($("#buttonContent").val().trim().toLowerCase() == ""){
		console.log("Not a valid text option.");
    }else{
    	
    	if (gifChoices.indexOf($("#buttonContent").val().trim().toLowerCase().replace(/\b[a-z]/g, function(letter) {
    		return letter.toUpperCase();
    	})) != -1){
    		console.log($("#buttonContent").val().trim().toLowerCase().replace(/\b[a-z]/g, function(letter) {
    			return letter.toUpperCase();
    		}) + " was used already added.");
    	}else{
    		
			addGifButton();
    	}
    }
}); 

$("#buttonContent").keypress(function(event) {
	
    if ($("#buttonContent").val().trim().toLowerCase() == ""){
 		console.log("Not a valid text option.");
 	
    }else if (event.which == 13) {
    	
    	if (gifChoices.indexOf($("#buttonContent").val().trim().toLowerCase().replace(/\b[a-z]/g, function(letter) {
    		return letter.toUpperCase();
    	})) != -1){
    		
	        event.preventDefault();
    	}else{
    		
	        event.preventDefault();
	        addGifButton();
	    }
    }
}); 

var searchButton = $("#searchButton");

searchButton.on("click", function(){
	
	var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + $("#gifOptions option:selected").text() + "&limit=" + $("#limit option:selected").val() + "&rating=pg-13&api_key=dc6zaTOxFJmzC";
	
	$.ajax({
		url: queryURL,
		method: "GET"
	})
	
	.done(function(response) {
		
		var results = response.data;
		
		for (var j=0; j < results.length; j++){
			var gifRating = $("<p>")
				.addClass("ratingFont")
				.text("Rating: " + results[j].rating);
			
			var gifDiv = $("<div>")
				.addClass("gifContentBox");
			
			var gifImageContainer = $("<div>")
				.addClass("imageContainer");
					
			var gifImage = $("<img>")
				
				.attr("src", results[j].images.fixed_height_still.url)
				
				.data("animate", results[j].images.fixed_height.url)
				
				.data("still", results[j].images.fixed_height_still.url)
				
				.attr("data-state", "still");
			
			gifImageContainer.append(gifImage);
			gifImageContainer.append(gifRating);
			gifDiv.append(gifImageContainer);
			
			$("#placeForClickedGifs").prepend(gifDiv);
		}

		$("#placeForClickedGifs img").on("click", function(){
			
			var state = $(this).attr("data-state");
			
			if(state == "still"){
    			
				$(this).attr("src", $(this).data("animate"));
				
				$(this).attr("data-state", "animate");
			}else{
    			
				$(this).attr("src", $(this).data("still"));
				
				$(this).attr("data-state", "still");
			}
		}); 
	});
}); 

var resetButton = $("#resetButton");

resetButton.on("click", function(){
	
	i = 0;
	
	$("#gifOptions").empty();
	
	gifChoices = [];
	
	$("#placeForClickedGifs").empty();
});
