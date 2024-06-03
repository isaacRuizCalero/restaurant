class MenuComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.plats = [
            { nom: 'Amanida Cesar', imatge: 'images/amanida_cesar.jpg', preu: 10.00, allergens: ['gluten'] },
            { nom: 'Lasanya Verdura', imatge: 'images/lasanya_verdura.jpg', preu: 15.00, allergens: ['gluten', 'lactosa']},
            { nom: 'Macarrons', imatge: 'images/macarrons.jpg', preu: 10.00, allergens: ['gluten', 'ou'] },
            { nom: 'Sopa Marisc', imatge: 'images/sopa_marisc.jpg', preu: 8.00, allergens: ['gluten', 'crustacis'] },
            { nom: 'Pizza Quatre Formatges', imatge: 'images/pizza_quatre_formatges.jpg', preu: 11.00, allergens: ['gluten', 'lactosa']},
            { nom: 'Paella Marisc', imatge: 'images/paella_marisc.jpg', preu: 20.00, allergens: ['gluten', 'crustacis'] },
            { nom: 'Tiramisu', imatge: 'images/tiramisu.jpg', preu: 5.00, allergens: ['gluten', 'lactosa', 'ou']}
        ];
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                ::selection {
                    background-color: #b2af9d;
                    color: #515048;
                }

                #menu-heading { 
                    text-align: center;
                    display: flex;
                    flex-direction: column;
                    width: 100%;
                }

                #menu-title { 
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

                .food-container {
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: center;
                    margin: 10px;
                }

                .food-item {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    margin: 10px;
                    padding: 10px;
                    border: 1px solid #b2af9d;
                    border-radius: 10px;
                    width: 200px;
                }

                .food-info {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }

                .food-name-p {
                    color: #515048;
                    font-size: 20px;
                    font-weight: 500;
                    font-family: 'Lato', sans-serif;
                    margin: 0;
                    text-align: center;
                    margin-bottom: 5px;
                }

                .food-price {
                    color: #000000;
                    font-size: 14px;
                    font-weight: 600;
                    font-style: italic;
                    font-family: 'Lato', sans-serif;
                    margin-bottom: 10px;
                }

                .food-allergens {
                    color: #000000;
                    font-size: 14px;
                    font-weight: 400;
                    font-family: 'Lato', sans-serif;
                    margin-bottom: 10px;
                }

                .add-food-button {
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

                .food-image {
                    width: 100%;
                    height: 150px;
                    margin-bottom: 10px;
                }

                .food-image-img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    border-radius: 10px;
                }
            </style>
            <div id="menu-heading">
                <h2 id="menu-title">Menu del dia</h2>
                <hr id="title-line">
            </div>
            <div class="food-container">
                ${this.plats.map(plat => `
                    <div class="food-item">
                        <div class="food-image">
                            <img src="${plat.imatge}" alt="${plat.nom}" class="food-image-img">
                        </div>
                        <div class="food-info">
                            <h3 class="food-name-p">${plat.nom}</h3>
                            <div class="food-price">${plat.preu.toFixed(2)}€</div>
                            <div class="food-allergens"><b>Al·lèrgens: ${plat.allergens.join(', ')}</b></div>
                            <button type="button" class="add-food-button" data-nom="${plat.nom}" data-preu="${plat.preu}" data-imatge="${plat.imatge}">
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="black" d="M19 12.998h-6v6h-2v-6H5v-2h6v-6h2v6h6z"/></svg>
                            </button>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;

        this.shadowRoot.querySelectorAll('.add-food-button').forEach(button => {
            button.addEventListener('click', (event) => this.addToOrder(event));
        });
    }

    addToOrder(event) {
        const button = event.currentTarget;
        const plat = {
            nom: button.dataset.nom,
            preu: parseFloat(button.dataset.preu),
            imatge: button.dataset.imatge,
        };
        this.dispatchEvent(new CustomEvent('add-to-order', { 
            detail: plat, 
            bubbles: true, 
            composed: true 
        }));
    }
}

customElements.define('menu-component', MenuComponent);
