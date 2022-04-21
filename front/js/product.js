// URLSearchParams
let searchParams = new URLSearchParams(window.location.search);
let productId = searchParams.get('id')

console.log('récupérer id :' ,productId);

let produitData = [];

const fetchProduit = async () => {
    await fetch(`http://localhost:3000/api/products/${productId}`)
    .then((res) => res.json())
    .then ((promise) => {
        produitData = promise;
        console.log('object avec cet id', promise);
    });
};

const produitDisplay = async () => {
    await fetchProduit();

    document.querySelector(".item__img").innerHTML =
    `
    <img src="${produitData.imageUrl}" alt="${produitData.altTxt}">
    `;

    // détail du produit
    document.getElementById("title").innerText = `${produitData.name}`;
    document.getElementById("price").innerText = `${produitData.price}`;
    document.getElementById("description").innerText = `${produitData.description}`;
    document.getElementById("addToCart").id = `${productId}`;

    console.log('affiche les détails de :', produitData.name);
    
    //choix couleur
    let selectCouleur = document.getElementById("colors");
    
    for(let couleur of produitData.colors){                   
        let option = document.createElement("option");
        option.innerHTML = couleur;
        selectCouleur.appendChild(option);
    }

panier(productId);
};

produitDisplay();

const panier = () => {
    // le bouton ajout panier a l'id du produit
    let bouton = document.getElementById(productId);
    console.log("le btn \'ajout panier\' a l'id du produit :",bouton);

    // selection couleur + qty = localStorage
    bouton.addEventListener("click", () => {

        // localStorage null (rien) !
        let produitTableau = JSON.parse(localStorage.getItem('produit'));
        console.log(produitTableau);
        
        //valeur choix couleur
        let selectColor = document.getElementById("colors");
        console.log('couleur choisie :',selectColor.value);

        //valeur choix quantité
        let selectQuantity = document.getElementById("quantity");
        console.log('quantité choisie :', selectQuantity.value);

        
        //nouveau choix dans tableau
        const newObjectArray = Object.assign({}, produitData, {
            couleurChoisie: `${selectColor.value}`,
            quantite : `${selectQuantity.value}`,
        });


        // function alert color and qty
        const alertColorQty = () =>{
            if (selectColor.value == 0 || selectQuantity.value == 0) {
                alert("Vous avez oublier de sélectionner une couleur ou une quantité")
                console.log("pas de couleur et qty sélectionné donc localStorage vide");
                localStorage.clear(product);
            }
            else{
                location.href="cart.html"
            }
        }
        

        console.log('ajouter new objet dans tableau / quantite et couleur choisie',newObjectArray);

        //call fucntion alert color and qty
        if (produitTableau == null || produitTableau != null) {
            alertColorQty();
        }

        //localStorage null (à remplir) !
        if (produitTableau == null) {
            produitTableau = [];
            produitTableau.push(newObjectArray);
            console.log(produitTableau);

            //transformer produit tableau en string pour le stocker dans le localStorage
            localStorage.setItem("produit", JSON.stringify(produitTableau));
        }
        else if (produitTableau != null) {
            for (i = 0; i < produitTableau.length; i++){
                console.log('!= null');
                // meme produit et meme couleur = ++quantite
                if (produitTableau[i]._id == produitData._id && produitTableau[i].couleurChoisie == selectColor.value){
                    return (
                        produitTableau[i].quantite = `${selectQuantity.value}` ,
                        localStorage.setItem("produit", JSON.stringify(produitTableau)),
                        produitTableau = JSON.parse(localStorage.getItem("produit")),
                        console.log("quantite choisie")
                    );
                }
            }
            for (i = 0; i < produitTableau.length; i++){
                //meme id et pas meme couleur ou id different
                if(produitTableau[i]._id == produitData._id && produitTableau[i].couleurChoisie != selectColor.value || produitTableau[i]._id != produitData._id){
                    return (
                    produitTableau.push(newObjectArray),
                    localStorage.setItem('produit', JSON.stringify(produitTableau)),
                    produitTableau = JSON.parse(localStorage.getItem("produit")),
                    console.log("nouveau article panier")
                    );
                }
            }    
        } 
    });
    return (produitTableau = JSON.parse(localStorage.getItem("produit")));
};