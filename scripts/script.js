//las variables relacionadas al dom se irán actualizando si los nodos son modificados despues de ser llamados

//_______________________PROCESOS A REALIZAR AL CARGAR LA PAGINA__________________________________ 
window.onload = function() {
    body_page.removeChild(gifos_box_template);//eliminamos el nodo de referencia para los gifos cards
    suggest_box[0].removeChild(suggest_item_template);//eliminamos el nodo de referencia utilizado para las suferencias
    list_favorites();//función para inicializar lista de favoritos
    list_gifos_created();//Función para inicializar lista de gifos creados
    fetch_gifo_trending();//Función para crear el gifo trending
    setInterval(camara_effect,500);
}   
//_________________________________API KEY GIPHY_____________________________________________
let api_key = "api_key=RaZbdmj1owbBOfIeJgbEEEtEjE3poegE";
//_________________________________NODO GIFOS CARDS____________________________________________
let gifos_box_template = document.getElementById("gifos-box-template");//nodo de referencia para clonar
//_________________________________NODOS DEL FULL SCREEN_______________________________________
let full_screen_gifo = document.getElementById("gifo-full-screen");//nodo img gifo full screen
let full_screen_user = document.getElementById("user-full-screen");//nodo urusaio full screen
let full_screen_title = document.getElementById("title-full-screen");//nodo titulo full screen
let full_screen_icon_fav_act = document.getElementsByClassName("fs-fav-act-box");//nodo icono fav full screen activado
let full_screen_icon_fav = document.getElementsByClassName("icon-fav-full-screen");//nodo icono fav full screen
let full_screen_icon_dow = document.getElementsByClassName("icon-dow-full-screen");//nodo icono dow full screen
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
let search_icon = document.getElementsByClassName("search-icon");//nodo del icono de busqueda
//_________________________________SEARCH GIFOS____________________________________________________
let search_gifos_container = document.getElementsByClassName("search-gifos-container")[0];
let search_container = document.getElementsByClassName("search-container");//nodo contenedor de los nodo de busqueda y sugerencias
let search_box = document.getElementsByClassName("search-box");//nodo contenedor de la caja de busqueda
let search_icon_active = document.getElementsByClassName("search-icon-active");
let close_suggest_icon = document.getElementById("close-suggest-icon");//nodo icono de cerrar lista se sugerencias
let search_input = document.getElementsByClassName("search-input");//nodo input de caja de busqueda
let suggest_box = document.getElementsByClassName("suggest-box");//nodo de sugerencias de busqueda
let suggest_item_template = document.getElementById("suggest-item-template");//nodo de plantilla para las sugerencias
let suggest_item = document.getElementsByClassName("suggest-item");
let suggest_content = document.getElementsByClassName("suggest");//nodo del nombre de la sugerencia
let num_gifos_results = 0;//variable para controlar el número de cards a agregar al hacer click en buscar
let results_container = document.getElementById("results-container");//nodo del conenedor de resultados de busqueda
let results_title = document.getElementsByClassName("results-title")//nodo del titulo de la busqueda
let results_gifos_section = document.getElementById("results-gifos-section");//nodo donde se almacenarán los card gifos
let gifos_box_searched = document.getElementsByClassName("gifo-searched");//nodo que referencia a los gifos encontrados
let see_more_button_search = document.getElementById("see-more-button-search");//nodo del botón ver más de buscar gifos
let search_without_result_container = document.getElementsByClassName("search-without-result-container")[0];//Nodo del contenedor de busqueda sin resultados
let search_without_result_title = document.getElementsByClassName("search-without-result-title")[0];//Nodo del titulo sin resultados
let gifos_searched_array = [];//lista para almacenar la información de los gifos junto con sus id, resultado del request
let key_code_enter = 13;// key code de la tecla enter

//_________________________________FAVORITES GIFOS____________________________________________________
let btn_fav_menu = document.getElementById("favourite-item-menu");//Bton favoritos del header
let favorite_gifos_section = document.getElementsByClassName("favorite-gifos-section")[0];//sección de favoritos
let favorite_gifos_container = document.getElementById("favorite-gifos-container");//nodo contenedor de gifos favoritos
let without_favorite_cotainer = document.getElementsByClassName("without-favorites-container")[0];//nodo contenedor del box sin resultados
let gifo_box_favorite = document.getElementsByClassName("gifo-favorite");//nodo que referencia a los gifo cards favoritos
let see_more_button_favorite = document.getElementById("see-more-button-favorite");//nodo del botón ver más de gifos favoritos
let num_gifos_favorites = 0;//variable para controlar el número de cards a agregar al hacer click en favoritos
let favorite_array;//variable para almacenar la lista del local storage

//_________________________________CREATE GIFOS____________________________________________________
let url_upload_gifo = "https://upload.giphy.com/v1/gifs?"+api_key;  //url de la API search gifs GIPHY
let btn_new_gifo_menu =  document.getElementsByClassName("box-new-gifo")[0];//boton crear nuevo gifo del header
let create_gifos_section = document.getElementsByClassName("create-gifos-section")[0]; // nodo de referencia de la sección de creación de gifos
let rotate = 45;//angulo a rotar para las cintas de la camara
let high_light = document.getElementById("high-light-img");//nodo de la luz de la cama
let create_gifo_start = document.getElementById("create-gifo-start");//nodo del mensaje de comenzar a crear un gifo
let create_gifo_acces_cam = document.getElementById("create-gifo-acces-cam");//nodo del mensaje de permitir acceso a la camara
let cam_screen_container = document.getElementsByClassName("cam-screen-container")[0];//nodo del contenedor del box de la camara y hovers
let cam_stream = document.getElementsByClassName("cam-stream")[0];//nodo de la etiqueta video
let video_stream;//variable para almacenar el resultado del stream del acceso a la camara
let recorder;//variable para almacenar el resultado del metodo RecordRTC
let created_gifos_array;//variable destinada a almacenar la lista de gifos creados
let form = new FormData();//objeto para almacenar el blob resultante de la grabación
let timekeeper_item = document.getElementById("timekeeper");//nodo del cronometro
let timekeeper;//variable a utilizar para comenzar set interval del cronometro
//variables destinadas a la funcionalidad del cronometro
let hours = ["0","0"];
let minutes = ["0","0"];
let seconds = ["0","0"];
let record_again = document.getElementById("record-again"); //nodo de grabar nuevamente
let uploannding_gifo_box = document.getElementById("uploannding-gifo-box");//nodo del hover de subiendo gifo
let uploaded_gifo_box = document.getElementById("uploaded-gifo-box");//nodo del hover de gifo subido con exito
let btn_start_gifo = document.getElementById("btn-start-gifo");//nodo del botón comenzar a crear un nuevo gifo
let btn_record_gifo = document.getElementById("btn-record-gifo");//nodo del botón comenzar grabación
let btn_end_gifo = document.getElementById("btn-end-gifo");//nodo del botón terminar de grabar
let btn_up_gifo = document.getElementById("btn-up-gifo");//botón de subir gfo
let step_item = document.getElementsByClassName("step-item");//nodo de los iconos de los pasos de grbación 1,2 y 3

//_________________________________TRENDING GIFOS____________________________________________________
let url_trending = "https://api.giphy.com/v1/gifs/trending?"+ api_key;//url de la API trending
let trending_gifos_section = document.getElementsByClassName("trending-gifos-container")[0];
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