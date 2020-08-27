const list = document.getElementById('list');
let coronavirusData = null;
let inputState = document.getElementById('input-state')
let inputCity = document.getElementById('input-city')
let button = document.getElementById('button');
let activeCasesDiv = document.getElementById('active-cases-number');
let page1 = document.getElementById('page-1');
let page2 = document.getElementById('page-2');
let button2 = document.querySelector('.back-button');

button2.addEventListener('click', back);
button.addEventListener('click', search);

function start () {
  $.ajax({
    "url": "http://content.guardianapis.com/tags?q=coronavirus&show-references=all&api-key="+covidApiKey,
    "method": "GET",
    "success":
      function (data) {
        for (let i = 1; i <= 9; i++) {
          let li = document.createElement('li');
          let a = document.createElement('a');
          a.textContent = data.response.results[i].webTitle;
          // let url = data.response.results[i].id;
          a.href = data.response.results[i].webUrl;
          li.append(a);
          list.append(li);
        }
      },
    })
    $.ajax({
      "url": "https://coronavirus.m.pipedream.net/",
      "success": function (data) {
        coronavirusData = data;
        // hide the loading spinner
      },
    })
}

function search() {
  if (coronavirusData === null) {
    return;
  }
  for (let i = 0; i < coronavirusData.rawData.length; i++) {
    if (inputCity.value === coronavirusData.rawData[i].Admin2 && inputState.value === coronavirusData.rawData[i].Province_State) {
      let h4 = document.createElement('h4');
      h4.textContent = coronavirusData.rawData[i].Active;
      activeCasesDiv.textContent = '';
      activeCasesDiv.append(h4);
      page2.className = '';
      page1.classList.add('hidden');
      break;
    } else {
      activeCasesDiv.textContent = '';
      let h5 = document.createElement('h5');
      h5.setAttribute('id', 'no-match');
      h5.textContent = 'Your entry does not match our directory.'
      activeCasesDiv.append(h5);
      page2.className = '';
      page1.classList.add('hidden');
    }
  }
}

function back() {
  page1.className = '';
  inputCity.value = '';
  inputState.value = '';
  page2.classList.add('hidden');
}

start();
