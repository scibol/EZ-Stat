function init(){
	canvas = document.getElementById("testCanvas");
	var field = measures(canvas.width);
	 var stage = new createjs.Stage("testCanvas");
	 function drawRectangle(){
	 var rect = new createjs.Shape();
	 rect.graphics.setStrokeStyle(2).beginStroke("rgba(0,0,0,1)").drawRect(0,0,field.width,field.height);
	 // line
	 rect.graphics.setStrokeStyle(2).mt(field.width/2, 0).lt(field.width/2, field.height);
	 
	 rect.graphics.setStrokeStyle(2).beginStroke("rgba(0,0,0,1)").arc(field.width/2, field.height/2, field.radius, 0,Math.PI*2);
	 rect.graphics.setStrokeStyle(2).beginStroke("rgba(0,0,0,1)").
	 	drawRect(0,field.height/2 - (field.smallAreaHeight/2),field.smallAreaWidth,field.smallAreaHeight);
	 rect.graphics.setStrokeStyle(2).beginStroke("rgba(0,0,0,1)").
	 	drawRect(field.width - field.smallAreaWidth,field.height/2 - (field.smallAreaHeight/2),field.smallAreaWidth,field.smallAreaHeight);
	 rect.graphics.setStrokeStyle(2).beginStroke("rgba(0,0,0,1)").arc(field.smallAreaWidth, field.height/2, field.radius, Math.PI*3/2,Math.PI/2);
	 rect.graphics.setStrokeStyle(2).beginStroke("rgba(0,0,0,1)").arc(field.width - field.smallAreaWidth, field.height/2, field.radius, -Math.PI*3/2,-Math.PI/2);

	 // left side trey
	 rect.graphics.setStrokeStyle(2).mt(0, field.treyFromBorder).lt(field.treyLength, field.treyFromBorder);
	 rect.graphics.setStrokeStyle(2).mt(0, field.height - field.treyFromBorder).lt(field.treyLength, field.height - field.treyFromBorder);
	 rect.graphics.setStrokeStyle(2).beginStroke("rgba(0,0,0,1)").
	 	arc(field.basketFromBorder, field.height/2, field.treyRadius, Math.PI*3/1.843, Math.PI/2.688);

	 // right side trey
	 rect.graphics.setStrokeStyle(2).mt(field.width - field.treyLength, field.treyFromBorder).lt(field.width, field.treyFromBorder);
	 rect.graphics.setStrokeStyle(2).mt(field.width - field.treyLength, field.height - field.treyFromBorder).lt(field.width, field.height - field.treyFromBorder);
	 rect.graphics.setStrokeStyle(2).beginStroke("rgba(0,0,0,1)").
	 	arc(field.width - field.basketFromBorder, field.height/2, field.treyRadius, Math.PI-Math.PI/2.688 ,Math.PI-Math.PI*3/1.843);
	 // rect.graphics.setStrokeStyle(1).beginStroke("rgba(0,0,0,1)").arc(field.width/2, field.height/2, field.radius, Math.PI*3/2,Math.PI/2);

	 // rect.graphics.setStrokeStyle(1).beginStroke("rgba(0,0,0,1)").drawRect(startX + fieldWidth/2,startY,fieldX,fieldY);
	 // rect.graphics.setStrokeStyle(1).beginStroke("rgba(0,0,0,1)").drawRect(startX,startY + fieldY/3,fieldX/2,fieldY/3);
	 // rect.graphics.setStrokeStyle(1).beginStroke("rgba(0,0,0,1)").arc(fieldX,350,100,Math.PI*3/2,Math.PI/2);
	 stage.addChild(rect);
	 }
	 drawRectangle()
	 stage.update();    
}


function measures(width) {
	var ratio = width/94;
	field = {
		width : 94*ratio,
		height : 50*ratio,
		radius : 6*ratio,
		smallAreaWidth : 19*ratio,
		smallAreaHeight : 16*ratio,
		treyFromBorder : 3*ratio,
		treyLength : 14*ratio,
		treyRadius : 23.9*ratio,
		basketFromBorder : 4.6*ratio,

	}
	return field;
}
