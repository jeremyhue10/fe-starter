async function init() {
  const $content = document.querySelector('.content');
  const $total = $content.querySelector('.total');
  const $primaryCards = $content.querySelector('.primary-cards');
  const $supportingCards = $content.querySelector('.supporting-cards');

  const response = await fetch('./data.json');
  const data = await response.json();

  const { primary_metrics, supporting_metrics: supportingCards } = data;
  const { total, cards: primaryCards } = primary_metrics;


function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
let val = numberWithCommas (total.value);
  // 1. render the total header text
  $total.textContent = `Total ${total.label}: ${val}`;


  // 2. render the primary cards
  primaryCards.forEach(card => {
    $primaryCards.innerHTML += renderCard(card);
  })

  // 3. render the supporting cards
  supportingCards.forEach(card => {
    $supportingCards.innerHTML += renderCard(card);
  })
}

function renderCard(card) {
  const { service, username, value, label, metric } = card;
  const { trend, percent, value: trendValue } = metric;   
  
  return `
    <article class="card service-${service}">
      <div class="card-user">
        <img src="./images/icon-${service}.svg" alt="${service}">
        ${username ? `<p class="user">@${username}</p>` : ''}
      </div>

      <div class="card-main">
        <p class="card-number">${value}</p>
         
      </div>
       <p class="card-label">${label}</p>

      <div class="card-metric is-${trend}">
        <img class="trend-res" src="./images/icon-${trend}.svg" alt="${trend}">
       
        <p>${trendValue ? `${trendValue}` : ""}  ${percent ? `${percent}%` : 'Today'}</p>
      </p>
    </article>
  `;
}

init();
