import gsap from 'gsap'
import each from 'lodash/each'


import {COLOR_ECRU_WHITE, COLOR_BLACK} from '../utils/color'

export default class Navigation{
    constructor({ template }) {
        
        this.element = document.querySelector('.navigation'),
        this.elements = {

        }

        this.onChange(template)
    }

    onChange(template) {


    }
    
}