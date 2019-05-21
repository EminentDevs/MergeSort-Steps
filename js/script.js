var arrayToDisplay = [];
var array = [];
var size;
var addedRows;
var showedRows;

function MergeSort(array, left, right) {
	if (right > left) {
		var middle = parseInt((right + left) / 2);

		insertSpaceAt(middle + 1);
		displayRow(arrayToDisplay);

		MergeSort(array, left, middle);
		MergeSort(array, middle + 1, right);
		Merge(array, left, middle, right);

		removeSpaceAt(middle + 1);
		updateArrayToDisplay();
		displayRow(arrayToDisplay);		
	}
}

function Merge(array, left, mid, right) {
	var temp = [];
	var i = left;
	var j = mid + 1;
	while (i <= mid && j <= right) {
		if (parseInt(array[i]) <= parseInt(array[j])) {
			temp.push(array[i++]);
		}
		else {
			temp.push(array[j++]);
		}
	}
	while (i <= mid) {
		temp.push(array[i++]);
	}
	while (j <= right) {
		temp.push(array[j++]);
	}
	for (i = left, k = 0; i <= right; i++, k++) {
		array[i] = temp[k];
	}
}

function start(array) {
	addedRows = 0;
	document.getElementById("section3").innerHTML = "";
	for (var i = 0; i < array.length; i++) {
		arrayToDisplay.push(array[i]);
	}
	displayRow(arrayToDisplay);
	MergeSort(array, 0, array.length - 1);
}

function displayRow(r) {
	var s = "<div id=\"row-" + addedRows++ + "\" class=\"Row\">";
	for (var i = 0; i < r.length; i++) {
		if (r[i] == "") {
			s += "<span class=\"space\"></span>";
		}
		else {
			s += "<span class=\"number\">" + r[i] + "</span>";
		}
		if (i != r.length - 1) {
			s += "<span class=\"space\"></span>";
		}
	}
	s += "<hr class=\"myHr\"/></div>";	
	document.getElementById("section3").innerHTML += s;
}

function sizeSubmit() {
	size = parseInt(document.getElementById("arraySize").value);
	for (var i = 0; i < size; i++) {
		if (document.getElementById("randomCheckBox").checked) {
			document.getElementById("values").innerHTML += "<input id=\"value-" + i + "\" class=\"valueCell form-control\" type=\"number\" value=\"" + Math.floor(Math.random() * 90 + 10) + "\"/>";
		}
		else {
			document.getElementById("values").innerHTML += "<input id=\"value-" + i + "\" class=\"valueCell form-control\" type=\"number\" />";
		}
	}
	document.getElementById("values").innerHTML += "<br/><br/><button id=\"submitSize\" class=\"btn btn-success\" onclick=\"submitValues();\">Go !</button>";
	$("#section1").fadeOut('fast');
	window.setTimeout(function () {
		$("#section2").fadeIn('fast');
	}, 200);
}

function showInOrder() {
	window.setTimeout(function () {
		$("#row-" + showedRows++).fadeIn('fast', function () {
			$('html, body').animate({
				scrollTop: $(document).height()
			}, 'slow');
			showInOrder();
		});
	}, 1000);
}

function submitValues() {
	array = [];
	for (var i = 0; i < size; i++) {
		x = document.getElementById("value-" + i).value;
		array.push(x);
	}

	start(array);

	$("#section2").fadeOut('fast');
	window.setTimeout(function () {
		$("#section3").fadeIn('fast');
	}, 200);

	showedRows = 0;
	showInOrder();
}

function insertSpaceAt(index) {
	var i = 0;
	var j = 0;
	while (i != index) {
		if (arrayToDisplay[j++] != "") {
			i++;
		}
	}
	arrayToDisplay.splice(j, 0, "");
}

function removeSpaceAt(index) {
	var i = 0;
	var j = 0;
	while (i != index) {
		if (arrayToDisplay[j++] != "") {
			i++;
		}
	}
	arrayToDisplay.splice(j, 1);
}

function updateArrayToDisplay() {
	var j = 0;
	for (var i = 0; i < array.length; i++) {
		while (arrayToDisplay[j] == "") {
			j++;
		}
		arrayToDisplay[j++] = array[i];
	}
}

$(document).ready(function () {
	window.setTimeout(function fadeSplash() {
		$("#splash").fadeOut('slow');
	}, 2500);
});
