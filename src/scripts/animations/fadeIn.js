import gsap from 'gsap'
import LottieAnimation from "../utils/lottie"
const fadeIn = ({container}) => {
    // gsap.set(container, {
    //     autoAlpha: 1
    // })
    const canvas = document.querySelector('canvas')
    gsap.to(canvas, {
        duration: 0.2,
        autoAlpha: 1,
        delay: 0.3
    });
	return gsap.to(container, {
        duration: 0.4, 
        autoAlpha: 1,
        delay: 0.5,
        ease:'Power2.easeOut',
        onComplete: _ => {
            LottieAnimation()
        }
    });
}

export default fadeIn