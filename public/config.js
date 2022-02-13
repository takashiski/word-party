window.WordParty.start({
  use: {
    popper: true, // クラッカー演出
    dropper: true, // オブジェクト落下演出
    notify: true // 通知演出
  },
  popperConfig: {
    pattern: ['88', '👏'],  // 発火するパターン
    confettiRadius: 10,  // クラッカーで飛ぶ紙吹雪の大きさ
    confettiNumber: 20,  // 1回に飛ぶ紙吹雪の数
    // emojis: ['🌈', '⚡️', '💥', '✨', '💫', '🌸'],
    // emojiSize: 100,  // 絵文字の大きさ(変えたいときだけ書く）
    // confettiColors: [    // 使う色を指定
    //   '#ff0a54', '#ff477e', '#ff7096', '#ff85a1', '#fbb1bd', '#f9bec7',
    // ],
    // images: [ // 絵文字や紙吹雪以外の画像を使いたいとき
    //   './paw.png',
    //   './paw2.png'
    // ]
  },
  dropperConfig: {
    pattern: ['ww', '草'],  // 発火するパターン
    lifeTime: 5000,  // 落ちたオブジェクトが消えるまでの時間
    magnification: 5,  // 発火パターンで検知したワードにかける数(wwでmagnificationが3なら2*3で6個オブジェクトを出す
    maxItems: 30,  // 画面に出す最大オブジェクト数（古いものから時間に関係なく消える）
    textures: [ // 落とすオブジェクトに使う画像（必須）
      {
        src: './paw.png', // 画像パス
        size: 34,  // 当たり判定範囲の直径（円形）
        xScale: 1.5, // 画像のx拡大率
        yScale: 1.5  // 画像のy拡大率
      }
    ]
  },
  notifyConfig: {
    items: [{
      pattern: ['★','☆'],　// 発火する文字列パターン
      image: './piyo.gif',　// 画像パス
      lifeTime: 5000,  // 自動で消えるまでの時間
      // y: 300, // 未指定だとランダム
      // x: 300 // 未指定だとランダム
    },
    {
      pattern: ['❤'],
      image: './heart.gif',
      y: 300,
      x: 620,
      only: true // 連続しても必ず１個しか表示したくないとき
    }
  ],
    maxItems: 20
  }
})