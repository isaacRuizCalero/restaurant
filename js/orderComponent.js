class OrderComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.orderItems = [];
    }

    connectedCallback() {
        this.render();
        window.addEventListener('add-to-order', (event) => this.addItem(event.detail));
    }

    addItem(plat) {
        const existingItem = this.orderItems.find(item => item.nom === plat.nom);
        if (existingItem) {
            existingItem.quantitat += 1;
        } else {
            this.orderItems.push({...plat, quantitat: 1});
        }
        this.render();
    }

    updateItem(nom, quantitat) {
        const item = this.orderItems.find(item => item.nom === nom);
        if (item) {
            item.quantitat = quantitat;
            if (item.quantitat <= 0) {
                this.orderItems = this.orderItems.filter(i => i.nom !== nom);
            }
            this.render();
        }
    }

    calculateTotal() {
        return this.orderItems.reduce((total, item) => total + item.preu * item.quantitat, 0).toFixed(2);
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                ::selection {
                    background-color: #b2af9d;
                    color: #515048;
                }

                #order-heading { 
                    text-align: center;
                    display: flex;
                    flex-direction: column;
                    width: 100%;
                }

                #order-title { 
                    color: #515048; 
                    font-size: 32px; 
                    font-weight: 500; 
                    font-family: 'IM Fell Great Primer SC', serif; 
                    margin-top: 15px; 
                    margin-bottom: 0;
                }

                #title-line { 
                    width: 80%; 
                    height: 1px;
                    border: 0;
                    border-top: 1px solid #b2af9d;
                    padding: 0;
                    margin-bottom: 20px;
                }

                #order-body {
                    display: flex;
                    flex-direction: column;
                    min-height: 500px;
                    width: 550px;
                    background: #eeede9;
                    margin: 0 auto;
                    border-radius: 10px;
                    padding: 10px;
                }

                .food-container {
                    display: flex;
                    justify-content: space-between;
                    border: 1px solid #b2af9d;
                    margin: 10px;
                    border-radius: 10px;
                    padding: 10px;
                }

                .food-info {
                    flex: 1;
                }

                .food-name-p {
                    color: #515048;
                    font-size: 20px;
                    font-weight: 500;
                    font-family: 'Lato', sans-serif;
                    margin: 0;
                }

                .food-price {
                    color: #000000;
                    font-size: 14px;
                    font-weight: 600;
                    font-style: italic;
                    font-family: 'Lato', sans-serif;
                    margin-bottom: 10px;
                }

                .food-quantity {
                    display: flex;
                    align-items: center;
                    margin-top: 10px;
                }

                .quantity-button {
                    background-color: #b2af9d;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                    width: 30px;
                    height: 30px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }

                #minus-quantity-button {
                    margin-right: 10px;
                }

                #plus-quantity-button {
                    margin-left: 10px;
                }

                .food-image {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-left: 10px;
                    height: 100%;
                    width: 100px;
                }

                .food-image-img {
                    height: 100%;
                    width: 100%;
                    content-fit: cover;
                    border-radius: 10px;
                }

                #total-price {
                    text-align: center;
                    font-size: 20px;
                    font-weight: bold;
                    margin-top: 20px;
                }
            </style>

            <div id="order-heading">
                <h2 id="order-title">Comanda</h2>
                <hr id="title-line">
            </div>

            <div id="order-body">
                ${this.orderItems.map(item => `
                    <div class="food-container">
                        <div class="food-info">
                            <h3 class="food-name-p">${item.nom}</h3>
                            <div class="food-price">${item.preu.toFixed(2)}€</div>
                            <div class="food-quantity">
                                <button type="button" class="quantity-button" id="minus-quantity-button" data-nom="${item.nom}" data-change="-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="black" d="M19 12.998H5v-2h14z"/></svg>
                                </button>
                                <span><b>${item.quantitat}</b></span>
                                <button type="button" class="quantity-button" id="plus-quantity-button" data-nom="${item.nom}" data-change="1">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="black" d="M19 12.998h-6v6h-2v-6H5v-2h6v-6h2v6h6z"/></svg>
                                </button>
                            </div>
                        </div>
                        <div class="food-image">
                            <img src="${item.imatge}" alt="${item.nom}" class="food-image-img">
                        </div>
                    </div>
                `).join('')}
            </div>

            <div id="total-price">
                <b>Preu Total: ${this.calculateTotal()}€</b>
            </div>
        `;

        this.shadowRoot.querySelectorAll('.quantity-button').forEach(button => {
            button.addEventListener('click', (event) => {
                const nom = event.currentTarget.dataset.nom;
                const change = parseInt(event.currentTarget.dataset.change);
                const item = this.orderItems.find(item => item.nom === nom);
                if (item) {
                    this.updateItem(nom, item.quantitat + change);
                }
            });
        });
    }
}

customElements.define('order-component', OrderComponent);
