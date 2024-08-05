export function initModal() {
  let popUp;
  let total;
  let costSize = 0;
  let costAdditives = 0;
  let price;
  let form;

  const modal = (cardData) => {
    const dialog = document.querySelector('.modal');
    const bodyMob = document.querySelector('body');
    dialog.innerHTML = `
      <div class="dialog-wrap">
        <div class="dialog-img hide-sm">
          <img src=${cardData.src} alt=${cardData.name}>
        </div>
        <div class="dialog-content">
          <h3 class="title">${cardData.name}</h3>
          <p>${cardData.description}</p>
          <form id="costForm">
            <fieldset>
              <legend>Size</legend>
              <label class="secondary-btn">
                <input type="radio" checked="checked" name="radioGroup" value="0">
                <span class="circle">S</span>
                <span class="title">
                  ${cardData.sizes.s.size}
                </span>
              </label>
              <label class="secondary-btn">
                <input type="radio" name="radioGroup" value="0.5">
                <span class="circle">M</span>
                <span class="title">
                  ${cardData.sizes.m.size}
                </span>
              </label>
              <label class="secondary-btn">
                <input type="radio" name="radioGroup" value="1">
                <span class="circle">L</span>
                <span class="title">
                  ${cardData.sizes.l.size}
                </span>
              </label>
            </fieldset>
          
            <fieldset>
              <legend>Additives</legend>
              <label class="secondary-btn">
                <input type="checkbox" name="checkboxGroup" value="0.5">
                <span class="circle">1</span>
                <span class="title">
                  ${cardData.additives[0].name}
                </span>
              </label>
              <label class="secondary-btn">
                <input type="checkbox" name="checkboxGroup" value="0.5">
                <span class="circle">2</span>
                <span class="title">
                  ${cardData.additives[1].name}
                </span>
              </label>
              <label class="secondary-btn">
                <input type="checkbox" name="checkboxGroup" value="0.5">
                <span class="circle">3</span>
                <span class="title">
                  ${cardData.additives[2].name}
                </span>
              </label>
            </fieldset>

            <h3 class="total">
              <span>Total:</span>
              <span>&#36;<span id="totalCost">${cardData.price}</span></span>
            </h3>
            <div class="info">
              <span class="icon-info">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g id="info-empty" clip-path="url(#clip0_268_9737)">
                  <path id="Vector" d="M8 7.66663V11" stroke="#403F3D" stroke-linecap="round" stroke-linejoin="round"/>
                  <path id="Vector_2" d="M8 5.00667L8.00667 4.99926" stroke="#403F3D" stroke-linecap="round" stroke-linejoin="round"/>
                  <path id="Vector_3" d="M8.00016 14.6667C11.6821 14.6667 14.6668 11.6819 14.6668 8.00004C14.6668 4.31814 11.6821 1.33337 8.00016 1.33337C4.31826 1.33337 1.3335 4.31814 1.3335 8.00004C1.3335 11.6819 4.31826 14.6667 8.00016 14.6667Z" stroke="#403F3D" stroke-linecap="round" stroke-linejoin="round"/>
                  </g>
                  <defs>
                  <clipPath id="clip0_268_9737">
                  <rect width="16" height="16" fill="white"/>
                  </clipPath>
                  </defs>
                  </svg>
              </span>
              <span class="text-info">
                The cost is not final. Download our mobile app to see the final price and place your order.
                Earn loyalty points and enjoy your favorite coffee with up to 20% discount.
              </span>
            </div>

          <button class="cancel-btn primary-btn" formmethod="dialog">Close</button>
          </form>
        </div>
      </div>
    `;
    bodyMob.appendChild(dialog);
    return dialog;
  }

  function closeOutside(e) {
    const dialogSize = popUp.getBoundingClientRect();
    if (
      e.clientX < dialogSize.left ||
      e.clientX > dialogSize.right ||
      e.clientY < dialogSize.top ||
      e.clientY > dialogSize.bottom
    ) {
      popUp.close();
    }
  }

  function countTotal(e) {
    let checkbox = e.target;
    let totalCost = document.querySelector('#totalCost');
    if (e.target.type === 'radio') {
      if (checkbox.checked) {
        costSize = parseFloat(checkbox.value);
        total = price + costSize + costAdditives;
        totalCost.textContent = total.toFixed(2);
      } 
    }
    if (e.target.type === 'checkbox') {
      if (checkbox.checked) {
        costAdditives += 0.5;
        total = price + costSize + costAdditives;
        totalCost.textContent = total.toFixed(2);
      } else {
        costAdditives -= 0.5;
        total = price + costSize + costAdditives;
        totalCost.textContent = total.toFixed(2);
      }
    }
  }

  return function showModal(e, filteredData) {
    if (e.target.classList.contains('grid-item')) {
      const cardId = e.target.id;
      const cardData = filteredData.find((el => el.id === cardId));
      price = parseFloat(cardData.price);
      total = price;

      popUp = modal(cardData);
      popUp.showModal();
      popUp.addEventListener("click", closeOutside);

      form = popUp.querySelector('#costForm');
      form.addEventListener('change', countTotal);
    }
  }
}
