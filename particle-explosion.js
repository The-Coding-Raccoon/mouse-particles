const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    particles = [];

}

window.addEventListener('resize', resizeCanvas);

class Particle {
    constructor(mouseX, mouseY) {
        this.x = mouseX;
        this.y = mouseY;
        this.size = Math.random() * 3 + 1;
        this.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
        this.speedX = (Math.random() - 0.5) * 3;
        this.speedY = (Math.random() - 0.5) * 3;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.size -= 0.1;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function createParticles(mouseX, mouseY) {
    const numParticles = Math.random() * 5 + 1;
    // CHANGE THIS VALUE
    for (let i = 0; i < numParticles; i++) {
        particles.push(new Particle(mouseX, mouseY));
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((particle, index) => {
        particle.update();
        particle.draw();
        if (particle.size <= 0.2) {
            // CHANGE THIS VALUE
            particles.splice(index, 1);
        }
    });
    requestAnimationFrame(animate);
}

window.addEventListener('mousemove', (event) => {
    const { clientX, clientY } = event;
    createParticles(clientX, clientY);
});

resizeCanvas();
animate();
