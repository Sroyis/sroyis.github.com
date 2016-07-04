(function(){
	/*切换显示方式：列表，图标*/

	var list_swicha = document.getElementById("list_swich").getElementsByTagName('a');
	var list_con = document.getElementById("list_con");

	list_swicha[0].onclick = function() {
		list_con.className = 'details';
	}
	list_swicha[1].onclick = function() {
		list_con.className = 'icon';
	}
	var list_con = tools.$("#list_con");//工作区
	var allLi = tools.$("li",tools.$(".filesSet")[0]);
	
	
	
	tools.addEvent(list_con,"mousedown",function(ev){
		ev.preventDefault();
//		if( rename.isRename ) return;

		/*
				当在down的时候，判断事件源 是否是li
				或者是事件源最近的祖先节点是否是li

				是li并且li为选中状态  不出现选择框
		*/
		

		var target = ev.target;
		//事件源目标找到为li
		if( target = tools.parents(target,"LI") ){
			
			var checkInput = tools.$(".checkInput",target)[0];

			if( checkInput.checked ) return;
		};

		
		var disX = ev.clientX;
		var disY = ev.clientY;

		var newDiv = null;

		tools.addEvent(document,"mousemove",moveHandle);
		tools.addEvent(document,"mouseup",upHandle);

		function upHandle(ev){
			tools.removeEvent(document,"mousemove",moveHandle);
			tools.removeEvent(document,"mouseup",upHandle);
			//移除生成的div
			if(newDiv) document.body.removeChild(newDiv);
			if( whoSelect().length === 0 ){
				allSelected.checked = false;
				info.style.display = "none";
			}
		}

		function moveHandle(ev){
			var w = ev.clientX - disX;
			var h = ev.clientY - disY;
			//设置一个检测碰撞的范围
			if( Math.abs(w)>5 || Math.abs(h) > 5 ){
				if(!newDiv){

					newDiv = document.createElement("div");
					newDiv.className = "collision";
					newDiv.style.left = disX + "px";
					newDiv.style.top = disY + "px";
					document.body.appendChild(newDiv);
				}

				var x = w < 0 ? ev.clientX : disX;
				var y = h < 0 ? ev.clientY : disY;

				newDiv.style.left = x + "px";
				newDiv.style.top = y + "px";

				//给newDiv设置宽高和left top
				newDiv.style.width = Math.abs(w) + "px";
				newDiv.style.height = Math.abs(h) + "px";

				//循环过程中检测所有的li
				tools.each(allLi,function(item,index){
					//找到碰撞的li
					if( tools.collisionRect(newDiv,item) ){
						handleLis(item,true);

					}else{
						handleLis(item);
					}
				})
			}		
		}
	});

	function handleLis( li,bl ){
		var icon = tools.$("#list_con",li)[0];	
		var checkInput = tools.$(".checkInput",li)[0];	
		if( bl ){
			icon.style.borderColor = "#2e80dc";
			checkInput.style.display = "block";
			checkInput.checked = true;
			selectSpan.innerHTML = seletedNum = whoSelect().length;
			if( whoSelect().length === allLi.length ){
				allSelected.checked = true;
			}
			info.style.display = "block";
		}else{
			icon.style.borderColor = "#fff";
			checkInput.style.display = "none";
			checkInput.checked = false;
			selectSpan.innerHTML = seletedNum = whoSelect().length;
			allSelected.checked = false;
		}
	};

	
	//获取选中的li
	function whoSelect(){
		var arr = [];
		tools.each(checkInput,function (item){
			if( item.checked ){
				arr.push(tools.parents(item,"LI"));
			}		
		});

		return arr;
	};
	
})()
