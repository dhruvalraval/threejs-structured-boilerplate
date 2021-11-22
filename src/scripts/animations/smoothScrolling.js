import LocomotiveScroll from 'locomotive-scroll'
import { ScrollTrigger } from 'gsap/all'

export default class SmoothScroll{
    constructor() {

        this.container = document.querySelector('[data-scroll-container]')

        this.initLocomotive()

    }
    
    initLocomotive() {
        this.scroll = new LocomotiveScroll({
            el: this.container,
            smooth: true,
            lerp: 0.08,
            smartphone: {
                smooth: true
            },
            tablet: {
                smooth: true
            }
        })
    }

    update() {
        this.scroll.update()
    }
}
