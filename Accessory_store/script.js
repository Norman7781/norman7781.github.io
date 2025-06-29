
let quotationItems = [];
let itemCounter = 0;

const products = {
    'iPhone 15 Pro Max Case': 1200,
    'Samsung Galaxy S24 Case': 900,
    'Wireless Charger': 2500,
    'Power Bank 10000mAh': 1800,
    'Bluetooth Earbuds': 3500,
    'Phone Screen Protector': 300,
    'Car Phone Holder': 450,
    'USB-C Cable': 200,
    'Laptop Stand': 1500,
    'Tablet Case': 800,
    'Gaming Mouse': 2200,
    'Keyboard Cover': 650
};


function openModal() {
    document.getElementById('productModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('productModal').style.display = 'none';
    document.getElementById('productForm').reset();
}

window.onclick = function(event) {
    const modal = document.getElementById('productModal');
    if (event.target === modal) {
        closeModal();
    }
}

function addProductToQuotation(productName, unitPrice, quantity) {
    const grossTotal = unitPrice * quantity;
    const vat = grossTotal * 0.07;
    const netTotal = grossTotal + vat;
    
    const item = {
        id: ++itemCounter,
        productName,
        unitPrice,
        quantity,
        grossTotal,
        vat,
        netTotal
    };
    
    quotationItems.push(item);
    updateTable();
    updateSummary();
}

function deleteProduct(itemId) {
    quotationItems = quotationItems.filter(item => item.id !== itemId);
    updateTable();
    updateSummary();
}

function updateTable() {
    const tbody = document.getElementById('quotationTableBody');
    
    if (quotationItems.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="7" class="empty-state">
                    <h3>No products added yet</h3>
                    <p>Click "Add New Product" to get started</p>
                </td>
            </tr>
        `;
        return;
    }
    
    tbody.innerHTML = quotationItems.map(item => `
        <tr>
            <td>${item.productName}</td>
            <td class="price">฿${item.unitPrice.toLocaleString('th-TH', {minimumFractionDigits: 2})}</td>
            <td>${item.quantity}</td>
            <td class="price">฿${item.grossTotal.toLocaleString('th-TH', {minimumFractionDigits: 2})}</td>
            <td class="price">฿${item.vat.toLocaleString('th-TH', {minimumFractionDigits: 2})}</td>
            <td class="price">฿${item.netTotal.toLocaleString('th-TH', {minimumFractionDigits: 2})}</td>
            <td>
                <button class="btn btn-danger" onclick="deleteProduct(${item.id})" title="Delete Product">
                    🗑️
                </button>
            </td>
        </tr>
    `).join('');
}

function updateSummary() {
    const summarySection = document.getElementById('summarySection');
    
    if (quotationItems.length === 0) {
        summarySection.style.display = 'none';
        return;
    }
    
    summarySection.style.display = 'block';
    
    const totalGross = quotationItems.reduce((sum, item) => sum + item.grossTotal, 0);
    const totalVAT = quotationItems.reduce((sum, item) => sum + item.vat, 0);
    const finalTotal = totalGross + totalVAT;
    
    document.getElementById('totalGross').textContent = `฿${totalGross.toLocaleString('th-TH', {minimumFractionDigits: 2})}`;
    document.getElementById('totalVAT').textContent = `฿${totalVAT.toLocaleString('th-TH', {minimumFractionDigits: 2})}`;
    document.getElementById('finalTotal').textContent = `฿${finalTotal.toLocaleString('th-TH', {minimumFractionDigits: 2})}`;
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('productForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const productSelect = document.getElementById('productSelect');
        const quantity = parseInt(document.getElementById('quantity').value);
        
        if (productSelect.value && quantity > 0) {
            const [productName, price] = productSelect.value.split('|');
            const unitPrice = parseFloat(price);
            
            addProductToQuotation(productName, unitPrice, quantity);
            closeModal();
        }
    });

});