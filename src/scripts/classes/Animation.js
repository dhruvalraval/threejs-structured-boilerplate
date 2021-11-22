import Component from '../classes/Component'

export default class Animation extends Component{
    constructor ({ element, elements }) {
        super({
            element,
            elements
        })
    
        this.createObserver()
    
        this.animateOut()

        this.flag = false
    }

    createObserver () {
            this.observer = new IntersectionObserver(entries => {

            entries.forEach(entry => {
                if(!this.flag) {

                    if(entry.isIntersecting) {
                        this.animateIn()
                        this.flag = true
                    } else {
                        this.animateOut()
                    }

                }
            })
            })

            this.observer.observe(this.element)
    }

    animateIn () {

    }

    animateOut () {

    }

    onResize() {

    }
}