document.addEventListener("DOMContentLoaded", function () {
  const template = document.getElementById("template-plat");
  const containerEntrees = document.getElementById("liste-entrees");
  const containerPlats = document.getElementById("liste-plats");
  const containerDesserts = document.getElementById("liste-desserts");
  const toggle = document.getElementById("vegetarian-toggle");
  let allPlats = [];

  // Fonction pour créer un plat à partir du template
function afficherPlat(plat, container) {
  const clone = template.content.cloneNode(true);
  clone.querySelector(".nom").textContent = plat.nom;
  clone.querySelector(".description").textContent = plat.description;
  clone.querySelector(".prix").textContent = plat.prix.toFixed(2) + " €";
  clone.querySelector(".vegetarien").textContent = plat.vegetarien ? "Végétarien" : "";

  const imageElement = clone.querySelector(".photo");
  if (plat.image && imageElement) {
    imageElement.src = plat.image;
    imageElement.alt = "Photo de " + plat.nom;
  }

  clone.querySelector(".plat").dataset.vegetarien = plat.vegetarien;
  container.appendChild(clone);
}

  // Fonction pour vider les conteneurs
  function viderCarte() {
    containerEntrees.innerHTML = "";
    containerPlats.innerHTML = "";
    containerDesserts.innerHTML = "";
  }

  // Fonction pour afficher les plats filtrés
  function afficherCarte(filtrerVegetariens = false) {
    viderCarte();
    allPlats.forEach((plat) => {
      if (filtrerVegetariens && !plat.vegetarien) return;
      if (plat.categorie === "entrée") {
        afficherPlat(plat, containerEntrees);
      } else if (plat.categorie === "plat") {
        afficherPlat(plat, containerPlats);
      } else if (plat.categorie === "dessert") {
        afficherPlat(plat, containerDesserts);
      }
    });
  }

  // Récupération des données depuis plats.json
  fetch("plats.json")
    .then((response) => response.json())
    .then((data) => {
      allPlats = data;
      afficherCarte();
    })
    .catch((error) => {
      console.error("Erreur lors du chargement de la carte :", error);
    });

  // Gestion du toggle végétarien
  toggle.addEventListener("change", () => {
    afficherCarte(toggle.checked);
  });

  // Gestion du formulaire de réservation
  const form = document.getElementById("form-reservation");
  const confirmation = document.getElementById("confirmation");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    // (Optionnel : tu pourrais ici récupérer les données et faire autre chose)

    // Affichage du message de confirmation
    confirmation.style.display = "block";

    // Réinitialiser le formulaire
    form.reset();
  });
});
