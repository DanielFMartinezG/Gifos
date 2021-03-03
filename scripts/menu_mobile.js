burger_menu.addEventListener("click", scroll_body);
function scroll_body(){
    let body_element = document.getElementsByTagName("body");
    if(body_element[0].style.overflow == "hidden"){
        body_element[0].style.overflow = "visible";
    }else{
        body_element[0].style.overflow = "hidden";
    }
}