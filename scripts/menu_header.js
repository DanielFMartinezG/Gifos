burger_menu.addEventListener("click", scroll_body);
function scroll_body(){
    let body_element = document.getElementsByTagName("body");
    if(body_element[0].style.overflow == "hidden"){
        body_element[0].style.overflow = "visible";
    }else{
        body_element[0].style.overflow = "hidden";
    }
}

let logo_gifos= document.getElementById("logo-gifos");
logo_gifos.addEventListener("click", ()=>{
    favorite_gifos_section.style.display = "none"
    create_gifos_section.style.display = "none";
    trending_gifos_section.style.display = "block";
    search_gifos_container.style.display ="block";
})

btn_fav_menu.addEventListener("click", ()=>{
    search_gifos_container.style.display ="none";
    create_gifos_section.style.display = "none";
    trending_gifos_section.style.display = "block";
    favorite_gifos_section.style.display = "block"
    delete_gifo_card_favorite();
    add_fav_gifo_cards();
});

btn_new_gifo_menu.addEventListener("click", () =>{
    search_gifos_container.style.display ="none";
    favorite_gifos_section.style.display = "none";
    trending_gifos_section.style.display = "none";
    create_gifos_section.style.display = "flex";
});