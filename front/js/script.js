let produitsData = [];

const fetchProduits = async () => {
    await fetch("http://localhost:3000/api/products")
    .then(function(response){
        return response.json();
    })
    .then(function(promise){
        produitsData = promise;
        console.log('récupérer ArrayObjects',produitsData);
    })
};

const produitsDisplay = async () => {
    await fetchProduits();
    
    
    for (let produits of produitsData){
        document.querySelector('.items').innerHTML += `
        <a href="./product.html?id=${produits._id}">
            <article>
                <img src="${produits.imageUrl}" alt="${produits.altTxt}">
                <h3 class="productName">${produits.name}</h3>
                <p class="productDescription">${produits.description}</p>
            </article>
        </a>
        `
        console.log('affiche produit', produits.name);
    }
};

produitsDisplay();
