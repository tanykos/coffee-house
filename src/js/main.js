import '../scss/style.scss'
import { initNavbar } from './navbar.js';
import { initCarousel } from './carousel.js';
import { initModal } from './modal.js';

const app = {
  init: () => {
    document.addEventListener('DOMContentLoaded', app.load);
  },
  load: () => {
    app.getData();
    initNavbar();
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
    initCarousel();
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

    const showModal = initModal();
    productsContainer.addEventListener("click", (e) => showModal(e, filteredData));
    
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
  },
}
app.init();
