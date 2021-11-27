import $ from 'jquery'

export default function scrollUp(to = 0){
    $('html, body').animate(
        {scrollTop: to}, 
        700, 
        function(){}
    )
}