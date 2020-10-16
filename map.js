(function() {

	window.onload = function() {

		// Creating a new map
		var map = new google.maps.Map(document.getElementById("map"), {
          center: new google.maps.LatLng(-33.8696, 151.20695),
          zoom: 10,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        });


		// Creating the JSON data
		var json = [
		    {
		        "title": "Strathfield",
		        "lat": -33.8775,
		        "lng": 151.0824,
		        "description": "<strong>Dr Himanshu Mehta</strong> specialises in Surgeon and is available at Strathfield Monday to Friday, 9am to 5pm. <strong> PH: 0402837012</strong>"
		    },
		    {
		        "title": "Parramatta",
		        "lat": -33.8136,
		        "lng": 151.0034,
		        "description": "<strong>Dr Penny Lim</strong> specialises in Physiology and is available at Parramatta Monday to Friday, 9am to 5pm. <strong> PH: 0412345678</strong>"
		    },
		    {
		        "title": "Penrith",
		        "lat": -33.75374,
		        "lng": 150.6877,
		        "description": "<strong>Dr Karan Singh</strong> is a General Practioner and is available at Penrith Monday to Friday, 9am to 5pm. <strong> PH: 0456781234</strong>"
			},
			{
		        "title": "Blacktown",
		        "lat": -33.7668,
		        "lng": 150.9053,
		        "description": "<strong>Dr Manjoher Singh</strong> is a General Practioner and is available at Blacktown Monday to Friday, 9am to 5pm. <strong> PH: 0423567894</strong>"
			},
			{
		        "title": "Croydon",
		        "lat": -33.8809,
		        "lng": 151.1155,
		        "description": "<strong>Dr Andy Lee</strong> is a General Practioner and is available at Croydon Monday to Friday, 9am to 5pm. <strong> PH: 0478945612</strong>"
			}
			
		]

		// Creating a global infoWindow object that will be reused by all markers
		var infoWindow = new google.maps.InfoWindow();

		// Looping through the JSON data
		for (var i = 0, length = json.length; i < length; i++) {
			var data = json[i],
				latLng = new google.maps.LatLng(data.lat, data.lng);

			// Creating a marker and putting it on the map
			var marker = new google.maps.Marker({
				position: latLng,
				map: map,
				title: data.title
			});

			// Creating a closure to retain the correct data, notice how I pass the current data in the loop into the closure (marker, data)
			(function(marker, data) {

				// Attaching a click event to the current marker
				google.maps.event.addListener(marker, "click", function(e) {
					infoWindow.setContent(data.description);
					infoWindow.open(map, marker);
				});


			})(marker, data);

		}

	}

})();