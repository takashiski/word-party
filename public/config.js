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
    "pattern": ["88+\nパチパチ\n👏\nナイス\nないす\nnf\ngg"],
    "effect": "popper",
    "trigger": 0,
    "options": {
        "type": "default",
        "amount": 20,
        "size": 50,
        "images": [],
        "emojis": [],
        "colors": []
    }
}, {
    "pattern": ["w+$\n草\nワロタ\n笑\nワラ"],
    "effect": "dropper",
    "trigger": 1,
    "options": {
        "lifeTime": 5000,
        "magnification": 3,
        "texture": {
            "src": "",
            "size": 32,
            "gravity": 0,
            "density": 0.001,
            "frictionAir": 0.01,
            "restitution": 0.9,
            "friction": 0.1,
            "content": "🤣"
        }
    }
}, {
    "pattern": ["❤\n♡\n♥"],
    "effect": "notifier",
    "trigger": 2,
    "options": {
        "lifeTime": 5000,
        "images": ["resources/000.gif"],
        "x": [0, 1920],
        "y": [0, 1080],
        "only": false
    }
}]).start()