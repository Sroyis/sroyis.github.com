//数据
var datas = {
	contextmenu: {
		//common菜单组
		common: [{
			name: "新建文件夹",
			exe: function() {
				newFolder();
				hideonContextmenu();
			}
		}, {
			name: "刷新",
			exe: function() {
				Refresh();
				hideonContextmenu();
			}
		}],
		//文件夹右键菜单
		filetextmenu:[{
			name: "重命名",
			exe: function() {
				console.log('重命名');
			}
		},{
			name: "新建文件夹",
			exe: function() {
				newFolder();
				hideonContextmenu();
			}
		},{
			
		}]
	},
	file: [{
		name: 'a1',
		id: 1,
		prd: 0,
		Attri: 'file',
	}, {
		name: 'b2',
		id: 2,
		prd: 0,
		Attri: 'file',
	}]
}