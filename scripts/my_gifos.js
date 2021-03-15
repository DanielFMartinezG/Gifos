//_________________________________ FUNCIONALIDADES PARA MIS GIFOS ________________________

//inicializamos la lista de gifos creados
let list_gifos_created = () =>{
    //verificamos si existe información en el local Storage
    if(JSON.parse(localStorage.getItem("new_gifo"))){
        //la lista de gifos creados será igual a lo que se encuentre en el LocalStorage
        created_gifos_array = JSON.parse(localStorage.getItem("new_gifo"));
    }else{
        //si no hay información en el LocalStorage especificamos created_gifos_array como una lista
        created_gifos_array = [];
    }
}
//funcionalidad para agregar los cards de mis gifos
let add_my_gifo_cards = () =>{
    if(created_gifos_array.length != 0 ){
        without_my_gifos.style.display = "none";
        mis_gifos_container.style.display = "block";
        //verificamos si son mas de 12 gifos favoritos para desplegarlos junto con el botón o solo los gifos
        if(created_gifos_array.length > 12){
            see_more_button_myGifos.style.display = "block";
            //verificamos el valor final para el ciclo teniendo en cuenta que se deben agregar de a 12 gifos
            //además, controlamos que en el utilmo ciclo no se vaya a pasar la longitud de los gifos favoritos almacenados
            let lim_sup = num_gifos_myGifos+12 <= created_gifos_array.length? 
            num_gifos_myGifos+12:
            num_gifos_myGifos+(created_gifos_array.length-num_gifos_myGifos)
            ;
            for(let i=num_gifos_myGifos; i<(lim_sup);i++){
                add_gifo_card(mis_gifos_container,"gifo-myGifo",created_gifos_array,i);
                let fav_icon_mygifos = document.getElementById("fav-icon-gc-"+(i+1));
                fav_icon_mygifos.style.display = "none";
                let trash_icon_mygifos =  document.getElementById("trash-icon-gc-"+(i+1));
                trash_icon_mygifos.style.display = "inline-block";
            }
            //la variable la igualamos al número de gifos cards agregados hasta el momento y será utilizado al ser llamada
            //  de nuevo la función
            num_gifos_myGifos = gifo_box_myGifo.length;
        }else{
            see_more_button_myGifos.style.display = "none";
            for(let i=0; i<created_gifos_array.length; i++){
                add_gifo_card(mis_gifos_container,"gifo-myGifo",created_gifos_array,i);
                let fav_icon_mygifos = document.getElementById("fav-icon-gc-"+(i+1));
                fav_icon_mygifos.style.display = "none";
                let trash_icon_mygifos =  document.getElementById("trash-icon-gc-"+(i+1));
                trash_icon_mygifos.style.display = "inline-block";
            } 
        }
        //si llegó al ultimo gif ocultamos el botón ver más
        if(created_gifos_array.length == num_gifos_myGifos){
            see_more_button_myGifos.style.display = "none"
        }
    }else{//si no tenemos resultados mostramos el div de "sin resultados"
        mis_gifos_container.style.display = "none";
        without_my_gifos.style.display = "block";
    }
}
//funcionalidad destinada a eliminar los gifos cards de la sección mis gifos
let delete_gifo_card_miGifos = () =>{
        //se debe hacer un ciclo inverso ya que la longitud del gifos_box_myGifos irá disminuyendo a medida que se elminen hijos al results_gifos_section
        for(let i=gifo_box_myGifo.length-1;i>=0;i--){
            mis_gifos_container.removeChild(gifo_box_myGifo[i]);
        }
        num_gifos_myGifos=0;
}
//función para ampliar los gifos favoritos mediate el botón ver más
see_more_button_myGifos.addEventListener("click", () =>{
    add_my_gifo_cards();
});

//eliminar gifo de la lista mis gifos
let deleteGifo = (myGifo) =>{
    let index =  created_gifos_array.findIndex(x => x.id_trash_icon == myGifo.id);
    created_gifos_array.splice(index,1);//en la posición index eliminaremos un elemento
    for(let i=0;i<created_gifos_array.length;i++){
        created_gifos_array[i].id_dow_gif_icon =  "dow-icon-gc-"+(i+1);
        created_gifos_array[i].id_fav_gif_activate_icon = "fav-icon-act-gc-"+(i+1);
        created_gifos_array[i].id_fav_gif_icon = "fav-icon-gc-"+(i+1);
        created_gifos_array[i].id_fs_gif_icon = "full-screen-icon-gc-"+(i+1);
        created_gifos_array[i].id_gif_img= "gifo-created-"+(i+1);
        created_gifos_array[i].id_trash_icon =  "trash-icon-gc-"+(i+1);
    }
    localStorage.setItem("new_gifo",JSON.stringify(created_gifos_array));
    delete_gifo_card_miGifos();
    add_my_gifo_cards();

    let check_fs = document.getElementById("show_full_screen");
    check_fs.checked = false;
}