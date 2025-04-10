function havtone(opts) {
  const {
    canvasId,
    size = 10,
    minSize = 5,
    spacing = 15,
    image,
    rotation = 0,
    maxFPS = 60,
    shape = 'square', // 'square' | 'triangle' | 'circle'
    hoverEffect = false,
    hoverSize = 200,
    animate = true,
    randomizedSize = false,
    sensitivity = 5,
    hoverSizeMultiplier = 2,
    animationStepMultiplier = 0.5
  } = opts;

  let scaleX, scaleY;

  const canvas = document.getElementById(canvasId);
  const ctx = canvas.getContext('2d');

  const halftones = [];
  let imageData;
  let cursorX = -1;
  let cursorY = -1;

  const timestep = 1000 / maxFPS;
  let lastTimestamp = 0;

  class HalfTone {
    constructor(x, y, size, color) {
      this.x = x;
      this.y = y;
      this.size = animate ? randomSize(minSize, size) : size;
      this.defaultSize = this.size;
      this.color = color;
      this.growing = Math.random() < 0.5;
      this.isHovered = false;
    }

    draw() {
      ctx.save();

      if (shape !== 'circle') {
        ctx.translate(this.x, this.y);
        ctx.rotate((rotation * Math.PI) / 180);
      }

      ctx.beginPath();
      if (shape === 'square') {
        ctx.rect(-this.size / 2, -this.size / 2, this.size, this.size);
      } else if (shape === 'triangle') {
        ctx.moveTo(0, -this.size / 2);
        ctx.lineTo(-this.size / 2, this.size / 2);
        ctx.lineTo(this.size / 2, this.size / 2);
        ctx.closePath();
      } else if (shape === 'circle') {
        ctx.arc(this.x, this.y, this.size / 2, 0, Math.PI * 2);
      }

      ctx.fillStyle = `rgb(${this.color.r}, ${this.color.g}, ${this.color.b})`;
      ctx.fill();
      ctx.restore();
    }

    update() {
      if (!animate || this.isHovered) return;

      if (this.growing) {
        this.size = Math.min(this.size + animationStepMultiplier, size);
        if (this.size >= size) {
          this.growing = false;
        }
      } else {
        this.size = Math.max(this.size - animationStepMultiplier, minSize);
        if (this.size <= minSize) {
          this.growing = true;
        }
      }
    }
  }

  function randomSize(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  function createHalftoneEffect() {
    imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const { width, height } = canvas;
    const data = imageData.data;

    for (let y = 0; y < height; y += spacing) {
      for (let x = 0; x < width; x += spacing) {
        const index = (y * width + x) * 4;
        const r = data[index];
        const g = data[index + 1];
        const b = data[index + 2];
        const brightness = (r + g + b) / sensitivity;

        const dynamicSize = randomizedSize ? size : size * (1 - brightness / 255);
        const halftone = new HalfTone(x, y, dynamicSize, { r, g, b });
        halftones.push(halftone);
      }
    }
  }
  
  function hypot(a, b) {
    return Math.sqrt(a*a + b*b);
  }

  function drawHalftone(timestamp) {
    if (timestamp - lastTimestamp < timestep) {
      requestAnimationFrame(drawHalftone);
      return;
    }
    lastTimestamp = timestamp;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    halftones.forEach((halftone) => {
      if (hoverEffect && cursorX >= 0 && cursorY >= 0) {
        const distance = hypot(cursorX - halftone.x, cursorY - halftone.y);
        if (distance < hoverSize) {
          halftone.isHovered = true;
          halftone.size = Math.max(minSize, size * (hoverSizeMultiplier - distance / hoverSize));
        } else if (halftone.isHovered) {
          halftone.isHovered = false;
          halftone.size = halftone.defaultSize;
        }
      }
      halftone.update();
      halftone.draw();
    });

    requestAnimationFrame(drawHalftone);
  }

  canvas.addEventListener('mousemove', (event) => {
    const rect = canvas.getBoundingClientRect();
    // if (!scaleX && !scaleY) {
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    // }
    cursorX = (event.clientX - rect.left) * scaleX;
    cursorY = (event.clientY - rect.top) * scaleY;
  });

  const img = new Image();
  img.src = image;
  img.onload = () => {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    createHalftoneEffect();
    requestAnimationFrame(drawHalftone);
  };
}
