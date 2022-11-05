const form = document.querySelector("#searchForm");
const res = document.querySelector("#show");
var delay;
form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (delay) {
    clearTimeout(delay);
  }
  const cType = form.elements.coinType.value;

  fetchPrice(cType);
});

var today = new Date();
var date =
  today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
var time =
  today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var dateTime = date + " " + time;

const fetchPrice = async (cType) => {
  const info = await axios.get(
    ` https://api.coinstats.app/public/v1/coins/${cType}?currency=USD`
  );

  const Price = info.data.coin.price;
  const Volume = info.data.coin.volume;
  const Change = info.data.coin.priceChange1d;
  const Base = info.data.coin.name;
  const Target = "USD";
  const Time = dateTime;

  res.innerHTML = `<tr class = "row1">
  <td>
      Property
  </td>
  <td> Value </td>
</tr>
<tr> 
  <td>
      ${Base} 
  </td>
  <td> ${Price} ${Target}</td>
</tr>
<tr>
  <td>
  Volume(24hrs)
  </td>
  <td> ${Volume} </td>
</tr>
<tr>
  <td>
      Change(24hrs)
  </td>
  <td>${Change} ${Target} </td>
</tr> 
<tr>
  <td>
      Time
  </td>
  <td>${Time}</td>
</tr> 
`;

  delay = setTimeout(() => fetchPrice(cType), 10000);
};
