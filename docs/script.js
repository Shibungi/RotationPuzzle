function setup(){
	//キャンバスを作成
	createCanvas(600,425);
	//背景色
	background(0);
  }
  function draw(){
	//オブジェクトの色
	fill(0,255,0);
	//キャンバスの中心に直径100pxの丸を描画
	ellipse(width/2,height/2,100);
  }