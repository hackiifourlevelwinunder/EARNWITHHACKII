// Default UID
let allowedUIDs = ["121212"];

// Load saved UIDs
if(localStorage.getItem("uids")){
  allowedUIDs = JSON.parse(localStorage.getItem("uids"));
}

// LOGIN
function login(){
  let uid = document.getElementById("uid").value;

  if(allowedUIDs.includes(uid)){
    window.location.href="loading.html";
  } else {
    document.getElementById("msg").innerText =
    "Ye ID hamari link se nahi hai, 500 rupe deposit karo";
  }
}

// ADD UID
function addUID(){
  let uid = document.getElementById("newUID").value;

  if(uid){
    allowedUIDs.push(uid);
    localStorage.setItem("uids", JSON.stringify(allowedUIDs));
    alert("UID Added");
  }
}

// REMOVE UID
function removeUID(){
  let uid = document.getElementById("delUID").value;

  allowedUIDs = allowedUIDs.filter(u => u !== uid);
  localStorage.setItem("uids", JSON.stringify(allowedUIDs));

  alert("UID Removed");
}

// API DATA
async function loadData(){
  let box = document.getElementById("data");

  try {
    let res = await fetch("https://draw.ar-lottery01.com/WinGo/WinGo_1M/GetHistoryIssuePage.json");
    let data = await res.json();

    let html = "<h3>Latest Results</h3>";

    data.data.list.slice(0,10).forEach(item => {
      let num = parseInt(item.number);
      let type = num <=4 ? "Small" : "Big";
      let color = num % 2 === 0 ? "Red" : "Green";

      html += `<p>${num} → ${type} → ${color}</p>`;
    });

    box.innerHTML = html;

  } catch(e){
    box.innerHTML = "API Error";
  }
}
