night_mode.addEventListener("click", ()=>{
    page_container[0].classList.toggle("dark-mode");
    night_mode.innerHTML= night_mode.innerHTML == "modo nocturno" ? "modo diurno" : "modo nocturno";
    if (night_mode.innerHTML == "modo diurno"){
        body_page.style.background = "#37383C"; 
        line_decoration[0].style.background = "#000000";
        line_decoration[1].style.background = "#000000";
        logo[0].src = "./assets/Logo-modo-noc.svg";
        burger_icon[0].src = "./assets/burger-modo-noct.svg";
        close_icon[0].src = "./assets/close-modo-noct.svg";
        close_icon_fs.src = "./assets/close-modo-noct.svg"
        btn_new_gifos[0].src = "./assets/CTA-crear-gifo-modo-noc.svg";
        btn_new_gifos_hover[0].src = "./assets/CTA-crear-gifo-hover-modo-noc.svg";
        btn_slider[0].src = "./assets/button-slider-left-md-noct.svg";
        btn_slider_fs[0].src = "./assets/button-slider-left-md-noct.svg";
        btn_slider_hover[0].src = "./assets/flecha-izq-noc-hover.png";
        btn_slider_hover_fs[0].src = "./assets/flecha-izq-noc-hover.png";
        btn_slider[1].src = "./assets/button-slider-right-md-noct.svg";
        btn_slider_fs[1].src = "./assets/button-slider-right-md-noct.svg";
        btn_slider_hover[1].src = "./assets/flecha-der-noc-hover.png";
        btn_slider_hover_fs[1].src = "./assets/flecha-der-noc-hover.png";
        search_icon[0].src = "./assets/icon-search-mod-noc.svg";
        // twitter_icon_hover[0].style.display = "none";
    }else{
        body_page.style.background = "white"; 
        line_decoration[0].style.background = "#572EE5";
        line_decoration[1].style.background = "#572EE5";
        logo[0].src = "./assets/logo-desktop.svg";
        burger_icon[0].src = "./assets/burger.svg";
        close_icon[0].src = "./assets/close.svg";
        close_icon_fs.src = "./assets/close.svg";
        btn_new_gifos[0].src = "./assets/button-crear-gifo.svg";
        btn_new_gifos_hover[0].src = "./assets/CTA-crear-gifo-hover.svg";
        btn_slider[0].src = "./assets/button-slider-left.svg";
        btn_slider_fs[0].src = "./assets/button-slider-left.svg";
        btn_slider_hover[0].src = "./assets/button-slider-left-hover.svg";
        btn_slider_hover_fs[0].src = "./assets/button-slider-left-hover.svg";
        btn_slider[1].src = "./assets/Button-Slider-right.svg";
        btn_slider_fs[1].src = "./assets/Button-Slider-right.svg";
        btn_slider_hover[1].src = "./assets/Button-Slider-right-hover.svg";
        btn_slider_hover_fs[1].src = "./assets/Button-Slider-right-hover.svg";
        search_icon[0].src = "./assets/icon-search.svg";
    }
});
