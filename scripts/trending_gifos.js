//_________________________________FUNCIONALIDAD PARA CREAR LOS GIFS CARDS DEL TRENDING_____________________

//realizamos el request y almacenamos el resultado de la promesa en la lista trending_gifos_array
let fetch_gifo_trending =() => {
    fetch(url_trending)
    .then(responese => responese.json())
    .then(gifo_response => {
        // console.log(gifo_response.data[0]);
        for(let i=0; i<num_gifos_slider; i++){
            let gifo = new New_gifo(gifo_response.data[i], "gifo-trending-"+(i+1), "fav-icon-gt-"+(i+1),"fav-icon-act-gt-"+(i+1),"dow-icon-gt-"+(i+1),"full-screen-icon-gt-"+(i+1),"trash-icon-gt-"+(i+1));
            trending_gifos_array.push(gifo);
            gifo_trending(i);
        }
    }).catch(message_error => console.log(message_error));
}
//Función para crear el nuevo nodo con su GIF y IDs respestivos en el carrusel
let gifo_trending = (i) =>{
    add_gifo_card(slider[0],"trending-gifo",trending_gifos_array,i);
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
