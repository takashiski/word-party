window.WordParty.init({
    "apiPort": 11180,
    "modules": {
        "popper": {
            "maxItems": 20
        },
        "dropper": {
            "maxItems": 50
        },
        "notifier": {
            "maxItems": 20
        }
    }
}).setup([{
    "pattern": ["8888"],
    "effect": "popper",
    "trigger": 0,
    "options": {
        "type": "default",
        "amount": 100,
        "size": 16,
        "images": [],
        "emojis": [],
        "colors": []
    }
}, {
    "pattern": ["w+$"],
    "effect": "dropper",
    "trigger": 1,
    "options": {
        "lifeTime": 5000,
        "magnification": 3,
        "texture": {
            "src": "resources/000.png",
            "size": 32,
            "gravity": 0
        }
    }
}, {
    "pattern": ["test"],
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