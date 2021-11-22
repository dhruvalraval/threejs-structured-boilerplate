import * as THREE from 'three'
import gsap from 'gsap'

export default class Canvas {
	constructor ({ template}) {
			this.template = template
			this.y = {
				start: 0,
				distance: 0,
				end: 0
			}			

			this.clock = new THREE.Clock()

			this.settings = {
				speed: 0.2,
				density: 1,
				strength: 0.2,
				color: 0.1,
				alpha: 1.0,
				alphaB: 1.0
			}

			this.mouse = new THREE.Vector2(0.8, 0.5)

			this.createRenderer()
			this.createScene()
			this.createCamera()
			this.createGeometry()
			this.createLights()

			this.onResize()
			this.onChange(template)
	}

	createRenderer () {
		this.renderer = new THREE.WebGLRenderer({
		alpha: true,
		antialias: true
		})
		this.renderer.setSize(window.innerWidth, window.innerHeight)
		this.renderer.setPixelRatio(window.devicePixelRatio || 1)
		this.renderer.autoClear = true
		document.body.appendChild(this.renderer.domElement)
	}

	createCamera () {
		this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000)
		this.camera.position.z = 5
	}

	createScene() {
		this.scene = new THREE.Scene()
	}

	createGeometry() {


	}

	createLights() {
		this.lightTop = new THREE.DirectionalLight(0xFFFFFF, .7)
		this.lightTop.position.set(0, 500, 200)
		this.scene.add(this.lightTop)
	  
		this.lightBottom = new THREE.DirectionalLight(0xFFFFFF, .25)
		this.lightBottom.position.set(0, -500, 400)
		this.scene.add(this.lightBottom)
	  
		this.ambientLight = new THREE.AmbientLight(0x798296)
		this.scene.add(this.ambientLight)
	}

  /**
   * Events
   */

	onPreloaded(template) {
		this.template = template
		this.onChange(this.template)
	}


	onChange(template) {
		this.template = template
	}

	onResize() {
		const windowWidth = window.innerWidth
		const windowHeight = window.innerHeight

		this.camera.aspect = windowWidth/windowHeight
		this.camera.updateProjectionMatrix()

		this.renderer.setSize(windowWidth, windowHeight)
	}

	onMouseMove( e ) {
		gsap.to( this.mouse, {
			y: e.clientY / window.innerHeight,
			x: e.clientX /window.innerWidth,
			duration: 0.8,
			ease: 'Power1.easeOut',
		} );

	}

	/**
	 * Loop
	 */

	update(scroll) {
		let time = performance.now() * 0.00005 * 5
		
		this.renderer.render(this.scene, this.camera)
	}
}


