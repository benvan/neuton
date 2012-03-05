var Space = function(canvas){
	this.timestep = 1/25;
	this.particles = [];
	this.joints = [];
	this.gravity = new Vector(0,1);
	this.canvas = canvas;
	this.ctx = canvas.getContext('2d');
};

Space.prototype = {
	run: function(){
	
		var steps = 5;
		var dt = 1/steps;
		for (var k = 0; k < 1; k++){
			for (var i = 0; i < this.particles.length; i++){
				this.particles[i].applyForce(this.gravity);
			}
		
			for (var i = 0; i < this.joints.length; i++){
				this.joints[i].relax();
			}
			
			for (var i = 0; i < this.joints.length; i++){
				this.particles[i].accelerate(dt);
				this.particles[i].inertia(dt);
			}
		}
	

	},
	
	draw: function(){
		var ctx = this.ctx;
		for (var i = 0; i < this.particles.length; i++){
			ctx.clearRect(0,0, this.canvas.width, this.canvas.height);
			
			for (var i = 0; i < this.joints.length; i++){
				var j = this.joints[i];
				ctx.beginPath();
				ctx.moveTo(j.a.cur.x, j.a.cur.y);
				ctx.lineTo(j.b.cur.x, j.b.cur.y);
				ctx.stroke();
			}
			
			continue;
			for (var i = 0; i < this.particles.length; i++){
				var p = this.particles[i];

				ctx.beginPath();
				ctx.arc(p.cur.x, p.cur.y, 1, 0, Math.PI*2, false);
				ctx.fill();
			}
			
		}
	}

};


