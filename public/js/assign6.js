// Author: Kewen Gu
// URL: https://kgu-cs4241-main.herokuapp.com

function operation(id, postUrl) {
  var el = document.getElementById(id);

  var req = new XMLHttpRequest();
  req.open('POST', postUrl, true);
  req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

  req.onload = function () {
    makeGet('/list');
  };

  req.send('keyword='+el.value);
}

function fullList() {
  var req = new XMLHttpRequest();
  req.open('POST', '/full-list', true);
  req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

  req.onload = function () {
    makeGet('/list');
  };

  req.send();
}

function deleteItem(index) {
  var req = new XMLHttpRequest();
  req.open('POST', '/remove', true);
  req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

  req.onload = function () {
    makeGet('/list');
  };

  req.send('keyword='+index);
}


makeGet('/list');

function makeGet(url) {
  var req = new XMLHttpRequest();

  req.onreadystatechange = function() {
    handleRes(req);
  };

  req.open('GET', url);
  req.send();
}

function handleRes(req) {
  if(req.readyState !== XMLHttpRequest.DONE) {
    return;
  }
  if(req.status === 200) {
    console.log(req.responseText);
    buildList(JSON.parse(req.responseText));
  }
}

function buildList(A) {
  var el = document.getElementById('movie-list');
  el.innerHTML = "";
  var func = "";
  var i = 0;
  A.forEach(function(d) {
    func = "deleteItem(" + i + ")";
    el.innerHTML += "<form>" + d + "<input type='submit' value='x' class='button' onclick=\"" + func + "\"></form>";
    i++;
  });
}


var title = document.getElementById("title");

title.addEventListener("mouseover", function(evt){
	console.log("Mouse over title");
	var el = document.getElementById("media");
	el.innerHTML = '<div id="video-player" align="center" onclick="videoClick()"><p>Click the box to see a movie trailer</p></div>';
});

title.addEventListener("click", function(evt){
	console.log("Clicked on title");
	var el1 = document.getElementById("video-player");
	el1.innerHTML = "<p>Click the Box to See</p>";
	var el2 = document.getElementById("title");
	el2.innerText = "Assignment 6";
	el2.style.fontFamily = "'Lobster', cursive";
	el2.style.fontSize = "5em";
	el2.letterSpacing = "4px";
});


var header = document.getElementById("header");
header.addEventListener("click", function(evt){
	console.log("Clicked on header");
	var el = document.getElementById("media");
	el.innerHTML = "";
});


var media = document.getElementById('media');
media.addEventListener("click", function(evt){
	console.log("Clicked on media");
	var el = document.getElementById("video-player");
	el.innerHTML = '<iframe width="854" height="480" src="https://www.youtube.com/embed/yRUAzGQ3nSY" frameborder="0" allowfullscreen></iframe>';
}, true);


function videoClick(){
	console.log("Clicked on video-player");
	var el = document.getElementById("title");
	el.innerText = "Inside Out - Official US Trailer";
	el.style.fontFamily = '"Comic Sans MS", cursive, sans-serif';
	el.style.fontSize = "3em";
	el.letterSpacing = "0px";
};
