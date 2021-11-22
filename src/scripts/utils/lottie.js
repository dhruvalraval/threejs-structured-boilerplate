import lottie from 'lottie-web'

export default function LottieAnimation() { 

        lottie.loadAnimation({
            container: document.querySelector('.home_tau_logo'),
            renderer: 'svg',
            loop: false,
            autoplay: true,
            path: '../assets/lotties/tau3.json'
        })
        
        lottie.loadAnimation({
            container: document.querySelector('.home_true_love_logo'),
            renderer: 'svg',
            loop: true,
            autoplay: true,
            path: '../assets/lotties/logos.json'
        })
        
}