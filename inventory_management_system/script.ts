interface ProductDetail {
    productName: string;
    quantity: number;
    price: number;
    time: string;
  }
  
  // Function to return the current time
  function getTime(): string {
    const date = new Date();
    return date.toLocaleString();
  }
  
  function showInsertBar(): void {
    const insertBtn = document.getElementById('insertBtn') as HTMLButtonElement;
    const inputForm = document.getElementById('inputForm') as HTMLDivElement;
    const tableWrapper = document.getElementById('table-wrapper') as HTMLDivElement;
  
    if (insertBtn && inputForm && tableWrapper) {
      insertBtn.classList.add('hidden');
      inputForm.classList.add('active');
      tableWrapper.classList.add('hidden');
    }
  }
  
  function addProduct(): void {
    const insertBtn = document.getElementById('insertBtn') as HTMLButtonElement;
    const inputForm = document.getElementById('inputForm') as HTMLDivElement;
    const tableWrapper = document.getElementById('table-wrapper') as HTMLDivElement;
  
    const productName = (document.getElementById('productName') as HTMLInputElement).value;
    const quantity = (document.getElementById('quantity') as HTMLInputElement).value;
    const price = (document.getElementById('price') as HTMLInputElement).value;
  
    if (!productName || parseInt(quantity) <= 0 || parseInt(price) <= 0) {
      alert('Please enter valid product details.');
      return;
    }
  
    const productDetail: ProductDetail = {
      productName,
      quantity: parseInt(quantity),
      price: parseInt(price),
      time: getTime(),
    };
  
    // Retrieve and update the product array from localStorage
    const productListArray: ProductDetail[] = JSON.parse(localStorage.getItem('productList') || '[]');
    productListArray.push(productDetail);
  
    // Update localStorage with the new product list
    localStorage.setItem('productList', JSON.stringify(productListArray));
  
    // Insert the product row into the table
     insertProductRow();

    // Clear the input fields after adding the product
    (document.getElementById('productName') as HTMLInputElement).value = '';
    (document.getElementById('quantity') as HTMLInputElement).value = '';
    (document.getElementById('price') as HTMLInputElement).value = '';
  
    // Show or hide the necessary UI elements
    inputForm.classList.remove('active');

    setTimeout(()=>{
      insertBtn.classList.remove('hidden');
      tableWrapper.classList.remove('hidden');
    },200)
   
  }

  
  function insertProductRow() {
    const productListArray = JSON.parse(localStorage.getItem('productList') || '[]') as ProductDetail[];
  
    const tbody = document.getElementById('tbody') as HTMLTableSectionElement;
    tbody.innerHTML = ''; // Clear the table before rendering new rows
  
    productListArray.map((product, index) => {
      const { productName, quantity, price, time } = product;
  
      const newRow = document.createElement('tr');
      newRow.innerHTML = `
        <td data-label="Product Name">${productName}</td>
        <td data-label="Quantity">${quantity}</td>
        <td data-label="Price">${price}</td>
        <td data-label="Time">${time}</td>
        <td data-label="Actions">
          <button class="edit-btn" onclick="editProduct(${index})">Edit</button>
          <button class="delete-btn" onclick="deleteButton(${index})">Delete</button>
        </td>
      `;
      tbody.appendChild(newRow);
    });
  }
  
  function deleteButton(index: number): void {
    const productListArray = JSON.parse(localStorage.getItem('productList') || '[]') as ProductDetail[];
  
    // Remove the product at the given index
    productListArray.splice(index, 1);
  
    // Update local storage
    localStorage.setItem('productList', JSON.stringify(productListArray));
  
    // Re-render the product table
    insertProductRow();
  }
  
  function editProduct(index: number): void {
    const productListArray = JSON.parse(localStorage.getItem('productList') || '[]') as ProductDetail[];
  
    const editProduct = productListArray[index];
  
    (document.getElementById('productName') as HTMLInputElement).value = editProduct.productName;
    (document.getElementById('quantity') as HTMLInputElement).value = editProduct.quantity.toString();
    (document.getElementById('price') as HTMLInputElement).value = editProduct.price.toString();
  
    // Remove the product from the list temporarily (for editing purposes)
    deleteButton(index);
    showInsertBar();
  }
  function showAlldata() {
    const productListArray = JSON.parse(localStorage.getItem('productList') || '[]') as ProductDetail[];
  
    const tbody = document.getElementById('tbody') as HTMLTableSectionElement;
    tbody.innerHTML = ''; // Clear the table before rendering new rows
  
    productListArray.map((product, index) => {
      const { productName, quantity, price, time } = product;
  
      const newRow = document.createElement('tr');
      newRow.innerHTML = `
        <td>${productName}</td>
        <td>${quantity}</td>
        <td>${price}</td>
        <td>${time}</td>
        <td>
          <button class="edit-btn" onclick="editProduct(${index})">Edit</button>
          <button class="delete-btn" onclick="deleteButton(${index})">Delete</button>
        </td>
      `;
      tbody.appendChild(newRow);
    });
  
    const insertBtn = document.getElementById('insertBtn') as HTMLButtonElement;
    const inputForm = document.getElementById('inputForm') as HTMLDivElement;
    const tableWrapper = document.getElementById('table-wrapper') as HTMLDivElement;
  
    inputForm.classList.remove('active');
    insertBtn.classList.remove('hidden');
    tableWrapper.classList.remove('hidden');
  }
  

  showAlldata()
  