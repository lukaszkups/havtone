function havtone (opts) {
  const { 
    canvasId, 
    size = 10, 
    minSize = 5,
    spacing = 15, 
    image, 
    rotation = 0, 
    maxFPS = 60,
    shape = 'square', // 'shape' | 'triangle' | 'circle'
    hoverEffect = false,
    hoverSize = 200,
    animate = true,
  } = opts;
  const defaultSize = size;

  // timestamps are ms passed since document creation.
  // lastTimestamp can be initialized to 0, if main loop is executed immediately
  let lastTimestamp = 0;
  const timestep = 1000 / maxFPS; // ms for each frame

  // Get references to the canvas and context
  const canvas = document.getElementById(canvasId);
  const ctx = canvas.getContext('2d');

  let cursorX = -1;
  let cursorY = -1;

  // Load an image and draw it on the canvas
  const img = new Image();
  img.src = image; // Replace with your image path

  img.onload = () => {
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    createHalftoneEffect();
    requestAnimationFrame((timestamp) => drawHalftone(timestamp, cursorX, cursorY));
  };

  // Store the pixel data of the image
  let imageData;
  function createHalftoneEffect() {
    imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  function drawHalftone(timestamp) {
    requestAnimationFrame((timestamp) => drawHalftone(timestamp, cursorX, cursorY)); // Continue the animation

    // skip if timestep ms hasn't passed since last frame
    if (timestamp - lastTimestamp < timestep || !imageData?.data) return;

    lastTimestamp = timestamp;

    const { width, height } = canvas;
    const data = imageData.data;

    ctx.clearRect(0, 0, width, height);

    class HalfTone {
      constructor(x, y, size, color) {
        this.x = x;
        this.y = y;
        this.size = animate ? Math.floor(Math.random() * (maxSize - minSize + 1) + minSize) : size;
        this.growing = Boolean(Math.random() < 0.5);
        this.color = color || { r: 0, g: 0, b: 0 };
      }

      draw() {
        // Save the context state
        ctx.save();

        // Translate to the shape's center and apply rotation

        if (shape !== 'circle') {
          ctx.translate(x, y);
          ctx.rotate(rotation);
        }

        // Draw the shape
        ctx.beginPath();

        if (shape === 'square') {
          ctx.rect(-size / 2, -size / 2, size, size); // Centered square
        } else if (shape === 'triangle') {
          ctx.moveTo(0, -size / 2); // Top point
          ctx.lineTo(-size / 2, size / 2); // Bottom-left point
          ctx.lineTo(size / 2, size / 2); // Bottom-right point
        } else if (shape === 'circle') {
           ctx.arc(x, y, size/2, 0, Math.PI * 2);
        }
        
        // Restore the context state
        if (shape !== 'circle') {
          ctx.closePath();
          ctx.restore();
        }

        ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
        ctx.fill();
      }

      update() {
        if (this.animate) {

        }
      }
    }

    for (let y = 0; y < height; y += spacing) {
      for (let x = 0; x < width; x += spacing) {
        const index = (y * width + x) * 4;
        const r = data[index];
        const g = data[index + 1];
        const b = data[index + 2];
        const brightness = (r + g + b) / 3;

        const maxSize = spacing; // Max size of the shape
        const minSize = 5 // Min size of the shape

        let size = maxSize * (1 - brightness / 255);

        if (
          hoverEffect &&
          cursorX >= 0 &&
          cursorY >= 0 &&
          Math.hypot(cursorX - x, cursorY - y) < hoverSize
        ) {
          size = defaultSize;
        }

        size = Math.max(minSize, Math.min(maxSize, size));


      }
    }
  }



  // Listen for mousemove events to update the halftone effect dynamically
  canvas.addEventListener('mousemove', (event) => {
    const rect = canvas.getBoundingClientRect();
    cursorX = event.clientX - rect.left;
    cursorY = event.clientY - rect.top;
  });
}

havtone({
  image: '/avatar-locs-white.png',
  canvasId: 'canvass',
  rotation: 15,
  shape: 'circle',
  hoverEffect: true,
})