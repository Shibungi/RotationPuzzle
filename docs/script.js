let X;
let Y;

let N = 4;

let Board = []
let initialBoard = []

let BoardSize = 500;
let BoardX = 50;
let BoardY = 50;

let RotateSize = 2;
let RotateSizeMin = 2;
let RotateSizeMax = 3;
let RotateX = 0;
let RotateY = 0;

let Move = 0;
let BestMove;

let Cleared = 0;
let ClearedMove = 0;

let CorrectBoard = [[1,2,3,4],[5,6,7,8],[9,10,11,12],[13,14,15,16]];

function setup(){
	X = 800;
	Y = 600;

	for(let i = 0;i < N;i++){
		initialBoard[i] = [];
		for(let j = 0;j < N;j++){
			initialBoard[i][j] = 0;
		}
	}
	make_new_problem();
	for(let i = 0;i < N;i++){
		Board[i] = [];
		for(let j = 0;j < N;j++){
			Board[i][j] = initialBoard[i][j];
		}
	}
	createCanvas(X,Y);
	//背景色
	background(0);
}

function draw(){
	background(0);
	drawBoard();
	drawRotateArea();
	drawData();
}

function drawBoard(){
	textAlign(CENTER, CENTER);
	textSize(24);
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
	fill(204, 101, 192, 127);
	let PanelSize = BoardSize/N;
	let x = BoardX + RotateX*PanelSize;
	let y = BoardY + RotateY*PanelSize;
	rect(x,y,PanelSize*RotateSize,PanelSize*RotateSize);
}

function keyPressed(){
	if(key === 'q'){
		Move = 0;
		Cleared = 0;
		BoardCopy(Board,initialBoard);
	}

	if(key === 'p'){
		Move = 0;
		Cleared = 0;
		make_new_problem();
		BoardCopy(Board, initialBoard);
	}

	if(key === ' '){
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

	if(key === 'c')Rotate('L');
	else if(key == 'v')Rotate('R');
}

function Rotate(RotateDir){
	Move += 1;
	let Panel = [];
	for(let i = 0;i < RotateSize;i++){
		Panel[i] = [];
		for(let j = 0;j < RotateSize;j++){
			Panel[i][j] = Board[i+RotateY][j+RotateX];
		}
	}
	if(RotateDir === 'L'){
		for(let i = 0;i < RotateSize;i++){
			for(let j = 0;j < RotateSize;j++){
				Board[i+RotateY][j+RotateX] = Panel[j][RotateSize-1-i];
			}
		}
	}else if(RotateDir === 'R'){
		for(let i = 0;i < RotateSize;i++){
			for(let j = 0;j < RotateSize;j++){
				Board[i+RotateY][j+RotateX] = Panel[RotateSize-1-j][i];
			}
		}
	}
}

function make_new_problem(){
	let moves = getRandomInt(4,8);
	let Boards = [];
	for(let i = 0;i <= moves;i++){
		Boards[i] = [];
		for(let j = 0;j < N;j++){
			Boards[i][j] = [];
			for(let k = 0;k < N;k++){
				Boards[i][j][k] = j*N + k + 1;
			}
		}
	}
	for(let i = 0;i < moves;i++){
		let next_state;
		let flag = 0;
		while(flag === 0){
			next_state = get_random_next_state(Boards[i]);
			flag = 1;
			for(let j = 0;j <= i;j++){
				if(next_state.toString() === Boards[j].toString()){
					flag = 0;
					break;
				}
			}
		}
		Boards[i+1] = next_state;
	}
	// initialBoard = Boards[moves];
	BoardCopy(initialBoard, Boards[moves]);
	BestMove = moves;
}

function get_random_next_state(state){
	let next_state = [];
	for(let i = 0;i < N;i++){
		next_state[i] = [];
		for(let j = 0;j < N;j++){
			next_state[i][j] = state[i][j];
		}
	}
	let RotateSize = getRandomInt(RotateSizeMin,RotateSizeMax+1);
	let x = getRandomInt(0,N-RotateSize+1);
	let y = getRandomInt(0,N-RotateSize+1);
	let dir = getRandomInt(0,2);
	let Panel = [];
	for(let i = 0;i < RotateSize;i++){
		Panel[i] = [];
		for(let j = 0;j < RotateSize;j++){
			Panel[i][j] = state[i+y][j+x];
		}
	}
	if(dir === 0){
		for(let i = 0;i < RotateSize;i++){
			for(let j = 0;j < RotateSize;j++){
				next_state[i+y][j+x] = Panel[j][RotateSize-1-i];
			}
		}
	}else if(dir === 1){
		for(let i = 0;i < RotateSize;i++){
			for(let j = 0;j < RotateSize;j++){
				next_state[i+y][j+x] = Panel[RotateSize-1-j][i];
			}
		}
	}
	return next_state;
}

function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

function BoardCopy(a,b){
	for(let i = 0;i < N;i++){
		for(let j = 0;j < N;j++){
			a[i][j] = b[i][j];
		}
	}
}

function drawData(){
	fill(255);
	textAlign(LEFT,TOP);
	textSize(20);
	let textX = BoardX*2 + BoardSize;
	let textY = BoardY;
	text("Best Move : " + String(BestMove),textX,textY);
	text("Your Move : " + String(Move),textX,textY*2);

	if(Cleared === 0 && Board.toString() === CorrectBoard.toString()){
		Cleared = 1;
		ClearedMove = Move;
	}
	if(Cleared === 1){
		text("CLEAR!!",textX,BoardY*5);
		text("Your Move was " + String(ClearedMove),textX,textY*6);
	}

	text("How to use",BoardX*2 + BoardSize,textY*8);
	textSize(16);
	text("c : Counterclockwise",BoardX*2 + BoardSize,textY*9);
	text("v : Clockwise",BoardX*2 + BoardSize,textY*9.5);
	text("space : Resize",BoardX*2 + BoardSize,textY*10);
	text("q : Reset",BoardX*2 + BoardSize,textY*10.5);
	text("p : New Problem",BoardX*2 + BoardSize,textY*11);
}