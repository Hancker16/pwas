//service Worker

if('serviceWorker' in navigator){
    console.log('SI hay sevice worker');
    navigator.serviceWorker.register('./sw.js')
    .then(res => console.log('ServiceWorker cargado correctamente',res))
    .catch(err => console.log('No se pudo registrar',err));
}else{
    console.log('No hay');
}


//Scroll Suavizado
$(document).ready(function(){
    $("#menu a").click(function(e){
        e.preventDefault();

        $("html, body").animate({
            scrollTop: $($(this).attr('href')).offset().top
        });

        return false;

    })
})