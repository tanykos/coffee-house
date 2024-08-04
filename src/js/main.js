import '../scss/style.scss'

document.addEventListener('DOMContentLoaded', function() {
const navBtn = document.querySelector('.menu-button');
const navMenu = document.querySelector('.nav-wrap');
const body = document.querySelector('body');

// Toggle Nav menu
navBtn.addEventListener('click', () => {
  navBtn.classList.toggle('active');
  navMenu.classList.toggle('active');
  body.classList.toggle('no-scroll');  
})

navMenu.addEventListener('click', (event) => {
  if (event.target.className != 'menu-item') return;
  navBtn.classList.remove('active');
  navMenu.classList.remove('active');
  body.classList.remove('no-scroll');
})
});

const app = {
  init: () => {
    document.addEventListener('DOMContentLoaded', app.load);
  },
  load: () => {
    app.getData();
  },
  getData: () => {
    let pageId = document.body.id;
    switch (pageId) {
      case 'homePage': 
        app.goHomePage();
        break;
      case 'menuPage': 
        app.goMenuPage();
        break;
      default:
        app.goHomePage();
    }
  },
  goHomePage: () => {
    //Carousel
    const slider = document.querySelector(".slide-wrap");
    const carousel = document.querySelector(".carousel");
    const cards = document.querySelectorAll(".slide");
    const buttons = document.querySelectorAll(".arrow");
    const controls = document.querySelectorAll(".dash");

    let cardIndex = 0;
    let intervalId;
    let controlAnimation = controls[cardIndex].querySelector('.dash-progress').animate(
      {
        width: "100%",
      },
      5000
    );

    //Toggle active class to progress control
    const toggleActive = (control) => {
      const currActive = document.querySelector(".progress .active");
      currActive.classList.remove("active");
      control.classList.add('active');

      if (controlAnimation) controlAnimation.cancel();
      controlAnimation = controls[cardIndex].querySelector('.dash-progress').animate(
        {
          width: "100%",
        },
        5000
      );
    }

    // Start autoSlider
    let timer;
    let startTime = new Date();
    let leftTime;
    let prevLeftTime;
    const resumeSlider = (time) => {
      const restTime = prevLeftTime ? 5000 - time - prevLeftTime : 5000 - time;
      startTime = new Date();
      timer = setTimeout(() => {
        ++cardIndex;
        if (cardIndex === cards.length) {
          cardIndex = 0;
        } else {
          cardIndex = cardIndex < 0 ? cards.length - 1 : cardIndex;
        }
        toggleActive(controls[cardIndex]);
        carousel.style.transform = `translate(-${cardIndex * 100}%)`;
        autoSlider();
      }, restTime);
    }
    const autoSlider = () => {
      startTime = new Date();
      timer = undefined;
      intervalId = setInterval(() => {
        ++cardIndex;
        showCard();
      }, 5000);
    }

    autoSlider();

    // Show card (calculate card's index and add transform style to carousel)
    const showCard = () => {
      if (cardIndex === cards.length) {
        cardIndex = 0;
      } else {
        cardIndex = cardIndex < 0 ? cards.length - 1 : cardIndex;
      }
      toggleActive(controls[cardIndex]);
      carousel.style.transform = `translate(-${cardIndex * 100}%)`;
      startTime = new Date();
      leftTime = 0;
      timer = undefined;
      prevLeftTime = 0;
    }

    // Carousel buttons
    const clickButton = (e) => {
      clearInterval(intervalId);
      clearTimeout(timer);
      cardIndex += e.currentTarget.id === "next" ? 1 : -1;
      showCard();
      autoSlider();
    }

    const clickControl = (control, index) => {
      control.addEventListener("click", () => {
        clearInterval(intervalId);
        clearTimeout(timer);
        cardIndex = index;
        toggleActive(control);
        showCard();
        autoSlider();
      })
    }

    buttons.forEach((btn) => btn.addEventListener("click", clickButton));
    controls.forEach(clickControl);

    // Stop autoSlider on mouseover
    const pauseSlide = () => {
      if (timer) {
        prevLeftTime = leftTime;
        leftTime = 0;
        clearTimeout(timer);
      } else {
        prevLeftTime = 0;
      };
      leftTime = new Date() - startTime;
      clearInterval(intervalId);
      controlAnimation.pause();
    };

    const playSlide = () => {
      resumeSlider(leftTime);
      controlAnimation.play();
    }

    slider.addEventListener("mouseenter", pauseSlide);

    // Start autoSlider on mouseleave
    slider.addEventListener("mouseleave", playSlide);

    //Change slides on touch
    let startX = 0;
    let endX = 0;
    let touchTimer;

    slider.addEventListener('touchstart', (e) => {
      e.preventDefault();
      startX = e.touches[0].clientX;
      touchTimer = setTimeout(pauseSlide, 0);
    });
    
    slider.addEventListener('touchmove', (e) => {
      endX = e.touches[0].clientX;
    });

    slider.addEventListener('touchend', () => {
        clearTimeout(touchTimer);
        let diff = startX - endX;

        clearInterval(intervalId);
        clearTimeout(timer);
        if (Math.abs(diff) > 30 && endX !=0) {
          if (diff > 0) {
            cardIndex += 1;
          } else {
            cardIndex -= 1;
          }
          endX = 0;
          showCard();
          autoSlider();

        } else {
          clearTimeout(touchTimer);
          playSlide();
        }
        
    });
  },
  goMenuPage: () => {
    async function loadProducts() {
      try {
        const response = await fetch('./products.json');
        const products = await response.json();
        let storageCategory = localStorage.getItem("category") || "coffee";
        getProducts(products, storageCategory);
        return products;
      } catch (error) {
        console.error("Error: ", error);
      }
    }
    
    loadProducts();
    
    const productsContainer = document.querySelector("#products");
    let screenWidth = window.innerWidth;
    const refreshBtn = document.querySelector('.refresh');
    const bodyMob = document.querySelector('body');
    let isMobile = screenWidth < 769 ? true : false;
    let splitData;
    let countData = 0;
    let resizeID;
    let filteredData;

    
    const isWindowResize = () => {
      if(resizeID) clearTimeout(resizeID);
      resizeID = setTimeout(function() {
        screenWidth = window.innerWidth;
        isMobile = screenWidth < 769 ? true : false;
        productsContainer.innerHTML = '';
        setShownData(filteredData);
      }, 300);
    }
    window.addEventListener("resize", isWindowResize);

    productsContainer.addEventListener("click", showModal);
    
    const filterData = (category, data) => {
      return data.filter((item) => item.category === category);
    };

    const splitArray = (arr, n) => {
      const newArr = [];
      for (let i = 0; i < arr.length; i += n) {
        newArr.push(arr.slice(i, i + n));
      }
      return newArr;
    }

    const setShownData = (filteredData) => {
      if (isMobile && filteredData.length > 4) {
        splitData = splitArray(filteredData, 4);
        countData = splitData.length -1;
        appendData(splitData[0]);
        splitData.shift();
      } else {
        countData = 0;
        appendData(filteredData);
      }
    }

    function getProducts(data, category) {
      const activeBtn = document.querySelector(`#${category}`);
      activeBtn.classList.add('active');
      filteredData = filterData(category, data);
      setShownData(filteredData);

      document.querySelectorAll('.secondary-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const currActive = document.querySelector(".secondary-btn.active");
          currActive.classList.remove("active");
          btn.classList.add('active');
          productsContainer.innerHTML = '';
          localStorage.setItem("category", btn.id);
          filteredData = filterData(btn.id, data);
          setShownData(filteredData);
        })
      })
    }
    
    function getNextProducts() {
      countData = countData - 1;
      appendData(splitData[0]);
      splitData.shift();
    }
    
    function appendData(data) {
      data.forEach(card => {
        const div = document.createElement('div');
        div.setAttribute('class', "grid-item");
        div.setAttribute('id', `${card.id}`);
        div.innerHTML = `
          <figure class="item-img">
            <img src=${card.src} alt=${card.name}>
          </figure>
          <div class="item-text">
            <h3 class="title">${card.name}</h3>
            <p>${card.description}</p>
            <h3 class="card-footer">&#36;${card.price}</h3>
          </div>`;
        productsContainer.appendChild(div);
      })

      if (isMobile && countData != 0) {
        refreshBtn.classList.remove('hide');
        refreshBtn.addEventListener('click', getNextProducts);
      } else {
        if (refreshBtn) {
          !refreshBtn.classList.contains('hide') ? refreshBtn.classList.add('hide') : false;
        }  
      }
    }

    //Modal
    let popUp;

    //Close Modal, when click outside 
    const closeOutside = (e) => {
      const dialogSize = popUp.getBoundingClientRect()
      if (
        e.clientX < dialogSize.left ||
        e.clientX > dialogSize.right ||
        e.clientY < dialogSize.top ||
        e.clientY > dialogSize.bottom
      ) {
        popUp.close();
      }
    }

    const dialog = document.querySelector('.modal');

    const modal = (cardData) => {
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

    let total;
    let costSize = 0;
    let costAdditives = 0;
    let price;
    let form;
    function showModal(e) {
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

    //Count total
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
  },
}
app.init();
