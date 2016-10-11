function getStyle(obj,attr){
	return obj.currentStyle?obj.currentStyle[attr]:window.getComputedStyle(obj,null)[attr];
}
//单属性运动
function animation(dom,attr,end,fn){
	//停止上一个动画
	dom.timer?clearInterval(dom.timer):null;
	//使回调函数中的this指向当前运动的元素对象
	dom.fn = fn;
	//添加动画
	dom.timer = setInterval(function(){
		//兼容不透明度
		if(attr=='opacity'){
			dom.start = parseFloat(getStyle(dom,attr))*100;
			var e = end * 100;
		}else{
			//重新获取起点
			dom.start = parseFloat(getStyle(dom,attr));
			//终点位置赋值
			var e = end;
		}
		//计算每一帧所要走的步子大小  
		dom.step = (e-dom.start)/20>0?Math.ceil((e-dom.start)/20):Math.floor((e-dom.start)/20);
		//判断动画停止条件
		if(dom.start==e){
			//停止动画
			clearInterval(dom.timer);
			//如果有回调函数，执行回调函数
			if(dom.fn){
				dom.fn();
			}
		}
		//兼容不透明度
		if(attr=='opacity'){
			dom.style[attr] = (dom.start += dom.step)/100;
			dom.style.filter = 'alpha(opacity='+(dom.start += dom.step)+')';
		}else{
			//赋值
			dom.style[attr] = (dom.start += dom.step) + 'px';
		}
		
	},10)
}
//多属性运动
function animations(dom,attr,times,fn){
	//初始化角度
	dom.deg = 0;
	//改变回调函数中的this指针
	dom.fn = fn;
	//停止上一个动画
	dom.timer ? clearInterval(dom.timer):null;
	//计算速率
	if(times=='slow'){
		var t = 20;
	}else if(times=='normal'){
		var t = 10;
	}else if(times=='fast'){
		var t = 5;
	}else{
		var t = times/90;
	}
	
	//保存对应css属性的起点值
	var start = {};
	for(var k in attr){
		//兼容不透明度
		if(k=='opacity'){
			start[k] = parseFloat(getStyle(dom,k))*100;
		}else{
			start[k] = parseInt(getStyle(dom,k));
		}
		
	}
	//动画开始
	dom.timer = setInterval(function(){
		dom.deg++;
		//判断停止条件
		if(dom.deg==90){
			//停止动画
			clearInterval(dom.timer);
			//执行回调函数
			if(dom.fn){
				dom.fn();
			}
		}
		//循环改变每一条属性
		for(var key in attr){
			if(key=='opacity'){
				var end = Math.round((attr[key]*100-start[key])*Math.sin(dom.deg*Math.PI/180));
				dom.style[key] = (end + start[key])/100;
				dom.style.filter ='alpha(opacity='+(end + start[key])+')';
			}else{
				//计算当前位置
				var end = Math.round((attr[key]-start[key])*Math.sin(dom.deg*Math.PI/180));
				dom.style[key] = end + start[key] + 'px';
			}
			
		}

	},t)
}

