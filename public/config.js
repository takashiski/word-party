window.WordParty.start({
  popperConfig: {
    use: true,
    maxItems: 10,
    items: [
      { trigger: 0, type: 'default', pattern: ['88'], size: 10, amount: 20 },
    ],
  },
  dropperConfig: {
    use: true,
    maxItems: 50,
    items: [
      {
        trigger: 1,
        pattern: ['w'],
        lifeTime: 5000,
        magnification: 5,
        textures: [
          {
            src: './paw.png',
            size: 34,
            xScale: 1.5,
            yScale: 1.5,
            angle: 0,
            density: 0.001,
            frictionAir: 0.05,
            restitution: 0.9,
            friction: 0.1,
            gravity: 1,
          },
        ],
      },
    ],
  },
  notifyConfig: {
    use: true,
    maxItems: 10,
    items: [
      {
        trigger: 2,
        pattern: ['❤'],
        images: ['./heart.gif', 'question.gif'],
        lifeTime: 5000,
        x: [0, 1920],
        y: [0, 1080],
        only: false,
      },
    ],
  },
});
