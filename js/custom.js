getResults();
setInterval(function(){getResults()}, 30000);

function getResults(){
  $.ajax({
    type: "GET",
    url: "http://www25.ownskin.com/live4d/api/4d/api_4d_ilive.asp",
    success: function(xml) {
      $xml = $( xml );
      $result = $xml.find('result');
      var dateRaw = $result.find('date').text(); // get date
      var firstPrice = $result.find('first').text(); // get first price numbers
      var secondPrice = $result.find('second').text(); // get second price numbers
      var thirdPrice = $result.find('third').text(); // get third price numbers

      var date = parseDate(dateRaw);
      var dd = date.getDate();
      var yyyy = date.getFullYear();
      var mm = date.getMonth()+1; //January is 0!
      if(dd<10){dd='0'+dd} if(mm<10){mm='0'+mm} var date = dd+'/'+mm+'/'+yyyy;

      $( "#date" ).text("Results for: "+date);
      $( "#first" ).text(firstPrice);
      $( "#second" ).text(secondPrice);
      $( "#third" ).text(thirdPrice);

      //clear children nodes
      $( "#starters" ).empty();
      $( "#consolation" ).empty();

      // add each of the results into #starter
      $result.find("starter").children().each(function(){
        var text = $(this).text();
        $( "#starters" ).append("<li>"+text+"</li>");
      });

      // add each of the results into #consolation
      $result.find("consola").children().each(function(){
        var text = $(this).text();
        $( "#consolation" ).append("<li>"+text+"</li>");
      });
    }
  });
} //close getResults function

function parseDate(input) {
  var parts = [];
  parts[0] = input.substring(0,4);
  parts[1] = input.substring(4,6);
  parts[2] = input.substring(6,8);
  return new Date(parts[0], parts[1]-1, parts[2]); // months are 0-based
} //close parseDate function
