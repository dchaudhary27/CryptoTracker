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

const fetchPrice = async (cType) => {
  const info = await axios.get(
    ` https://api.coinstats.app/public/v1/coins/${cType}?currency=USD`
  );

  const Price = info.data.coin.price;
  const Volume = info.data.coin.volume;
  const Change = info.data.coin.priceChange1d;
  const Base = info.data.coin.name;
  const Target = "USD";

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
  Volume
  </td>
  <td> ${Volume} </td>
</tr>
<tr>
  <td>
      Change
  </td>
  <td>${Change}</td>
</tr>
`;

  delay = setTimeout(() => fetchPrice(cType), 10000);
};
