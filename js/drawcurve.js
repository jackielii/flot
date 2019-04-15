function drawcurve() {
//初始绘图
	var data2=[];
	var data3=[];
	var draw_options={xaxis: {ticks: 5,tickFormatter:function(val, axis){return ""}},
									x2axis:{ticks: 0,tickFormatter:function(val, axis){return ""}},	
									yaxis: {ticks: 20,tickFormatter:function(val, axis){return ""}}
					}
	data2.push({color:3,data:c4,label:"DEN"});
	data3.push({color:4,data:c5,label:"CNL"});
	if (data2.length > 0)
			$.plot($("#curve2"), data2,draw_options);
	if (data3.length > 0)
			$.plot($("#curve3"), data3,draw_options);
	function plotchoices(){
		var data=[];
		$("#data1").hide();$("#data2").hide();$("#data3").hide();
		$("#choice").find("input:checked").each(function(){
			var key = $(this).attr("name");
			if (key=="CAL/CM") {data.push({color:0,data:c1,label:"CAL/CM"});$("#data1").fadeIn('slow');}
			if (key=="GR/API") {data.push({color:1,data:c2,xaxis:2,label:"GR/API"});$("#data2").fadeIn('slow');}
			if (key=="SP/mV") {data.push({color:2,data:c3,label:"SP/mV"});$("#data3").fadeIn('slow');}
		});
		if (data.length > 0)
            $.plot($("#curve1"), data,draw_options);
	}
	$("#choice").find("input").click(plotchoices);
	plotchoices();
	$.plot($("#lith"),lith,{yaxis:{min:500,max:600},xaxis:{max:2,ticks:0}});
//坐标显示
	$("#curve1").hover(
			function(e){
				$("#pos_xy").html('深度:'+e.pageY+'<br />值:'+e.pageX);
				$("#pos").css("left","28px").css("top",(e.pageY)+"px").show();
			},
			function(){
				$("#pos").hide();
			}
	).mousemove(function(e){
				$("#pos").css("left","28px").css("top",(e.pageY)+"px").show();
			});
	$("#curve2").hover(
			function(e){
				$("#pos_xy").html('深度:'+e.pageY+'<br />值:'+e.pageX);
				$("#pos").css("left","248px").css("top",(e.pageY)+"px").show();
			},
			function(){
				$("#pos").hide();
			}
	).mousemove(function(e){
				$("#pos").css("left","248px").css("top",(e.pageY)+"px").show();
			});
	$("#curve3").hover(
			function(e){
				$("#pos_xy").html('深度:'+e.pageY+'<br />值:'+e.pageX);
				$("#pos").css("left","468px").css("top",(e.pageY)+"px").show();
			},
			function(){
				$("#pos").hide();
			}
	).mousemove(function(e){
				$("#pos").css("left","468px").css("top",(e.pageY)+"px").show();
			});
	$("#lith").hover(
			function(e){
				$("#pos_xy").html('深度:'+e.pageY+'<br />值:'+e.pageX);
				$("#pos").css("left","755px").css("top",(e.pageY)+"px").show();
			},
			function(){
				$("#pos").hide();
			}
	).mousemove(function(e){
				$("#pos").css("left","755px").css("top",(e.pageY)+"px").show();
			});			
//拖动曲线
	$(".log_legend").draggable({ revert: 'invalid'
							 });
    $(".header").droppable({
		drop: function(ev, ui) {
			dropTOheader(ui.draggable,$(this));
		}
    });
	function dropTOheader(log_legend,header) {
			var data=[];
			log_legend.animate({top: '0px', left: '0px'}, 300).appendTo(header);
			header.each(function(i){
				if($("div",this).is('#data1')) data.push({color:0,data:c1,label:"CAL/CM"});
				if($("div",this).is('#data2')) data.push({color:1,data:c2,label:"GR/API",xaxis:2});
				if($("div",this).is('#data3')) data.push({color:2,data:c3,label:"SP/mV"});
				if($("div",this).is('#data4')) data.push({color:3,data:c4,label:"DEN"});
				if($("div",this).is('#data5')) data.push({color:4,data:c5,label:"CNL",xaxis:2});
			});                                                         
			var canvas=null
			if ($(header).is("#header1")) canvas=$("#curve1");
			if ($(header).is("#header2")) canvas=$("#curve2");
			if ($(header).is("#header3")) canvas=$("#curve3");
			if (data.length > 0)
				$.plot(canvas, data,draw_options);
	}
	$("#dialog").dialog({			
		bgiframe: true,
		height: 200,
		autoOpen: false,
		modal: true,
		buttons: {
			'确定':function() {$(this).dialog('close');},
			'取消':function() {$(this).dialog('close');}
		}
	});
	$(".log_legend").dblclick(function(){
		$('#dialog').dialog('open');
	});

}