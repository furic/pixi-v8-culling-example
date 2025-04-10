import {
  Application,
  Assets,
  Container,
  Rectangle,
  Graphics,
  Sprite,
  Culler,
} from "pixi.js";

(async () => {
  // Create a new application
  const app = new Application();

  // Initialize the application
  await app.init({
    antialias: true,
    backgroundColor: "white",
    resizeTo: window,
    // NEEDS TO BE TRUE FOR WEBGL!
    useBackBuffer: true,
  });

  // Append the application canvas to the document body
  document.body.appendChild(app.canvas);

  // Create a container with many off-screen graphics
  const container = new Container();
  container.cullable = true;
  container.cullArea = new Rectangle(
    0,
    0,
    window.innerWidth,
    window.innerHeight
  );

  // // Load the bunny texture
  const texture = await Assets.load(
    "https://pixijs.io/examples/examples/assets/bunny.png"
  );

  // Add many graphics (some on-screen, some off-screen)
  for (let i = 0; i < 1000; i++) {
    const g = new Graphics().rect(-10, -10, 20, 20).fill(0xff0000);
    g.x = app.renderer.width / 2 + Math.random() * 1000 - 500;
    g.y = app.renderer.height / 2 + Math.random() * 1000 - 500;
    container.addChild(g);
    app.ticker.add(function (ticker) {
      g.rotation += 0.1 * ticker.deltaTime;
    });

    const bunny = new Sprite(texture);
    bunny.anchor.set(0.5);
    bunny.x = app.renderer.width / 2 + Math.random() * 1000 - 500;
    bunny.y = app.renderer.height / 2 + Math.random() * 1000 - 500;
    container.addChild(bunny);
    app.ticker.add(function (ticker) {
      bunny.rotation += 0.1 * ticker.deltaTime;
    });
  }

  app.stage.addChild(container);

  // 🔍 Call culler to apply culling before render
  app.ticker.add(() => {
    Culler.shared.cull(container, app.screen);
  });
})();
