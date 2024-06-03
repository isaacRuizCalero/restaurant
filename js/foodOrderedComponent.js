class OrderItemComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.nom = this.getAttribute('nom');
        this.imatge = this.getAttribute('imatge');
        this.preu = parseFloat(this.getAttribute('preu'));
        this.quantitat = parseInt(this.getAttribute('quantitat'), 10);

        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                /* Afegir estil aquí */
            </style>
            <div class="order-item">
                <img src="${this.imatge}" alt="${this.nom}" />
                <h4>${this.nom}</h4>
                <p>Preu: €${this.preu.toFixed(2)}</p>
                <p>Quantitat: 
                    <button class="decrease">-</button>
                    <span>${this.quantitat}</span>
                    <button class="increase">+</button>
                </p>
            </div>
        `;

        this.shadowRoot.querySelector('.increase').addEventListener('click', () => this.updateQuantity(1));
        this.shadowRoot.querySelector('.decrease').addEventListener('click', () => this.updateQuantity(-1));
    }

    updateQuantity(change) {
        const newQuantity = this.quantitat + change;
        this.dispatchEvent(new CustomEvent('update-quantity', {
            detail: { nom: this.nom, quantitat: newQuantity },
            bubbles: true,
            composed: true
        }));
    }
}

customElements.define('order-item-component', OrderItemComponent);
