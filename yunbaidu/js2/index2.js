(function() {
	//全选按钮
	var allchk = document.getElementById("list_header").getElementsByTagName('input')[0];
	//内容区
	var list_con = document.getElementById("list_con");
	//选中文件数量
	var chkNum = 0;
	//显示选中文件数量
	var list_header = document.getElementById("list_header");
	var chkfilenum = list_header.getElementsByTagName('span')[1];
	//UL
	var filesSet=document.getElementsByClassName('filesSet')[0];
	//获取到所有的li
	var allLi = tools.$("li",filesSet);
	
	//新建文件夹
	var newfile = tools.$("#newfile");
	
	//重合名、删除盒子
	var info=tools.$('.info')[0];
	//重命名按钮
	var rename=tools.$('#F2');
	//删除按钮
	var del = tools.$('#delete');
	
	//导航菜单
	var files_nav = tools.$(".files_nav")[0];
	//隐藏的input
	var hiddenInput = tools.$(".hiddenInput")[0];
	
	var datas = tools.store("yunpan"); 
	if (datas && !datas.files) {
		//如果在localStorage中没有取到数据，就走默认的数据，并且存在localStorage
		datas = data;
		tools.store("yunpan", datas);
	}	
	var names = null;
	
	
	/*切换显示方式：列表，图标*/

	var list_swicha = document.getElementById("list_swich").getElementsByTagName('a');
	var list_con = document.getElementById("list_con");

	list_swicha[0].onclick = function() {
		this.className='act fl';
		list_swicha[1].className='fl';
		list_con.className = 'details';
	}
	list_swicha[1].onclick = function() {
		this.className='act fl';
		list_swicha[0].className='fl';
		list_con.className = 'icon';
	}

	getPidChild(0);
	
	function getClassNames(type) {
		var classsNames = "";
		if (type === "text") {
			classsNames = "textIcon";
		};
		return classsNames;
	}
	//通过父id找到并渲染子目录
	function getPidChild(pid){
		for( var i = 0; i < datas.files.length; i++ ){
			if( datas.files[i].pid == pid ){
				var li = createLi({
					name:datas.files[i].name,
					id:datas.files[i].id, //生成的时候，把id挂载当前的元素上
					classsNames:getClassNames(datas.files[i].type)
				});
				filesSet.appendChild(li);
				handleLi(li);
			}
		}
	}
	function getIdItem(id){
		for( var i = 0; i < datas.files.length; i++ ){
			if( datas.files[i].id == id ){
				return datas.files[i];
			}
		}
	}
	
	//新建文件夹
	tools.addEvent(newfile,"click",function (){
				
		if( this.isCreateStatus || rename.isRename ){
			names.select();
			return;
		};
		//每次都要获取时间戳
		var random = new Date().getTime();

		var newLi = createLi({
			//在新建的时候，给这个li复一个id
			id:random
		});

		filesSet.appendChild(newLi);
		//获取到修改名字的输入框
		names = tools.$(".names",newLi)[0];

		//新建的时候，让输入框显示
		var strong = tools.$("strong",newLi)[0];
		var edtor = tools.$(".edtor",newLi)[0];
		strong.style.display = "none";
		edtor.style.display = "block";

		allchk.checked = false;
		info.style.display = "none";

		names.select();
		
		//添加一个正在创建状态
		this.isCreateStatus = true;

		//给新建的li里面的元素添加事件处理程序
		handleLi(newLi);

		//取消掉其他li中所有的样式
		tools.each(allLi,function (itemLi){
			cancelStyle(itemLi);
		});
	})
		//删除
	tools.addEvent(del,'click',function(){
		if(rename.isRename) {
			names &&　names.select();
			return;
		}
		var selectLiArr = whoSelect();
	
		tools.each(selectLiArr,function (item){
			//找到着对应的值，删除掉
			for( var i = 0; i < datas.files.length; i++ ){
				if( datas.files[i].id == item.id ){
					datas.files.splice(i,1);
						break;
				};
			};
			tools.store("yunpan",datas);
			filesSet.removeChild(item);
		});
	
		allchk.checked = false;
		chkfilenum.innerHTML = "";
		info.style.display = "none";
	});
	//重命名
	tools.addEvent(rename,"click",function (){

		if( this.isRename ){
			names.select();
			return;
		}

		this.isRename = true;

		var selectLiArr = whoSelect();
		if( selectLiArr.length === 1 ){
			//当只有一项选中
			var icon = tools.$(".fileimg ",selectLiArr[0])[0];
			var checkInput = tools.$(".checkInput",selectLiArr[0])[0];
			var ok = tools.$(".ok",selectLiArr[0])[0];
			var cancel = tools.$(".cancel",selectLiArr[0])[0];
			var strong = tools.$("strong",selectLiArr[0])[0];
			var edtor = tools.$(".edtor",selectLiArr[0])[0];
			var reName_names = tools.$(".names",selectLiArr[0])[0];
			icon.style.borderColor='#fff';
			checkInput.checked=false;
			strong.style.display = "none";
			edtor.style.display = "block";
			reName_names.select();

			names = reName_names;
		}
	})
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
	
	var navArr = [{
		filename:"返回上一级"
	},{
		filename:"全部文件",
		currentId:0
	}];
	
	function handleLi(li){

		var fileimg = tools.$(".fileimg",li)[0];
		var checkInput = tools.$(".checkInput",li)[0];
		var ok = tools.$(".ok",li)[0];
		var cancel = tools.$(".cancel",li)[0];
		var strong = tools.$("strong",li)[0];
		var edtor = tools.$(".edtor",li)[0];
		var names = tools.$(".names",li)[0];

		//点击确定
		tools.addEvent(ok,"click",function (ev){

			strong.style.display = "block";
			edtor.style.display = "none";
			strong.innerHTML = names.value;
			newfile.isCreateStatus = false;
			if( rename.isRename ){  //找到对应的id，更新数据
				var currentItem = getIdItem(li.id);
				currentItem.name = names.value;
				rename.isRename = false;

			}else{
				datas.files.push({
					id:li.id,
					pid:hiddenInput.value,
					name:strong.innerHTML
				});
				tools.store("yunpan",datas);
			}
			//阻止冒泡
			ev.stopPropagation();
		})
		//点击取消
		tools.addEvent(cancel,"click",function (ev){
			if( !rename.isRename ){

				filesSet.removeChild(li);
				newfile.isCreateStatus = false;
				
			}else{
				strong.style.display = "block";
				edtor.style.display = "none";
				rename.isRename = false;
			}
			ev.stopPropagation();
		})

		tools.addEvent(li,"mouseenter",function (){
			if( !newfile.isCreateStatus && !rename.isRename ){
				fileimg.style.borderColor = "#2e80dc";	
				checkInput.style.display = "block";	
			}
		});
		tools.addEvent(li,"mouseleave",function (){
			if( !checkInput.checked ){
				fileimg.style.borderColor = "#fff";	
				checkInput.style.display = "none";	
			}
		});
		tools.addEvent(li,"click",function (){
				//点击li的时候，找当前点击的li的子目录中的数据
				//换句话说，找到数据中pid为当前li的id
				filesSet.innerHTML = "";
				
				getPidChild(this.id);
				hiddenInput.value = this.id;
	
				//渲染导航的目录
	
				// "返回上一级" 全部文件 我的文档 aaaa 111
	
				navArr.push({
					filename:strong.innerHTML,
					currentId:this.id
				});
				renderNav(navArr);
			
		});

		names.addEventListener("click",function (ev){
			ev.stopPropagation();
		},false)
	};
	
	//导航的事件处理
	tools.addEvent(files_nav,"click",function (ev){
		var target = ev.target;
		if( target.nodeName === "A" ){
			
			//["返回上一级", "全部文件", "我的文档", "4444"]


			var currentId = target.getAttribute("currentId");

			filesSet.innerHTML = "";
			getPidChild(currentId);

			//循环数组中的所有项 判断出当前点击的id和数组中id是否一致

			// ["1"，2,3,4,5] length
			// ["上"，“全”]
			
			tools.each(navArr,function (item,index){
				if( item.currentId == currentId ){
					navArr.length = index+1;
				}
			});
			//如果点击的是 全部文件 那么从第二个开始渲染
			var startIndex = 0;
			if( currentId == 0 ){
				startIndex = 1;
			}
			renderNav(navArr,startIndex);
			

		}
	});
	//渲染导航
	function renderNav(navArr,startIndex){
		var str = "",startIndex = startIndex || 0;
		for( var i = startIndex; i < navArr.length-1; i++ ){
			if( i === 0 ){
				str += '<a href="javascript:;" index='+i+' currentId='+navArr[navArr.length-2].currentId+' class="nav_level">'+navArr[i].filename+'</a>|'
			}else{
				str += '<a href="javascript:;" index='+i+' currentId='+navArr[i].currentId+' class="nav_level">'+navArr[i].filename+'</a>>>>'
			}
		}
		str += '<span>'+navArr[navArr.length-1].filename+'</span>'
		files_nav.innerHTML = str;
	}

	function cancelStyle(li){
		var fileimg = tools.$(".fileimg",li)[0];
		var checkInput = tools.$(".checkInput",li)[0];
		fileimg.style.borderColor = "#fff";	
		checkInput.style.display = "none";
		checkInput.checked = false;
	};


	
	function createLi(options){

		options = options || {};

		//传进来的对象，某些调用函数的时候，可能只不会传入很多值，只会传入需要的值

		var defaults = {
			name:options.name || "新建文件夹",
			id:options.id || 0,
			classsNames: options.classsNames || ""
		};

		var li = document.createElement("li");
		var str =   '<div class="fileimg '+defaults.classsNames+'">'
							+'<input type="checkbox"  class="checkInput" />'
						+'</div>'
						+'<strong>'+defaults.name+'</strong>'
						+'<div class="clearFix edtor">'
							+'<input type="text" value="'+defaults.name+'" class="names"  />'
							+'<input type="button" value="√" class="ok" />'
							+'<input type="button" value="×" class="cancel" />'
						+'</div>';
		
		li.innerHTML = str;
		li.id = defaults.id;
		li.className='filebox';
		return li;
	}

	//拖拽选框碰撞
	list_con.addEventListener('mousedown', function(ev) {
		var e = ev || event;
		if (e.target.tagName == 'DIV') {
			even(event);
		}
		e.stopPropagation();
	}, false)
	//拖拽选框及碰撞检测
	function even(ev) {
		ev.preventDefault();
		if( rename.isRename ) return;
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

		tools.addEvent(document,"mousemove",move);
		tools.addEvent(document,"mouseup",up);
		//移动
		function move(ev) {
			var w = ev.clientX - disX;
			var h = ev.clientY - disY;
			//设置一个检测碰撞的范围
			if( Math.abs(w)>5 || Math.abs(h) > 5 ){
				if(!newDiv){

					newDiv = document.createElement("div");
					newDiv.className = "dragbox";
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

		function up() {
			tools.removeEvent(document,"mousemove",move);
			tools.removeEvent(document,"mouseup",up);
			//移除生成的div
			if(newDiv) document.body.removeChild(newDiv);
			if( whoSelect().length === 0 ){
				allchk.checked = false;
				chkfilenum.innerHTML = "";
				info.style.display = "none";
			}
		}
	};
	//ul下所有的class为checkInput的input
	var checkInput = tools.$(".checkInput",filesSet);
	//ul下所有的fileimg
	var fileimg = tools.$(".fileimg",filesSet);
	//点击全选
	tools.addEvent(allchk,"click",function (){
		var _this = this;
		tools.each(fileimg,function (item,i){
			fileimg[i].style.borderColor = _this.checked ? "#2e80dc" : "#fff";
			checkInput[i].style.display = _this.checked ? "block" : "none";
			checkInput[i].checked = _this.checked;	
		});

		chkNum = this.checked ? checkInput.length : 0;

		if( this.checked ){
			info.style.display = "block";
			chkNum = fileimg.length;
			chkfilenum.innerHTML ='已选中'+chkNum+'个文件';
		}else{
			info.style.display = "none";			
			chkNum = 0;
			chkfilenum.innerHTML = '';
		}

	});
	tools.addEvent(list_con,'contextmenu',function(ev){
		var e=ev||event;
		e.preventDefault();
	})
	//点击单独的input
	/*
		选中
			看一下是否所有的input都选中了
		不选中
			只要有一个不选中，全选就不选中
	*/
	tools.each(checkInput,function (item,index){
		tools.addEvent(item,"click",function (ev){
			if( this.checked ){
				//选中的状态
				allchk.checked = true;
				//只要有一个没选中，就不选中
				tools.each(checkInput,function (input){
					if( !input.checked ){
						allchk.checked = false;
					}	
				});
				chkNum++;
				info.style.display = "block";
			}else{
				allchk.checked = false;
				chkNum--;
				if(chkNum == 0){
					info.style.display = "none";
					chkfilenum.innerHTML = "";
				}
			};
			chkfilenum.innerHTML = '已选中'+chkNum+'个文件';
			ev.stopPropagation();
		});
	});
	
	function handleLis( li,bl ){
		var fileimg = tools.$(".fileimg",li)[0];	
		var checkInput = tools.$(".checkInput",li)[0];	
		if( bl ){
			fileimg.style.borderColor = "#2e80dc";
			checkInput.style.display = "block";
			
			info.style.display = "block";
			
			checkInput.checked = true;
			chkNum = whoSelect().length
			chkfilenum.innerHTML = '已选中'+chkNum+'个文件';
			if( whoSelect().length === allLi.length ){
				allchk.checked = true;
			}
		}else{
			fileimg.style.borderColor = "#fff";
			checkInput.style.display = "none";
			checkInput.checked = false;
			chkNum = whoSelect().length;
			chkfilenum.innerHTML = '已选中'+chkNum+'个文件';
			allchk.checked = false;
		}
	};
	
})()