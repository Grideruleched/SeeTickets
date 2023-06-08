let clientId = 'apidigicsi';
let clientSecret = 'R89x2seXL';

// Encodez les identifiants en Base64
let encodedCredentials = btoa(clientId + ':' + clientSecret);

let tokenUrl = 'https://front.apirecette.digitick-ppe.com/v1.1/authorization/token';

let config = {
  headers: {
    'Accept': 'application/hal+json',
    'Authorization': 'Basic ' + encodedCredentials
  }
};

axios.post(tokenUrl, null, config)
  .then(function(response) {
    let accessToken = response.data.accessToken;
    let expiresIn = response.data.expiresIn;

    // Utilisez le token d'accès pour effectuer des requêtes API

    // Exemple : Récupérer les catégories
    let categoriesUrl = 'https://front.apirecette.digitick-ppe.com/v1.1/catalog/categories?limit=10&offset=0';

    let categoriesConfig = {
      headers: {
        'Accept': 'application/hal+json',
        'Authorization': 'Bearer ' + accessToken
      }
    };

    return axios.get(categoriesUrl, categoriesConfig);
  })
  .then(function(response) {
    let categories = response.data._embedded.categories;
    let categoriesList = document.getElementById('categories-list');

    categories.forEach(function(category) {
      let listItem = document.createElement('li');
      listItem.textContent = 'ID: ' + category.id + ', Nom: ' + category.name;
      categoriesList.appendChild(listItem);
    });
  })
  .catch(function(error) {
    console.error('Erreur lors de la génération du token ou de la requête des catégories :', error);
  });
