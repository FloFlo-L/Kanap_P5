let addProduit = JSON.parse(localStorage.getItem("produit"));
let someProduct = [];

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
            <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${produit.quantite}" data-id="${produit._id}" data-color="${produit.couleurChoisie}">
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

      morelessQuantite();
      deleteProduct();

    }
    
}

panierDisplay();


// quantite parnier
const morelessQuantite = async (panierDisplay) => {
  await panierDisplay
  console.log("moreQuantite");
  let more = document.querySelectorAll(".itemQuantity");
  console.log(more);

  more.forEach(qty => {
    qty.addEventListener("input", ()=> {
      console.log(qty);

      for (i= 0; i < addProduit.length; i++) {
        if (addProduit[i]._id == qty.dataset.id && addProduit[i].couleurChoisie == qty.dataset.color) {
          return (
            addProduit[i].quantite = document.querySelectorAll(".itemQuantity")[i].value,
            localStorage.setItem("produit", JSON.stringify(addProduit)),
            location.reload(),
            console.log("quantite modifier")            
          );
        }
      }
    })
  })
}
// supprimer produit panier
const deleteProduct = async (panierDisplay) => {
  await panierDisplay
  console.log("delete :");

  let supprimer = document.querySelectorAll(".deleteItem");
  console.log(supprimer);

  supprimer.forEach(suppr => {
    suppr.addEventListener ("click", () => {

      console.log(suppr)

      if (addProduit.length == 1 ) {  
        return(
          localStorage.removeItem("produit"),
          location.reload()
        ) 
      }
      else {
        someProduct = addProduit.filter(el => {
          if (suppr.dataset.id != el._id || suppr.dataset.color != el.couleurChoisie) {
            return true
          }
        } )
        console.log("filter",someProduct);
        localStorage.setItem("produit", JSON.stringify(someProduct));
        console.log("corbeille remove le produit");
        location.reload();
      }
      
    })
  })

}

