# havtone

Create custom halftone effect to any image via canvas.

# Example usage

Browser (UMD/IIFE):

```javascript
<script src="https://unpkg.com/havtone@latest/dist/index.iife.js"></script>
<canvas id="havtoneCanvas" style="background: #000; width: 900px;"></canvas>
<script>
havtone({
  canvasId: 'havtoneCanvas',
  size: 20,
  minSize: 10,
  spacing: 21,
  image: '/beach-ai.jpg',
  rotation: 0,
  maxFPS: 20,
  shape: 'circle', // 'square' | 'triangle' | 'circle'
  hoverEffect: true,
  hoverSize: 250,
  animate: true,
});
</script>
```

ES modules:

```javascript
import havtone from 'havtone';

havtone({
  canvasId: 'havtoneCanvas',
  size: 20,
  minSize: 10,
  spacing: 21,
  image: '/beach-ai.jpg',
  rotation: 0,
  maxFPS: 20,
  shape: 'circle', // 'square' | 'triangle' | 'circle'
  hoverEffect: true,
  hoverSize: 250,
  animate: true,
});
```

# Local development

First, build the package via `npm run build` command. Then run it locally via `npm run dev`.

# Showcase

TBA.

Feel free to add your website here

# Credits

Author: [@lukaszkups](https://github.com/lukaszkups)

License: [MIT](https://github.com/lukaszkups/partikle/blob/main/LICENSE)
