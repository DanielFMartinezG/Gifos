//_________________________________FUNCIONALIDAD PARA CREAR LOS GIFS CARDS DEL TRENDING_____________________

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
//realizamos el request y almacenamos el resultado de la promesa en la lista trending_gifos_array
let fetch_gifo_trending =() => {
    fetch(url_trending)
    .then(responese => responese.json())
    .then(gifo_response => {
        for(let i=0; i<num_gifos_slider; i++){
            let gifo = new Trending_gifo(gifo_response.data[i], "gifo-trending-"+(i+1), "fav-icon-gt-"+(i+1),"dow-icon-gt-"+(i+1),"full-screen-icon-gt-"+(i+1));
            trending_gifos_array.push(gifo);
            gifo_trending(i);
        }
    }).catch(message_error => console.log(message_error));
}
//Función para crear el nuevo nodo con su GIF y IDs respestivos en el carrusel
let gifo_trending = (i) =>{
    //clonamos y agregamos el nodo en donde se requiere
    let gifos_box_clone = gifos_box_feature.cloneNode(true);
    gifos_box_clone.classList.toggle("trending-gifo");
    slider[0].appendChild(gifos_box_clone);
    //agregamos los datos requeridos para que se visualice los gifos que están almacenados en la lista trending_gifos_array
    let gifo_img = document.getElementsByClassName("gifo-img");
    gifo_img[i].src = trending_gifos_array[i].url_gif.images.original.url;
    let title_gifo = document.getElementsByClassName("title-gifos");
    title_gifo[i].innerHTML = trending_gifos_array[i].url_gif.title;
    let user_gifo = document.getElementsByClassName("user-gifos");
    user_gifo[i].innerHTML = trending_gifos_array[i].url_gif.username == ""? "GIFOS User": trending_gifos_array[i].url_gif.username;
    //modificamos los id de los nodos que nos servirán para distintas funcionalidades como: favorito,dowlands,full screen
    gifo_img[i].id = trending_gifos_array[i].id_gif_img;
    let gifo_fav_icon = document.getElementsByClassName("icon-fav");
    gifo_fav_icon[i].id = trending_gifos_array[i].id_fav_gif_icon;
    let gifo_dow_icon = document.getElementsByClassName("icon-download");
    gifo_dow_icon[i].id = trending_gifos_array[i].id_dow_gif_icon;
    gifo_fs_icon = document.getElementsByClassName("full-screen-icon");
    gifo_fs_icon[i].id = trending_gifos_array[i].id_fs_gif_icon;
}

//______________________________________FUNCIONALIDADES FULL SCREEN TRENDING_________________________________________________

let gifoFullScreenMobile =(gifo)=>{//Funcionalidad full screen mobile, depende del id_image
    let index = trending_gifos_array.findIndex(x => x.id_gif_img == gifo.id);
    gifo_full_screen(index);
}
let gifoFullScreenDesktop =(gifo)=>{//Funcionalidad full screen desktop, depente del id del botón full screen
    let index = trending_gifos_array.findIndex(x => x.id_fs_gif_icon == gifo.id);
    gifo_full_screen(index);
}
let gifo_full_screen = (index)=>{//Función para enviar info al full screen
    full_screen_gifo.setAttribute("src", trending_gifos_array[index].url_gif.images.original.url)
    full_screen_user.textContent = trending_gifos_array[index].url_gif.username == ""? "GIFOS User": trending_gifos_array[index].url_gif.username;
    full_screen_title.textContent = trending_gifos_array[index].url_gif.title;
}

//_____________________________________FUNCIONALIDAD TRANSICIÓN DEL SLIDER TRENDING________________________________________

//agregamos los index en la lista encargada de almacenar las posiciónes de los card gifos
for(let i = 0; i < num_gifos_slider; i++){
    position_gifos.push(0); 
}
//EVENTO SLIDE DERECHO
slider_btn_right.addEventListener("click", () =>{
    if( Math.abs(position_gifos[0]) < (dist*x)){//(dist*x) es el desplazamiento maximo esperado de cada gifo
        slide_function(-dist);
        //si el ancho del slider no permite visualizar de a 3 gifos debemos realizar un desplazamiento extra,
        // y verificamos que dist_2 == 0 para que solo se realice 1a vez al llegar a ese tope
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
    let gifos_box = document.getElementsByClassName("gifos-box trending-gifo");//lo declaro dentro de la función y no afuera por la promesa utilizada anteriormente,
    //si gifos_box está afuera su longitud sería 1 y no 10, ya que, JS lee primero está variable antes de finalizar las modificaciones sobre ella en la promesa
    for (let i = 0; i<gifos_box.length;i++){
        position_gifos[i] += dist;
        gifos_box[i].style.transform = "translateX("+(position_gifos[i])+"px)";
    }
}
