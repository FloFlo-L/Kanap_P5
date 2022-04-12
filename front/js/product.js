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

    console.log('affiche les détails de :', produitData.name);
    
    //choix couleur
    let select = document.getElementById("colors");
    
    for(let couleur of produitData.colors){                   
        let option = document.createElement("option");
        option.innerHTML = couleur;
        select.appendChild(option);
    }

};

produitDisplay();