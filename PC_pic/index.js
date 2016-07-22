var aDiv = document.getElementById("wrap").getElementsByTagName("div");
var iTimer = 0;
for (var i = 0; i < aDiv.length; i++) {
	aDiv[i].index = i;
	aDiv[i].onclick = function() {
		var k = aDiv.length - 1;
		clearInterval(iTimer)
		var iNow = this.index;
		iTimer = setInterval(function() {
			aDiv[iNow].style.cssText = "transform: translateX(" + (k - 2) * 150 + "px) translateY(" + (k - 2) * 50 + "px) rotateX(-15deg) rotateY(15deg) scale(" + (1 + (k - 2) * 0.1) + ");opacity: " + (1 + (k - 4) * 0.2) + ";"
			k--;
			if (k < 0) clearInterval(iTimer);
			iNow--;
			iNow = iNow < 0 ? aDiv.length - 1 : iNow;
		}, 100)
	}
}
for (var i = 0; i < aDiv.length; i++) {
	aDiv[i].style.cssText = "transform: translateX(" + (i - 2) * 150 + "px) translateY(" + (i - 2) * 50 + "px) rotateX(-15deg) rotateY(15deg) scale(" + (1 + (i - 2) * 0.1) + ");opacity: " + (1 + (i - 4) * 0.2) + ";"
}