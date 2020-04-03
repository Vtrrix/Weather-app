const Location=document.querySelector(".location");
const temp=document.querySelector(".temperature");
const icon=document.querySelector("#icon");
const state=document.querySelector(".state");
const country=document.querySelector(".country");
const body=document.getElementsByTagName("BODY")[0]; 



const key='a8bbb58755e04cef8f02aef111c29cba'; // api key


window.addEventListener('load' ,()=>{
    let lat;
    let long;

    
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position =>{
            long=position.coords.longitude;
            lat=position.coords.latitude;

            console.log(lat,long);
            const api= `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${long}&key=${key}`;
            console.log(api);

            fetch(api)
                .then((data)=> data.json())
                .then(weather=>{


                    Location.textContent=weather.data[0].city_name;
                    temp.innerHTML=`
                        <div id="number">
                            ${textContent=weather.data[0].temp}
                        </div>
                        <div id="degree">o</div>
                        
                    `; 
                    state.textContent=weather.data[0].weather.description;
                    country.textContent=' , '+weather.data[0].country_code;

                    icon_url=weather.data[0].weather.icon;

                    if(icon_url.slice(-1)==='d'){
                        document.querySelector(".top").style.background="#f2f2f2";
                        document.querySelector(".bottom").style.background="#f2f2f2";
                        if(window.innerWidth<=450){
                            body.style.background="#f2f2f2";
                        }
            
                    }       
                    
                    else{
                        document.querySelector(".top").style.background="#333333";
                        document.querySelector(".bottom").style.background="#333333";
                        if(window.innerWidth<=450){
                            body.style.background="#333333";
                        }
                    }
                    
                    icon.innerHTML=`
                        <img src="./img/${icon_url}.png">
                    `
                })
                
        })
    }

    else{
        alert("Ops! Something went wrong try reloding the page.")
    }

})

var loc='';
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
fetch(apiUrl)
    .then((data)=> data.json())
    .then(weather=>{


        Location.textContent=weather.data[0].city_name;
        temp.innerHTML=`
            <div id="number">
                ${textContent=weather.data[0].temp}
            </div>
            <div id="degree">o</div>
        `; 
        state.textContent=weather.data[0].weather.description;
        country.textContent=' ,'+weather.data[0].country_code;

        icon_url=weather.data[0].weather.icon;

        if(icon_url.slice(-1)==='d'){
            document.querySelector(".top").style.background="#f2f2f2";
            document.querySelector(".bottom").style.background="#f2f2f2";
            if(window.innerWidth<=450){
                body.style.background="#f2f2f2";
            }

        }       
        
        else{
            document.querySelector(".top").style.background="#333333";
            document.querySelector(".bottom").style.background="#333333";
            if(window.innerWidth<=450){
                body.style.background="#333333";
            }
        }
        
        icon.innerHTML=`
            <img src="./img/${icon_url}.png">
        `
    })
}

fetch_location.addEventListener("keydown", function (e) {
    if (e.keyCode === 13) { 
        get_location();
    }
});

