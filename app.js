let artistsData = [];
let tempArtworks = [];

function show(page){
  document.querySelectorAll(".page").forEach(p => p.classList.add("hidden"));
  document.getElementById(page).classList.remove("hidden");

  renderRequests();
  renderDashboard();
}

function togglePrice(){
  const sale = document.getElementById("sale").value;
  const price = document.getElementById("price");
  const label = document.getElementById("priceLabel");

  if(sale === "Yes"){
    price.style.display = "block";
    label.style.display = "block";
  } else {
    price.style.display = "none";
    label.style.display = "none";
    price.value = "";
  }
}
togglePrice();

function addArtwork(){

  const art = {
    title: document.getElementById("title").value,
    desc: document.getElementById("desc").value,
    sale: document.getElementById("sale").value,
    price: document.getElementById("sale").value === "Yes"
      ? document.getElementById("price").value
      : null
  };

  tempArtworks.push(art);
  clearForm();
  renderTempTable();
}

function clearForm(){
  document.getElementById("title").value = "";
  document.getElementById("desc").value = "";
  document.getElementById("price").value = "";
  document.getElementById("sale").value = "No";
  togglePrice();
}

function renderTempTable(){
  const body = document.getElementById("tempTable");
  body.innerHTML = "";

  tempArtworks.forEach(a => {
    body.innerHTML += `
      <tr>
        <td>${a.title}</td>
        <td>${a.desc}</td>
        <td>${a.sale}</td>
        <td>${a.sale === "Yes" ? "£"+a.price : "-"}</td>
      </tr>
    `;
  });
}

function saveArtist(){

  const artist = {
    name: document.getElementById("artistName").value,
    address: document.getElementById("artistAddress").value,
    email: document.getElementById("artistEmail").value,
    mobile: document.getElementById("artistMobile").value,
    social: document.getElementById("artistSocial").value,
    works: tempArtworks
  };

  artistsData.push(artist);

  tempArtworks = [];

  document.getElementById("artistName").value = "";
  document.getElementById("artistAddress").value = "";
  document.getElementById("artistEmail").value = "";
  document.getElementById("artistMobile").value = "";
  document.getElementById("artistSocial").value = "";

  renderTempTable();
  renderRequests();
  renderDashboard();
}

function renderRequests(){

  const body = document.getElementById("requestTable");
  body.innerHTML = "";

  artistsData.forEach(a => {
    a.works.forEach(w => {
      body.innerHTML += `
        <tr>
          <td>${a.name}</td>
          <td>${a.email}</td>
          <td>${a.mobile}</td>
          <td>${w.title}</td>
          <td>${w.desc}</td>
          <td>${w.sale}</td>
          <td>${w.sale === "Yes" ? "£"+w.price : "-"}</td>
        </tr>
      `;
    });
  });
}

function renderDashboard(){

  let artists = artistsData.length;
  let artworks = 0;
  let sale = 0;

  artistsData.forEach(a => {
    artworks += a.works.length;
    sale += a.works.filter(w => w.sale === "Yes").length;
  });

  document.getElementById("totalArtists").innerText = artists;
  document.getElementById("totalArtworks").innerText = artworks;
  document.getElementById("totalSale").innerText = sale;
}

function exportCSV(){

  let csv = "Artist,Email,Mobile,Title,Description,For Sale,Price\n";

  artistsData.forEach(a => {
    a.works.forEach(w => {
      csv += `${a.name},${a.email},${a.mobile},${w.title},${w.desc},${w.sale},${w.price || ""}\n`;
    });
  });

  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);

  const aTag = document.createElement("a");
  aTag.href = url;
  aTag.download = "wiva_export.csv";
  aTag.click();
}