let addProduit = JSON.parse(localStorage.getItem("produit"));

const panierDisplay = async () => {
    console.log("salut bg");

    // addProduit existe ? pas null ou undefined
    if(addProduit) {
        await addProduit;
        console.log(addProduit);
        

        document.querySelector("#cart__items").innerHTML = addProduit.map((produit) => 
        
        `
        <article class="cart__item" data-id="${produit._id}" data-color="${produit.couleurChoisie}">
        <div class="cart__item__img">
          <img src="${produit.imageUrl}" alt="Photographie d'un canapé">
        </div>
        <div class="cart__item__content">
          <div class="cart__item__content__description">
            <h2>${produit.name}</h2>
            <p>${produit.couleurChoisie}</p>
            <p>${produit.price} €</p>
          </div>
          <div class="cart__item__content__settings">
            <div class="cart__item__content__settings__quantity">
              <p>Qté : </p>
              <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${produit.quantite}">
            </div>
            <div class="cart__item__content__settings__delete">
              <p class="deleteItem" data-id="${produit._id}" data-color="${produit.couleurChoisie}">Supprimer</p>
            </div>
          </div>
        </div>
        </article>
        `).join("");

        document.querySelector(".cart__price").innerHTML = addProduit.map((produit) =>`
        <p>Total <span id="totalQuantity">${produit.quantite}</span> article(s) : <span id="totalPrice">${produit.price * produit.quantite}</span> €</p>`
        ).join("");
        return;
    }
    
}

panierDisplay();