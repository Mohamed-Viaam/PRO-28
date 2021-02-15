
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Render = Matter.Render;
const Constraint = Matter.Constraint;
var treeObj, stoneObj,groundObject, launcherObject;
var mango1, mango2, mango3, mango4, mango5, mango6, mango7;
var world, boy, backImg;
var stone, slingshot;

function preload(){
	boy = loadImage("images/kid.png");
	backImg = loadImage("images/background.jpg")
  }

function setup() {
	createCanvas(1300, 600);
	engine = Engine.create();
	world = engine.world;

	mango1 = new Mango(1030,350,30);
	mango2 = new Mango(1150,370,30);
	mango3 = new Mango(930,360,30);
	mango4 = new Mango(1060,230,30);
	mango5 = new Mango(960,250,30);
	mango6 = new Mango(1050,120,30);
	mango7 = new Mango(1140,250,30);

	treeObj = new Tree(1050,580);
	groundObject = new Ground(width/2,600,width,20);

	stone = new Stone(385, 425, 30);

	slingshot = new Slingshot(stone.body, {x : 385, y : 425});
	
	Engine.run(engine);

}

function draw() {
  background(backImg);

  textSize(30);
  text("Press 'Space' to get a second chance to play!!", 80, 100);

  image(boy, 200, 340, 290, 300);
  

  treeObj.display();

  mango1.display();
  mango2.display();
  mango3.display();
  mango4.display();
  mango5.display();
  mango6.display();
  mango7.display();

  groundObject.display();
  stone.display();

  detectCollision(stone, mango1);
  detectCollision(stone, mango2);
  detectCollision(stone, mango3);
  detectCollision(stone, mango4);
  detectCollision(stone, mango5);
  detectCollision(stone, mango6);
  detectCollision(stone, mango7);
}

function mouseDragged(){
	Matter.Body.setPosition(stone.body, {x : mouseX, y : mouseY});
}

function mouseReleased(){
	slingshot.fly();
}

function keyPressed(){
	if(keyCode === 32){
		Matter.Body.setPosition(stone.body, {x: 385, y:425});
		slingshot.attach(stone.body);
	}
}

function detectCollision(lstone, lmango){
	mangoPos = lmango.body.position;
	stonePos = lstone.body.position;

	var distance = dist(stonePos.x, stonePos.y, mangoPos.x, mangoPos.y);
	if(distance <= lmango.r + lstone.r){
		Matter.Body.setStatic(lmango.body, false);
	}
}