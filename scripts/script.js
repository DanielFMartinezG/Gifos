//_______________________PROCESOS A REALIZAR AL CARGAR LA PAGINA__________________________________ 
window.onload = function() {
    body_page.removeChild(gifos_box_feature);//eliminamos el nodo de referencia una vez se haya almacenado su clon
    fetch_gifo_trending();
}   
//_________________________________NODO GIFOS CARDS____________________________________________
let gifos_box_feature = document.getElementById("gifos-box-feature");//nodo de referencia para clonar
//_________________________________NODOS DEL FULL SCREEN_______________________________________
let full_screen_gifo = document.getElementById("gifo-full-screen");
let full_screen_user = document.getElementById("user-full-screen");
let full_screen_title = document.getElementById("title-full-screen");
//_________________________________MENÚ MOBILE OPEN____________________________________________
let burger_menu = document.getElementById("show-menu");
//_________________________________DARK MODE____________________________________________________
let body_page = document.getElementsByTagName("body")[0];//Nodo Body
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
//_________________________________SEARCH GIFOS____________________________________________________
let suggest_box = document.getElementsByClassName("suggest-box");//nodo de sugerencias de busqueda
let search_box = document.getElementsByClassName("search-box");//nodo input de caja de busqueda
let search_input = document.getElementsByClassName("search-input");
let num_gifos_results = 0;
let results_gifos_section = document.getElementById("results-gifos-section");
let results_container = document.getElementById("results-container");
//_________________________________TRENDING GIFOS____________________________________________________
let url_trending = "https://api.giphy.com/v1/gifs/trending?api_key=RaZbdmj1owbBOfIeJgbEEEtEjE3poegE&limit=25&rating=g";//URL TRENDING GIPHY
let slider = document.getElementsByClassName("slider");//seccion que almacena los gifos
let num_gifos_slider = 10;//número de gifos a visualizar en el carrusel
let trending_gifos_array = [];//lista para almacenar los 10 primero gifos junto con sus id, resultado del request

let slider_btn_left = document.getElementById("slider-btn-left");//Nodo del botón izquierdo del slider
let slider_btn_right = document.getElementById("slider-btn-right");//Nodo del botón derehcho del slider
let dist = (357+30);//distancia a recorrer por cada click = (ancho del gifo + margin right)
let dist_2 = 0;//variable para almacenar la diferencia del ancho entre el slider de la pantalla del usuario y la de un monitor 1440
let position_gifos = [];//lista para almacenar la posición de cada gifo, puede ser de 1 indice pero determinare su longitud dependiendo del número de gifos
let x = num_gifos_slider - 3;//# de veces que se deben desplazar los gifos, son 3 gifos los que se logran ver en el ancho del slider, podría verse como el #de veces que se hará click
let max_width_slider_cotainer = 1161;//maximo ancho del slider