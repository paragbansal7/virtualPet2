//Create variables here
var dog , milk, dogImg1, dogImg2, milkImage;
var database , foodS, foodStock, fedTime, lastFed;
var feed, addFood, foodObj;

function preload(){
	//load images here
  dogImg1 = loadImage("images/dogImg1.png");
  dogImg2 = loadImage("images/dogImg2.png");
  milkImage = loadImage("images/Milk.png");
}

function setup() {
	createCanvas(500, 500);

  database = firebase.database();

  foodS = database.ref('food/stockLeft');
  foodS.on("value",  function(data){
    foodStock=data.val();
  })

  fedTime = database.ref('food/feedTime');
  fedTime.on("value", function(data){
    lastFed=data.val();
  })
  
  dog = createSprite(400,350,20,20);
  dog.addImage("abc" , dogImg1);
  dog.scale = 0.235;

  milk = new Food();

  feed = createButton("Feed The Dog");
  feed.position(400,150);

  addFood = createButton("Add Food");
  addFood.position(730,150);
  
}

function draw() { 
  background(46,139,87);

 if(lastFed === undefined && foodStock === undefined){
  foodStock = 20;
  lastFed = 0;
 }
  if(foodStock<=0){
    foodStock = 0;
  }

  //enterDogName();
  feedDog();
  addFoods();

  textSize(20)
  fill("red")
  text("STOCK LEFT : "+ foodStock, 10,90);

  if(foodStock===0 && feed.mousePressed()){
    fill(255,255,254)
    textSize(20)
    text("Stock is Over. Please Add the food to feed the Dog",20,30)
    dog.addImage("abc", dogImg1);
  }

  if(lastFed >= 13){
    lastFed = 1; 
  }

  if(lastFed>=12){
    text("Last Fed : "+lastFed/12 + " PM", 350,90)
  } else if(lastFed===0){
    text("Last Fed : 12 AM",350,90)
  } else{
    text("Last Fed : "+lastFed+" AM",350,90);
  }

  drawSprites();
  milk.display();


}

function enterDogName(){
        var greeting = createElement('h2');
        greeting.position(600,300)

        var input = createInput('Write Your Name Here');
        input.position(500,200);

        var button = createButton('Confirm');
        button.position(700,220);
        
        button.mousePressed(function(){
            input.hide();
            button.hide();

            var name = input.value();
            greeting.html('HELLO '+ name);

        })
}

function feedDog(){
  
  feed.mousePressed(function(){
    foodStock -=1;
    lastFed +=1;
    writeStock();
    dog.addImage("abc", dogImg2)
    
  })
}

function addFoods(){
  addFood.mousePressed(function(){
    foodStock += 1;
    writeStock();
  })
}

function writeStock(){
  database.ref('/').update({
    'stockLeft' : foodStock,
    'fedTime' : lastFed
  })
}

