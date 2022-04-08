window.WordParty.init({
    "apiPort": 11180,
    "modules": {
        "popper": {
            "maxItems": 20
        },
        "dropper": {
            "maxItems": 20
        },
        "notifier": {
            "maxItems": 20
        }
    }
}).setup([{
    "pattern": ["88+","パチパチ","👏","ナイス","nf","ないす","ノ","丿"],
    "effect": "popper",
    "trigger": 0,
    "options": {
        "type": "default",
        "amount": 20,
        "size": 16
    }
}, {
    "pattern": ["w+$","草","ワロタ", "笑", "ワラ","すごい"],
    "effect": "dropper",
    "trigger": 1,
    "options": {
        "lifeTime": 5000,
        "magnification": 3,
        "texture": {
            "content": "🍖",
            "size": 32,
            "gravity": 0,
            "density": 0.001,
            "frictionAir": 0.01,
            "restitution": 0.9,
            "friction": 0.1
        }
    }
}, {
    "pattern": ["❤","♡","♥"],
    "effect": "notifier",
    "trigger": 2,
    "options": {
        "lifeTime": 5000,
        "images": ["resources/001.gif"],
        "x": [0, 1920],
        "y": [0, 1080],
        "only": false
    }
}]).start()