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

    }

    animateIn() {
        this.timeline = GSAP.timeline()

        each(this.element, _ => {
            this.timeline.fromTo(this.element, {
                autoAlpha: 0,
            }, {
                autoAlpha: 1,
                delay: 0.5,
                duration: 1.5,
                ease: 'expo.out'
            }, 0)
          })
    }

    animateOut() {
        GSAP.set(this.element, {
            autoAlpha: 1
          })
    }

    onResize() {
    }
}