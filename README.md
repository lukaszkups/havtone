# havtone

Create custom halftone effect to any image via canvas.

# Example usage

```
<script src="https://unpkg.com/havtone@latest"></script>
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

# Showcase

TBA.

Feel free to add your website here

# Credits

Author: [@lukaszkups](https://github.com/lukaszkups)

License: [MIT](https://github.com/lukaszkups/partikle/blob/main/LICENSE)
