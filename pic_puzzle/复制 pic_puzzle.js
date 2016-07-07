var arrimg = ['url(trim.jpg)', 'url(timg2.jpg)', 'url(aaa.jpg)', 'url(ccc.jpg)'];

var btnbox = document.getElementById("btnbox");
var spans = btnbox.getElementsByTagName('span'); //按钮

var picbox = document.getElementById("picbox");
var imgs = picbox.getElementsByTagName('img'); //小图

var imgbox = document.getElementById('imgbox');
var imgboxpics = imgbox.getElementsByTagName('div');

var str = '';
var arr = [];
//var nn = -1;
for (var i = 0; i < 5; i++) { //生成div
	for (var j = 0; j < 3; j++) {
		var div = document.createElement('div');
		div.style.width = picbox.offsetWidth / 5 + 'px';
		div.style.height = picbox.offsetHeight / 3 + 'px';
		div.className = 'imgs';
		imgbox.appendChild(div);
	}
}
imgbox.setAttribute('isprompt', false); //自定义属性 是否提示
spans[0].onclick = function() {
	var nn = -1;
	picbox.style.display = 'block';
	imgbox.style.display = 'none';

	picbox.innerHTML = '<img src="trim.jpg" class="aaa"/><img src="timg2.jpg" class="aaa"/><img src="aaa.jpg" class="aaa"/><img src="ccc.jpg" class="aaa"/>';
	imgs[0].onclick = function() {
		nn = 0;
		showimgbox(nn);
	}
	imgs[1].onclick = function() {
		nn = 1;
		showimgbox(nn);
	}
	imgs[2].onclick = function() {
		nn = 2;
		showimgbox(nn);
	}
	imgs[3].onclick = function() {
		nn = 3;
		showimgbox(nn);
	}
}

spans[1].onclick = function() {
	for (var i = 0; i < imgboxpics.length; i++) {
		//					divs[i].style.top=arr[i][0]+'px';
		//					divs[i].style.left=arr[i][1]+'px';
		imgboxpics[i].style.top = mathxy(0, 360) + 'px';
		imgboxpics[i].style.left = mathxy(0, 720) + 'px';
		imgboxpics[i].style.transitionDuration = 0;
		Drag(imgboxpics[i], imgbox);
	}
	imgbox.setAttribute('isprompt', true);
}
var prompt = document.getElementById("prompt"); //提示box
var promptnum = 3;
spans[2].onclick = function() {
	var timer = null;
	clearTimeout(timer);
	if (imgbox.getAttribute('isprompt')) {
		prompt.style.display = 'block';
		promptnum--;
		spans[2].innerHTML = '提示(' + promptnum + '次)';
		if(promptnum===-1){
			imgbox.setAttribute('isprompt',false);
			prompt.style.display = 'none';
			btnbox.innerHTML+='提示已经用完了';
		}else{
			timer = setTimeout(function() {
				prompt.style.display = 'none';
			}, 1000)	
		}
		
	}
}

var timer1 = null;
var onoff = true;
spans[3].onclick = function() {
	var i = -1;
	clearInterval(timer1);
	if (onoff) {
		timer1 = setInterval(function() {
			i++;
			imgboxpics[i].style.transitionDuration = '1s';
			imgboxpics[i].style.top = arr[i][0] + 'px';
			imgboxpics[i].style.left = arr[i][1] + 'px';
			if (i == imgboxpics.length - 1) {
				clearInterval(timer1);
				onoff = true;
				alert('成功啦');
				picbox.style.display = 'block';
				imgbox.style.display = 'none';
			}
		}, 100)

	}
}

function showimgbox(num) {
	picbox.style.display = 'none';
	imgbox.className = 'picbox';
	imgbox.style.display = 'block';
	if (num === 0) {
		showbgimg(num);
	} else if (num === 1) {
		showbgimg(num);
	} else if (num === 2) {
		showbgimg(num);
	} else {
		showbgimg(num);
	}
}

function showbgimg(nn) {
	arr.length = 0;
	for (var i = 0; i < imgboxpics.length; i++) { //获取每个div的位置
		imgboxpics[i].index = i; //添加index值；
		arr.push([imgboxpics[i].offsetTop, imgboxpics[i].offsetLeft]);
	}
	for (var i = 0; i < imgboxpics.length; i++) { //变布局
		imgboxpics[i].style.position = 'absolute';
		imgboxpics[i].style.top = arr[i][0] + 'px';
		imgboxpics[i].style.left = arr[i][1] + 'px';
		imgboxpics[i].style.transitionDuration = '0s';
	}
	for (var i = 0; i < imgboxpics.length; i++) { //判断生成哪张图片
		imgboxpics[i].style.backgroundImage = arrimg[nn];
		imgboxpics[i].style.backgroundSize = '900px 540px';
		imgboxpics[i].style.backgroundPosition = (-arr[i][1]) + 'px' + ' ' + (-arr[i][0]) + 'px';
	}
		prompt.style.backgroundImage=arrimg[nn];
		prompt.style.backgroundSize='150px 110px';
}

function Drag(box, wrap) {
	box.onmousedown = function(ev) {
		var e = ev || event;
		var disX = e.clientX - box.offsetLeft;
		var disY = e.clientY - box.offsetTop;
		var _this = this;
		document.onmousemove = function(ev) {
			var e = ev || event;
			var Left = e.clientX - disX;
			var Top = e.clientY - disY;
			Left = Left < 0 ? 0 : Left;
			Top = Top < 0 ? 0 : Top;
			if (Left > wrap.clientWidth - box.offsetWidth) {
				Left = wrap.clientWidth - box.offsetWidth;
			}
			if (Top > wrap.clientHeight - box.offsetHeight) {
				Top = wrap.clientHeight - box.offsetHeight;
			}
			box.style.left = Left + "px";
			box.style.top = Top + "px";
		}
		document.onmouseup = function() {
			var RouL = mat(box.offsetLeft);
			var RouT = mat(box.offsetTop);
			box.style.left = RouL + "px";
			box.style.top = RouT + "px";
			readLT();
			document.onmousemove = null;
		}
		return false;
	}
}

function readLT() {
	for (var i = 0; i < imgboxpics.length; i++) {
		if (imgboxpics[i].offsetTop !== arr[i][0] || imgboxpics[i].offsetLeft !== arr[i][1]) {
			return;
		}
	}
	alert('成功了');
	picbox.style.display = 'block';
	imgbox.style.display = 'none';
}

function mathxy(x, y) {
	var a = Math.random() * (y - x) + x;
	return a;
}

function mat(nn) {
	var a = nn % 180;
	if (a <= 180 / 2) {
		return (Math.floor(nn / 180) * 180);
	} else {
		return (Math.ceil(nn / 180) * 180);
	}
}