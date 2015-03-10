$(document).ready(function() {

	function init() {
		updateSizes();
	}

	// Time
	var seconds = 0;
	var minutes = 0;
	var hours = 0;

	// Variabels
	var showering = true;

	var updateTime = function() {
		seconds++;

		console.log("seconds: " + seconds);

		// handle minutes
		if (seconds >= 60) {
			seconds = 0;
			minutes++;
		}

		// handle hours
		if (minutes >= 60) {
			minutes = 0;
			hours++;
		}
	}

	var setTime = function() {
		updateTime();

		// handle seconds
		if (seconds >= 0) {
			$('#seconds').html(seconds + "s");
		}

		// handle minutes
		if (minutes > 0 || (hours > 0 && minutes >= 0)) {
			$('#minutes').html(minutes + "m");
		}

		// handle hours
		if (hours > 0) {
			$('#hours').html(hours + "h");
		}

	}

	// Water
	var litres = 0;
	var waterflow = 0.5;

	var updateWaterUsage = function() {
		litres += 0.075 * waterflow;

		console.log("litres: " + litres);
	}

	var setWater = function() {
		updateWaterUsage();

		litresCounter = 0;

		for (var i = 0; i < litres.toString().substring(0, 6).length; i++) {
			if (litres.toString().charAt(i) === ".") {
				break;
			}
			litresCounter++;
		}

		var litresString = litres.toString().substring(0, litresCounter + 3);
		var waterflowString = Math.floor((waterflow * 100)).toString();

		$('#liters').html(litresString);
		$('#waterflow').html(waterflowString);
	}

	$('#waterflowPlus').on('click', function() {
		if (waterflow < 1) {
			waterflow += 0.05;
		}
	});

	$('#waterflowMinus').on('click', function() {
		if (Math.floor(waterflow * 100) > 0) {
			waterflow -= 0.05;
		}
	});	

	// Temperature
	
	var temperature = 37;

	$('#temperaturePlus').on('click', function() {
		if (temperature < 50) {
			temperature += 1;
		}

		$('#temperature').html(temperature);
	});

	$('#temperatureMinus').on('click', function() {
		if (temperature > 0) {
			temperature -= 1;
		}

		$('#temperature').html(temperature);
	});

	var setTimeInterval = setInterval(setTime, 1000);
	var setWaterInterval = setInterval(setWater, 500);

	// STOP
	var bars = new Array();
	var highestBarValue = 0;

	var container = document.createElement('div');
	var infoBox = document.createElement('div');

	var windowHeight = $(window).height();
	var windowWidth = $(window).width();

	var containerWidth = $(container).innerWidth();
	var containerHeight = $(container).innerHeight();

	var barMarginLeft = (containerWidth / 4) / bars.length;

	function updateSizes() {
		windowHeight = $(window).height();
		windowWidth = $(window).width();
		console.log(windowWidth);
		console.log(windowHeight);

		updateBars();
	}

	$(window).resize(function() {
		updateSizes();
	});

	function randomizer(num) {
		return Math.floor(Math.random() * num);
	}

	$('#stop').on('click', function stopShowerShowStats() {
		clearInterval(setTimeInterval);
		clearInterval(setWaterInterval);
		setupStats();
	});

	function setupStats() {
		var heading = document.createElement('h1');
		$(heading).css({'width': '90%', 'text-align': 'center', 'margin': '0 auto', 'color': '#fff', 'font-size': '20px', 'margin': 0.02 * windowHeight + 'px'});
		$('body').html(heading);

		$(container).css({'margin': '0 auto'});
		container.setAttribute('id', 'statsContainer');
		$('body').append(container);

		$(container).append(new bar(247, "Mom", false).bar);
		$(container).append(new bar(231, "Dad", false).bar);
		$(container).append(new bar(289, "Son1", false).bar);
		$(container).append(new bar(175, "Son2", false).bar);

		// Special case: "Your" bar
		var youBarValue = 179;

		var yourBarContainer = new bar(youBarValue + litres, "You", false).bar;
		$(yourBarContainer).html(''); // clear any content
		$(yourBarContainer).css({'background-color': 'green'});

		var yourBar = new bar(youBarValue, "You", true).bar;
		$(yourBar).removeClass();
		$(yourBar).addClass('innerStatBar');

		$(yourBarContainer).append(yourBar);
		$(container).append(yourBarContainer);

		$(container).append(new bar(211, "Daughter", false).bar);

		$(infoBox).css({'width': '50%', 'margin': '0 auto', 'color': '#fff', 'font-size': '20px', 'margin-top': 0.02 * windowHeight + 'px', 'border': '2px solid white', 'padding': '10px'});
		$('body').append(infoBox);

		showInfo();

		var totalConsumption = 0;
		for (var i = 0; i < bars.length; i++) {
			totalConsumption += bars[i].value;
		}

		$(heading).html("Total water consumption (last 7 days)" + '<br /><span id="consumption">' + Math.floor(totalConsumption) + ' L</span>');

		updateBars();
	}

	var idCounter = 0;

	function bar(value, name, you) {
		this.bar = document.createElement('div');
		this.name = document.createElement('p');
		this.name.appendChild(document.createTextNode(name));

		this.bar.appendChild(this.name);

		this.value = value;
		this.heightPercent = this.value / Math.max(highestBarValue, this.value);
		this.height = this.heightPercent * containerHeight;
		this.width = containerWidth;
		this.marginTop = containerHeight - this.height;
		this.marginLeft = 0;

		if (bars[bars.length - 1]) {
			this.marginLeft = barMarginLeft;
		}

		$(this.name).css({'width': '100%', 'margin': '0 auto', 'text-align': 'center',
						  'word-wrap': 'break-word'});

		this.bar.setAttribute('class', 'statBar');
		this.bar.setAttribute('id', idCounter.toString());
		idCounter++;

		if (this.value > highestBarValue) {
			highestBarValue = this.value;
		}

		updateBars();

		$(this.bar).css({'background-color': '#fff', 'width': this.width + 'px', 'height': this.height + 'px',
						 'margin-top': this.marginTop + 'px', 'margin-left': this.marginLeft + 'px'});

		if (you) {
			$(this.bar).css('background-color', 'yellow');
			this.you = true;
		}
		bars.push(this);
	}

	function updateBars() {
		// Update container size
		$(container).outerWidth(0.9 * windowWidth);
		$(container).outerHeight(0.7 * windowHeight);

		containerWidth = $(container).innerWidth();
		containerHeight = $(container).innerHeight();

		// Update left margin
		barMarginLeft = (containerWidth / 4) / bars.length;

		// Update bar sizes
		for (var i = 0; i < bars.length; i++) {
			bars[i].heightPercent = bars[i].value / highestBarValue
			var height = bars[i].heightPercent;
			height = height * containerHeight - 20;
			var width = calculateBarWidth(i);
			var marginTop = containerHeight - height;
			var marginLeft = 0;

			if (i > 0) {
				marginLeft = barMarginLeft;
			}

			var fontSize = Math.max(width / 6, 10);

			$(bars[i].bar).css({'width': width + 'px', 'height': height + 'px', 'margin-top': marginTop + 'px', 'margin-left': marginLeft + 'px'});

			if (bars[i].you) {
				$(bars[i].bar).css({'width': width + 'px', 'height': height + 'px', 'margin-top': ((bars[i - 1].heightPercent * containerHeight - 20) - height) + 'px', 'margin-left': 0 + 'px'});
			}

			// Update text-sizing
			$(bars[i].name).css({'padding-top': 0.2 * height + 'px', 'font-size': fontSize + 'px'});
		}
	}

	function calculateBarWidth(barIndex) {
		var width = (containerWidth / (bars.length - 1)) - barMarginLeft + (barMarginLeft / bars.length);

		// Handle rounding error
		if (barIndex == (bars.length - 1)) {
			width -= 1;
		}

		return width;
	}

	function showInfo() {
		var heading = document.createElement('h2');
		$(heading).html('Showing information for <b><i id="specifier">You</i></b>');
		var text = document.createElement('p');
		$(text).html('<b>Water consumption (last 7 days):</b> ' + 271 + ' L');
		$(infoBox).append(heading);
		$(infoBox).append(text);

		var text2 = document.createElement('p');
		$(text2).html('<b>Avg. temperature:</b> ' + 37 + ' &deg;');
		$(infoBox).append(text2);

		var text3 = document.createElement('p');
		$(text3).html('<b>Avg. time spent:</b> ' + 12 + ' minutes');
		$(infoBox).append(text3);

		var text4 = document.createElement('p');
		$(text4).html('<b>WaterSaver score:</b> ' + 873 + ' points');
		$(infoBox).append(text4);

		var text5 = document.createElement('p');
		$(text5).html('<i>More statistics to follow...</i>');
		$(infoBox).append(text5);
	}

	init();

});