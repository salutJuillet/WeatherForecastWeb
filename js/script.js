'use strict';


let myLat = 0, myLon = 0;
const search = document.getElementsByClassName("search")[0];
const searchBox = document.getElementsByClassName("searchBox")[0];

search.addEventListener("click", function(){
   searchBox.classList.add("active");
   document.getElementById("search").focus();
});

document.getElementById("search").addEventListener("blur", function(){
   searchBox.classList.remove("active");
});

//위치값 받아오기
if(navigator.geolocation) {
   navigator.geolocation.getCurrentPosition(function(position){
       myLat = position.coords.latitude;
       myLon = position.coords.longitude;
       getWeather(myLat, myLon, '');
   });
}

function getWeather(lat, lon, city){
   const url = "https://api.openweathermap.org/data/2.5/forecast";
   const apikey = config.apikey;
   let mydata;
   if(city == '') {
      mydata = {
         lat: lat,
         lon: lon,
         appid: apikey,
         units: 'metric',
         lang: 'kr'
      }
   }else{
     mydata = {
        q: city,
        appid: apikey,
        units: 'metric',
        lang: 'kr'
     }
   }
   
   let params = Object.keys(mydata).map(key => key + '=' + mydata[key]).join('&');

    fetch(`${url}?${params}`)
   .then( reason => reason.json())
   .then( rs => {
        console.log(rs);
        drawWeather(rs);
        //rs의 list 0번째가 현재 시각에서 제일 가까운 시각으로 잡힌다.

    /* 뿌려야하는 데이터
      1.도시명 2.시간 3.아이콘 4.현재온도 5.최저온도, 최고온도 6.설명 7.해뜨는시간&지는시간 9.바람 10.습도 11.구름 12.체감온도
    */    
    // console.log("도시명",rs.city.name);
    // /*시간*/
    // console.log('아이콘', `${rs.list[0].weather[0].icon}.png`);
    // console.log('현재온도', rs.list[0].main.temp);
    // console.log('최고온도/최저온도', `${rs.list[0].main.temp_max}℃ / ${rs.list[0].main.temp_min}℃`);
    // console.log('설명', rs.list[0].weather[0].description);
    // console.log('해뜨는시각', rs.city.sunrise);
    // console.log('해지는시각', rs.city.sunset);
    // console.log('바람', `${rs.list[0].wind.speed}m/s`);
    // console.log('습도', `${rs.list[0].main.humidity}%`);
    // console.log('구름', rs.list[0].clouds.all);
    // console.log('체감온도', `${rs.list[0].main.feels_like}℃`);
    function drawWeather(rs){
      let nowTime = new Date(rs.list[0].dt*1000); //유닉스타임을 시간으로 변환하는 방법
      let nowtemp = rs.list[0].main.temp.toFixed(0);
      let maxtemp = rs.list[0].main.temp_max.toFixed(0);
      let mintemp = rs.list[0].main.temp_min.toFixed(0);
      let sunrise = new Date(rs.city.sunrise*1000);
      let sunset = new Date(rs.city.sunset*1000);
      let wind = rs.list[0].wind.speed.toFixed(1);
      let feels_like = rs.list[0].main.feels_like.toFixed(0);
      
          
      document.getElementById('city').innerHTML = rs.city.name;
      document.getElementById('ntime').innerHTML = `${nowTime.getMonth() + 1}월 ${nowTime.getMonth() + 1}일`;
      document.getElementById('icon').src = "img/" + rs.list[0].weather[0].icon + ".png";
      document.getElementById('icon').alt = rs.list[0].weather[0].icon;
      document.getElementById('nowtemp').innerHTML = nowtemp + '&deg;';
      document.getElementById('maxmintemp').innerHTML = maxtemp + '&deg;' + ' / ' + mintemp + '&deg;';
      document.getElementById('desc').innerHTML = rs.list[0].weather[0].description;
      document.getElementById('sunrise').innerHTML = `${sunrise.getHours()}:${sunrise.getMinutes()}`;
      document.getElementById('sunset').innerHTML = `${sunset.getHours()}:${sunset.getMinutes()}`;
      document.getElementById('clouds').innerHTML = rs.list[0].clouds.all + '&#37;';
      document.getElementById('wind').innerHTML = wind + ' m/s';
      document.getElementById('humidity').innerHTML = rs.list[0].main.humidity + '&#37;';
      document.getElementById('feels_like').innerHTML = feels_like + '&deg;';
  }


   /* dayWeather */
   let html = "";
   for(let i in rs.list){
      let dayTime = new Date(rs.list[i].dt*1000);
      let dayDate = dayTime.getDate() + '일 ' + dayTime.getHours() + '시';
      let maxtemp = rs.list[i].main.temp_max.toFixed(0);
      let mintemp = rs.list[i].main.temp_min.toFixed(0);

      let st='';
      st = rs.list[i].weather[0].icon.includes('n')? `style="bakcground-color:rgba(0,0,0,.1); color:#fff;"`:""
  
      html += `<li>
                  <div class="dayWeather">
                     <p class="daydate">${dayDate}</p>
                     <img src="img/${rs.list[i].weather[0].icon}.png" alt="${rs.list[i].weather[0].icon}">
                     <p class="daytemp">${maxtemp}&deg;/ ${mintemp}&deg;</p>
                     <p class="daydesc">${rs.list[i].weather[0].description}</p>
                  </div>
              </li>`;
      }
      document.getElementById('swiper').innerHTML = html;

      /* am pm */
      /*
      function formatAMPM(hours){
         let ampm = hours >= 12 ? 'PM' : 'AM';
         hours = hours % 12;
         hours = hours ? hours : 12; //12로 나누어떨어지면 12를 대입한다. 0이면 false
         return "(" + ampm + ")" + hours;
      }
      */
    });
}

/*** Initialize Swiper ***/
var swiper = new Swiper(".mySwiper", {
   scrollbar: {
     el: ".swiper-scrollbar",
     hide: true,
   },
 });




