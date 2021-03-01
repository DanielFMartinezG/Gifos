//Opción 1, pero cuando activo el menu y cambio a resolución desktop, quedá bloqueado el scroll
let burger_menu = document.getElementById("show-menu");
burger_menu.addEventListener("click", scroll_body);
function scroll_body(){
    let body_element = document.getElementsByTagName("body");
    if(body_element[0].style.overflow == "hidden"){
        body_element[0].style.overflow = "visible";
    }else{
        body_element[0].style.overflow = "hidden";
    }
}
//modo_oscuro_home
let body_page = document.getElementsByTagName("body")[0];
let line_decoration = document.getElementsByClassName("line-decoration");//Nodo de las lineas superior e inferior
let logo = document.getElementsByClassName("logo");//Nodo del logo
let burger_icon = document.getElementsByClassName("burguer-menu");//Nodo del menú hamburguesa
let close_icon = document.getElementsByClassName("close-menu");//Nodo de cerrar el menú hamburguesa
let close_icon_fs = document.getElementById("close-full-screen");//Nodo de cerrar GIFO full screen 
let night_mode = document.getElementById("btn_night_mode");//nodo del Botón modo nocturno
let page_container = document.getElementsByClassName("page-container");// nodo del contenedor de la pagina
let btn_new_gifos = document.getElementsByClassName("btn-new-gifos-normal");//nodo del botón new gifo
let btn_new_gifos_hover = document.getElementsByClassName("btn-new-gifos-hover");//nodo del botón new gifos Hover
let btn_slider = document.getElementsByClassName("slider-icon");//nodo de botones de slider
let btn_slider_fs = document.getElementsByClassName("slider-icon-fs");//nodo de botones slider full screen
let btn_slider_hover = document.getElementsByClassName("slider-icon-hover");//nodo de botones de slider hover
let btn_slider_hover_fs = document.getElementsByClassName("slider-icon-hover-fs");//nodo de botones slider hover full screen
let search_icon = document.getElementsByClassName("search-icon");//nodo del icono de twitter

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
//Funcionalidad de ver más
//SE DEBE PRIMERO CREAR LOS CONTENEDORES DE LOS GIFOS ANTES DE ESPECIFICAR LA TRANSICIÓN
let suggest_box = document.getElementsByClassName("suggest-box");
let search_box = document.getElementsByClassName("search-box");
let search_input = document.getElementsByClassName("search-input");
search_input[0].addEventListener("focus", () =>{
    suggest_box[0].style.display = "block";
    search_box[0].style.borderBottom =  "1px solid #9CAFC3";
});
search_input[0].addEventListener("blur", () =>{
    suggest_box[0].style.display = "none";
    search_box[0].style.borderBottom = "none";
});
//_______Funcionalidad GIFOS____________
//creo una clase para almacentar la url de la información de los gifos del slider, además, los id que me permitirán acceder a ellos al hacer click sobre un icon
class Trending_gifo {
    constructor(url_gif, id_gif_img, id_fav_gif_icon, id_dow_gif_icon, id_fs_gif_icon){
        this.url_gif = url_gif;//url de la información del gifo en una posición especifica
        this.id_gif_img = id_gif_img;//id de la imagen que almacena el gifo
        this.id_fav_gif_icon = id_fav_gif_icon;//id del icono de favoritos de cada gifo
        this.id_dow_gif_icon = id_dow_gif_icon;//id del icono de dowlands de cada gifo
        this.id_fs_gif_icon = id_fs_gif_icon;//id del icono de full screen de cada gifo
    }
} 
let url_trending = "https://api.giphy.com/v1/gifs/trending?api_key=RaZbdmj1owbBOfIeJgbEEEtEjE3poegE&limit=25&rating=g";//URL TRENDING GIPHY
let slider = document.getElementsByClassName("slider");//seccion que almacena los gifos
let gifos_box_feature = document.getElementById("gifos-box-feature");//nodo de referencia para clonar
slider[0].removeChild(gifos_box_feature);//eliminamos el nodo de referencia una vez se haya almacenado su clon
let num_gifos_slider = 10;//número de gifos a visualizar en el carrusel
let trending_gifos_array = [];//lista para almacenar los 10 primero gifos junto con sus id
//al enviarse una promesa, está se demorará en dar entregar el resulado final, hay que tener cuidado con las variables que se modifican dentro de la promesa
let fetch_gifo_trending = ( fetch(url_trending)
    .then(responese => responese.json())
    .then(gifo_response => {
        for(let i=0; i<num_gifos_slider; i++){
            //gt == gifos tranding
            let gifo = new Trending_gifo(gifo_response.data[i], "gifo-trending-"+(i+1), "fav-icon-gt-"+(i+1),"dow-icon-gt-"+(i+1),"full-screen-icon-gt-"+(i+1));
            trending_gifos_array.push(gifo);
            gifo_trending(i);
        }
        console.log(trending_gifos_array);
    }).catch(message_error => console.log(message_error))
);
let gifo_trending = (i) =>{
    //clonamos y agregamos el nodo en donde se requiere
    let gifos_box_clone = gifos_box_feature.cloneNode(true);
    slider[0].appendChild(gifos_box_clone);
    //agregamos los datos requeridos para que se visualice los gifos que están almacenados en la lista trending_gifos_array
    let gifo_img = document.getElementsByClassName("gifo-img");
    gifo_img[i].src = trending_gifos_array[i].url_gif.images.original.url;
    let title_gifo = document.getElementsByClassName("title-gifos");
    title_gifo[i].innerHTML = trending_gifos_array[i].url_gif.title;
    let user_gifo = document.getElementsByClassName("user-gifos");
    user_gifo[i].innerHTML = trending_gifos_array[i].url_gif.username == ""? "User": trending_gifos_array[i].url_gif.username;
    
    //modificamos los id de los nodos que nos servirán para distintas funcionalidades como: favorito,dowlands,full screen
    gifo_img[i].id = trending_gifos_array[i].id_gif_img;
    let gifo_fav_icon = document.getElementsByClassName("icon-fav");
    gifo_fav_icon[i].id = trending_gifos_array[i].id_fav_gif_icon;
    let gifo_dow_icon = document.getElementsByClassName("icon-download");
    gifo_dow_icon[i].id = trending_gifos_array[i].id_dow_gif_icon;
    gifo_fs_icon = document.getElementsByClassName("full-screen-icon");
    gifo_fs_icon[i].id = trending_gifos_array[i].id_fs_gif_icon;
}
//Funcionalidad Full Screen
let gifoFullScreen =(gifo)=>{

}

//_______Funcionalidad transición slider_______
//Trasladar slider
let slider_btn_left = document.getElementById("slider-btn-left");
let slider_btn_right = document.getElementById("slider-btn-right");
let dist = (357+30);//distancia a recorrer por cada click = ancho del gifo mas margin right
let dist_2 = 0;//variable para almacenar la diferencia del ancho entre el slider de la pantalla del usuario y la de un monitor 1440
let position_gifos = [];//lista para almacenar la posición de cada gifo, puede ser de 1 indice pero determinare su longitud dependiendo del número de gifos
let x = num_gifos_slider - 3;//# de veces que se deben desplazar los gifos, son 3 gifos los que se logran ver en el ancho del slider, podría verse como el #de veces que se hará click
let max_width_slider_cotainer = 1161;//maximo ancho del slider
for(let i = 0; i < num_gifos_slider; i++){
    position_gifos.push(0); 
}
//EVENTO SLIDE DERECHO
slider_btn_right.addEventListener("click", () =>{
    if( Math.abs(position_gifos[0]) < (dist*x)){//(dist*x) es el desplazamiento maximo esperado de cada gifo
        slide_function(-dist);
        //el ancho del slider no permite visualizar de a 3 gifos debemos realizar un desplazamiento extra, y verificamos que dist_2 == 0 para que solo se realice 1 vez al llegar a ese tope
    }else if(slider[0].clientWidth < max_width_slider_cotainer && dist_2 == 0){
        dist_2 = max_width_slider_cotainer - slider[0].clientWidth;
        slide_function(-(dist_2));
    }
});
//EVENTO SLIDE IZQUIERDO
slider_btn_left.addEventListener("click", () =>{
    if(position_gifos[0] < 0 && position_gifos[0]+dist <= 0 ){//verificamos que la posición actutal y futura del gifo sea menor o igual a 0
        slide_function(dist);
    }else if(dist_2 != 0 ){//si hubo un desplazamiento extra hacia la derecha se controlara y reiniciara el dist_2
        slide_function(dist_2);
        dist_2 = 0;
    }
});
//FUNCION PARA MOVER EL SLIDE
let slide_function = (dist) =>{
    let gifos_box = document.getElementsByClassName("gifos-box");//lo declaro dentro de la función y no afuera por la promesa utilizada anteriormente,
    //si gifos_box está afuera su longitud sería 1 y no 10, ya que, JS lee primero está variable antes de finalizar las modificaciones sobre ella en la promesa
    for (let i = 0; i<gifos_box.length;i++){
        position_gifos[i] += dist;
        gifos_box[i].style.transform = "translateX("+(position_gifos[i])+"px)";
    }
}

