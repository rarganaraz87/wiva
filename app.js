let artworks = [];
let requests = [];

function show(page) {
  document.querySelectorAll(".page").forEach(p => p.classList.add("hidden"));
  document.getElementById(page).classList.remove("hidden");
}

function togglePrice() {
  const sale = document.getElementById("sale").value;
  document.getElementById("price").style.display = sale === "Yes" ? "block" : "none";
}

function toggleOtherCategory() {
  const category = document.getElementById("category").value;
  const other = document.getElementById("otherCategory");

  if (category === "Other") {
    other.classList.remove("hidden");
  } else {
    other.classList.add("hidden");
    other.value = "";
  }
}

function addArtwork() {
  const title = document.getElementById("title").value;
  const medium = document.getElementById("medium").value;
  const category = document.getElementById("category").value;
  const otherCategory = document.getElementById("otherCategory").value;
  const sale = document.getElementById("sale").value;
  const price = document.getElementById("price").value;

  const finalCategory = category === "Other" ? otherCategory : category;

  const art = { title, medium, category: finalCategory, sale, price };
  artworks.push(art);

  const row = `<tr>
    <td>${title}</td>
    <td>${medium}</td>
    <td>${finalCategory}</td>
    <td>${sale}</td>
    <td>${price}</td>
  </tr>`;

  document.getElementById("tempTable").innerHTML += row;
}

function saveArtist() {
  const artist = document.getElementById("artistName").value;

  artworks.forEach(a => {
    requests.push({ artist, ...a });
  });

  renderRequests();
  updateDashboard();
  artworks = [];
  document.getElementById("tempTable").innerHTML = "";
}

function renderRequests() {
  let html = "";
  requests.forEach(r => {
    html += `<tr>
      <td>${r.artist}</td>
      <td>${r.title}</td>
      <td>${r.medium}</td>
      <td>${r.category}</td>
      <td>${r.sale}</td>
      <td>${r.price}</td>
    </tr>`;
  });
  document.getElementById("requestTable").innerHTML = html;
}

function updateDashboard() {
  document.getElementById("totalArtists").innerText =
    new Set(requests.map(r => r.artist)).size;

  document.getElementById("totalArtworks").innerText = requests.length;

  document.getElementById("totalSale").innerText =
    requests.filter(r => r.sale === "Yes").length;
}

function exportCSV() {
  let csv = "Artist,Title,Medium,Category,Sale,Price\n";

  requests.forEach(r => {
    csv += `${r.artist},${r.title},${r.medium},${r.category},${r.sale},${r.price}\n`;
  });

  const blob = new Blob([csv], { type: "text/csv" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "artworks.csv";
  link.click();
}
