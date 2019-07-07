'use strict';
class init{
	constructor(gen){
		this.game = new Game(10,gen);
		this.maxLimit = 150
		window.game = this
		setInterval(function(){
			for(var i=0;i <window.game.game.scene.length; i++){
				if(window.game.game.scene[i].limit<50)
					{window.game.game.scene[i].limit = window.game.game.scene[i].limit+Math.ceil(window.innerWidth*5/1000)}
			}
					}, 15000)
		
		this.ani=requestAnimationFrame(this.start);
		
	}
	
	start(){
		window.game.update();
		//console.log(window.game.game.scene.player.outstream)
		window.game.draw();
		window.game.ani = requestAnimationFrame(window.game.start);
		
	}
	
	update(){
		window.game.game.update()
	}
	
	draw(){
		window.game.game.draw()
	}
	
	stop(){
		this.start(); 
	}
}

class Game{
	constructor(pop,gen){
		this.canvas = document.createElement('canvas')
		this.canvas.width = window.innerWidth;
		this.canvas.height = window.innerHeight;
		this.canvas.setAttribute('style','top:0px; left:0px; position:fixed; z-index:0; background-image:url("img/bg.jpg")');
		this.scene = []
		this.context = this.canvas.getContext("2d")
		for(var i=0;i<pop;i++){
			this.scene.push(new Scene(window.innerWidth, window.innerHeight, this.context));
			document.getElementById('form').style.zIndex=10;
		}
		this.maxgen = parseInt(gen)
		this.ga = new GeneticAlgo(10)
		this.generation = 0;
		document.body.appendChild(this.canvas);
		
	}
	update(){
		if(this.generation<this.maxgen){
		for(var i=0;i<this.scene.length;i++){
			this.scene[i].update()
		}
		if(this.ga.allPlayersDead(this.scene)){
			this.generation++;
			if(this.generation<this.maxgen){
			this.ga.evolvePopulation(this.scene)
			for(var i=0;i<this.scene.length;i++){
				this.scene[i].softReset()
			}
			}
		}
		}else if(this.generation<=this.maxgen+1){
			this.bestPlayer = this.scene[0]
			for(var i=1;i<this.scene.length;i++){
				if(this.scene[i].player.score > this.bestPlayer.player.score){
					this.bestPlayer = this.scene[i]
				}
			}
			if(!this.bestPlayer.player.isAlive){
				this.generation++;
				this.bestScore = this.bestPlayer.player.score
				console.log('Score: '+this.bestPlayer.player.score)
				this.bestPlayer.softReset()
			}
			this.scene = []
			this.scene.push(this.bestPlayer)
			this.scene[0].update()
			
		}
	}
	
	highScoreDraw(){
				var bestPlayer = this.scene[0]
				this.context.font = "30px Arial";
				this.context.fillStyle = "white";
				this.context.fillText("Best Player Score: "+(this.bestScore) ,(window.innerWidth/2)-(23*5),(window.innerHeight/2)-15);
				this.saveModel = new Button((window.innerWidth/2)-(23*5),(window.innerHeight/2), (23*15), 40, "Save Model","FFFFFF",this.context,null)
				var _self = this
				this.canvas.addEventListener('click', this.clickEvent, false);
				this.canvas._self = this
				this.saveModel.draw()
				
			}
	
	clickEvent(evt) {
					evt.preventDefault()
					evt.stopPropagation();
					var mousePos = evt.target._self.getMousePos(evt.target, evt);
					if (evt.target._self.isInside(mousePos,evt.target._self.saveModel.rect)) {
						evt.target._self.scene[0].player.brain.model.save('localstorage://my-model-1');
						evt.target._self.scene[0].player.brain.model.save('downloads://my-model-1');
						
					}   
				}
			
			
	isInside(pos, rect){
		return pos.x > rect.position.x && pos.x < rect.position.x+rect.width && pos.y < rect.position.y+rect.height && pos.y > rect.position.y
	}
	
	getMousePos(canvas, event) {
		var rect = canvas.getBoundingClientRect();
		return {
			x: event.clientX - rect.left,
			y: event.clientY - rect.top
		};
	}
	
	draw(){
		this.canvasReset()
		if(this.generation>this.maxgen+1){
			
			this.highScoreDraw()
		}else{
			
			for(var i=0;i<this.scene.length;i++){
				
				this.scene[i].draw()
			}
			this.refreshGeneration()
		}
	}
	
	canvasReset(){
		this.context.save()
			this.context.setTransform(1, 0, 0, 1, 0, 0);
			this.context.clearRect(0, 0, window.innerWidth, window.innerHeight);
			this.context.restore()

			this.context.clearRect(0, 0, this.width, this.height);
	}
	
	refreshGeneration(){
		
		this.context.font = "20px Arial";
		this.context.fillStyle = "white";
		this.context.fillText("Generation: "+(this.generation+1) ,200,20);
	}
	
	
	
}

class Scene{
	constructor(w, h, ctx){
		this.width = w
		this.height = h
		this.context = ctx;
		this.rockTimer=0;
		this.bulletTime= 0;
		this.gravity = 0;
		this.rocks = []
		this.width = w;
		this.height = h;
		this.populateRocks(Math.ceil(this.width*5/1000));
		this.addPlayer();
		this.bullets = [];
		this.refreshScore()
		this.refreshHealth()
		this.randomColor = Math.floor(Math.random()*16777215).toString(16);
		this.limit = Math.ceil(this.width*15/1000);
		
		//window.onkeydown = this.keyPressController;
		//window.onkeyup = this.keyUpController;
		
	}
	
	softReset(){
		this.player.resetPlayer((this.width/2) -25, this.height - 100)
		this.bullets = []
		this.rocks = []
		this.populateRocks(Math.ceil(this.width*5/1000));
		this.refreshScore()
		this.refreshHealth()
		this.limit = Math.ceil(this.width*15/1000);
	}
	
	refreshScore(){
		this.context.font = "20px Arial";
		this.context.fillStyle = "white";
		this.context.fillText("Score: "+this.player.score ,20,20);
	}
	
	refreshHealth(){
		this.context.font = "20px Arial";
		this.context.fillStyle = "white";
		this.context.fillText("Health: "+this.player.life ,20,60);
	}
	
	addPlayer(){
		this.player = new Player( (this.width/2) -25, this.height - 100, this.context);
		this.player.setLimit(0, 0, this.width, this.height)
	}
	
	populateRocks(n){
		for(var i=0;i<n;i++){
			var radius = Math.floor(Math.random() * 50)+30;
			var rotate = (Math.random()>0.5?-1:1)*Math.floor(Math.random() * 30);
			this.rocks.push(new Circle(Math.floor(Math.random() * this.width),Math.floor(Math.random() * -300)-200,radius,rotate,this.randomColor,this.context));
		}
	}
	
	respawnRock(){

	}
	
	update(){
		if(this.player.isAlive){
			this.collisions()
			this.player.think()
			this.rockTimer++;
			this.bulletTime++;
			if(this.rockTimer > 100 && this.rocks.length<this.limit){
					this.populateRocks(Math.ceil(this.width*5/1000))
					this.rockTimer = 0;
				}
			var self = this
			
			if(this.bulletTime > 15 && this.bullets.length<10 && this.player.isAlive){
					this.bullets.push(new Bullet(this.player.position.x+(96/2)-5, this.player.position.y+23, this.player.rot, this.context)); 
					this.bulletTime = 0
				}
			for(var i=0;i<this.rocks.length;i++){
				this.rocks[i].move('d',this.gravity);
			}
			
			for(var i=0;i<this.bullets.length;i++){
				this.bullets[i].move();
			}
		}
		
	}
	
	
	draw(){
		if(this.player.isAlive){
			this.refreshHealth()
			this.refreshScore()
			var len = this.rocks.length;
			var i=0;
			while(i<len){
				this.rocks[i].draw(this.context);
				if(this.rocks[i].position.y > this.height+200){
					this.rocks.splice(i,1);
					len--;
					i--;
				}
				i++
			}
			var len = this.bullets.length;
			var i=0;
			while(i<len){
				this.bullets[i].draw(this.context);
				if(this.bullets[i].position.y < -200){
					//this.bullets[i].destroy(this)
					this.bullets.splice(i,1);
					len--;
					i--;
				}
				i++
			}
			this.player.draw(this.context)
		}
	}
	
	collisions(){
		if(this.player.isAlive){
			var i=0;
			var j=0;
			var len1 = this.rocks.length;
			var len2 = this.bullets.length;
			
			while(i<len1){
				var j=0
				if(this.player.circleCollision(this.rocks[i])){
					var exp = new Explosion(this.rocks[i].position.x, this.rocks[i].position.y, this.rocks[i].radius)
					setTimeout(function(){exp.destroy(exp)},700)
					this.player.life--
					this.rocks[i].reduceRadius(10)
					if(this.player.life < 0){
						this.player.destroy(this)
					}
				}
				while(j<len2){
					if(this.bullets[j].circleCollision(this.rocks[i])){
						this.player.score++
						//this.bullets[j].destroy(this)
						this.bullets.splice(j,1);
						this.rocks[i].reduceRadius(5);
						len2--
						j--
						break
					}
					j++
				}
				if(this.rocks[i].radius<10){
					
					this.rocks[i].destroy(this)
					this.rocks.splice(i,1)
					len1--
					i--
				}
				i++
			}
			this.player.resetOutputStream()
			for(i=0;i<this.rocks.length;i++){
				this.rocks[i].playersaw = false
				if(this.player.sensorCollision('west',this.rocks[i])){
					if(this.player.distanceCircle(this.rocks[i])<this.player.outstream[0]){
						this.player.outstream[0] = this.player.distanceCircle(this.rocks[i])
						this.player.outstream[1] = this.rocks[i].radius
						this.rocks[i].playersaw = true
					}
					
				}
				if(this.player.sensorCollision('north-west',this.rocks[i])){
					if(this.player.distanceCircle(this.rocks[i])<this.player.outstream[2]){
						this.player.outstream[2] = this.player.distanceCircle(this.rocks[i])
						this.player.outstream[3] = this.rocks[i].radius
						this.rocks[i].playersaw = true
					}
					
				}
				if(this.player.sensorCollision('north',this.rocks[i])){
					if(this.player.distanceCircle(this.rocks[i])<this.player.outstream[4]){
						this.player.outstream[4] = this.player.distanceCircle(this.rocks[i])
						this.player.outstream[5] = this.rocks[i].radius
						this.rocks[i].playersaw = true
					}
					
				}
				if(this.player.sensorCollision('north-east',this.rocks[i])){
					if(this.player.distanceCircle(this.rocks[i])<this.player.outstream[6]){
						this.player.outstream[6] = this.player.distanceCircle(this.rocks[i])
						this.player.outstream[7] = this.rocks[i].radius
						this.rocks[i].playersaw = true
					}
					
				}
				if(this.player.sensorCollision('east',this.rocks[i])){
					if(this.player.distanceCircle(this.rocks[i])<this.player.outstream[8]){
						this.player.outstream[8] = this.player.distanceCircle(this.rocks[i])
						this.player.outstream[9] = this.rocks[i].radius
						this.rocks[i].playersaw = true
					}
					
				}
			}
			//console.log(this.player.outstream)
		}
	}
	
	keyPressController(event){
		//console.log(event.keyCode)
		switch(event.keyCode){
			case 37:window.game.game.scene.player.move('l',100);break;
			case 39:window.game.game.scene.player.move('r',100);break;
			
		}
			
	}
	
	keyUpController(event){
		//console.log(event.keyCode)
		window.game.game.scene.player.resetVelocity();
	}
	
}

class Bullet{
	constructor(x,y,rot,ctx){
		this.position = new Vector(x,y)
		this.position.velocity = 1000;
		this.update()
		this.width = 10
		this.height = 50
		this.rot = rot;
		var self = this;
		this.bulletsprite = new Image();
		this.bulletsprite.src = "img/bullet.png";
		this.bulletsprite.onload = function(event){
			ctx.drawImage(self.bulletsprite,self.position.x,self.position.y, self.width,  self.height);   
		}
	}
	
	move(){
		this.position.y = this.position.y -((this.position.velocity/60)*Math.cos(Math.PI*this.rot/180));
		this.position.x = this.position.x +((this.position.velocity/60)*Math.sin(Math.PI*this.rot/180));
		this.update()
	}
	
	update(){
		
	}
	
	draw(ctx){
		ctx.save()
		ctx.translate((this.width/2)+this.position.x,(this.height/2)+this.position.y)
		ctx.rotate(Math.PI/180 * this.rot)
		ctx.translate(-((this.width/2)+this.position.x),-((this.height/2)+this.position.y))
		ctx.drawImage(this.bulletsprite,this.position.x,this.position.y, this.width,  this.height);
		ctx.restore()
	}
	
	destroy(canvas){
		canvas.bg.removeChild(this.dom);
	}
	
	circleCollision(circle){
		/* var aRect = this.dom.getBoundingClientRect();
		var bRect = circle.dom.getBoundingClientRect();
		console.log(aRect);

    return !(
        ((aRect.top + aRect.height) < (bRect.top)) ||
        (aRect.top > (bRect.top + bRect.height)) ||
        ((aRect.left + aRect.width) < bRect.left) ||
        (aRect.left > (bRect.left + bRect.width))
    ); */
		//console.log(this.position.x);
		return this.position.circleCollision(this.width, this.height, circle,0);
		
	}
}

class Player{
	constructor(x,y, ctx){
		this.context = ctx
		this.iniPos = new Vector(x,y)
		this.resetPlayer(x,y)
		this.position.velocity = 200;
		this.width = 64
		this.height = 64
		var self = this;
		this.playersprite = new Image();
		this.playersprite.src = "img/sprite.png";
		this.playersprite.onload = function(event){
			ctx.drawImage(self.playersprite,self.position.x,self.position.y, 96,  96);   
		}
		this.brain = new Brain(22)
	}
	
	think(){
		
		var prediction = this.brain.predict(tf.tensor2d([[...this.outstream,this.iniPos.distance(this.position),this.rot]]))
		prediction.data().then(output => {
			//console.log(output)
       if(output[0] > output[1] && output[0]>output[2]){
			this.move('l')
		}else if(output[1] > output[0] && output[1]>output[2]){
			this.move('r')
		}
   });

		
	}
	
	resetPlayer(x,y){
		this.position = new Vector(x,y)
		this.life = 10
		this.isAlive = true;
		this.score = 0;
		this.rot = 0;
		this.sensor = {'west':new Line(this.position.x+(96/2), this.position.y, this.position.x-this.iniPos.x, this.position.y-200,this.context),
						'north-west':new Line(this.position.x+(96/2), this.position.y, (this.position.x+(96/2))-200, 0,this.context),
						'north':new Line(this.position.x+(96/2), this.position.y, (this.position.x+(96/2)), 0,this.context),
						'north-east':new Line(this.position.x+(96/2), this.position.y, (this.position.x+(96/2))+200, 0,this.context),
						'east':new Line(this.position.x+(96/2), this.position.y, this.iniPos.x+this.position.x+(96/2), this.position.y-200,this.context),
						}
	}
	
	setLimit(x, y, width, height){
		this.minWidth = x;
		this.maxWidth = x+width
		this.minHeight = y;
		this.maxHeight = y+height;
	}
	
	move(dir,acc){
		switch(dir){
			case 'r': this.position.moveRight(0);
						this.update(7);break;
			case 'l': this.position.moveLeft(0);
						this.update(-7);break;
			default: this.update(0)
		}
		
		if(this.position.x <= this.minWidth-this.width/2){
				this.resetVelocity();
				this.position.x = this.minWidth-this.width/2 + 1
			}
		
			if(this.position.x >= this.maxWidth - this.width){
				this.resetVelocity();
				this.position.x = this.maxWidth - this.width - 1;
			}
	}
	
	distanceCircle(circle){
		return this.position.distance(new Vector(circle.position.x+circle.radius, circle.position.y+circle.radius))
	}
	
	sensorCollision(key,rock){
		if(this.sensor[key].collision(rock.position.x+rock.radius, rock.position.y+rock.radius, rock.radius, rock.radius) && this.position.y>rock.position.y)
			return true
		else
			return false
	}
	
	resetOutputStream(){
		this.outstream = [this.sensor['west'].length(),0,this.sensor['north-west'].length(),0,this.sensor['north'].length(),0,this.sensor['north-east'].length(),0,this.sensor['east'].length(),0]
	}
	
	
	
	
	update(rot){
		this.rot = rot
		this.sensor['west'].update(this.position.x+(96/2), this.position.y, this.position.x-this.iniPos.x, this.position.y-200,this.rot)
		this.sensor['north-west'].update(this.position.x+(96/2), this.position.y, (this.position.x+(96/2))-200, 0,this.rot)
		this.sensor['north'].update(this.position.x+(96/2), this.position.y, (this.position.x+(96/2)), 0,this.rot)
		this.sensor['north-east'].update(this.position.x+(96/2), this.position.y, (this.position.x+(96/2))+200, 0,this.rot)
		this.sensor['east'].update(this.position.x+(96/2), this.position.y, this.iniPos.x+this.position.x+(96/2), this.position.y-200,this.rot)
	}
	
	draw(ctx){
		ctx.save()
		ctx.translate((this.width/2)+this.position.x,(this.height/2)+this.position.y)
		ctx.rotate(Math.PI/180 * this.rot)
		ctx.translate(-((this.width/2)+this.position.x),-((this.height/2)+this.position.y))
		ctx.drawImage(this.playersprite,this.position.x,this.position.y, 96,  96);
		ctx.restore()
		//ctx.globalAlpha = 0.4;
		//for (var key in this.sensor) {
		//	this.sensor[key].draw();
		//}
		//ctx.globalAlpha = 1;
		
		
	}
	
	destroy(canvas){
		this.isAlive = false
		var exp = new Explosion(this.position.x, this.position.y, this.radius+100)
		setTimeout(function(){exp.destroy(exp)},700)
		//canvas.bg.removeChild(this.dom);
		
	}
	
	resetVelocity(){
		this.rot = 0;
		this.update(0)
		this.position.velocity=200
	}
	
	circleCollision(circle){
		//console.log('col');
		return this.position.circleCollision(this.width, this.height, circle, 16);
		
	}
	

}

class Explosion{
	constructor(x,y,r){
		this.dom = document.createElement('div');
		this.position = new Vector(x,y)
		this.dom.setAttribute('class','Explosion');
		this.dom.setAttribute('style','position:fixed;background-image:url("img/explosion.gif");width:'+r+'px;height:'+r+'px;background-size:'+r+'px '+r+'px; z-index:10; top:'+y+'px; left:'+x+'px;');
		this.dom.style.top = y
		this.dom.style.left = x
		this.draw()
	}
	
	draw(){
		
		document.body.appendChild(this.dom)
	}
	
	destroy(obj){
		try{
		document.body.removeChild(obj.dom)
		}catch(err){
			var classes = document.getElementsByClassName('Explosion');
			for(var i=0;i<classes.length;i++){
				classes[i].parentElement.removeChild(classes[i]);
			}
		}
	}
}

class Circle{
	constructor(x,y,r,rot,color,ctx){
		this.radius = r/2;
		this.position = new Vector(x,y);
		this.currentRot = 0;
		this.curRadius = r/2;
		this.rotate = rot/60;
		this.color = color
		var self = this;
		this.rockSprite = new Image();
		this.rockSprite.src = 'img/round-rock-'+Math.floor(Math.random() * 3)+'.png';
		setTimeout(function(event){
			ctx.drawImage(self.rockSprite,self.position.x,self.position.y, r,  r);   
		},200);
		this.playersaw = false;
	}
	
	move(dir,acc){
		switch(dir){
			case 'd': this.position.moveDown(acc);
						this.update()
		}
	}
	
	
	update(){
		var dr = (this.radius-this.curRadius);
		this.position.y = this.position.y+dr;
		this.position.x = this.position.x+dr;
		this.radius = this.curRadius
		this.width = this.radius*2;
		this.height = this.radius*2;
	}
	
	draw(ctx){
		ctx.save()
		ctx.translate(this.curRadius+this.position.x, this.curRadius+this.position.y);
		ctx.rotate(Math.PI/180 * (this.currentRot+=this.rotate));
		ctx.translate(-(this.curRadius+this.position.x), -(this.curRadius+this.position.y))
		ctx.drawImage(this.rockSprite,this.position.x,this.position.y,this.width,  this.height);
		ctx.strokeStyle = '#'+this.color;
		if(this.playersaw)
			ctx.strokeRect(this.position.x,this.position.y,this.width,  this.height);
		ctx.restore()
	}
	
	 destroy(canvas){
		var exp = new Explosion(this.position.x-this.width/2, this.position.y, this.radius+50)
		setTimeout(function(){exp.destroy(exp)},700)
		//canvas.bg.removeChild(this.dom);
	} 
	
	reduceRadius(n){
		this.curRadius = this.curRadius - n;
	}
}

class Vector{
	constructor(x,y){
		this.x = x;
		this.y = y;
		this.velocity = Math.floor(Math.random() * 30)+60;
	}
	
	
	moveDown(acc){
		this.velocity = this.velocity+(acc/60);
		this.y = this.y +this.velocity/60;
	}
	
	moveRight(acc){
		this.velocity = this.velocity+(acc/60);
		this.x = this.x +this.velocity/60;
	}
	
	moveLeft(acc){
		this.velocity = this.velocity+(acc/60);
		this.x = this.x -this.velocity/60;
	}
	
	moveUp(acc){
		this.velocity = this.velocity+(acc/60);
		this.y = this.y -this.velocity/60;
	}
	
	circleCollision(width,height,circle,delta){
		var distX = Math.abs((circle.position.x+circle.radius) - (this.x+(width/2)+delta));
		var distY = Math.abs((circle.position.y+circle.radius) - (this.y+(height/2)+delta));
		//console.log(distX+' '+((this.width/2) + circle.radius))
		//console.log(distY+' '+((this.width/2) + circle.radius))
		if (distX > ((width/2) + circle.radius)) { return false; }
		if (distY > ((height/2) + circle.radius)) {  return false; }
		//console.log(this);
		//console.log(circle);
		//alert("COllide")
		if (distX <= (width/2)) { return true; } 
		if (distY <= (height/2)) { return true; }
		var dx=distX-width/2;
		var dy=distY-height/2;
		return (dx*dx+dy*dy<=(circle.radius*circle.radius));
	}
	
	distance(vec){
		return Math.sqrt(((this.x-vec.x)*(this.x-vec.x)) + ((this.y-vec.y)*(this.y-vec.y)))
	}
}

class Button{
	constructor(x,y,w,h,textContent,color,ctx,handler){
		this.rect = new Rectangle(x,y,w,h,color,ctx)
		this.context = ctx
		this.textContent = textContent
		
	}
	update(){
	}
	
	draw(){
		this.rect.draw()
		this.context.font = (this.rect.height-20)+'pt Kremlin Pro Web';
		this.context.fillStyle = '#000000';
		this.context.fillText(this.textContent, (this.rect.position.x)+(this.rect.width/2)-50, (this.rect.position.y+25));
	}
	
}

class Rectangle{
	constructor(x,y,w,h,color,ctx){
		this.position = new Vector(x,y)
		this.width = w;
		this.height = h;
		this.color = color;
		this.context = ctx;
	}
	
	update(){
	}
	
	draw(){
		this.context.rect(this.position.x, this.position.y, this.width, this.height); 
		this.context.fillStyle = '#'+this.color;
		this.context.fillRect(this.position.x, this.position.y, this.width, this.height);
		this.context.fill(); 
		this.context.lineWidth = 2;
		this.context.strokeStyle = '#'+this.color; 
		this.context.stroke();
		this.context.closePath();
	}
}

class Line{
	constructor(x1,y1,x2,y2,ctx){
		this.context = ctx
		this.position1 = new Vector(x1,y1)
		this.position2 = new Vector(x2,y2)
		this.len = this.length()
		this.rot = this.calcRot()
		this.compileEquation()
	}
	
	update(x1,y1,x2,y2,rot){
		this.position1.x = x1
		this.position1.y = y1
		this.position2.x = x2
		this.position2.y = y2
		this.len = this.length()
		this.rot = this.calcRot()-(Math.PI*rot/180)
		this.compileEquation()
	}
	
	draw(){
		var x2 = this.position1.x-(this.len*Math.cos(this.rot-Math.PI))
		var y2 = this.position1.y-(this.len*Math.sin(this.rot))
		this.context.beginPath();
		this.context.strokeStyle = "#FF0000"
		this.context.moveTo(this.position1.x, this.position1.y);
		this.context.lineTo(x2,y2);
		this.context.stroke()
		//console.log()
	}
	compileEquation(){
		var x2 = this.position1.x-(this.len*Math.cos(this.rot-Math.PI))
		var y2 = this.position1.y-(this.len*Math.sin(this.rot))
		this.a = -(y2 - this.position1.y)
		this.b = (x2 - this.position1.x)
		this.c = ((y2 - this.position1.y)*this.position1.x) - ((x2 - this.position1.x)*this.position1.y)
		
	}
	
	calcRot(){
		if(this.position2.x>=this.position1.x)
			return -(Math.atan((this.position2.y - this.position1.y)/(this.position2.x - this.position1.x)))
		else
			return (Math.PI)-(Math.atan((this.position2.y - this.position1.y)/(this.position2.x - this.position1.x)))
	}
	
	collision(x,y,w,h){
        var dist = (Math.abs(this.a * x + this.b * y + this.c)) /  
                        Math.sqrt(this.a * this.a + this.b * this.b);
        if (w >= dist || h >= dist) 
            return true;
        else
            return false; 
	}
	
	setRot(rot){
		this.rot = rot
	}
	
	length(){
		return this.position1.distance(this.position2)
	}
	
	
}

