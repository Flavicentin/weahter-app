//função para previnir o comportamento padrão do formulario
document.querySelector('.busca').addEventListener('submit', async (event) => {
  event.preventDefault();

  let input = document.querySelector('#searchInput').value;
  console.log(input);

  if (input !== "") {
    clearInfo();
    // (1Forma de fazer)
    showWarning('Carregando...')
    // document.querySelector('.aviso').innerHTML = "Carregando..."; (2Forma de fazer)

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=d06cdb298fafc83c520d5ab677fc477e&units=metric&lang=pt_br`;

    //função fetch
    //requisição, aguardar a resposta, e so quando eu tiver a resposta irei executar
    let results = await fetch(url);
    //pegar resultados e transformar em objeto do javascript para poder ler 
    let json = await results.json();
    console.log(json);

    if (json.cod === 200){
      clearInfo();
      //preencher no HTML
      showInfo({
        name: json.name,
        country: json.sys.country,
        temp: json.main.temp,
        icon: json.weather[0].icon,
        windSpeed: json.wind.speed,
        windDeg: (json.wind.deg)

      })
    } else {
      clearInfo();
      showWarning('Não conseguimos encontrar esta localização :(')
    }    
  } else {
    clearInfo();
  }
});

function showInfo(json) {
  showWarning('');
  //alterar os valores do html
  document.querySelector('.titulo').innerHTML = `${json.name},${json.country}`;
  document.querySelector('.tempInfo').innerHTML = `${json.temp} <sup>ºC</sup>`;
  document.querySelector('.ventoInfo').innerHTML = `${json.windSpeed} <span>km/h</span>`;
  document.querySelector('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${json.icon}@2x.png`);
  document.querySelector('.ventoPonto').style.transform = `rotate(${json.windDeg-90}deg)`;

  //alterar no css, para exibir na tela 
  document.querySelector('.resultado').style.display = 'block';

}

function clearInfo() {
  showWarning('');
  document.querySelector('.resultado').style.display = 'none';
}

// (1Forma de fazer)
function showWarning (msg) {
  document.querySelector('.aviso').innerHTML = msg; 
}