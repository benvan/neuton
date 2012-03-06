var Space = function(canvas){
	this.timestep = 1/25;
	this.particles = [];
	this.joints = [];
	this.gravity = new Vector(0,0.2);
	this.canvas = canvas;
	this.ctx = canvas.getContext('2d');
};

Space.prototype = {
	run: function(){
	
		var steps = 2;
		var dt = 1/steps;
		for (var k = 0; k < 1; k++){
			for (var i = 0; i < this.particles.length; i++){
				this.particles[i].applyForce(this.gravity);
			}
		
			for (var i = 0; i < this.joints.length; i++){
				this.joints[i].relax();
			}
			
			for (var i = 0; i < this.particles.length; i++){
				this.particles[i].accelerate(dt);
				this.particles[i].inertia(dt);
			}
		}
	

	},
	
	add: function(item){
		for (var i = 0; i < item.particles.length; i++){
			this.particles.push(item.particles[i]);
		}
		for (var i = 0; i < item.joints.length; i++){
			this.joints.push(item.joints[i]);
		}
	},
	
	fix: function(particle){
		var i = this.particles.indexOf(particle);
		this.particles.remove(i,i);
	},
	
	draw: function(){
		var ctx = this.ctx;
		for (var i = 0; i < this.particles.length; i++){
			ctx.clearRect(0,0, this.canvas.width, this.canvas.height);
			
			for (var i = 0; i < this.joints.length; i++){
				var j = this.joints[i];
				j.draw(ctx);
			}
			

			for (var i = 0; i < this.particles.length; i++){
				var p = this.particles[i];
				p.draw(ctx);
			}
			
		}
	}

};


