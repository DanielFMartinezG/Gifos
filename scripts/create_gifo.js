//_________________________________FUNCIONALIDADES PARA CREAR UN NUEVO GIFO________________________

//funcionalidad para efectos de la camara de crear gifo
let camara_effect = () =>{
    camara_tape_effect("big-camara-tape-img");
    camara_tape_effect("small-camara-tape-img");
    high_light.classList.toggle("turn-off");
    rotate += 45;
}
let camara_tape_effect = (tape)=>{
    let big_camara_tape = document.getElementsByClassName(tape)[0];
    big_camara_tape.style.transform = "rotate("+(rotate)+"deg)";
}

//____________FUNCIONALIDAD BTN COMENZAR A CREAR UN GIFO________________
btn_start_gifo.addEventListener("click",()=>{
    create_gifo_start.classList.toggle("show-gifo-step");//ocultamos mensaje de comenzar a crear gifo
    create_gifo_acces_cam.classList.toggle("show-gifo-step");//mostramos el mensaje de acceso a la camara
    btn_start_gifo.classList.toggle("show-bttn");//ocultamos el botón de comenzar
    step_item[0].classList.toggle("step-item-selected");//aplicamos efecto al step 1
    acces_user_cam();
});

//_____________________FUNCIONALIDAD STEP 1- ACCESO A LA CAMARA_______________
let acces_user_cam = () =>{
    navigator.mediaDevices.getUserMedia({//solicitamos acceso a la camara
        audio: false,
        video: {
            height: { max: 320 }
        }    
    })
    .then(response_stream =>{
        //obtenemos un objeto mediaStream
        show_record_elements(response_stream);
    });    
}
let show_record_elements = (stream) =>{
    cam_stream.srcObject = stream;//asignamos la respuesta de la promesa como src del video
    cam_stream.play();//función especifica play()
    create_gifo_acces_cam.classList.toggle("show-gifo-step");//ocultamos mensaje de acceso a camara
    cam_screen_container.classList.toggle("show-gifo-step");//mostramos caja de video stream
    btn_record_gifo.classList.toggle("show-bttn");//mostramos el botón de comenzar a grabar
    step_item[0].classList.toggle("step-item-selected");//quitamos el efecto al step 1
    step_item[1].classList.toggle("step-item-selected");//asignamos el efecto al step 2
    video_stream = stream;//almacenamos el stream para utilizarlo con recordRTC
}

//_____________________STEP2- REALIZAR GRABACIÓN____________________
//función para llamar el metodo recordRTC
let functions_stream = () =>{
    //utilizamos la función RecordRTC de la librería importada y lo almacenamos
    recorder = RecordRTC(video_stream, {
        type: 'gif',
        frameRate: 1,
        quality: 10,
        width: 360,
        hidden: 240,
        onGifRecordingStarted: function() {
            console.log('started')
        },
    });
    recorder.startRecording();//función de recordRTC para comenzar a grabar
    timekeeper_item.style.display = "block";
    timekeeper =  setInterval(timekeeper_function,1000);
}
//FUNCIONALIDAD DEL BTON GRABAR
btn_record_gifo.addEventListener("click", () =>{
    btn_record_gifo.classList.toggle("show-bttn");//ocultamos el botón de comenzar a grabar
    btn_end_gifo.classList.toggle("show-bttn");//mostramos el botón de finalizar grabación
    functions_stream();//llamamos la función en la que está almacenado el metodo RecordRTC
});
//BTN DETENER GRABACIÓN
btn_end_gifo.addEventListener("click", () =>{
    recorder.stopRecording(function() {//función de recordRTC para terminar de grabar
        // Un blob es una manera de guardar datos que eventualmente se puede transformar 
        // en un archivo para ser leído por el sistema operativo
        var blob = this.getBlob();
        //           (key ,file  ,file_name)
        form.append('file', blob, 'myGif.gif');//agregamos el blob a una variable form Data
        clearInterval(timekeeper);//detenemos el cronometro
        //habilitamos la obción de grabar nuevamente
        timekeeper_item.style.display = "none";
        record_again.style.display = "block";
        btn_end_gifo.classList.toggle("show-bttn");//ocultamos el botón de finalizar grabación
        btn_up_gifo.classList.toggle("show-bttn");//mostramos el botón de subir gifo
    });
});
//FUNCIONALIDAD DESTINADA A APAGAR LA CAMARA
function stopStreamedVideo(videoElem) {
    const stream = videoElem.srcObject;
    const tracks = stream.getTracks();
    tracks.forEach(function(track) {
    track.stop();
    });
    videoElem.srcObject = null;
}
//BTN_GRABAR NUEVAMENTE
record_again.addEventListener("click", ()=>{
    btn_up_gifo.classList.toggle("show-bttn");//ocultamos el botón subir gifo
    btn_end_gifo.classList.toggle("show-bttn");//mostramos el botón de finalizar grabación nuevamente
    //habilitamos y reiniciamos el cronometro
    record_again.style.display = "none";
    timekeeper_item.innerHTML = "00:00:00";
    hours = ["0","0"];
    minutes = ["0","0"];
    seconds = ["0","0"];
    //eliminamos el video almacenado previamente
    form.delete('file');
    functions_stream();//llamamos la función en la que está almacenado el metodo RecordRTC    
});

//_____________________STEP 3- SUBIR GIFO____________________

//BTON SUBIR GIFO A GIPHY
btn_up_gifo.addEventListener("click", ()=>{
    record_again.style.display = "none";//ocultamos la opción de grabar nuevamente
    btn_up_gifo.classList.toggle("show-bttn");//ocultamos el botón de subir gifo
    step_item[1].classList.toggle("step-item-selected");//quitamos el efecto al step 2
    step_item[2].classList.toggle("step-item-selected");//asignamos el efecto al step 3
    uploannding_gifo_box.style.display = "block";//habilitamos hover de subiendo gifo
    upload_new_gifo();
});
//función de la API destinada a subir un gifo a giphy mediante el API
let upload_new_gifo = () =>{
    //EL REQUEST A REALIZAR NO ES DEL TIPO GET SINO DEL TIPO POST, ESTO HAY QUE ESPECIFICARLO
    fetch(url_upload_gifo,{
        method: "POST",
        body: form//enviamos el form que almacena el blob del video
    }).then(response => response.json())
    .then(data =>{
        //obtenemos un ID que representa al gifo creado
        console.log(data.data.id);
        //mediante el id del nuevo gifo hacemos un nuevo request mediante la API de busqueda
        search_gifo_byId(data.data.id);
    }).catch(mesagge_error => console.log(mesagge_error));
}
//Función de la API destinada a buscar gifo mediante su ID
let search_gifo_byId = (gif_id)=>{
    let url_search_gifos_by_ID = "https://api.giphy.com/v1/gifs/"+gif_id+"?&"+api_key;
    fetch(url_search_gifos_by_ID)
    .then(response => response.json())
    .then(data_new_gifo => {
        //creamos un nuevo objeto que represente al gifo creado y lo almacenamos en el local storage
        let long = created_gifos_array.length;
        let gifo = new New_gifo(data_new_gifo.data, "gifo-created-"+(long+1), "fav-icon-gc-"+(long+1),"fav-icon-act-gc-"+(long+1),"dow-icon-gc-"+(long+1),"full-screen-icon-gc-"+(long+1),"trash-icon-gc-"+(long+1));
        created_gifos_array.push(gifo);
        localStorage.setItem("new_gifo",JSON.stringify(created_gifos_array));
        uploannding_gifo_box.style.display = "none";//ocultamos el hover de subiendo gifo
        uploaded_gifo_box.style.display = "block";//habilitamos el hover de gifo subido con exito
        //si fue subido con exito procedemos a apagar la camara y mostrar el img con el gif subido    
        stopStreamedVideo(cam_stream);
        cam_stream.style.display = "none";
        let gif_stream = document.getElementsByClassName("gif-stream")[0];
        gif_stream.style.display = "block";
        gif_stream.src = data_new_gifo.data.images.original.url;
    });
}

//_________________-_______FUNCIONALIDAD DEL CRONOMETRO_______________________
let timekeeper_function = ()=>{
    seconds[1] = parseInt(seconds[1]) + 1; 
    //verificación segundos
    if(seconds[1] == 10){
        seconds[0] = ""; 
    }else if(seconds[1] == 60){
        minutes[1]= (parseInt(minutes[1])+1).toString(); 
        seconds[0] = "0";
        seconds[1] = "0";
    }
    //verificación minutos
    if(minutes[1]==10){
        minutes[0] = ""; 
    }else if(minutes[1] == 60){
        hours[1]= (parseInt(hours[1])+1).toString(); 
        minutes[0] = "0";
        minutes[1] = "0";
    }
    //verificacón horas
    if(hours[1]==10){
        hours[0] = ""; 
    }else if(hours[1]==24){
        hours[0] = "0";
        hours[1] = "0";
    }
    let hs = hours[0]+hours[1];
    let mm = minutes[0] + minutes[1];
    let ss = seconds[0] + seconds[1];
    timekeeper_item.innerHTML = hs +":"+mm+":"+ss;
}