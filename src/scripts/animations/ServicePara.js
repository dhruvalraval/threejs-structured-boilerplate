import GSAP from 'gsap'
import { each } from 'lodash'

import Animation from '../classes/Animation'
import { calculate, split } from '../utils/text'

export default class ServicePara extends Animation{
    constructor({element, elements}) {

        super({
            element,
            elements
        })
        this.element = element
        split({ element: this.element, append: true })
    
        this.elementLineSpans = this.element.querySelectorAll('span')
    }

    animateIn() {
        this.timeline = GSAP.timeline()
        
        each(this.elementLineSpans, (lines, index) => {
            this.timeline.fromTo(lines, {
                autoAlpha: 0,
            }, {
                autoAlpha: 1,
                delay: 0.5 + index * 0.1,
                duration: 1.5,
                ease: 'expo.out'
            }, 0)
        })
        
    }

    animateOut() {
        if(this.element) {

            GSAP.set(this.element, {
                autoAlpha: 1
            })
        }
    }

    onResize() {
        
    }
}