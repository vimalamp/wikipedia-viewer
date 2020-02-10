//main function - search in Wikipedia through their API
function wikiSearch() {

  searchVal = $("#search-value").val();
   
  var wikiUrl = 'https://en.wikipedia.org/w/api.php?format=json&action=opensearch&search="'+searchVal+'"&callback=?';
     
  //clear out data before the new request
  $("#articles").empty();
    
  $.getJSON(wikiUrl, function(jsonData){
    for (i=0; i<jsonData[1].length; i++) {
      var toAppend = '<li class ="wiki-article"><a href="'+jsonData[3][i]+'" target="_blank"><h4><strong>'+jsonData[1][i]+'</strong></h4><p>'+jsonData[2][i]+'</p></a></li>';
      $("#articles").append(toAppend);
      $("#footer").css("position", "relative");
    }
  }); 
} //end of wikiSearch function

// call wikiSearch function if Search button is pressed
$("#search-button").on("click", wikiSearch);

//autocomplete function using jQuery
$("#search-value").autocomplete({
    source: function(request, response) {
        $.ajax({
            url: "https://en.wikipedia.org/w/api.php",
            dataType: "jsonp",
            data: {
                'action': "opensearch",
                'format': "json",
                'search': request.term
            },
            success: function(data) {
                response(data[1]);
            }
        });
    }
}).keyup(function (e) { //close autocomplete suggestions on Enter
        if(e.which === 13) {
          	$("#search-value").autocomplete( "close" );
        }            
    }); //autocomplete end
  
  //search on Enter key press
  $(document).keydown(function(event) {
    if (event.which == 13) {
      event.preventDefault(); //prevent reloading the page on clicking Enter while in the input field
      wikiSearch();
    }
  });