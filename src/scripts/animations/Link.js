import GSAP from 'gsap'
import { each } from 'lodash'

import Animation from '../classes/Animation'
import { calculate, split } from '../utils/text'

export default class Paragraph extends Animation{
    constructor({element, elements}) {

        super({
            element,
            elements
        })

        split({ element: this.element, append: true })
    
        this.elementLineSpans = this.element.querySelectorAll('span')
    }

    animateIn() {
        this.timeline = GSAP.timeline()

        each(this.elementLineSpans, (lines, index) => {
            this.timeline.fromTo(lines, {
                autoAlpha: 0,
            }, {
                autoAlpha: 0,
                delay: 0.3 + index * 0.1,
                duration: 1.5,
                ease: 'expo.out'
            }, 0)
          })
    }

    animateOut() {
        GSAP.set(this.element, {
            autoAlpha: 0
          })
    }

    onResize() {
        this.elementLines = calculate(this.elementLineSpans)
    }
}