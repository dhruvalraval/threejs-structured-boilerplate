import imagesLoaded from 'imagesloaded'
import gsap from 'gsap'
import LocomotiveScroll from 'locomotive-scroll'
import { each } from 'lodash'

import barba from '@barba/core'

import Canvas from './components/Canvas'
import Navigation from './components/Navigation'

import Home from './pages/Home/index'

class App {
    constructor() {
        
        this.createContent()
        
        this.createNavigation()
        this.createPages()
        
        this.onPreloaded()
        this.createCanvas()

        this.addEventListeners()
        
        this.onResize()
        
        this.addLinkListeners()
        
    }   

    createSmoothScrolling() {
        this.scroll = new SmoothScroll()

    }

    createContent() {
        this.content = document.querySelector('.content')
        this.template = this.content.getAttribute('data-template')
    }

    createNavigation () {
        this.navigation = new Navigation({
          template: this.template
        })
    }

    createPages () {
        this.pages = {
          home: new Home(),
        }

        
        this.page = this.pages[this.template]
        this.page.create()
    }
    
    createCanvas() {
        this.canvas = new Canvas({
            template: this.template
        })
    }


    onPreloaded () {        
        let LOAD_FLAG = false
        this.onResize()
        const imgLoad = imagesLoaded('.content')

        let images = document.querySelectorAll("img").length,
            loadedCount = 0,
            loadingProgress = 0
        
        imgLoad.on( 'progress', function( instance, image ) {
            loadProgress()
        })
        
        function loadProgress(imgLoad, image) {

            loadedCount++
        
            loadingProgress = (loadedCount/images)
            let percent = `${loadingProgress*100}%`

            if(percent == '100%'){
                LOAD_FLAG = true
                Complete()
            }
        }
        
        const Complete= () => {
            window.setTimeout(_ => {
                if(LOAD_FLAG === true) {
                    console.log('images are loaded')
                    // gsap.to('.preloader', {
                    //     autoAlpha: 0,
                    //     duration: 0.5,
                    //     ease: 'Power2.easeOut'
                    // })
                }
            }, 1000)
            this.update()

        }
        
        this.page.show()
        // this.canvas.onPreloaded(this.template)
    }

    onChange(template) {

        this.page = this.pages[template]
        this.page.create()

        this.canvas.onChange(template)
        this.navigation.onChange(template)
        
        
        this.page.show()
        
        this.onResize()
        this.addLinkListeners()
    }


    onResize () {
        if(this.canvas && this.canvas.onResize) {
          this.canvas.onResize()
        }
    
        if(this.page && this.page.onResize) {
          this.page.onResize()
        }
    }

    onMouseMove( e ) {
        if(this.canvas && this.canvas.onMouseMove) {
            this.canvas.onMouseMove(e)
        }
    }

    update(a) {
        if(this.scroll){
            this.scroll.on('scroll', ({ scroll }) => { 
                this.y = scroll.y 

            })
        }


        if(this.page && this.page.update) {
            this.page.update()
        }
    
        // if(this.canvas && this.canvas.update) {
            this.canvas.update(this.y)
        // }
        this.frame = window.requestAnimationFrame(this.update.bind(this))
    }

      /**
   * Listeners
   */

    addEventListeners() {
        window.addEventListener( 'mousemove', this.onMouseMove.bind(this))

        window.addEventListener('resize', this.onResize.bind(this))


    }


    addLinkListeners () {

    }
}

new App()