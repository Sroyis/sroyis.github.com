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

var oNum = 0;

$nd = function(obj, num) {
	obj.eq(0).html(data[oNum].num);
	obj.eq(1).html(data[oNum].name);
	obj.eq(2).html(data[oNum].newPrices);
}

$nd($('.box1 a'), oNum);


$(document).on("pageinit", "#pageone", function() {
	$(document).on("tap", function() {
		if(oNum===2){
			oNum=0;
		}else{
			oNum++;
		}		
		$nd($('.box2 a'), oNum);
		$('#box').animate({
			top:'-2rem'
		},1000,function(){
			$nd($('.box1 a'), oNum);
			$('#box').css('top','0rem');
		})
	});
});
