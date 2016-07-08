var bodyH = document.body.clientHeight;
var bodyW = document.body.clientWidth;
var section = document.querySelectorAll("section.page");
var li = document.querySelectorAll("li.listPage");
var now = 0;
var liNow = 0;
section[now].className = "page pageActive";
for (var i = now + 1; i < section.length; i++) {
	section[i].className = "page pageNext";
}
li[liNow].className = "listPage listPageActive";
for (var i = liNow + 1; i < li.length; i++) {
	li[i].className = "listPage listPageNext";
}
MTouch(".page").swipeUp(
	function() {
		var next = now + 1;
		if (next > section.length - 1) {
			next = 0;
		}
		section[next].style.transition = "0s";
		section[next].className = "page pageNext";
		setTimeout(
			function() {
				section[next].style.transition = ".6s";
				section[next].className = "page pageActive";
				section[now].style.transition = ".6s";
				section[now].className = "page";
				now = next;
			}, 30
		);
	}
);
MTouch(".page").swipeDown(
	function() {
		var next = now - 1;
		if (next < 0) {
			next = section.length - 1;
		}
		section[next].style.transition = "0s";
		section[next].className = "page";
		setTimeout(
			function() {
				section[next].style.transition = ".6s";
				section[next].className = "page pageActive";
				section[now].style.transition = ".6s";
				section[now].className = "page pageNext";
				now = next;
			}, 30
		);
	}
);
MTouch("li.listPage").swipeLeft(
	function(x, y) {
		var next = liNow + 1;
		if (next > li.length - 1) {
			next = 0;
		}
		li[next].style.transition = "0s";
		li[next].className = "listPage listPageNext";
		setTimeout(
			function() {
				li[next].style.transition = ".6s";
				li[next].className = "listPage listPageActive";
				li[liNow].style.transition = ".6s";
				li[liNow].className = "listPage";
				liNow = next;
			}, 30
		);
	}
);
MTouch("li.listPage").swipeRight(
	function() {
		var next = liNow - 1;
		if (next < 0) {
			next = li.length - 1;
		}
		li[next].style.transition = "0s";
		li[next].className = "listPage";
		setTimeout(
			function() {
				li[next].style.transition = ".6s";
				li[next].className = "listPage listPageActive";
				li[liNow].style.transition = ".6s";
				li[liNow].className = "listPage listPageNext";
				liNow = next;
			}, 30
		);
	}
);