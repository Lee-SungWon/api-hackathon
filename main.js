// $.ajax({
//   // "url": "https://content.guardianapis.com/sections?q=coronavirus-outbreak&api-key=343006a7-47bd-41f0-af88-5eddf9c61000",
//   "url": "http://content.guardianapis.com/tags?q=coronavirus-outbreak&show-references=all&api-key=343006a7-47bd-41f0-af88-5eddf9c61000",
//   "method": "GET",
//   // "headers": {
//   //   "api-key":"343006a7 - 47bd- 41f0- af88 - 5eddf9c61000"
//   // },
//   "success": data => console.log(data),
//   "error": data => console.log(data)
// })

//   $.ajax({
//     "url": "https://coronavirus.m.pipedream.net/",
//     "success": data => console.log(data),
//     "error": data => console.log(data)
//   })

list = document.getElementById('list');

$.ajax({
  "url": "http://content.guardianapis.com/tags?q=coronavirus&show-references=all&api-key=343006a7-47bd-41f0-af88-5eddf9c61000",
  "method": "GET",
  "success":
    function (data) {
      for (let i = 1; i <= 9; i++) {
        let li = document.createElement('li');
        let a = document.createElement('a');
        a.textContent = data.response.results[i].webTitle;
        // let url = data.response.results[i].id;
        a.setAttribute('href', data.response.results[i].webUrl);
        li.append(a);
        list.append(li);
      }
    },
  "error": data => console.log(data)
})

let coronavirusData;

let inputState = document.getElementById('input-state')
let inputCity = document.getElementById('input-city')

$.ajax({
  "url": "https://coronavirus.m.pipedream.net/",
  "success": function (data) {
    coronavirusData = data;

  },
  "error": data => console.log(data)
})

let button = document.getElementById('button');
let activeCasesDiv = document.getElementById('active-cases-number');
let page1 = document.getElementById('page-1');
let page2 = document.getElementById('page-2');

button.addEventListener('click', search);
function search() {
  for (let i = 0; i < coronavirusData.rawData.length; i++) {
    if (inputCity.value === coronavirusData.rawData[i].Admin2 && inputState.value === coronavirusData.rawData[i].Province_State) {
      console.log(coronavirusData.rawData[i].Active);
      let h4 = document.createElement('h4');
      h4.textContent = coronavirusData.rawData[i].Active;
      activeCasesDiv.textContent = '';
      activeCasesDiv.append(h4);
      page2.className = '';
      page1.classList.add('hidden');
      break;
    } else {
      console.log('failure');
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

let button2 = document.querySelector('.back-button');
button2.addEventListener('click', back);
function back() {
  page1.className = '';
  inputCity.value = '';
  inputState.value = '';
  page2.classList.add('hidden');
}
