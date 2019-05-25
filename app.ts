/// <reference path="common/js/phaser-3.16.2/phaser.d.ts"/>

class MainScene extends Phaser.Scene 
{

	private m_main:Main;
	private m_Bg:Phaser.GameObjects.Image;
	private m_Logo:Phaser.GameObjects.Image;
	private m_TimeText:Phaser.GameObjects.Text;
	private m_TimeElapsed:number;
	private m_ParticleEmitterManager : Phaser.GameObjects.Particles.ParticleEmitterManager;
	private m_BtnA:Phaser.GameObjects.Sprite;
	private m_BtnB;

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
			0,0,
			'Time : xxxx',
			{fontFamily:'Arial', fontSize:48, color:'#f5f5f5'}
		);

		this.m_BtnA = this.add.sprite(this.m_main.CANVAS_WIDTH/2,this.m_main.CANVAS_HEIGHT/2,'btn-gamepad','0000-a').setInteractive();
		this.m_BtnA.setTexture('btn-gamepad','0003-b');

		// this.m_BtnA.setFrame(3);

//console.dir(this.m_BtnA);

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