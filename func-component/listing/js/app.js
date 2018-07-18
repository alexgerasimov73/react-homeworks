'use strict';

const request = new XMLHttpRequest();
request.open("GET", "https://neto-api.herokuapp.com/etsy");
request.addEventListener("load", onLoad);

function onLoad() {
  const items = JSON.parse(request.responseText);
  ReactDOM.render(
    <Listing items={items} />,
    document.getElementById("root")
  ); 
}

request.send();

function Listing({items}) {
  const goods = items.map(item => {
    const title = getTitle(item.title);
    function getTitle(title) {
      if (title.length > 50) {
        return `${title.slice(0, 49)}...`;
      }
      return title;
    }
    const currency = getCurrency(item.currency_code);
    function getCurrency(currency) {
      if (currency === "USD") return "$";
      else if (currency === "EUR") return "€";
      else return `${currency}`;
    }
    const level = getLevel(item.quantity);
    function getLevel(quantity) {
      if (quantity <= 10) return "level-low";
      else if (quantity <= 20) return "level-medium";
      else return "level-high";
    }
    return (
        <div className="item">
          <div className="item-image">
            <a href={item.url}>
              <img src={item.MainImage.url_570xN} />
            </a>
          </div>
          <div className="item-details">
            <p className="item-title">{title}</p>
            <p className="item-price">{currency}{item.price}</p>
            <p className={`item-quantity ${level}`}>{item.quantity} left</p>
          </div>
        </div>
    );
  });
  return (
    <div className="item-list">
      {goods}
    </div>
  );
}