// Page 1
function savePage1() {
  const from = document.getElementById("from").value;
  const to = document.getElementById("to").value;

  localStorage.setItem("from", from);
  localStorage.setItem("to", to);

  window.location.href = "page2.html";
}

// Page 2
function savePage2() {
  const meet = document.getElementById("meet").value;
  const first = document.getElementById("first").value;

  localStorage.setItem("meet", meet);
  localStorage.setItem("first", first);

  window.location.href = "page3.html";
}

// Generate link
function generateLink() {
  const moment = document.getElementById("moment").value;

  localStorage.setItem("moment", moment);

  const from = localStorage.getItem("from");
  const to = localStorage.getItem("to");
  const meet = localStorage.getItem("meet");
  const first = localStorage.getItem("first");

  const link = `${window.location.origin}/result.html?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}&meet=${encodeURIComponent(meet)}&first=${encodeURIComponent(first)}&moment=${encodeURIComponent(moment)}`;

  const copy = confirm("Link sudah dibuat!\n\nKlik OK untuk copy link");

  if (copy) {
    navigator.clipboard.writeText(link);
    alert("Link berhasil di copy!");
  }

  const base = window.location.origin + "/romantic-card/";

const link = `${base}result.html?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}&meet=${encodeURIComponent(meet)}&first=${encodeURIComponent(first)}&moment=${encodeURIComponent(moment)}`;

window.location.href = link;
}

// Result page
if (window.location.pathname.includes("result.html")) {
  const params = new URLSearchParams(window.location.search);

  const from = decodeURIComponent(params.get("from"));
  const to = decodeURIComponent(params.get("to"));
  const meet = decodeURIComponent(params.get("meet"));
  const first = decodeURIComponent(params.get("first"));
  const moment = decodeURIComponent(params.get("moment"));

  document.getElementById("resultText").innerHTML = `
    Dari: <b>${from}</b><br><br>
    Untuk: <b>${to}</b><br><br>
    Kita pertama ketemu di: ${meet}<br><br>
    Kesan pertama aku: ${first}<br><br>
    Ingat gak momen kita:<br>${moment}
  `;
}

// Copy link function
function copyLink() {
  const moment = document.getElementById("moment").value;

  const from = localStorage.getItem("from");
  const to = localStorage.getItem("to");
  const meet = localStorage.getItem("meet");
  const first = localStorage.getItem("first");

  const link = `${window.location.origin}/result.html?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}&meet=${encodeURIComponent(meet)}&first=${encodeURIComponent(first)}&moment=${encodeURIComponent(moment)}`;

  navigator.clipboard.writeText(link);
  alert("Link berhasil di copy!");
}