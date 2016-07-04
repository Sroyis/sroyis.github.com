

var tools = {
		$:function(selector,context){
			/*			 
			 * #id
			 * .class
			 * 标签
			 * "#id li"
			 * ".class a"
			 * */
			context = context || document;
			if(selector.indexOf(" ") !== -1){
				return context.querySelectorAll(selector);
			}else if( selector.charAt(0) === "#" ){
				return document.getElementById(selector.slice(1))
			}else if( selector.charAt(0) === "." ){
				return context.getElementsByClassName(selector.slice(1));
			}else{
				return context.getElementsByTagName(selector);
			}
		},
		getEleRect:function(obj){
			return obj.getBoundingClientRect();
		},
		parents:function(obj,selector){
			/*
			 
			 * selector
			 * id
			 * class
			 * 标签
			 * */
			
			if( selector.charAt(0) === "#" ){
				while(obj.id !== selector.slice(1)){
					obj = obj.parentNode;
				}
			}else if( selector.charAt(0) === "." ){
				while(!tools.containClass(obj,selector.slice(1))){
					obj = obj.parentNode;
				}
			}else{
				while(obj && obj.nodeName !== selector){
					obj = obj.parentNode;
				}
			}
			
			return obj;
		},
		addEvent:function(ele,eventName,eventFn){
			ele.addEventListener(eventName,eventFn,false);
		},
		removeEvent:function(ele,eventName,eventFn){
			ele.removeEventListener(eventName,eventFn,false);
		},
		//数据  local storage
		store: function(namespace, data) {
			if (data) {
				return localStorage.setItem(namespace, JSON.stringify(data));
			}
			var store = localStorage.getItem(namespace);
			return (store && JSON.parse(store)) || [];
		},
		
		//碰撞检测 
		collisionRect:function(obj1,obj2){
			var obj1Rect = tools.getEleRect(obj1);
			var obj2Rect = tools.getEleRect(obj2);
			
			var obj1W = obj1Rect.width;
			var obj1H = obj1Rect.height;
			var obj1L = obj1Rect.left;
			var obj1T = obj1Rect.top;

			var obj2W = obj2Rect.width;
			var obj2H = obj2Rect.height;
			var obj2L = obj2Rect.left;
			var obj2T = obj2Rect.top;
			//碰上返回true 否则返回false
			if( obj1W+obj1L>obj2L && obj1T+obj1H > obj2T && obj1L < obj2L+obj2W && obj1T<obj2T+obj2H ){
				return true
			}else{
				false;
			}
		},
		//循环
		each: function(obj, fn) {
			for (var i = 0; i < obj.length; i++) {
				fn(obj[i], i);
			}
		},
		//查找是否含有某个类名
		seek: function(obj, classN) {
			var classArr = obj.className.split(' ');
			for (var i = 0; i < classArr.length; i++) {
				if (classArr[i] == classN) {
					return true;
				} else {
					return false;
				}
			}
		},
		
		
		store: function(namespace, data) {
			if (data) {
				return localStorage.setItem(namespace, JSON.stringify(data));
			}
			var store = localStorage.getItem(namespace);
			return (store && JSON.parse(store)) || [];
		}
	}

