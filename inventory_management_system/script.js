"use strict";
// Function to return the current time
function getTime() {
    const date = new Date();
    return date.toLocaleString();
}
function showInsertBar() {
    const insertBtn = document.getElementById('insertBtn');
    const inputForm = document.getElementById('inputForm');
    const tableWrapper = document.getElementById('table-wrapper');
    if (insertBtn && inputForm && tableWrapper) {
        insertBtn.classList.add('hidden');
        inputForm.classList.add('active');
        tableWrapper.classList.add('hidden');
    }
}
function addProduct() {
    const insertBtn = document.getElementById('insertBtn');
    const inputForm = document.getElementById('inputForm');
    const tableWrapper = document.getElementById('table-wrapper');
    const productName = document.getElementById('productName').value;
    const quantity = document.getElementById('quantity').value;
    const price = document.getElementById('price').value;
    if (!productName || parseInt(quantity) <= 0 || parseInt(price) <= 0) {
        alert('Please enter valid product details.');
        return;
    }
    const productDetail = {
        productName,
        quantity: parseInt(quantity),
        price: parseInt(price),
        time: getTime(),
    };
    // Retrieve and update the product array from localStorage
    const productListArray = JSON.parse(localStorage.getItem('productList') || '[]');
    productListArray.push(productDetail);
    // Update localStorage with the new product list
    localStorage.setItem('productList', JSON.stringify(productListArray));
    // Insert the product row into the table
    insertProductRow();
    // Clear the input fields after adding the product
    document.getElementById('productName').value = '';
    document.getElementById('quantity').value = '';
    document.getElementById('price').value = '';
    // Show or hide the necessary UI elements
    inputForm.classList.remove('active');
    setTimeout(() => {
        insertBtn.classList.remove('hidden');
        tableWrapper.classList.remove('hidden');
    }, 200);
}
function insertProductRow() {
    const productListArray = JSON.parse(localStorage.getItem('productList') || '[]');
    const tbody = document.getElementById('tbody');
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
function deleteButton(index) {
    const productListArray = JSON.parse(localStorage.getItem('productList') || '[]');
    // Remove the product at the given index
    productListArray.splice(index, 1);
    // Update local storage
    localStorage.setItem('productList', JSON.stringify(productListArray));
    // Re-render the product table
    insertProductRow();
}
function editProduct(index) {
    const productListArray = JSON.parse(localStorage.getItem('productList') || '[]');
    const editProduct = productListArray[index];
    document.getElementById('productName').value = editProduct.productName;
    document.getElementById('quantity').value = editProduct.quantity.toString();
    document.getElementById('price').value = editProduct.price.toString();
    // Remove the product from the list temporarily (for editing purposes)
    deleteButton(index);
    showInsertBar();
}
function showAlldata() {
    const productListArray = JSON.parse(localStorage.getItem('productList') || '[]');
    const tbody = document.getElementById('tbody');
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
    const insertBtn = document.getElementById('insertBtn');
    const inputForm = document.getElementById('inputForm');
    const tableWrapper = document.getElementById('table-wrapper');
    inputForm.classList.remove('active');
    insertBtn.classList.remove('hidden');
    tableWrapper.classList.remove('hidden');
}
showAlldata();
