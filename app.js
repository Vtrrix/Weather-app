const Location=document.querySelector(".location");
const temp=document.querySelector(".temperature");
const icon=document.querySelector("#icon");
const state=document.querySelector(".state");
const country=document.querySelector(".country");
const body=document.getElementsByTagName("BODY")[0]; 
let more = document.querySelector(".more");
let open = false ;//tto check if more is open 
let arrow = document.querySelector(".arrow");


// To make arrow responsive for mobile view
if(window.innerWidth>450){
    more.style.height="620px";
    arrow.innerHTML=`
    <img src="./img/right-arrow.png" alt="more info">
    `;
}

else{
    more.style.widht="380px";
    arrow.innerHTML=`
    <img src="./img/down-arrow.png" alt="more info">
    `;
}


const key='a8bbb58755e04cef8f02aef111c29cba'; // api key

let find_colors= ()=>{
    
    let lines = document.querySelectorAll(".line");
    let i;

    if(icon_url.slice(-1)==='d'){

        document.querySelector("#weather").style.background="#f2f2f2";
        more.style.background="#f2f2f2";
        more.style.color="#333333";

        for(i=0 ; i<lines.length ; i++){
            lines[i].style.border="1px solid #333333";
        }
        if(window.innerWidth<=450){
            body.style.background="#f2f2f2";
        }

    }       
    
    else{
        document.querySelector("#weather").style.background="#333333";
        more.style.background="#333333";
        more.style.color="#f2f2f2";

        for(i=0 ; i<lines.length ; i++){
            lines[i].style.border="1px solid #f2f2f2";
        }

        if(window.innerWidth<=450){
            body.style.background="#333333";
        }
    }
}


let fetch_data= (api)=>{

    fetch(api)
                .then( data => data.json())
                .then( weather =>{


                    Location.textContent=weather.data[0].city_name;
                    temp.innerHTML=`
                        <div id="number">
                            ${weather.data[0].temp}
                        </div>
                        <div id="degree">o</div>
                        
                    `; 
                    state.textContent=weather.data[0].weather.description;
                    country.textContent=' , '+weather.data[0].country_code;

                    icon_url=weather.data[0].weather.icon;
                    
                    
                    
                    icon.innerHTML=`
                        <img src="./img/${icon_url}.png">
                    `

                    more.innerHTML = `
                    

                        <div class="data">
                            <div class="label">
                               Wind Speed 
                            </div>
                            <hr class="divider line"></hr>
                            <div class="number">
                                ${(weather.data[0].wind_spd).toFixed(2)} km/h
                            </div>
                        </div>
                        <hr class="line">
                        <div class="data">
                            <div class="label">
                                Precipitation 
                            </div>
                            <hr class="divider line"></hr>
                            <div class="number">
                                ${weather.data[0].precip} mm/hr
                            </div>
                        </div>
                        <hr class="line">
                        <div class="data">
                            <div class="label">
                                Snowfall 
                            </div>
                            <hr class="divider line"></hr>
                            <div class="number">
                                ${weather.data[0].snow} mm/hr
                            </div>
                        </div>
                        <hr class="line">
                        <div class="data">
                            <div class="label">
                                Humidity 
                            </div>
                            <hr class="divider line"></hr>
                            <div class="number">
                                ${weather.data[0].rh} %
                            </div>
                        </div>
                        <hr class="line">
                        <div class="data">
                            <div class="label">
                                Visibility 
                            </div>
                            <hr class="divider line"></hr>
                            <div class="number">
                                ${weather.data[0].vis} km
                            </div>
                        </div>
                        <hr class="line">
                        <div class="data">
                            <div class="label">
                                Pressure 
                            </div>
                            <hr class="divider line"></hr>
                            <div class="number">
                                ${weather.data[0].pres} mb
                            </div>
                        </div>
                        
                    `
                    find_colors();

                })

}




window.addEventListener('load' ,()=>{
    
    let lat;
    let long;
    
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position =>{
            
            long=position.coords.longitude;
            lat=position.coords.latitude;

            const api= `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${long}&key=${key}`;
            console.log(api);
            fetch_data(api);                
        })
    }

    else{
        alert("Ops! Something went wrong try reloding the page.")
    }

})

let loc='';
let fetchLOC = document.getElementById("fetch_location");

fetchLOC.value = "";
function get_location(){


    Location.textContent='-';
    temp.textContent='-';
    state.textContent='-';
    country.textContent=' ';
    icon.innerHTML='-';

    console.log(fetchLOC.value);
    let fetched_location= fetchLOC.value;
    console.log(fetched_location);  
    loc=fetched_location;  
    const apiUrl=`https://api.weatherbit.io/v2.0/current?city=${loc}&key=${key}`;


    console.log(apiUrl);
    fetch_data(apiUrl);

}

let moreInfo=()=>{

    if(!open){
        more.style.width="380px";
        more.style.height="620px";
        more.style.padding="30px";
        arrow.style.transform = 'rotate(180deg)';
    }
    else{
        more.style.width="0";
        more.style.height="0";
        more.style.padding="0";
        arrow.style.transform = 'rotate(0deg)';

    }
    open= !open;    
    //document.querySelector(".arrow")
}

fetch_location.addEventListener("keydown", e=> {
    if (e.keyCode === 13) { 
        get_location();
    }
});

