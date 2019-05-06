/// <reference path="common/js/phaser-3.16.2/phaser.d.ts"/>
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Config = /** @class */ (function () {
    function Config() {
    }
    Config.CANVAS_WIDTH = 1280;
    Config.CANVAS_HEIGHT = 960;
    Config.TIME_OUT = 300 * 1000;
    return Config;
}());
var MainScene = /** @class */ (function (_super) {
    __extends(MainScene, _super);
    function MainScene() {
        var _this = _super.call(this, { key: 'MainScene' }) || this;
        _this.m_TimeElapsed = 0;
        return _this;
    }
    MainScene.prototype.preload = function () {
        this.load.image('bg', 'instant-0000/bg.png');
        this.load.image('logo', 'instant-0000/logo.png');
        this.load.image('par-001', 'instant-0000/eff-par-001.png');
    };
    MainScene.prototype.create = function () {
        this.m_Bg = this.add.image(Config.CANVAS_WIDTH / 2, Config.CANVAS_HEIGHT / 2, 'bg');
        this.m_ParticleEmitterManager = this.add.particles('par-001');
        this.m_ParticleEmitterManager.createEmitter({
            x: Config.CANVAS_WIDTH / 2,
            y: Config.CANVAS_HEIGHT / 2,
            speed: 400,
            lifespan: 1000,
            scale: { start: 5, end: 1 },
            alpha: { start: 1, end: 0 },
            blendMode: Phaser.BlendModes.ADD
        });
        this.m_Logo = this.add.image(Config.CANVAS_WIDTH / 2, Config.CANVAS_HEIGHT / 2, 'logo');
        this.m_TimeText = this.add.text(0, 0, 'Time : xxxx', { fontFamily: 'Arial', fontSize: 48, color: '#f5f5f5' });
    };
    MainScene.prototype.update = function (_time, _delta) {
        if (this.m_TimeElapsed <= 0) {
            this.m_TimeElapsed = Config.TIME_OUT;
        }
        else {
            this.m_TimeElapsed -= _delta;
            this.m_TimeText.text = 'Time : ' + Math.floor(this.m_TimeElapsed / 1000).toString();
        }
    };
    return MainScene;
}(Phaser.Scene));
var Main = /** @class */ (function () {
    function Main(_canvasParent) {
        this.m_PhaserGameConfig = {
            type: Phaser.AUTO,
            scale: {
                parent: _canvasParent,
                mode: Phaser.Scale.FIT,
                width: Config.CANVAS_WIDTH,
                height: Config.CANVAS_HEIGHT
            },
            physics: {
                "default": 'arcade',
                arcade: {
                    gravity: { y: 100 },
                    debug: true
                }
            },
            // transparent:true,
            scene: [MainScene]
        };
        this.m_PhaserGame = new Phaser.Game(this.m_PhaserGameConfig);
    }
    return Main;
}());
var main;
window.onload = function () {
    main = new Main(document.getElementById('CanvasParent'));
};