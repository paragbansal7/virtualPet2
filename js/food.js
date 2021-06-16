class Food{
    constructor(foodStock,lastFed){

    }

    display(){
            image(milkImage,60,350,90,100)
    }

    addBottle(){
        var x=0,y=350;
        
        if(foodStock>0){
            for(var i =0;i<foodStock;i++){
                if(i%10===0){
                    x+=40;
                }
                image(milkImage,x,y,90,100)
            }
        }
    }

    getFoodStuck(){
        
    }

    updateFoodStuck(){

    }

    deductFood(){

    }
    
}