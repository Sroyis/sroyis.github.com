var box = document.getElementById('box');

var box1 = document.getElementById('box1');
var box2 = document.getElementById('box2');

var data = [{
	num: '1',
	name: '中国银行',
	newPrices: '2324'
}, {
	num: '2',
	name: '光大银行',
	newPrices: '2324'
}, {
	num: '3',
	name: '招商银行',
	newPrices: '2324'
}]

function lidata(obj, oNum) {
	var as = obj.getElementsByTagName('a');
	as[0].innerHTML = data[oNum].num;
	as[1].innerHTML = data[oNum].name;
	as[2].innerHTML = data[oNum].newPrices;
}
lidata(box1, 0);
lidata(box2, 1);


var oNum = 0;
var ss=window||document;
ss.onclick = function() {
	
	if(oNum === 2) {
		oNum = 0;
	} else {
		oNum++;
	}
	lidata(box2, oNum);
	move(box, 'top', -40, 500, function() {
		lidata(box1, oNum);
		box.style.top='0px';
	});

}

function move(obj, attr, target, duration, callback) {
	var b = parseFloat(getComputedStyle(obj)[attr]); //b :初始位置
	var c = target - b; //c :count 变化差
	var d = duration; //d :duration 持续时间
	var now = new Date().getTime();
	//				divs.width = 改变高度的定时器的编号
	//				divs.height = 改变高度的定时器的编号
	obj[attr] = setInterval(function() {
		var t = new Date().getTime() - now;
		var value = b + c / d * t;
		obj.style[attr] = value + 'px';
		if(t >= d) {
			clearInterval(obj[attr]);
			obj.style[attr] = target + 'px';
			callback && callback(); //当到达目标值的时候执行回调函数
		}
	}, 30)
}