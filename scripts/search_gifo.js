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
        // suggest_box[0].style.display = "none";
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
// search_input[0].addEventListener("keydown",(evento)=>{
//     if(evento.keyCode == key_code_enter){
//         suggest_box[0].style.display = "none";
//         searchGifo();
//     }
// });
let selectSuggest = (suggest) =>{
    search_input[0].value = suggest.innerHTML;
    searchGifo();
}




let searchGifo = () =>{
    search_box[0].style.borderBottom = "none";
    suggest_box[0].style.display = "none";    
    let q = "q="+search_input[0].value;//valor a buscar mediante la api
    let url_search_gifos = "https://api.giphy.com/v1/gifs/search?"+q+"?&"+api_key;  
    let gifos_searched_array = [];
    fetch(url_search_gifos)
    .then(response => response.json())
    .then(response_search => {
        gifos_searched_array = response_search.data.slice(0, response_search.data.length);
        add_gifo_cards_finded(gifos_searched_array);
    })
    let add_gifo_cards_finded = (gifos_array) => {

        let gifos_box = document.getElementsByClassName("gifos-box");
        let num_gifos_searched = gifos_box.length -10;
        for(let i=num_gifos_searched-1;i>=0;i--){
            results_gifos_section.removeChild(gifos_box[i]);
        }


        let gifo_img = document.getElementsByClassName("gifo-img");
        console.log(gifos_array);
        results_container.style.display = "block";
        // if(num_gifos_results == 0){
            for(let i=0; i<gifos_array.length;i++){
                let gifos_box_clone = gifos_box_template.cloneNode(true);
                gifos_box_clone.style.display = "inline-block";
                results_gifos_section.appendChild(gifos_box_clone);
                

                gifo_img[i].src = gifos_array[i].images.original.url;
                num_gifos_results++;
            }
            // console.log(gifo_img);
        // }
    }
}