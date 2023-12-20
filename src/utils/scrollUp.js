
import $ from 'jquery'

export default function scrollUp(to = 0, speed = 100){
    if (window.scrollY !== to) { // window.pageYOffset - высота прокрутки с верху
        $('html, body').animate(
            {scrollTop: to}, 
            speed, 
            function(){}
        )
    }
}