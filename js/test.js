var testState={

create:function(){
    game.physics.startSystem(Phaser.Physics.ARCADE);
    this.table=game.add.sprite(game.width/2,game.height/2,'table');
    this.table.anchor.setTo(0.5,0.5);
    this.ball=[];
    this.ball[0]=game.add.sprite(400,game.height/2,'whiteball');
    this.ball[0].anchor.setTo(0.5,0.5);
    game.physics.arcade.enable(this.ball[0]);
    this.ball[0].body.velocity.y=0;
    this.ball[0].body.velocity.x=100;

    this.ball[1]=game.add.sprite(650,game.height/2+26,'ball8');
    this.ball[1].anchor.setTo(0.5,0.5);
    game.physics.arcade.enable(this.ball[1]);
    this.ball[1].body.velocity.x=0;
    this.ball[1].body.velocity.y=0;

    this.ball[2]=game.add.sprite(650,game.height/2-26,'ball2');
    this.ball[2].anchor.setTo(0.5,0.5);
    game.physics.arcade.enable(this.ball[2]);
    this.ball[2].body.velocity.x=0;
    this.ball[2].body.velocity.y=0;

    this.ball[3]=game.add.sprite(400,0,'ball3');
    this.ball[3].anchor.setTo(0.5,0.5);
    game.physics.arcade.enable(this.ball[3]);
    this.ball[3].body.velocity.x=0;
    this.ball[3].body.velocity.y=0;

    this.ball[4]=game.add.sprite(600,0,'ball1');
    this.ball[4].anchor.setTo(0.5,0.5);
    game.physics.arcade.enable(this.ball[4]);
    this.ball[4].body.velocity.x=0;
    this.ball[4].body.velocity.y=0;
  //  this.collide=[];
  //  this.touchbound=[];//
    this.collidetime_x=[];// for bound left right
    this.collidetime_y=[];// for bound up down
   // this.ballcollide=[0,0];//collide between ball and ball
    for(var i=0;i<5;i++){
        this.collidetime_x[i]=0;
        this.collidetime_y[i]=0;
    }
   /* for(var i=0;i<2;i++){
        for(var j=0;j<2;j++){
            this.ballcollide[i].push(0);
        }
    }*/
    this.ballcollide = new Array(); //先宣告一維
    for(var k=0;k<5;k++  ){ //一維長度為i,i為變數，可以根據實際情況改變
        this.ballcollide[k]=new Array(); //宣告二維，每一個一維陣列裡面的一個元素都是一個陣列；
        for(var j=0;j<5;j++  ){ //一維陣列裡面每個元素陣列可以包含的數量p，p也是一個變數；
            this.ballcollide[k][j]=0; //這裡將變數初始化，我這邊統一初始化為空，後面在用所需的值覆蓋裡面的值
        }
    }
  //  console.log(this.ballcollide);
  
   


},
update:function(){
    for(var i=0;i<5;i++){
        if(this.ball[i].x>=game.width-180||this.ball[i].x<=180){
            if(game.time.now>=this.collidetime_x[i]){
                this.ball[i].body.velocity.x*=-1;
                this.collidetime_x[i]=game.time.now+80;
            }
            
        }
        if(this.ball[i].y>=game.height-150||this.ball[i].y<=150){
            if(game.time.now>=this.collidetime_y[i]){
                this.ball[i].body.velocity.y*=-1;
                this.collidetime_y[i]=game.time.now+80;
            }
        }
        for(var j=0;j<5;j++){
            if(i!=j){
                if(Math.pow(this.ball[i].x-this.ball[j].x,2)+Math.pow(this.ball[i].y-this.ball[j].y,2)<=2500){
                    console.log('collide!');
                    this.collide(i,j);
                }
            }
        }
    }

},

collide:function(i,j){
    if(this.ballcollide[i][j]<=game.time.now&&this.ballcollide[j][i]<=game.time.now){
        this.ballcollide[i][j]=game.time.now+100;
        this.ballcollide[j][i]=game.time.now+100;
        var vx1=this.ball[i].body.velocity.x;
        var vy1=this.ball[i].body.velocity.y;
        var vx2=this.ball[j].body.velocity.x;
        var vy2=this.ball[j].body.velocity.y;
      
       /* if(this.ball[i].x>this.ball[j].x){
            if(this.ball[i].y>this.ball[j].y){
                this.ball[i].body.velocity.x+=(Math.abs(vx2-vx1)*(this.ball[i].x-this.ball[j].x)/50+Math.abs(vy2-vy1)*Math.min((this.ball[i].y-this.ball[j].y),(50-this.ball[i].y+this.ball[j].y))/50);
                this.ball[i].body.velocity.y+=(Math.abs(vy2-vy1)*(this.ball[i].y-this.ball[j].y)/50+Math.abs(vx2-vx1)*Math.min((this.ball[i].x-this.ball[j].x),(50-this.ball[i].x+this.ball[j].x))/50);
                this.ball[j].body.velocity.x-=(Math.abs(vx2-vx1)*(this.ball[i].x-this.ball[j].x)/50+Math.abs(vy2-vy1)*Math.min((this.ball[i].y-this.ball[j].y),(50-this.ball[i].y+this.ball[j].y))/50);
                this.ball[j].body.velocity.y-=(Math.abs(vy2-vy1)*(this.ball[i].y-this.ball[j].y)/50+Math.abs(vx2-vx1)*Math.min((this.ball[i].x-this.ball[j].x),(50-this.ball[i].x+this.ball[j].x))/50);
                console.log('1');
            }else if(this.ball[i].y<this.ball[j].y){
                this.ball[i].body.velocity.x+=(Math.abs(vx2-vx1)*(this.ball[i].x-this.ball[j].x)/50+Math.abs(vy2-vy1)*Math.min((this.ball[j].y-this.ball[i].y),(50-this.ball[j].y+this.ball[i].y))/50);
                this.ball[i].body.velocity.y-=(Math.abs(vy2-vy1)*(this.ball[j].y-this.ball[i].y)/50+Math.abs(vx2-vx1)*Math.min((this.ball[i].x-this.ball[j].x),(50-this.ball[i].x+this.ball[j].x))/50);
                this.ball[j].body.velocity.x-=(Math.abs(vx2-vx1)*(this.ball[i].x-this.ball[j].x)/50+Math.abs(vy2-vy1)*Math.min((this.ball[j].y-this.ball[i].y),(50-this.ball[j].y+this.ball[i].y))/50);
                this.ball[j].body.velocity.y+=(Math.abs(vy2-vy1)*(this.ball[j].y-this.ball[i].y)/50+Math.abs(vx2-vx1)*Math.min((this.ball[i].x-this.ball[j].x),(50-this.ball[i].x+this.ball[j].x))/50);
                console.log('2');
            }else {
                this.ball[i].body.velocity.x+=Math.abs(vx2-vx1);
                this.ball[j].body.velocity.x-=Math.abs(vx2-vx1);
                console.log('3');

            }
        }else if(this.ball[i].x<this.ball[j].x){
            if(this.ball[i].y>this.ball[j].y){
                this.ball[i].body.velocity.x-=(Math.abs(vx2-vx1)*(this.ball[j].x-this.ball[i].x)/50+Math.abs(vy2-vy1)*Math.min((this.ball[i].y-this.ball[j].y),(50-this.ball[i].y+this.ball[j].y))/50);
                this.ball[i].body.velocity.y+=(Math.abs(vy2-vy1)*(this.ball[i].y-this.ball[j].y)/50+Math.abs(vx2-vx1)*Math.min((this.ball[j].x-this.ball[i].x),(50-this.ball[j].x+this.ball[i].x))/50);
                this.ball[j].body.velocity.x+=(Math.abs(vx2-vx1)*(this.ball[j].x-this.ball[i].x)/50+Math.abs(vy2-vy1)*Math.min((this.ball[i].y-this.ball[j].y),(50-this.ball[i].y+this.ball[j].y))/50);
                this.ball[j].body.velocity.y-=(Math.abs(vy2-vy1)*(this.ball[i].y-this.ball[j].y)/50+Math.abs(vx2-vx1)*Math.min((this.ball[j].x-this.ball[i].x),(50-this.ball[j].x+this.ball[i].x))/50);
                console.log('4');

            }else if(this.ball[i].y<this.ball[j].y){
                this.ball[i].body.velocity.x-=(Math.abs(vx2-vx1)*(this.ball[j].x-this.ball[i].x)/50+Math.abs(vy2-vy1)*Math.min((this.ball[j].y-this.ball[i].y),(50-this.ball[j].y+this.ball[i].y))/50);
                this.ball[i].body.velocity.y-=(Math.abs(vy2-vy1)*(this.ball[j].y-this.ball[i].y)/50+Math.abs(vx2-vx1)*Math.min((this.ball[j].x-this.ball[i].x),(50-this.ball[j].x+this.ball[i].x))/50);
                this.ball[j].body.velocity.x+=(Math.abs(vx2-vx1)*(this.ball[j].x-this.ball[i].x)/50+Math.abs(vy2-vy1)*Math.min((this.ball[j].y-this.ball[i].y),(50-this.ball[j].y+this.ball[i].y))/50);
                this.ball[j].body.velocity.y+=(Math.abs(vy2-vy1)*(this.ball[j].y-this.ball[i].y)/50+Math.abs(vx2-vx1)*Math.min((this.ball[j].x-this.ball[i].x),(50-this.ball[j].x+this.ball[i].x))/50);
                console.log('5');
            }else{
                this.ball[i].body.velocity.x-=Math.abs(vx2-vx1);
                this.ball[j].body.velocity.x+=Math.abs(vx2-vx1);
                console.log('6');

            }
            
        }else{
            if(this.ball[i].y>this.ball[j].y){
                this.ball[i].body.velocity.y+=Math.abs(vy2-vy1);
                this.ball[j].body.velocity.y-=Math.abs(vy2-vy1);
                console.log('7');

            }else if(this.ball[i].y<this.ball[j].y){
                this.ball[i].body.velocity.y-=Math.abs(vy2-vy1);
                this.ball[j].body.velocity.y+=Math.abs(vy2-vy1);
                console.log('8');
            }else{
                console.log('bug');
            }
        }*/
        /*if(this.ball[i].x>this.ball[j].x){
            if(this.ball[i].y>this.ball[j].y){
                this.ball[i].body.velocity.x+=(Math.abs(vx2-vx1)*(this.ball[i].x-this.ball[j].x)/50+Math.abs(vy2-vy1)*Math.min((this.ball[i].y-this.ball[j].y),Math.sqrt(2500-(this.ball[i].y-this.ball[j].y)*(this.ball[i].y-this.ball[j].y)))/50);
                this.ball[i].body.velocity.y+=(Math.abs(vy2-vy1)*(this.ball[i].y-this.ball[j].y)/50+Math.abs(vx2-vx1)*Math.min((this.ball[i].x-this.ball[j].x),Math.sqrt(2500-(this.ball[i].x-this.ball[j].x)*(this.ball[i].x-this.ball[j].x)))/50);
                this.ball[j].body.velocity.x-=(Math.abs(vx2-vx1)*(this.ball[i].x-this.ball[j].x)/50+Math.abs(vy2-vy1)*Math.min((this.ball[i].y-this.ball[j].y),Math.sqrt(2500-(this.ball[i].y-this.ball[j].y)*(this.ball[i].y-this.ball[j].y)))/50);
                this.ball[j].body.velocity.y-=(Math.abs(vy2-vy1)*(this.ball[i].y-this.ball[j].y)/50+Math.abs(vx2-vx1)*Math.min((this.ball[i].x-this.ball[j].x),Math.sqrt(2500-(this.ball[i].x-this.ball[j].x)*(this.ball[i].x-this.ball[j].x)))/50);
            }else if(this.ball[i].y<this.ball[j].y){
                this.ball[i].body.velocity.x+=(Math.abs(vx2-vx1)*(this.ball[i].x-this.ball[j].x)/50+Math.abs(vy2-vy1)*Math.min((this.ball[j].y-this.ball[i].y),Math.sqrt(2500-(this.ball[j].y-this.ball[i].y)*(this.ball[j].y-this.ball[i].y)))/50);
                this.ball[i].body.velocity.y-=(Math.abs(vy2-vy1)*(this.ball[j].y-this.ball[i].y)/50+Math.abs(vx2-vx1)*Math.min((this.ball[i].x-this.ball[j].x),Math.sqrt(2500-(this.ball[i].x-this.ball[j].x)*(this.ball[i].x-this.ball[j].x)))/50);
                this.ball[j].body.velocity.x-=(Math.abs(vx2-vx1)*(this.ball[i].x-this.ball[j].x)/50+Math.abs(vy2-vy1)*Math.min((this.ball[j].y-this.ball[i].y),Math.sqrt(2500-(this.ball[j].y-this.ball[i].y)*(this.ball[j].y-this.ball[i].y)))/50);
                this.ball[j].body.velocity.y+=(Math.abs(vy2-vy1)*(this.ball[j].y-this.ball[i].y)/50+Math.abs(vx2-vx1)*Math.min((this.ball[i].x-this.ball[j].x),Math.sqrt(2500-(this.ball[i].x-this.ball[j].x)*(this.ball[i].x-this.ball[j].x)))/50);

            }else {
                this.ball[i].body.velocity.x+=Math.abs(vx2-vx1);
                this.ball[j].body.velocity.x-=Math.abs(vx2-vx1);

            }
        }else if(this.ball[i].x<this.ball[j].x){
            if(this.ball[i].y>this.ball[j].y){
                this.ball[i].body.velocity.x-=(Math.abs(vx2-vx1)*(this.ball[j].x-this.ball[i].x)/50+Math.abs(vy2-vy1)*Math.min((this.ball[i].y-this.ball[j].y),Math.sqrt(2500-(this.ball[i].y-this.ball[j].y)*(this.ball[i].y-this.ball[j].y)))/50);
                this.ball[i].body.velocity.y+=(Math.abs(vy2-vy1)*(this.ball[i].y-this.ball[j].y)/50+Math.abs(vx2-vx1)*Math.min((this.ball[j].x-this.ball[i].x),Math.sqrt(2500-(this.ball[j].x-this.ball[i].x)*(this.ball[j].x-this.ball[i].x)))/50);
                this.ball[j].body.velocity.x+=(Math.abs(vx2-vx1)*(this.ball[j].x-this.ball[i].x)/50+Math.abs(vy2-vy1)*Math.min((this.ball[i].y-this.ball[j].y),Math.sqrt(2500-(this.ball[i].y-this.ball[j].y)*(this.ball[i].y-this.ball[j].y)))/50);
                this.ball[j].body.velocity.y-=(Math.abs(vy2-vy1)*(this.ball[i].y-this.ball[j].y)/50+Math.abs(vx2-vx1)*Math.min((this.ball[j].x-this.ball[i].x),Math.sqrt(2500-(this.ball[j].x-this.ball[i].x)*(this.ball[j].x-this.ball[i].x)))/50);

            }else if(this.ball[i].y<this.ball[j].y){
                this.ball[i].body.velocity.x-=(Math.abs(vx2-vx1)*(this.ball[j].x-this.ball[i].x)/50+Math.abs(vy2-vy1)*Math.min((this.ball[j].y-this.ball[i].y),Math.sqrt(2500-(this.ball[j].y-this.ball[i].y)*(this.ball[j].y-this.ball[i].y)))/50);
                this.ball[i].body.velocity.y-=(Math.abs(vy2-vy1)*(this.ball[j].y-this.ball[i].y)/50+Math.abs(vx2-vx1)*Math.min((this.ball[j].x-this.ball[i].x),Math.sqrt(2500-(this.ball[j].x-this.ball[i].x)*(this.ball[j].x-this.ball[i].x)))/50);
                this.ball[j].body.velocity.x+=(Math.abs(vx2-vx1)*(this.ball[j].x-this.ball[i].x)/50+Math.abs(vy2-vy1)*Math.min((this.ball[j].y-this.ball[i].y),Math.sqrt(2500-(this.ball[j].y-this.ball[i].y)*(this.ball[j].y-this.ball[i].y)))/50);
                this.ball[j].body.velocity.y+=(Math.abs(vy2-vy1)*(this.ball[j].y-this.ball[i].y)/50+Math.abs(vx2-vx1)*Math.min((this.ball[j].x-this.ball[i].x),Math.sqrt(2500-(this.ball[j].x-this.ball[i].x)*(this.ball[j].x-this.ball[i].x)))/50);

            }else{
                this.ball[i].body.velocity.x-=Math.abs(vx2-vx1);
                this.ball[j].body.velocity.x+=Math.abs(vx2-vx1);

            }
            
        }else{
            if(this.ball[i].y>this.ball[j].y){
                this.ball[i].body.velocity.y+=Math.abs(vy2-vy1);
                this.ball[j].body.velocity.y-=Math.abs(vy2-vy1);

            }else if(this.ball[i].y<this.ball[j].y){
                this.ball[i].body.velocity.y-=Math.abs(vy2-vy1);
                this.ball[j].body.velocity.y+=Math.abs(vy2-vy1);
            }else{
                console.log('bug');
            }
    
        }*/
        /*if(this.ball[i].x>this.ball[j].x){
            if(this.ball[i].y>this.ball[j].y){
                this.ball[i].body.velocity.x+=(Math.abs(vx2-vx1)*(this.ball[i].x-this.ball[j].x)/50+Math.abs(vy2-vy1)*(this.ball[i].x-this.ball[j].x)/50);
                this.ball[i].body.velocity.y+=(Math.abs(vy2-vy1)*(this.ball[i].y-this.ball[j].y)/50+Math.abs(vx2-vx1)*(this.ball[i].y-this.ball[j].y)/50);
                this.ball[j].body.velocity.x-=(Math.abs(vx2-vx1)*(this.ball[i].x-this.ball[j].x)/50+Math.abs(vy2-vy1)*(this.ball[i].x-this.ball[j].x)/50);
                this.ball[j].body.velocity.y-=(Math.abs(vy2-vy1)*(this.ball[i].y-this.ball[j].y)/50+Math.abs(vx2-vx1)*(this.ball[i].y-this.ball[j].y)/50);
            }else if(this.ball[i].y<this.ball[j].y){
                this.ball[i].body.velocity.x+=(Math.abs(vx2-vx1)*(this.ball[i].x-this.ball[j].x)/50+Math.abs(vy2-vy1)*(this.ball[i].x-this.ball[j].x)/50);
                this.ball[i].body.velocity.y-=(Math.abs(vy2-vy1)*(this.ball[j].y-this.ball[i].y)/50+Math.abs(vx2-vx1)*(this.ball[j].y-this.ball[i].y)/50);
                this.ball[j].body.velocity.x-=(Math.abs(vx2-vx1)*(this.ball[i].x-this.ball[j].x)/50+Math.abs(vy2-vy1)*(this.ball[i].x-this.ball[j].x)/50);
                this.ball[j].body.velocity.y+=(Math.abs(vy2-vy1)*(this.ball[j].y-this.ball[i].y)/50+Math.abs(vx2-vx1)*(this.ball[j].y-this.ball[i].y)/50);

            }else {
                this.ball[i].body.velocity.x+=Math.abs(vx2-vx1);
                this.ball[j].body.velocity.x-=Math.abs(vx2-vx1);

            }
        }else if(this.ball[i].x<this.ball[j].x){
            if(this.ball[i].y>this.ball[j].y){
                this.ball[i].body.velocity.x-=(Math.abs(vx2-vx1)*(this.ball[j].x-this.ball[i].x)/50+Math.abs(vy2-vy1)*(this.ball[j].x-this.ball[i].x)/50);
                this.ball[i].body.velocity.y+=(Math.abs(vy2-vy1)*(this.ball[i].y-this.ball[j].y)/50+Math.abs(vx2-vx1)*(this.ball[i].y-this.ball[j].y)/50);
                this.ball[j].body.velocity.x+=(Math.abs(vx2-vx1)*(this.ball[j].x-this.ball[i].x)/50+Math.abs(vy2-vy1)*(this.ball[j].x-this.ball[i].x)/50);
                this.ball[j].body.velocity.y-=(Math.abs(vy2-vy1)*(this.ball[i].y-this.ball[j].y)/50+Math.abs(vx2-vx1)*(this.ball[i].y-this.ball[j].y)/50);

            }else if(this.ball[i].y<this.ball[j].y){
                this.ball[i].body.velocity.x-=(Math.abs(vx2-vx1)*(this.ball[j].x-this.ball[i].x)/50+Math.abs(vy2-vy1)*(this.ball[j].x-this.ball[i].x)/50);
                this.ball[i].body.velocity.y-=(Math.abs(vy2-vy1)*(this.ball[j].y-this.ball[i].y)/50+Math.abs(vx2-vx1)*(this.ball[j].y-this.ball[i].y)/50);
                this.ball[j].body.velocity.x+=(Math.abs(vx2-vx1)*(this.ball[j].x-this.ball[i].x)/50+Math.abs(vy2-vy1)*(this.ball[j].x-this.ball[i].x)/50);
                this.ball[j].body.velocity.y+=(Math.abs(vy2-vy1)*(this.ball[j].y-this.ball[i].y)/50+Math.abs(vx2-vx1)*(this.ball[j].y-this.ball[i].y)/50);

            }else{
                this.ball[i].body.velocity.x-=Math.abs(vx2-vx1);
                this.ball[j].body.velocity.x+=Math.abs(vx2-vx1);

            }
            
        }else{
            if(this.ball[i].y>this.ball[j].y){
                this.ball[i].body.velocity.y+=Math.abs(vy2-vy1);
                this.ball[j].body.velocity.y-=Math.abs(vy2-vy1);

            }else if(this.ball[i].y<this.ball[j].y){
                this.ball[i].body.velocity.y-=Math.abs(vy2-vy1);
                this.ball[j].body.velocity.y+=Math.abs(vy2-vy1);
            }else{
                console.log('bug');
            }
        }
        */
       if(this.ball[i].x>this.ball[j].x){
        if(this.ball[i].y>this.ball[j].y){
            this.ball[i].body.velocity.x+=(Math.abs(vx2-vx1)*(this.ball[i].x-this.ball[j].x)/50+Math.abs(vy2-vy1)*Math.abs(this.ball[i].y-this.ball[j].y)*Math.abs(this.ball[i].x-this.ball[j].x)/2500);
            this.ball[i].body.velocity.y+=(Math.abs(vy2-vy1)*(this.ball[i].y-this.ball[j].y)/50+Math.abs(vx2-vx1)*Math.abs(this.ball[i].y-this.ball[j].y)*Math.abs(this.ball[i].x-this.ball[j].x)/2500);
            this.ball[j].body.velocity.x-=(Math.abs(vx2-vx1)*(this.ball[i].x-this.ball[j].x)/50+Math.abs(vy2-vy1)*Math.abs(this.ball[i].y-this.ball[j].y)*Math.abs(this.ball[i].x-this.ball[j].x)/2500);
            this.ball[j].body.velocity.y-=(Math.abs(vy2-vy1)*(this.ball[i].y-this.ball[j].y)/50+Math.abs(vx2-vx1)*Math.abs(this.ball[i].y-this.ball[j].y)*Math.abs(this.ball[i].x-this.ball[j].x)/2500);
            console.log('1');
        }else if(this.ball[i].y<this.ball[j].y){
            this.ball[i].body.velocity.x+=(Math.abs(vx2-vx1)*(this.ball[i].x-this.ball[j].x)/50+Math.abs(vy2-vy1)*Math.abs(this.ball[i].y-this.ball[j].y)*Math.abs(this.ball[i].x-this.ball[j].x)/2500);
            this.ball[i].body.velocity.y-=(Math.abs(vy2-vy1)*(this.ball[j].y-this.ball[i].y)/50+Math.abs(vx2-vx1)*Math.abs(this.ball[i].y-this.ball[j].y)*Math.abs(this.ball[i].x-this.ball[j].x)/2500);
            this.ball[j].body.velocity.x-=(Math.abs(vx2-vx1)*(this.ball[i].x-this.ball[j].x)/50+Math.abs(vy2-vy1)*Math.abs(this.ball[i].y-this.ball[j].y)*Math.abs(this.ball[i].x-this.ball[j].x)/2500);
            this.ball[j].body.velocity.y+=(Math.abs(vy2-vy1)*(this.ball[j].y-this.ball[i].y)/50+Math.abs(vx2-vx1)*Math.abs(this.ball[i].y-this.ball[j].y)*Math.abs(this.ball[i].x-this.ball[j].x)/2500);
            console.log('2');
        }else {
            this.ball[i].body.velocity.x+=Math.abs(vx2-vx1);
            this.ball[j].body.velocity.x-=Math.abs(vx2-vx1);
            console.log('3');

        }
    }else if(this.ball[i].x<this.ball[j].x){
        if(this.ball[i].y>this.ball[j].y){
            this.ball[i].body.velocity.x-=(Math.abs(vx2-vx1)*(this.ball[j].x-this.ball[i].x)/50+Math.abs(vy2-vy1)*Math.abs(this.ball[i].y-this.ball[j].y)*Math.abs(this.ball[i].x-this.ball[j].x)/2500);
            this.ball[i].body.velocity.y+=(Math.abs(vy2-vy1)*(this.ball[i].y-this.ball[j].y)/50+Math.abs(vx2-vx1)*Math.abs(this.ball[i].y-this.ball[j].y)*Math.abs(this.ball[i].x-this.ball[j].x)/2500);
            this.ball[j].body.velocity.x+=(Math.abs(vx2-vx1)*(this.ball[j].x-this.ball[i].x)/50+Math.abs(vy2-vy1)*Math.abs(this.ball[i].y-this.ball[j].y)*Math.abs(this.ball[i].x-this.ball[j].x)/2500);
            this.ball[j].body.velocity.y-=(Math.abs(vy2-vy1)*(this.ball[i].y-this.ball[j].y)/50+Math.abs(vx2-vx1)*Math.abs(this.ball[i].y-this.ball[j].y)*Math.abs(this.ball[i].x-this.ball[j].x)/2500);
            console.log('4');

        }else if(this.ball[i].y<this.ball[j].y){
            this.ball[i].body.velocity.x-=(Math.abs(vx2-vx1)*(this.ball[j].x-this.ball[i].x)/50+Math.abs(vy2-vy1)*Math.abs(this.ball[i].y-this.ball[j].y)*Math.abs(this.ball[i].x-this.ball[j].x)/2500);
            this.ball[i].body.velocity.y-=(Math.abs(vy2-vy1)*(this.ball[j].y-this.ball[i].y)/50+Math.abs(vx2-vx1)*Math.abs(this.ball[i].y-this.ball[j].y)*Math.abs(this.ball[i].x-this.ball[j].x)/2500);
            this.ball[j].body.velocity.x+=(Math.abs(vx2-vx1)*(this.ball[j].x-this.ball[i].x)/50+Math.abs(vy2-vy1)*Math.abs(this.ball[i].y-this.ball[j].y)*Math.abs(this.ball[i].x-this.ball[j].x)/2500);
            this.ball[j].body.velocity.y+=(Math.abs(vy2-vy1)*(this.ball[j].y-this.ball[i].y)/50+Math.abs(vx2-vx1)*Math.abs(this.ball[i].y-this.ball[j].y)*Math.abs(this.ball[i].x-this.ball[j].x)/2500);
            console.log('5');
        }else{
            this.ball[i].body.velocity.x-=Math.abs(vx2-vx1);
            this.ball[j].body.velocity.x+=Math.abs(vx2-vx1);
            console.log('6');

        }
        
    }else{
        if(this.ball[i].y>this.ball[j].y){
            this.ball[i].body.velocity.y+=Math.abs(vy2-vy1);
            this.ball[j].body.velocity.y-=Math.abs(vy2-vy1);
            console.log('7');

        }else if(this.ball[i].y<this.ball[j].y){
            this.ball[i].body.velocity.y-=Math.abs(vy2-vy1);
            this.ball[j].body.velocity.y+=Math.abs(vy2-vy1);
            console.log('8');
        }else{
            console.log('bug');
        }
    }
       
    }
}
}