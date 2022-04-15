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
    let select = document.getElementById("colors");
    
    for(let couleur of produitData.colors){                   
        let option = document.createElement("option");
        option.innerHTML = couleur;
        select.appendChild(option);
    }
panier(productId);
};

produitDisplay();

const panier = () => {
    // le bouton ajout panier à l'id du produit
    let bouton = document.getElementById(productId);
    console.log("le btn \'ajout panier\' a l'id du produit :",bouton);

    // selection couleur + new objet tableau = localStorage
    bouton.addEventListener("click", () => {

        // localStorage null (rien) !
        let produitTableau = JSON.parse(localStorage.getItem('produit'));
        console.log(produitTableau);
        
        //valeur choix couleur
        let select = document.getElementById("colors");
        console.log('couleur choisie :',select.value);
        
        //new ojet tableau
        const newObjectArray = Object.assign({}, produitData, {
            couleurChoisie: `${select.value}`,
            quantite : 1,
        });

        console.log('ajouter new objet dans tableau / quantite et couleur choisie',newObjectArray);

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
                if (produitTableau[i]._id == produitData._id && produitTableau[i].couleurChoisie == select.value){
                    return (
                        produitTableau[i].quantite ++,
                        localStorage.setItem("produit", JSON.stringify(produitTableau)),
                        produitTableau = JSON.parse(localStorage.getItem("produit")),
                        console.log("quantite++")
                    );
                }
            }
            for (i = 0; i < produitTableau.length; i++){
                //meme id et pas meme couleur ou id different
                if(produitTableau[i]._id == produitData._id && produitTableau[i].teinte != select.value || produitTableau[i]._id != produitData._id){
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