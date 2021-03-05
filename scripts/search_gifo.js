//creo una clase para almacentar la url de la información de los gifos buscados, además, los id que me permitirán acceder a ellos al hacer click sobre un icon
class Search_gifo {
    constructor(url_gif, id_gif_img, id_fav_gif_icon, id_dow_gif_icon, id_fs_gif_icon){
        this.url_gif = url_gif;//url de la información del gifo en una posición especifica
        this.id_gif_img = id_gif_img;//id de la imagen que almacena el gifo
        this.id_fav_gif_icon = id_fav_gif_icon;//id del icono de favoritos de cada gifo
        this.id_dow_gif_icon = id_dow_gif_icon;//id del icono de dowlands de cada gifo
        this.id_fs_gif_icon = id_fs_gif_icon;//id del icono de full screen de cada gifo
    }
} 


//FUNCIONALIDADES PARA BUSCAR GIFO
//desplegar caja de sugerencias al hacer focus sobre el input
search_input[0].addEventListener("focus", () =>{
    search_icon_active[0].style.display = "block";
    search_box[0].style.borderBottom =  "1px solid #9CAFC3";
    search_icon[0].style.display = "none";
    close_suggest_icon.style.display = "block";
    suggest_box[0].style.display = "block";
});
//ocultar caja de sugerencias al dar clic sobre close item
close_suggest_icon.addEventListener("click", () =>{
    search_input[0].value ="";
    search_icon_active[0].style.display = "none";
    search_box[0].style.borderBottom = "none";
    close_suggest_icon.style.display = "none";
    search_icon[0].style.display = "block";
    suggest_box[0].style.display = "none";
});
//realizar busqueda de sugerencias a GIPHY
search_input[0].addEventListener("keyup",(evento)=>{//kay up para que lea el value ingresado
    if(evento.keyCode == key_code_enter){
        searchGifo();
    }else{
        suggest_box[0].style.display = "block";
        let q = "q="+search_input[0].value;//valor a buscar mediante la api
        let url_autocomplete = "https://api.giphy.com/v1/gifs/search/tags?"+q+"?&"+api_key;//generamos el link de busqueda
        fetch(url_autocomplete)
        .then(response => response.json())
        .then(response_suggest =>{
            add_suggest(response_suggest.data);
        })
        let add_suggest = (suggest_list) =>{
            const num_suggest = suggest_item.length;
            //debemos eliminar las cajas de sugerencias creadas, se debe hacer un ciclo inverso ya que la longitud del suggest_item
            //irá disminuyendo a medida que se elminen hijos al suggesto box
            for(let i=num_suggest-1;i>=0;i--){
                suggest_box[0].removeChild(suggest_item[i]);
            }
            //creamos las nuevas sugerencias a partir de la solicitud al API
            for(let i=0; i<suggest_list.length;i++){
                suggest_box_clone = suggest_item_template.cloneNode(true);
                suggest_box_clone.id = "suggest_box" + (i+1);
                suggest_box[0].appendChild(suggest_box_clone);
                suggest_content[i].innerHTML = suggest_list[i].name;
            }
        }
    }
});
let selectSuggest = (suggest) =>{
    search_input[0].value = suggest.innerHTML;
    searchGifo();
}

let searchGifo = () =>{
    search_box[0].style.borderBottom = "none";
    suggest_box[0].style.display = "none";//ocultamos la caja de sugerencias al realizar la busqueda
    let q = "q="+search_input[0].value;//valor a buscar mediante la api
    let url_search_gifos = "https://api.giphy.com/v1/gifs/search?"+q+"?&"+api_key;  
    gifos_searched_array.splice(0);//eliminamos los elementos de la lista al realizar el request
    num_gifos_results = 0;
    //realizamos el request a GIPHY
    fetch(url_search_gifos)
    .then(response => response.json())
    .then(response_search => {
        let results_title = document.getElementsByClassName("results-title")
        results_title[0].innerHTML = search_input[0].value;
        for(let i=0; i<response_search.data.length;i++){
            //creamos un nuevo objeto y lo agregamos a la lista
            let gifo = new Trending_gifo(response_search.data[i], "gifo-search-"+(i+1), "fav-icon-gs-"+(i+1),"dow-icon-gs-"+(i+1),"full-screen-icon-gs-"+(i+1));
            gifos_searched_array.push(gifo);
        }
        delete_gifo_cards_finded();
        add_gifo_cards_finded();
        console.log(gifos_searched_array);
    })
}

let delete_gifo_cards_finded = () =>{
    //eliminamos los boxes creados de una busqueda anterior
    for(let i=gifos_box_searched.length-1;i>=0;i--){
        results_gifos_section.removeChild(gifos_box_searched[i]);
    }
}

let add_gifo_cards_finded = () => {
    results_container.style.display = "block";
    if(num_gifos_results <= gifos_searched_array.length){
        //verificamos el valor final para el ciclo teniendo en cuenta que se deben agregar de a 12 gifos
        //además, controlamos que en el utilmo ciclo no se vaya a pasar la longitud de los gifos encontrados por la API
        let lim_sup = num_gifos_results+12 <= gifos_searched_array.length? 
            num_gifos_results+12 : num_gifos_results+(gifos_searched_array.length-num_gifos_results)
        ;
        for(let i=num_gifos_results; i<(lim_sup);i++){
            //clonamos y agregamos el nodo en donde se requiere
            let gifos_box_clone = gifos_box_template.cloneNode(true);
            gifos_box_clone.classList.toggle("gifo-searched");
            gifos_box_clone.style.display = "inline-block";
            results_gifos_section.appendChild(gifos_box_clone);
            // let gifo_img = document.querySelectorAll("img#gifo-img");
            let gifo_img = document.getElementsByClassName("gifo-img");
            gifo_img[i].src = gifos_searched_array[i].url_gif.images.original.url;
            let title_gifo = document.getElementsByClassName("title-gifos");
            title_gifo[i].innerHTML = gifos_searched_array[i].url_gif.title;
            let user_gifo = document.getElementsByClassName("user-gifos");
            user_gifo[i].innerHTML = gifos_searched_array[i].url_gif.username == ""? "GIFOS User": gifos_searched_array[i].url_gif.username;
            //modificamos los id de los nodos que nos servirán para distintas funcionalidades como: favorito,dowlands,full screen
            gifo_img[i].id = gifos_searched_array[i].id_gif_img;
            let gifo_fav_icon = document.getElementsByClassName("icon-fav");
            gifo_fav_icon[i].id = gifos_searched_array[i].id_fav_gif_icon;
            let gifo_dow_icon = document.getElementsByClassName("icon-download");
            gifo_dow_icon[i].id = gifos_searched_array[i].id_dow_gif_icon;
            gifo_fs_icon = document.getElementsByClassName("full-screen-icon");
            gifo_fs_icon[i].id = gifos_searched_array[i].id_fs_gif_icon;
        }
        num_gifos_results = gifos_box_searched.length;
    }
}

let see_more_button = document.getElementById("see-more-button");
see_more_button.addEventListener("click", () =>{
    add_gifo_cards_finded();
    console.log(gifos_searched_array);
});

