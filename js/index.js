$(document).ready(function() {
	var urlWeather = "https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?";  
	var unit = document.getElementById('myonoffswitch').checked;
	$('#input').val("");

	if (navigator.geolocation) {navigator.geolocation.getCurrentPosition(function(position) {

			if(unit){
				urlWeather += $.param({
				'units': "metric"});
			}else{
				urlWeather += $.param({
				'units': "imperial"});
			}

		urlWeather += '&' + $.param({
				'lat': position.coords.latitude,
				'lon': position.coords.longitude,
				'APPID': "9f5b382a9edd663ef5c3c625c98b6912"});
    console.log(urlWeather);
		createContent(urlWeather);

		});
		}
});


// Toggle temperature
function changeTemp() {
	var unit = document.getElementById('myonoffswitch').checked;
	var temp =  $('#temp').html();
	var temp2 = temp.split("",temp.length-9);
	temp=temp2.join("");
	
	if (unit) {
        temp = temp * 9 / 5 + 32;
		temp = temp.toFixed(1);
		$('#temp').html(temp + " <b>&#8457;</b>");
    } else {
        temp = (temp -32) * 5 / 9;
		temp = temp.toFixed(1);
		$('#temp').html(temp + " <b>&#8451;</b>");
    }
	return false;
}

// Search city by name
function searchCity() {
	var urlWeather = "https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?"; 
	var unit = document.getElementById('myonoffswitch').checked;
	var city=$('#input').val();
	
	if(city){
		$("#cityheader").html("Weather in your city");
		$("#desc").html("<i class='fa fa-spinner fa-spin fa-3x fa-fw'></i><span class='sr-only'>Loading...</span>");
		$("#icon").html("");
		$("#temp").html("");
		$("#direc").html("");
		$("#wdesc").html("");
		$("#wpower").html("");
		
		if(unit){
			urlWeather += $.param({
			'units': "metric"});
		}else{
			urlWeather += $.param({
			'units': "imperial"});
		}
		
	urlWeather += '&' + $.param({
			'q': city,
			'APPID': "9f5b382a9edd663ef5c3c625c98b6912"});
			createContent(urlWeather);
	}
	
	return false; 
  }

 // Ajax call and content creation
function createContent(url){
	var weatherResp;
	var unit = document.getElementById('myonoffswitch').checked;
	var icon;
	var windDesc;
	$('#input').val("");
  console.log(url);
	
	/*$.ajax({
			url: url,
			dataType: "jsonp",
			success: function( response ){*/
  $.getJSON( url, function( response ) {
  
				var windSpeed = response.wind.speed;
				windSpeed = windSpeed.toFixed(1);
				response.main.temp = response.main.temp.toFixed(1);
				icon = "<img src='icons/" +response.weather[0].icon +".png'>";
				$( "div.jumbotron h3" ).text("Weather in " +response.name);
				
				// Display temperature
				$("#desc").html(response.weather[0].description);
				$("#icon").html(icon);
				
				
				if(unit){
					$( "#temp" ).html(response.main.temp + " <b>&#8451;</b>");
				}else{
					$( "#temp" ).html(response.main.temp + " <b>&#8457;</b>");
				}
				// End of temperature section
			
			// Display wind speed
			if (windSpeed < 0.3){
				windDesc = "Calm";
			} else if(0.3 <= windSpeed && windSpeed <= 1.5){
				windDesc = "Light air";
			} else if(1.5 < windSpeed && windSpeed <= 3.3){
				windDesc = "Light breeze";
			} else if(3.3 < windSpeed && windSpeed <= 5.5){
				windDesc = "Gentle breeze";
			} else if(5.5 < windSpeed && windSpeed <= 7.9){
				windDesc = "Moderate breeze";
			} else if(7.9 < windSpeed && windSpeed <= 10.7){
				windDesc = "Fresh breeze";
			} else if(10.7 < windSpeed && windSpeed <= 13.8){
				windDesc = "Strong breeze";
			} else if(13.8 < windSpeed && windSpeed <= 17.1){
				windDesc = "High wind";
			} else if(17.1 < windSpeed && windSpeed <= 20.7){
				windDesc = "Gale";
			} else if(20.7 < windSpeed && windSpeed <= 24.4){
				windDesc = "Strong/severe gale";
			} else if(24.4 < windSpeed && windSpeed <= 28.4){
				windDesc = "Storm";
			} else if(28.5 < windSpeed && windSpeed <= 32.6){
				windDesc = "Violent storm";
			} else if(32.6 < windSpeed){
				windDesc = "Hurrican";
			}
			
			$("#direc").html("<img src='icons/wind_direction.png' data-rotate='" +response.wind.deg +"'>");
			$("#wdesc").html(windDesc);
			$("#wpower").html(response.wind.speed +" m/s");
			
			// Display wind direction
				$('img').each(function() {
					var deg = $(this).data('rotate') || 0;
					var rotate = 'rotate(' + $(this).data('rotate') + 'deg)';
					$(this).css({ 
						'-webkit-transform': rotate,
						'-moz-transform': rotate,
						'-o-transform': rotate,
						'-ms-transform': rotate,
					'transform': rotate 
					});
				});
			// Wind section end
			
		   
		}).fail(function(d) {
                alert("error");
  });
}
  
