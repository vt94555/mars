"use strict";

const getImages = date => {
    fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}&api_key=DEMO_KEY`)
        .then(response => response.json())
        .then(json=>processData(json));

};

const processData = data => {
    console.log(data.photos[0].img_src);
    //$("#nasa_picture").attr("src", data.photos[0].img_src);
    console.log(data.photos.length);
    
    let html = "";

    for (let i = 0; i < data.photos.length; i++) {
        let image = new Image();
        image.src = data.photos[i].img_src;
        html += `<a href=${image.src} data-lightbox="images"><img src=${image.src}></a>`;
    }
    $("#box").html(html);
};


$(document).ready( () => {

    $("#submit_date").click( ()=> {

        let date = $("#date").val();

        date = new Date(date);
         
        console.log(date);
        if (date == "Invalid Date") {
            $("#error").text("Invalid date entered, please enter date in MM/DD/YYYY format");
        } else {
            $("#error").text("");

            // use valid date to fetch NASA API
            getImages(date);
        }


    });

    $("#yesterday").click( ()=> {
        // today

        let oneday = 24*60*60*1000;
        let today = new Date();
        let yesterday = new Date(today - oneday);
        console.log(yesterday.getDate());

        yesterday = `${yesterday.getMonth() + 1}/${yesterday.getDate()}/${yesterday.getFullYear()}`;
        
        // set date text box to today's date
        $("#date").val(yesterday);

        // click submit date button
        $("#submit_date").click();

    });

});