//_________________________________FUNCIONALIDAD PARA BUSCAR GIFOS________________________

//_________________________FUNCIONALIDADES PARA DESPLEGAR CAJA DE SUGERENCIAS________________________
//desplegar caja de sugerencias al hacer focus sobre el input
search_input[0].addEventListener("focus", () =>{
    search_icon_active[0].style.display = "block";
    search_box[0].style.borderBottom =  "1px solid #9CAFC3";
    search_icon[0].style.display = "none";
    close_suggest_icon.style.display = "block";
    suggest_box[0].style.display = "block";
});
//eliminar resultados al dar clic sobre close item
close_suggest_icon.addEventListener("click", () =>{
    search_input[0].value ="";
    search_icon_active[0].style.display = "none";
    search_box[0].style.borderBottom = "none";
    close_suggest_icon.style.display = "none";
    search_icon[0].style.display = "block";
    suggest_box[0].style.display = "none";

    results_container.style.display = "none";
});
//realizar busqueda de sugerencias a GIPHY
search_input[0].addEventListener("keyup",(evento)=>{//key up para que lea el value ingresado
    if(evento.keyCode == key_code_enter){//si la tecla oprimida es enter se generá la busqueda
        searchGifo();//se llama la función de buscar 
    }else{
        suggest_box[0].style.display = "block";
        let q = "q="+search_input[0].value;//valor a buscar mediante la api
        let url_autocomplete = "https://api.giphy.com/v1/gifs/search/tags?"+q+"?&"+api_key;//generamos el link de busqueda
        //realizamos el request a la API para obtener la lista de sugerencias
        fetch(url_autocomplete)
        .then(response => response.json())
        .then(response_suggest =>{
            add_suggest(response_suggest.data);
        })
        //función para agregar las nuevas cajas de sugerencias, recibe como parametro la lista de sugerencias
        let add_suggest = (suggest_list) =>{
            const num_suggest = suggest_item.length;
            //debemos eliminar las cajas de sugerencias vijas antes de generar las nuevas sugerencias
            //se debe hacer un ciclo inverso ya que la longitud del suggest_item irá disminuyendo a medida que se elminen hijos al suggest_box
            for(let i=num_suggest-1;i>=0;i--){
                suggest_box[0].removeChild(suggest_item[i]);
            }
            //creamos las cajas de sugerencias a partir de los resultados obtenidos del api de buscar tags
            for(let i=0; i<suggest_list.length;i++){
                suggest_box_clone = suggest_item_template.cloneNode(true);
                suggest_box_clone.id = "suggest_box" + (i+1);//ID distintivo de cada sugerencia agregada
                suggest_box[0].appendChild(suggest_box_clone);
                suggest_content[i].innerHTML = suggest_list[i].name;
            }
        }
    }
});

//_________________________FUNCIONALIDADES PARA REALIZAR BUSQUEDA DE GIFOS________________________
//función llamada al hacer clic sobre una de las cajas de sugerencia
let selectSuggest = (suggest) =>{
    search_input[0].value = suggest.innerHTML;//asignamos el contenido al input de busqueda
    searchGifo();//llamamos la función de buscar gifos
}
//función de busqueda de gifos mediante la API
let searchGifo = () =>{
    search_box[0].style.borderBottom = "none";//ocultamos la linea inferior del input
    suggest_box[0].style.display = "none";//ocultamos la caja de sugerencias al realizar la busqueda
    let q = "q="+search_input[0].value;//valor a buscar mediante la api
    let url_search_gifos = "https://api.giphy.com/v1/gifs/search?"+q+"?&"+api_key;  //url de la API search gifs GIPHY
    gifos_searched_array.splice(0);//eliminamos los elementos de la lista cada vez que se realice el request
    num_gifos_results = 0;//reiniciamos la variable que permite controlar los cards creados de la busqueda
    //realizamos el request a GIPHY para obtener gifos
    results_title[0].innerHTML = search_input[0].value;//asignamos el titulo de la busqueda a partir del valor del input
    fetch(url_search_gifos)
    .then(response => response.json())
    .then(response_search => {
        //asignamos los resultados obtenidos a la lista de objetos
        for(let i=0; i<response_search.data.length;i++){
            let gifo = new New_gifo(response_search.data[i], "gifo-search-"+(i+1), "fav-icon-gs-"+(i+1),"fav-icon-act-gs-"+(i+1),"dow-icon-gs-"+(i+1),"full-screen-icon-gs-"+(i+1));
            gifos_searched_array.push(gifo);
        }
        delete_gifo_cards_finded();
        add_gifo_cards_finded();
    })
}

//función para eliminar los boxes creados de una busqueda anterior
let delete_gifo_cards_finded = () =>{
    //se debe hacer un ciclo inverso ya que la longitud del gifos_box_searched irá disminuyendo a medida que se elminen hijos al results_gifos_section
    for(let i=gifos_box_searched.length-1;i>=0;i--){
        results_gifos_section.removeChild(gifos_box_searched[i]);
    }
}
//función para agregar y asignar los nuevos gifos cards obtenidos de la API de busqueda
let add_gifo_cards_finded = () => {
    //verificamos que se hayan obtenido resultados en la busqueda
    if(gifos_searched_array.length != 0){
        search_without_result_container.style.display ="none";//ocultar contenedor de "sin resultados"
        results_container.style.display = "block";//mostrar el container de resultados por si fue oculto en una acción anterior
        see_more_button_search.style.display = "block";//mostrar el botón ver más por si fue oculto en una acción anterior
        if(num_gifos_results <= gifos_searched_array.length){
            //verificamos el valor final para el ciclo teniendo en cuenta que se deben agregar de a 12 gifos
            //además, controlamos que en el utilmo ciclo no se vaya a pasar la longitud de los gifos encontrados por la API
            let lim_sup = num_gifos_results+12 <= gifos_searched_array.length? 
                num_gifos_results+12: 
                num_gifos_results+(gifos_searched_array.length-num_gifos_results)
            ;
            for(let i=num_gifos_results; i<(lim_sup);i++){
                add_gifo_card(results_gifos_section,"gifo-searched",gifos_searched_array,i);
            }
            //la variable la igualamos al número de gifos cards agregados hasta el momento y será utilizado al ser llamada
            //  de nuevo la función
            num_gifos_results = gifos_box_searched.length;
        }
        //si llegó al ultimo gif ocultamos el botón ver más
        if(gifos_searched_array.length == num_gifos_results){
            see_more_button_search.style.display = "none";
        }
    }
    else{//si no se obtuvo resultados se muestra el bloque de "sin resultados"
        results_container.style.display = "none";
        search_without_result_title.innerHTML = search_input[0].value;
        search_without_result_container.style.display ="block";
    }
}
//función para ampliar los resultados de los gifos mediate el botón ver más
see_more_button_search.addEventListener("click", () =>{
    add_gifo_cards_finded();
});

