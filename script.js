const apikey = "7f5dd2cab19c1bac1c82a32f1ebf192f";
const apiurl = "https://api.openweathermap.org/data/2.5/weather?units=metric&appid=" + apikey;

const SearchBox = document.querySelector(".search input");
const SearchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".Weather-icon");

async function checkWeather(city) {
    const response = await fetch(apiurl + "&q=" + city);
    const data = await response.json();

    if(response.status==404){
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";       
    }else{
        if (data.cod === 200) {  // تأكد من أن المدينة صحيحة
            document.querySelector(".City").innerHTML = data.name;
            document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
            document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
            document.querySelector(".wind").innerHTML = data.wind.speed + " Km/h";
            
            // اختيار الأيقونة حسب حالة الطقس
            if (data.weather[0].main.toLowerCase() === "clouds") {
                weatherIcon.src = "clouds.png"; // ضع مسار صورة السحب
            } else if (data.weather[0].main.toLowerCase() === "clear") {
                weatherIcon.src = "clear.png"; // ضع مسار صورة الجو الصافي
            } else if (data.weather[0].main.toLowerCase() === "rain") {
                weatherIcon.src = "rain.png"; // ضع مسار صورة المطر
            } else if (data.weather[0].main.toLowerCase() === "drizzle") {
                weatherIcon.src = "drizzle.png"; // ضع مسار صورة الرذاذ
            } else if (data.weather[0].main.toLowerCase() === "mist") {
                weatherIcon.src = "mist.png"; // ضع مسار صورة الضباب
            }
        } else {
            console.error("City not found:", data.message);
        }
        document.querySelector(".wearher").style.display = "block" ;
    }
    }
    
// إضافة الحدث "click" خارج الدالة checkWeather حتى لا يتم إضافته في كل مرة يتم فيها استدعاء الدالة
SearchBtn.addEventListener("click", () => {
    checkWeather(SearchBox.value);
});

