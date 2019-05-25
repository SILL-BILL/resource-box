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
var MainScene = /** @class */ (function (_super) {
    __extends(MainScene, _super);
    function MainScene(_main) {
        var _this = _super.call(this, { key: 'MainScene' }) || this;
        _this.m_main = _main;
        _this.m_TimeElapsed = 0;
        return _this;
    }
    MainScene.prototype.preload = function () {
        this.load.image('bg', 'instant-0000/bg.png');
        this.load.image('logo', 'instant-0000/logo.png');
        this.load.image('par-001', 'instant-0000/eff-par-001.png');
        this.load.atlas('btn-gamepad', 'common/img/phaser3-btn-gamepad/sprite.png', 'common/img/phaser3-btn-gamepad/sprite.json');
    };
    MainScene.prototype.create = function () {
        this.m_Bg = this.add.image(this.m_main.CANVAS_WIDTH / 2, this.m_main.CANVAS_HEIGHT / 2, 'bg');
        this.m_ParticleEmitterManager = this.add.particles('par-001');
        this.m_ParticleEmitterManager.createEmitter({
            x: this.m_main.CANVAS_WIDTH / 2,
            y: this.m_main.CANVAS_HEIGHT / 2,
            speed: 400,
            lifespan: 1000,
            scale: { start: 5, end: 1 },
            alpha: { start: 1, end: 0 },
            blendMode: Phaser.BlendModes.ADD
        });
        this.m_Logo = this.add.image(this.m_main.CANVAS_WIDTH / 2, this.m_main.CANVAS_HEIGHT / 2, 'logo');
        this.m_TimeText = this.add.text(0, 0, 'Time : xxxx', { fontFamily: 'Arial', fontSize: 48, color: '#f5f5f5' });
        this.m_BtnA = this.add.sprite(this.m_main.CANVAS_WIDTH / 2, this.m_main.CANVAS_HEIGHT / 2, 'btn-gamepad', '0000-a').setInteractive();
        this.m_BtnA.setTexture('btn-gamepad', '0003-b');
        // this.m_BtnA.setFrame(3);
        //console.dir(this.m_BtnA);
    };
    MainScene.prototype.update = function (_time, _delta) {
        if (this.m_TimeElapsed <= 0) {
            this.m_TimeElapsed = this.m_main.TIME_OUT;
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
        this.CANVAS_WIDTH = 1280;
        this.CANVAS_HEIGHT = 960;
        this.TIME_OUT = 300 * 1000;
        this.m_PhaserGameConfig = {
            type: Phaser.AUTO,
            scale: {
                parent: _canvasParent,
                mode: Phaser.Scale.FIT,
                width: this.CANVAS_WIDTH,
                height: this.CANVAS_HEIGHT
            },
            physics: {
                "default": 'arcade',
                arcade: {
                    gravity: { y: 100 },
                    debug: true
                }
            },
            // transparent:true,
            scene: [new MainScene(this)]
        };
        this.m_PhaserGame = new Phaser.Game(this.m_PhaserGameConfig);
    }
    return Main;
}());
var main;
window.onload = function () {
    main = new Main(document.getElementById('CanvasParent'));
};
