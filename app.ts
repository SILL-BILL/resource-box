/// <reference path="common/js/phaser-3.16.2/phaser.d.ts"/>

class MainScene extends Phaser.Scene 
{

	private m_main:Main;
	private m_Bg:Phaser.GameObjects.Image;
	private m_Logo:Phaser.GameObjects.Image;
	private m_TimeText:Phaser.GameObjects.Text;
	private m_TimeElapsed:number;
	private m_ParticleEmitterManager : Phaser.GameObjects.Particles.ParticleEmitterManager;
	private m_BtnA:Phaser.GameObjects.Image;
	private m_BtnB:Phaser.GameObjects.Image;
	private m_BtnLeft:Phaser.GameObjects.Image;
	private m_BtnRight:Phaser.GameObjects.Image;
	private m_Bgm:Phaser.Sound.BaseSound;

	constructor(_main:Main)
	{
		super({ key: 'MainScene' });
		this.m_main = _main;
		this.m_TimeElapsed = 0;
	}

	public preload():void
	{
		this.load.image('bg', 'instant-0000/bg.png');
		this.load.image('logo', 'instant-0000/logo.png');
		this.load.image('par-001', 'instant-0000/eff-par-001.png');
		this.load.atlas('btn-gamepad', 'common/img/phaser3-btn-gamepad/sprite.png','common/img/phaser3-btn-gamepad/sprite.json');
		this.load.audio('decision', [
			'common/audio/decision/0.ogg',
			'common/audio/decision/0.mp3'
		]);
		this.load.audio('cancel', [
			'common/audio/cancel/0.ogg',
			'common/audio/cancel/0.mp3'
		]);
		this.load.audio('cursor', [
			'common/audio/cursor/0.ogg',
			'common/audio/cursor/0.mp3'
		]);
		this.load.audio('bgm-into-the-galaxy', [
			'instant-0000/bgm-into-the-galaxy/0.ogg',
			'instant-0000/bgm-into-the-galaxy/0.mp3'
		]);
	}
	public create():void
	{
		this.m_Bg = this.add.image(this.m_main.CANVAS_WIDTH/2, this.m_main.CANVAS_HEIGHT/2,'bg');

		this.m_ParticleEmitterManager = this.add.particles('par-001');
		this.m_ParticleEmitterManager.createEmitter({
			x:this.m_main.CANVAS_WIDTH/2,
			y:this.m_main.CANVAS_HEIGHT/2,
			speed:400,
			lifespan:1000,
			scale: { start: 5, end: 1 },
			alpha: { start: 1, end: 0 },
			blendMode:Phaser.BlendModes.ADD
		});

		this.m_Logo = this.add.image(this.m_main.CANVAS_WIDTH/2,this.m_main.CANVAS_HEIGHT/2,'logo');

		this.m_TimeText = this.add.text(
			40,40,
			'Time : xxxx',
			{fontFamily:'Arial', fontSize:48, color:'#f5f5f5'}
		);

		this.m_BtnA = this.add.image(this.m_main.CANVAS_WIDTH-70-40,this.m_main.CANVAS_HEIGHT-110,'btn-gamepad','a').setInteractive();
		this.m_BtnA.on('pointerdown', () => {
			this.sound.play('decision');
			this.m_BtnA.setTexture('btn-gamepad','a-pressed');
		}, this);
		this.m_BtnA.on('pointerup', () => { this.m_BtnA.setTexture('btn-gamepad','a'); }, this);

		this.m_BtnB = this.add.image(this.m_main.CANVAS_WIDTH-70-40-140-40,this.m_main.CANVAS_HEIGHT-110,'btn-gamepad','b').setInteractive();
		this.m_BtnB.on('pointerdown', () => {
			this.sound.play('cancel');
			this.m_BtnB.setTexture('btn-gamepad','b-pressed');
		}, this);
		this.m_BtnB.on('pointerup', () => { this.m_BtnB.setTexture('btn-gamepad','b'); }, this);

		this.m_BtnLeft = this.add.image(70+40,this.m_main.CANVAS_HEIGHT-110,'btn-gamepad','left').setInteractive();
		this.m_BtnLeft.on('pointerdown', () => {
			this.sound.play('cursor');
			this.m_BtnLeft.setTexture('btn-gamepad','left-pressed');
		}, this);
		this.m_BtnLeft.on('pointerup', () => { this.m_BtnLeft.setTexture('btn-gamepad','left'); }, this);

		this.m_BtnRight = this.add.image(70+40+140+40,this.m_main.CANVAS_HEIGHT-110,'btn-gamepad','right').setInteractive();
		this.m_BtnRight.on('pointerdown', () => {
			this.sound.play('cursor');
			this.m_BtnRight.setTexture('btn-gamepad','right-pressed');
		}, this);
		this.m_BtnRight.on('pointerup', () => { this.m_BtnRight.setTexture('btn-gamepad','right'); }, this);

		this.m_Bgm = this.sound.add('bgm-into-the-galaxy',{ loop:true });
		this.m_Bgm.play();

	}
	public update(_time,_delta):void
	{
		if(this.m_TimeElapsed <= 0)
		{
			this.m_TimeElapsed = this.m_main.TIME_OUT;
		}
		else
		{
			this.m_TimeElapsed -= _delta;
			this.m_TimeText.text = 'Time : '+ Math.floor(this.m_TimeElapsed / 1000).toString();
		}
	}
}

class Main {

	public m_PhaserGameConfig:GameConfig;
	public m_PhaserGame:Phaser.Game;
	public readonly CANVAS_WIDTH:number = 1280;
	public readonly CANVAS_HEIGHT:number = 960;
	public readonly TIME_OUT:number = 300 * 1000;

	constructor(_canvasParent:HTMLElement) {

		this.m_PhaserGameConfig = {
			type:Phaser.AUTO,
			scale:{
				parent: _canvasParent,
				mode: Phaser.Scale.FIT,
				width: this.CANVAS_WIDTH,
				height: this.CANVAS_HEIGHT
			},
			physics:{
				default:'arcade',
				arcade:{
					gravity: { y:100 },
					debug: true
				}
			},
			// transparent:true,
			scene: [new MainScene(this)]
		}

		this.m_PhaserGame = new Phaser.Game(this.m_PhaserGameConfig);
	}
}


var main:Main;
window.onload = () => {
	main = new Main(<HTMLElement>document.getElementById('CanvasParent'));
}