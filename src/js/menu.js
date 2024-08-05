export function initMenu() {
  async function loadProducts() {
    try {
      const response = await fetch('./products.json');
      const products = await response.json();
      const storageCategory = localStorage.getItem("category") || "coffee";
      getProducts(products, storageCategory);
    } catch (error) {
      console.error("Error: ", error);
    }
  }

  function getProducts(data, category) {
    const activeBtn = document.querySelector(`#${category}`);
    activeBtn.classList.add('active');
    const filteredData = filterData(category, data);
    setShownData(filteredData);
  }

  function filterData(category, data) {
    return data.filter(item => item.category === category);
  }

  function setShownData(filteredData) {
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

  loadProducts();
}
