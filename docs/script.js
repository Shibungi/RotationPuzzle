let X;
let Y;

let N = 4;

let Board = []
let BoardSize = 500;
let BoardX = 50;
let BoardY = 50;

let RotateSize = 2;
let RotateSizeMin = 2;
let RotateSizeMax = 3;
let RotateX = 0;
let RotateY = 0;
let RotateDir = -1;

let Move = 0;


function setup(){
	X = 800;
	Y = 600;
	for(let i = 0;i < N;i++){
		Board[i] = [];
		for(let j = 0;j < N;j++){
			Board[i][j] = i*N + j + 1;
		}
	}
	createCanvas(X,Y);
	//背景色
	background(0);
	textAlign(CENTER, CENTER);
	textSize(24);
}

function draw(){
	background(0);
	drawBoard();
	drawRotateArea();
}

function drawBoard(){
	noStroke();
	let PanelSize = BoardSize/N;
	let p = 0.9;
	for(let i = 0;i < N;i++){
		for(let j = 0;j < N;j++){
			let x = BoardX + j*PanelSize;
			let y = BoardY + i*PanelSize;
			fill(255);
			rect(x + (1-p)/2*PanelSize, y + (1-p)/2*PanelSize,p*PanelSize,p*PanelSize);
			fill(0);
			text(String(Board[i][j]),x+PanelSize/2,y+PanelSize/2);
		}
	}
}

function drawRotateArea(){
	noStroke();
	if(RotateDir === -1){
		fill(204, 101, 192, 127);
	}else{
		fill(104, 101, 192, 127);
	}
	let PanelSize = BoardSize/N;
	let x = BoardX + RotateX*PanelSize;
	let y = BoardY + RotateY*PanelSize;
	rect(x,y,PanelSize*RotateSize,PanelSize*RotateSize);
}

function keyPressed(){
	if(key === 'q'){
		Move = 0;
		for(let i = 0;i < N;i++){
			for(let j = 0;j < N;j++){
				Board[i][j] = i*N + j + 1;
			}
		}
	}

	if(key === 'c'){
		if(RotateSize === RotateSizeMax){
			RotateSize = RotateSizeMin;
		}else{
			RotateSize += 1;
		}
	}

	if(keyCode === UP_ARROW){
		RotateY -= 1;
	}
	if(keyCode === DOWN_ARROW){
		RotateY += 1;
	}
	if(keyCode === LEFT_ARROW){
		RotateX -= 1;
	}
	if(keyCode === RIGHT_ARROW){
		RotateX += 1;
	}
	if(RotateX < 0)RotateX = 0;
	if(RotateY < 0)RotateY = 0;
	if(RotateX + RotateSize > N)RotateX = N - RotateSize;
	if(RotateY + RotateSize > N)RotateY = N - RotateSize;

	if(key === 'v'){
		RotateDir *= -1;
	}
	if(key == ' ')Rotate();
}

function Rotate(){
	Move += 1;
	let Panel = [];
	for(let i = 0;i < RotateSize;i++){
		Panel[i] = [];
		for(let j = 0;j < RotateSize;j++){
			Panel[i][j] = Board[i+RotateY][j+RotateX];
		}
	}
	if(RotateDir === -1){
		for(let i = 0;i < RotateSize;i++){
			for(let j = 0;j < RotateSize;j++){
				Board[i+RotateY][j+RotateX] = Panel[j][RotateSize-1-i];
			}
		}
	}else{
		for(let i = 0;i < RotateSize;i++){
			for(let j = 0;j < RotateSize;j++){
				Board[i+RotateY][j+RotateX] = Panel[RotateSize-1-j][i];
			}
		}
	}
}

