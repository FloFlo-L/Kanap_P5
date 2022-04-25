let addProduit = JSON.parse(localStorage.getItem("produit"));

// afficher panier
const panierDisplay = async () => {
  console.log("salut !!!");

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
        
    morelessQuantite();
    deleteProduct();
    claculProduit();
  } 
}

panierDisplay();


// quantite parnier
const morelessQuantite = async (panierDisplay) => {
  await panierDisplay
  console.log("morelessQuantite");
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
            // location.reload(),
            console.log("quantite modifier"),   
            claculProduit()     
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
        })
        console.log("filter",someProduct);
        localStorage.setItem("produit", JSON.stringify(someProduct));
        console.log("corbeille remove le produit");
        location.reload();
      }
    })
  })
}

// Total produit et quantite
const claculProduit = async (panierDisplay, morelessQuantite, deleteProduct) => {
  await panierDisplay
  await morelessQuantite
  await deleteProduct

  console.log("calcul produit");

  let produitPrice = [];
  let quantiteTotal = [];
  let newTableau = JSON.parse(localStorage.getItem("produit"));
  let afficheQuantite = document.querySelectorAll(".itemQuantity");

  console.log(afficheQuantite);
  

  newTableau.forEach((product) =>{
    produitPrice.push(product.price * product.quantite)
    quantiteTotal.push(product.quantite)
  });
  console.log('Prix total :', produitPrice);
  console.log('Quantité total :',quantiteTotal);

  document.querySelector(".cart__price").innerHTML = `
  <p>Total <span id="totalQuantity">${eval(quantiteTotal.join("+"))}</span> article(s) : <span id="totalPrice">${eval(produitPrice.join("+"))}</span> €</p>
  `
}

  

//formulaire

//Instauration formulaire avec regex
function getForm() {
  // Ajout des Regex
  let form = document.querySelector(".cart__order__form");

  //Création des expressions régulières
  let emailRegExp = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$');
  let charRegExp = new RegExp("^[a-zA-Z ,.'-]+$");
  let addressRegExp = new RegExp("^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+");

  // Ecoute de la modification du prénom
  form.firstName.addEventListener('change', function() {
    validFirstName(this);
  });

  // Ecoute de la modification du nom
  form.lastName.addEventListener('change', function() {
    validLastName(this);
  });

  // Ecoute de la modification de l'adresse
  form.address.addEventListener('change', function() {
    validAddress(this);
  });

  // Ecoute de la modification de la ville
  form.city.addEventListener('change', function() {
    validCity(this);
  });

  // Ecoute de la modification du prénom
  form.email.addEventListener('change', function() {
    validEmail(this);
  });

  //validation du prénom
  const validFirstName = function(inputFirstName) {
    let firstNameErrorMsg = inputFirstName.nextElementSibling;

    if (charRegExp.test(inputFirstName.value)) {
        firstNameErrorMsg.innerHTML = 'Format accepté';
        firstNameErrorMsg.style.color = '#55FF33'
    } else {
        firstNameErrorMsg.innerHTML = 'Format non conforme';
        firstNameErrorMsg.style.color = 'red'
    }
  };

   //validation du nom
   const validLastName = function(inputLastName) {
    let lastNameErrorMsg = inputLastName.nextElementSibling;

    if (charRegExp.test(inputLastName.value)) {
        lastNameErrorMsg.innerHTML = 'Format accepté';
        lastNameErrorMsg.style.color = '#55FF33'
    } else {
        lastNameErrorMsg.innerHTML = 'Format non conforme';
        lastNameErrorMsg.style.color = 'red'
    }
  };

  //validation de l'adresse
  const validAddress = function(inputAddress) {
    let addressErrorMsg = inputAddress.nextElementSibling;

    if (addressRegExp.test(inputAddress.value)) {
        addressErrorMsg.innerHTML = 'Format accepté';
        addressErrorMsg.style.color = '#55FF33'
    } else {
        addressErrorMsg.innerHTML = 'Format non conforme';
        addressErrorMsg.style.color = 'red'
    }
  };

  //validation de la ville
  const validCity = function(inputCity) {
    let cityErrorMsg = inputCity.nextElementSibling;

    if (charRegExp.test(inputCity.value)) {
        cityErrorMsg.innerHTML = 'Format accepté';
        cityErrorMsg.style.color = '#55FF33'
    } else {
        cityErrorMsg.innerHTML = 'Format non conforme';
        cityErrorMsg.style.color = 'red'
    }
  };

  //validation de l'email
  const validEmail = function(inputEmail) {
    let emailErrorMsg = inputEmail.nextElementSibling;

    if (emailRegExp.test(inputEmail.value)) {
        emailErrorMsg.innerHTML = 'Format accepté';
        emailErrorMsg.style.color = '#55FF33'
    } else {
        emailErrorMsg.innerHTML = "Format non conforme";
        emailErrorMsg.style.color = 'red'
    }
  };
}
getForm();

function alertForm() {
  // formulaire vide = alerte
  if (document.getElementById('firstName').value==''){
    alert("Vous n'avez pas indiqué votre Prénom")
    return reload();
    
  }else if (document.getElementById('lastName').value=='') {
    alert("Vous n'avez pas indiqué votre Nom")
    return reload();
    
  }else if (document.getElementById('address').value=='') {
    alert("Vous n'avez pas indiqué votre adresse")
    return reload();
  }else if (document.getElementById('city').value=='') {
    alert("Vous n'avez pas indiqué votre Ville")
    return reload();
  }else if (document.getElementById('email').value=='') {
    alert("Vous n'avez pas indiqué votre Email")
    return reload();
  }
}


function postForm (){

  const order = document.getElementById('order');  

  order.addEventListener('click', (event) => {
  event.preventDefault();


  // je récupère les données du formulaire dans un objet
  const contact = {
    firstName : document.getElementById('firstName').value,
    lastName : document.getElementById('lastName').value,
    address : document.getElementById('address').value,
    city : document.getElementById('city').value,
    email : document.getElementById('email').value
  }

  //Construction d'un array d'id depuis le local storage
  let products = [];
  for (let i = 0; i<addProduit.length;i++) {
    products.push(addProduit[i]._id);
    
      
  }
  console.log(products);

  // je mets les valeurs du formulaire et les produits sélectionnés
  // dans un objet...
  const sendFormData = {
    contact,
    products,
  }
  
  // j'envoie le formulaire + localStorage (sendFormData) 
  // ... que j'envoie au serveur

  const options = {
    method: 'POST',
    body: JSON.stringify(sendFormData),
    headers: { 
      'Content-Type': 'application/json',
    }
  };
  console.log(sendFormData);
  console.log(options);

  alertForm();

  fetch("http://localhost:3000/api/products/order", options)
      .then(response => response.json())
      .then(data => {
      localStorage.setItem('orderId', data.orderId);
      //Passe notre numéro de commande en paramètre de l'adresse de confirmation et nous redirige sur la page de confirmation
      document.location.href = 'confirmation.html?id='+ data.orderId;
    });

}); // fin eventListener postForm
} // fin envoi du formulaire postForm

postForm();

