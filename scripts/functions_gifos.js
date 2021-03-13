//creo una clase para almacentar la url de la información de los gifos buscados, además, los id que me permitirán acceder a ellos al hacer click sobre un icon
class New_gifo {
    constructor(url_gif, id_gif_img, id_fav_gif_icon,id_fav_gif_activate_icon, id_dow_gif_icon, id_fs_gif_icon){
        this.url_gif = url_gif;//url de la información del gifo en una posición especifica
        this.id_gif_img = id_gif_img;//id de la imagen que almacena el gifo
        this.id_fav_gif_icon = id_fav_gif_icon;//id del icono de favoritos de cada gifo
        this.id_fav_gif_activate_icon = id_fav_gif_activate_icon //id del icono de favorito activado
        this.id_dow_gif_icon = id_dow_gif_icon;//id del icono de dowlands de cada gifo
        this.id_fs_gif_icon = id_fs_gif_icon;//id del icono de full screen de cada gifo
    }
} 

//______________________________________FUNCIONALIDADES ADICIONAR UNA GIFO CARD_________________________________________________
let add_gifo_card =(parent_node,specific_class,gifos_list,i)=>{
    //clonamos y agregamos el nodo en donde se requiere
    let gifos_box_clone = gifos_box_template.cloneNode(true);
    gifos_box_clone.style.display = "inline-block";
    gifos_box_clone.classList.toggle(specific_class);//agregamos una clase que diferencie los gifos cards de la sección
    parent_node.appendChild(gifos_box_clone);
    //seleccionamos los gifos-img del label que se encuentra en el div con las clases .gifos-box&.gifo-searched 
    let gifo_img = document.querySelectorAll("div.gifos-box."+ specific_class+" >label> img.gifo-img");
    gifo_img[i].src = gifos_list[i].url_gif.images.original.url;
    let title_gifo = document.querySelectorAll("div.gifos-box."+ specific_class+">div.gifos-box-hover>p.title-gifos");
    title_gifo[i].innerHTML = gifos_list[i].url_gif.title;
    let user_gifo = document.querySelectorAll("div.gifos-box."+ specific_class+">div.gifos-box-hover>p.user-gifos");
    user_gifo[i].innerHTML = gifos_list[i].url_gif.username == ""? "GIFOS User": gifos_list[i].url_gif.username;
    //modificamos los id de los nodos que nos servirán para distintas funcionalidades como: favorito,dowlands,full screen
    gifo_img[i].id = gifos_list[i].id_gif_img;
    let gifo_fav_icon = document.querySelectorAll("div.gifos-box."+ specific_class+"> div.gifos-box-hover> div.icons-gifos-box> div.icon-fav");
    gifo_fav_icon[i].id = gifos_list[i].id_fav_gif_icon;
    let gifo_fav_icon_act = document.querySelectorAll("div.gifos-box."+ specific_class+"> div.gifos-box-hover> div.icons-gifos-box> div.fav-icon-activate");
    gifo_fav_icon_act[i].id = gifos_list[i].id_fav_gif_activate_icon;
    let gifo_dow_icon = document.querySelectorAll("div.gifos-box."+ specific_class+"> div.gifos-box-hover> div.icons-gifos-box> div.icon-download");
    gifo_dow_icon[i].id = gifos_list[i].id_dow_gif_icon;
    gifo_fs_icon = document.querySelectorAll("div.gifos-box."+ specific_class+"> div.gifos-box-hover> div.icons-gifos-box> div.full-screen-icon");
    gifo_fs_icon[i].id = gifos_list[i].id_fs_gif_icon;
    //verificamos si el gifo agregado se encuentra en la lista de favoritos
    display_fav_act_icon(gifos_list[i],i);
}

//______________________________________FUNCIONALIDADES FULL SCREEN TRENDING_________________________________________________
//utilizo la parte string de los nombres de los id para verificar desde donde se está llamando

let gifoFullScreenMobile =(gifo)=>{//Funcionalidad full screen mobile, depende del id_image
    if(gifo.id.slice(0,13) == "gifo-trending"){//identificamos si pertenece al trending
        let index = trending_gifos_array.findIndex(x => x.id_gif_img == gifo.id);
        gifo_full_screen(index,trending_gifos_array);
    }else if(gifo.id.slice(0,11) == "gifo-search"){//identificamos si pertenece a search
        let index = gifos_searched_array.findIndex(x => x.id_gif_img == gifo.id);
        gifo_full_screen(index,gifos_searched_array);
    }else if(gifo.id.slice(0,13) == "gifo-favorite"){
        let index = favorite_array.findIndex(x => x.id_gif_img == gifo.id);
        gifo_full_screen(index,favorite_array);
    }
}
let gifoFullScreenDesktop =(gifo)=>{//Funcionalidad full screen desktop, depente del id del botón full screen
    if(gifo.id.slice(0,19) == "full-screen-icon-gt"){//identificamos si pertenece al trending
        let index = trending_gifos_array.findIndex(x => x.id_fs_gif_icon == gifo.id);
        gifo_full_screen(index,trending_gifos_array);
    }else if(gifo.id.slice(0,19) == "full-screen-icon-gs"){//identificamos si pertenece a search
        let index = gifos_searched_array.findIndex(x => x.id_fs_gif_icon == gifo.id);
        gifo_full_screen(index,gifos_searched_array);
    }else if(gifo.id.slice(0,20) == "full-screen-icon-fav"){
        let index = favorite_array.findIndex(x => x.id_fs_gif_icon == gifo.id);
        gifo_full_screen(index,favorite_array);
    }
}
let gifo_full_screen = (index, gifos_list)=>{//Función para enviar info al full screen
    full_screen_gifo.setAttribute("src", gifos_list[index].url_gif.images.original.url)
    full_screen_user.textContent = gifos_list[index].url_gif.username == ""? "GIFOS User": gifos_list[index].url_gif.username;
    full_screen_title.textContent = gifos_list[index].url_gif.title;
    full_screen_icon_fav[0].id = gifos_list[index].id_fav_gif_icon;
    full_screen_icon_fav_act[0].id  = gifos_list[index].id_fav_gif_activate_icon;
    full_screen_icon_dow[0].id = gifos_list[index].id_dow_gif_icon;
    //verificamos si el gifo ampliado se encuentra en la lista de favoritos y así mostrar el icono fav especifico
    let ind = favorite_array.findIndex(x => x.url_gif.id == gifos_list[index].url_gif.id);
    if(ind != -1){
        full_screen_icon_fav[0].style.display ="none";
        full_screen_icon_fav_act[0].style.display ="inline-block";
    }else{
        //en caso de que la condición anterior se haya cumplido con un gifo anterior
        full_screen_icon_fav[0].style.display ="inline-block";
        full_screen_icon_fav_act[0].style.display ="none";
    }
}

//______________________________________FUNCIONALIDADES PARA AGREGAR UN GIFO A FAVORITOS_________________________________________________
let addFavoriteGifo = (icon_fav) =>{
    if(icon_fav.id.slice(0,12) == "fav-icon-gt-"){
        let index = trending_gifos_array.findIndex(x => x.id_fav_gif_icon == icon_fav.id);
        fav_bttn_efect("trending-gifo","gt",index)
        add_fav_gifo(trending_gifos_array[index].url_gif);
    }else if(icon_fav.id.slice(0,12) == "fav-icon-gs-"){
        let index = gifos_searched_array.findIndex(x => x.id_fav_gif_icon == icon_fav.id);
        fav_bttn_efect("gifo-searched","gs",index)
        add_fav_gifo(gifos_searched_array[index].url_gif);
    }
    if(favorite_gifos_section.style.display == "block"){
        //si está activado la ventana de favoritos necesitamos que se muestre el gif que se agregue
        delete_gifo_card_favorite();
        add_fav_gifo_cards();
    }
}
//______________________________________FUNCIONALIDADES PARA MODIFICAR EL BOTÓN DE FAVORITOS_________________________________________________
//necesitamos modificar el icono de favoritos al momento en que se haga click sobre él

let fav_bttn_efect = (gifo_type,g_type,index) => {
    //botónes del hover-fav
    let btn_fav_normal = document.querySelectorAll("div." + gifo_type + "> div.gifos-box-hover > div.icons-gifos-box > div#fav-icon-"+g_type+"-"+ (index+1));
    btn_fav_normal[0].style.display = "none";
    let btn_fav_activate = document.querySelectorAll("div." + gifo_type + "> div.gifos-box-hover > div.icons-gifos-box > div#fav-icon-act-"+g_type+"-"+ (index+1));
    btn_fav_activate[0].style.display = "inline-block";
    //botónes del full screen-fav
    let btn_fav_normal_fs = document.querySelectorAll("div.full-screen-container > div.icon-fav-full-screen ");
    btn_fav_normal_fs[0].style.display = "none";
    let btn_fav_active_fs = document.querySelectorAll("div.full-screen-container > div.fs-fav-act-box ");
    btn_fav_active_fs[0].style.display = "inline-block";
};

//________________FUNCIONALIDAD PARA IDENTIFICAR SI UN GIFO SE ENCUENTRA EN LA LISTA DE FAVORITOS_____________________
//la utilizo para
let display_fav_act_icon = (gifo,i) =>{
    //verificamos la existencia del gifo en la lista de favoritos mediante el ID
    let index = favorite_array.findIndex(x => x.url_gif.id == gifo.url_gif.id);
    if(index != -1){
        // estoy identificando si el gifo.id_fav_gif_icon es "fav-icon-gt-", "fav-icon-gs-" ó fav-icon-gf-
        let id_gifo_fav = gifo.id_fav_gif_icon.slice(0,12);
        let fav_icon_normal = document.querySelectorAll("div#"+id_gifo_fav+(i+1));
        fav_icon_normal[0].style.display ="none";
        //estoy identificando si el gifo.id_fav_gif_activate_icon es "fav-icon-act-gt-", "fav-icon-act-gs-" ó "fav-icon-act-gf-"
        let id_gifo_fav_act = gifo.id_fav_gif_activate_icon.slice(0,16);
        let fav_icon_act = document.querySelectorAll("div#"+id_gifo_fav_act+(i+1));
        fav_icon_act[0].style.display ="block";
    }
}