//_________________________________FUNCIONALIDAD PARA GIFOS FAVORITOS________________________

//inicializamos la lista de favoritos
let list_favorites = () =>{
    //verificamos si existe información en el local Storage
    if(JSON.parse(localStorage.getItem("fav_gifos"))){
        //la lista de favoritos será igual a lo que se encuentre en el LocalStorage
        favorite_array = JSON.parse(localStorage.getItem("fav_gifos"));
    }else{
        //si no hay información en el LocalStorage especificamos favorite_array como una lista
        favorite_array = [];
    }
}
//funcionalidad para agregar un gifo a la lista de favoritos
let add_fav_gifo  = (url_gifo_fav)=>{
    let long = favorite_array.length;
    let gifo = new New_gifo(url_gifo_fav, "gifo-favorite-"+(long+1), "fav-icon-gf-"+(long+1),"fav-icon-act-gf-"+(long+1),"dow-icon-gf-"+(long+1),"full-screen-icon-gf-"+(long+1),"trash-icon-gf-"+(long+1));
    favorite_array.push(gifo);
    //lo enviamos al local storage pero antes lo convertimos el objeto a un JSON
    localStorage.setItem("fav_gifos",JSON.stringify(favorite_array));
}
//funcionalidad para agregar los cards de gifos favoritos
let add_fav_gifo_cards = ()=>{
    //verificamos que en haya información en la lista de favoritos
    if(favorite_array.length != 0){
        without_favorite_cotainer.style.display = "none";
        favorite_gifos_container.style.display = "block";
        //verificamos si son mas de 12 gifos favoritos para desplegarlos junto con el botón o solo los gifos
        if(favorite_array.length > 12){
            see_more_button_favorite.style.display ="block";
            //verificamos el valor final para el ciclo teniendo en cuenta que se deben agregar de a 12 gifos
            //además, controlamos que en el utilmo ciclo no se vaya a pasar la longitud de los gifos favoritos almacenados
            let lim_sup = num_gifos_favorites+12 <= favorite_array.length? 
                num_gifos_favorites+12:
                num_gifos_favorites+(favorite_array.length-num_gifos_favorites)
            ;
            for(let i=num_gifos_favorites; i<(lim_sup);i++){
                add_gifo_card(favorite_gifos_container,"gifo-favorite",favorite_array,i);
            }
            //la variable la igualamos al número de gifos cards agregados hasta el momento y será utilizado al ser llamada
            //  de nuevo la función
            num_gifos_favorites = gifo_box_favorite.length;
        }else{//en caso de ser < de 12 gifos favoritos, los desplegaremos y no mostraremos el botón
            see_more_button_favorite.style.display ="none"                    
            for(let i=0; i<favorite_array.length; i++){
                add_gifo_card(favorite_gifos_container,"gifo-favorite",favorite_array,i);
            } 
        }
        //si llegó al ultimo gif ocultamos el botón ver más
        if(favorite_array.length == num_gifos_favorites){
            see_more_button_favorite.style.display = "none"
        }

    }else{//si no tenemos resultados mostramos el div de "sin resultados"
        favorite_gifos_container.style.display = "none";
        without_favorite_cotainer.style.display = "block";
    }
}
//funcionalidad destinada a eliminar los gifos cards de la sección favoritos
let delete_gifo_card_favorite = () =>{
    //se debe hacer un ciclo inverso ya que la longitud del gifos_box_searched irá disminuyendo a medida que se elminen hijos al results_gifos_section
    for(let i=gifo_box_favorite.length-1;i>=0;i--){
        favorite_gifos_container.removeChild(gifo_box_favorite[i]);
    }
    num_gifos_favorites=0;
}
//función para ampliar los gifos favoritos mediate el botón ver más
see_more_button_favorite.addEventListener("click", () =>{
    add_fav_gifo_cards();
});