window.WordParty.start({
  popperConfig: {
    use: true,
    maxItems: 10,
    items: [{
      trigger: 0,             // マウスによる発火（-1=なし, 0=左, 1=中, 2=右, 3=副ボタン1, 4=副ボタン2)
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
    },{
      pattern: ['✨'],
      emojis: ['✨'],
      emojiSize: 30,
    }]
  },
  dropperConfig: {
    use: true,
    maxItems: 50,  // 画面に出す最大オブジェクト数（古いものから時間に関係なく消える）
    items: [{
      trigger: 1,
      pattern: ['w'],  // 発火するパターン
      lifeTime: 5000,  // 落ちたオブジェクトが消えるまでの時間
      magnification: 5,  // 発火パターンで検知したワードにかける数(wwでmagnificationが3なら2*3で6個オブジェクトを出す
      textures: [ // 落とすオブジェクトに使う画像（必須）
        {
          src: './paw.png', // 画像パス
          size: 34,  // 当たり判定範囲の直径（円形）
          xScale: 1.5, // 画像のx拡大率
          yScale: 1.5,  // 画像のy拡大率
        }
      ]
    },{
      pattern: ['🎈'],  // 発火するパターン
      lifeTime: 5000,  // 落ちたオブジェクトが消えるまでの時間
      magnification: 3,  // 発火パターンで検知したワードにかける数(wwでmagnificationが3なら2*3で6個オブジェクトを出す
      textures: [ // 落とすオブジェクトに使う画像（必須）
        {
          src: './balloon.png', // 画像パス
          angle: 0, // 角度を固定
          size: 34,  // 当たり判定範囲の直径（円形）
          xScale: 1.5, // 画像のx拡大率
          yScale: 1.5,  // 画像のy拡大率
          density: 0.001, //  密度
          frictionAir: 0.05, // 空気抵抗(空気摩擦)
          restitution: 0.9, // 弾力性
          friction: 0.1, // 本体の摩擦
          gravity: -1.5,  // 重力方向をマイナス方面に変換
        }
      ]
    }]
  },
  notifyConfig: {
    use: true,
    maxItems: 10,
    items: [
      {
        // trigger: 2, // マウスによる発火（-1=なし, 0=左, 1=中, 2=右, 3=副ボタン1, 4=副ボタン2)
        pattern: ['★','☆'],　// 発火する文字列パターン
        image: './piyo.gif',　// 画像パス
        lifeTime: 5000,  // 自動で消えるまでの時間
        // width: 100, // 横幅
        // height: 100, // 縦幅
        // y: 300, // 未指定だとランダム
        // x: 300 // 未指定だとランダム
      },
      {
        trigger: 2,
        pattern: ['❤'],
        images: ['./heart.gif', 'question.gif'],
        width: 120,
        y: 300, // 固定位置
        x: [300, 620], // 300～620の間でランダム
        // only: true // 連続しても必ず１個しか表示したくないとき
      }
    ]
  }
})