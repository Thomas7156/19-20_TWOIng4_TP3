
// Fonction appelée lors du chargement de la page
function start() {
  // Création de l'objet apiWeather
  const apiWeather = new API_WEATHER();
  // Appel de la fonction fetchTodayForecast

  apiWeather
  .fetchTodayForecast()
  .then(function(response) {
    // Récupère la donnée d'une API
    const data = response.data;

    // On récupère l'information principal
    const main = data.weather[0].main;
    const description = data.weather[0].description;
    const temp = data.main.temp;
    const icon = apiWeather.getHTMLElementFromIcon(data.weather[0].icon);

    // Modifier le DOM
    document.getElementById('today-forecast-main').innerHTML = main;
    document.getElementById('today-forecast-more-info').innerHTML = description;
    document.getElementById('icon-weather-container').innerHTML = icon;
    document.getElementById('today-forecast-temp').innerHTML = `${temp}°C`;

    nextdays(apiWeather)

  })
  .catch(function(error) {
    // Affiche une erreur
    console.error(error);
  });
}

function reload() {
  // Création de l'objet apiWeather
  const apiWeather = new API_WEATHER(document.getElementById('city-input').value);
  // Appel de la fonction fetchTodayForecast

  apiWeather
  .fetchTodayForecast()
  .then(function(response) {
    // Récupère la donnée d'une API
    const data = response.data;

    // On récupère l'information principal
    const main = data.weather[0].main;
    const description = data.weather[0].description;
    const temp = data.main.temp;
    const icon = apiWeather.getHTMLElementFromIcon(data.weather[0].icon);

    // Modifier le DOM
    document.getElementById('today-forecast-main').innerHTML = main;
    document.getElementById('today-forecast-more-info').innerHTML = description;
    document.getElementById('icon-weather-container').innerHTML = icon;
    document.getElementById('today-forecast-temp').innerHTML = `${temp}°C`;

    nextdays(apiWeather)
  })
  .catch(function(error) {
    // Affiche une erreur
    console.error(error);
  });
}

function nextdays(apiWeather) {
  // Appel de la fonction getThreeDayForecast
  // console.log("APPEL FORECAST")
  apiWeather
  .getThreeDayForecast()
  .then(function(response) {
    // Récupère la donnée d'une API
    const data = response.data;
    // console.log(data);

    // On récupère l'information principal
    //////////////////////////////////////
    // V1
    // //////////////////////////////////
    // for(let i=0; i<3; i++) {
    //   const main = data.list[i].weather[0].main;
    //   const description = data.list[i].weather[0].description;
    //   const temp = data.list[i].temp.day;
    //   const icon = apiWeather.getHTMLElementFromIcon(data.list[i].weather[0].icon);
    //
    //     document.getElementById(`${i}-forecast-main`).innerHTML = main;
    //     document.getElementById(`${i}-forecast-more-info`).innerHTML = description;
    //     document.getElementById(`${i}-icon-weather-container`).innerHTML = icon;
    //     document.getElementById(`${i}-forecast-temp`).innerHTML = `${temp}°C`;
    // }

    ////////////////////////////////////
    // V2
    // //////////////////////////////////
    data.list.forEach(function (day, index) {

      const main = day.weather[0].main;
      const description = day.weather[0].description;
      const temp = day.temp.day;
      const icon = apiWeather.getHTMLElementFromIcon(day.weather[0].icon);

      document.getElementById(`${index}-forecast-main`).innerHTML = main;
      document.getElementById(`${index}-forecast-more-info`).innerHTML = description;
      document.getElementById(`${index}-icon-weather-container`).innerHTML = icon;
      document.getElementById(`${index}-forecast-temp`).innerHTML = `${temp}°C`;
    })

  })
  .catch(function(error) {
    // Affiche une erreur
    console.error(error);
  });
}
