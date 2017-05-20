
      // Initial array of topics
      var topics = ["cat", "dog", "hedgehog", "rat"];


      // Function for creating the topic buttons
      function renderButtons() {


        $("#topic-buttons").empty(); // clears out the div with id of topic-buttons

        for (var i = 0; i < topics.length; i++) { // creates a for loop to get the array of topics and populate the div id
          var a = $("<button>"); // jQuery uses this to create a start and end tag of button
          a.addClass("btn");
          a.addClass("btn-primary");
          a.attr("data-topic", topics[i]); 
          a.text(topics[i]);

          $("#topic-buttons").append(a); // adding buttons to the html
        }
      }


      $("#add-topic").on("click", function(event) {

        event.preventDefault(); // prevents the default "form submittal" so we can use the form to create buttons
        var newButton = $("#topic-input").val().trim();
        topics.push(newButton);

        renderButtons(); // re-renders the buttons when adding a new topic

      });


      renderButtons();




    $(document.body).on("click", "button", function() {
   //$("button").on("click", function() {
        var topic = $(this).attr("data-topic");
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=dc6zaTOxFJmzC&limit=10";

        $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {

          var results = response.data;
          $("#gifs-appear-here").html(""); // this clears the previous view before re-populating it

          for (var g = 0; g < results.length; g++) {

            var animalDiv = $("<div>");

            var animalImage = $("<img>");
            animalImage.attr("src", results[g].images.fixed_height_still.url);
            animalImage.addClass("gif");
            animalImage.attr("data-still", results[g].images.fixed_height_still.url);
            animalImage.attr("data-animate", results[g].images.fixed_height.url);
            animalImage.attr("data-state", "still");

            var p = $("<p>");
            p.text("Rating:" + results[g].rating);

            p.appendTo(animalDiv);

            animalImage.appendTo(animalDiv);

            $("#gifs-appear-here").prepend(animalDiv);
          
          }

        });
      });


    $(document.body).on("click", ".gif", function() {
    //$(".gif").on("click", function() {

        var state = $(this).attr("data-state");
        console.log(state);

        if(state === "still") {
          $(this).attr("data-state","animate");
          $(this).attr("src",$(this).attr("data-animate"));

        } else {

          $(this).attr("data-state","still");
          $(this).attr("src",$(this).attr("data-still"));
        }
      });
