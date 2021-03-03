//FUNCIONALIDADES PARA BUSCAR GIFO
search_input[0].addEventListener("focus", () =>{
    suggest_box[0].style.display = "block";
    search_box[0].style.borderBottom =  "1px solid #9CAFC3";
});
search_input[0].addEventListener("blur", () =>{
    suggest_box[0].style.display = "none";
    search_box[0].style.borderBottom = "none";
});
let searchGifo = (x) =>{
    results_container.style.display = "block";
    if(num_gifos_results == 0){
        for(let i=0; i<12;i++){
            let gifos_box_clone = gifos_box_feature.cloneNode(true);
            results_gifos_section.appendChild(gifos_box_clone);
            num_gifos_results++;
        }
    }
}