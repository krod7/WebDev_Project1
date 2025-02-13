async function fetchCryptoData(){
    const response = await fetch(new Request("https://api.livecoinwatch.com/coins/list"), {
        method: "POST",
        headers: new Headers({
          "content-type": "application/json",
          "x-api-key": "bb18cf80-6e39-4595-af34-413525253d7a",
        }),
        body: JSON.stringify({
          currency: "USD",
          sort: "rank",
          order: "ascending",
          offset: 0,
          limit: 100,
          meta: true,
        }),
      });

      const data = await response.json();
      console.log("My API Response: ", data);
      updateCryptoList(data);
}

/*
function updateCryptoList(CryptoData){
    const container = document.querySelector("#allCryptoContainer");


    CryptoData.forEach((coin) => {
        const cryptoRow = document.createElement("a");
        cryptoRow.classList.add("SingleCryptoContainer");
        const priceChange = coin.delta.day.toFixed(2);
        const changeClass = priceChange > 0 ? "positive" : "negative";

        cryptoRow.innerHTML = `
            <div><img class="logoImage" src="${coin.png64}"></div>
            <div>${coin.name}</div>
            <div> calss="PriceContainer">
            <div>$${coin.rate.toFixed(2)}</div>
            <div class="priceChangeColumn ${changeClass}"</div>
            </div>`

            container.appendChild(cryptoRow);
    });
}
*/
function updateCryptoList(CryptoData){
    const container = document.querySelector("#allCryptoContainer");

    CryptoData.forEach((coin) => {
        const cryptoRow = document.createElement("a");
        cryptoRow.classList.add("SingleCryptoContainer");

        //const priceChange = coin.delta.day.toFixed(2);
        const priceChange = Number(coin.delta.day.toFixed(2));
        const changeClass = priceChange > 0 ? "positive" : "negative";
        const changeSymbol = priceChange > 0 ? "▲" : "▼"; // Green up arrow for increase, red down arrow for decrease

        cryptoRow.innerHTML = `
            <div><img class="logoImage" src="${coin.png64}"></div>
            <div>${coin.name}</div>
            <div class="PriceContainer">
                <div>$${coin.rate.toFixed(2)}</div>
                <div class="priceChangeColumn ${changeClass}">
                    ${changeSymbol} ${priceChange}%
                </div>
            </div>`;

        container.appendChild(cryptoRow);
    });
}

document.addEventListener("DOMContentLoaded", fetchCryptoData);