function editNav() { // Ouverture du menu burger
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground"); //modal
const modalBtn = document.querySelectorAll(".modal-btn"); //bouton d'inscription pour ouvrir le formulaire
const modalClose = document.querySelectorAll(".close"); // Croix pour fermer la modal
const reserve = document.forms["reserve"]; // Formulaire "reserve"
const terms = document.querySelector('.terms'); // checkbox CGU
const locations = document.getElementsByName('location'); // Les checkbox "location"
const thanksBtn = document.querySelector('.btn-thanks'); //bouton de fermeture du message de remerciement


// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// close modal form
function closeModal() {
  modalbg.style.display = "none";
}

function validate(e) {
  e.preventDefault();

  const firstName = document.getElementById('first'); //champ du prénom
  const lastName = document.getElementById('last'); //champ du nom
  const email = document.getElementById('email'); //champ de l'email
  const birthdate = document.getElementById('birthdate'); //champ de la date de naissance
  const tourneys = document.getElementById('quantity'); // champ du nombre de tournois
  const checkbox2 = document.getElementById('checkbox2'); //Checkbox être prévenu des évènements
  // Liste des champs vérifiés par la fonction appropriée dans une constante:
  const validations = [validateName(firstName, 'prénom'), validateName(lastName, 'nom'), validateEmail(email), validateDate(birthdate), validateQuantity(tourneys), validateLocation(), validateCheckbox(terms)];

  // Loop
  let isValid = true;
  let returnValueIsValid = true;

  validations.forEach((validation) => {
    returnValueIsValid = validation;
    isValid = isValid && returnValueIsValid; //Si une itération est false, IsValid sera false

  });

  if (isValid) {
    console.log('Prénom: ' + firstName.value.trim());
    console.log('Nom: ' + lastName.value.trim());
    console.log('Email: ' + email.value.trim());
    console.log('Date de naissance: ' + birthdate.value.trim());
    console.log('Nombre de participations: ' + tourneys.value.trim());
    console.log('Ville: ' + locationChecked);
    console.log('CGU acceptées: ' + terms.checked);
    console.log('Souhaite être prévenu des prochains évènements: ' + checkbox2.checked);
    reserve.classList.add('select-hide');
    document.querySelector('.content > span').classList.add('select-hide');
    document.querySelector('.thanks--msg').classList.remove('select-hide');
    reserve.reset();
    return true;
  } else if (!isValid) {
    return false;
  }
}

// Fonction pour valider les noms
function validateName(string, option) {
  nameValue = string.value.trim();
  const regex = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/; //pattern
  if (nameValue.length >= 2) { // plus de 2 caractères
    if ((regex.test(nameValue)) && (!nameValue.includes(",,")) && (!nameValue.includes("..")) && (!nameValue.includes("''")) && (!nameValue.includes("--")) && (!nameValue.trim().includes("  "))) {
      string.parentNode.dataset.errorVisible = false;
      return true;
    } else if ((regex.test(nameValue) === false) || (nameValue.includes(",,")) || (nameValue.includes("..")) || (nameValue.includes("''")) || (nameValue.includes("--")) || nameValue.trim().includes("  ")) {
      string.parentNode.dataset.errorVisible = true;
      string.parentNode.dataset.error = `Vous devez entrer un ${option} valide.`;
      return false;
    }
  } else if (nameValue.length < 2) {
    string.parentNode.dataset.errorVisible = true;
    string.parentNode.dataset.error = `Veuillez entrer 2 caractères ou plus pour le champ du ${option}`;
    return false;
  }

}

// Fonction qui valide l'email

function validateEmail(string) {
  emailValue = string.value.trim();
  const regex = "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?";
  if (emailValue.match(regex) && !emailValue.includes(" ")) {
    string.parentNode.dataset.errorVisible = false;
    return true;
  } else if (!emailValue.match(regex) || emailValue.includes(" ")) {
    string.parentNode.dataset.errorVisible = true;
    string.parentNode.dataset.error = 'Veuillez entrer une adresse email valide.';
    return false;
  }
}

// Fonction pour tester la date (date valide et âge limite)

function validateDate(dateInput) {
  const date = dateInput.value.trim();
  const ageLimitMin = 12;
  const ageLimitMax = 100;
  invalidDateErrorMsg = 'Vous devez entrer une date valide.';
  ageLimitMinErrorMsg = "L'âge minimum de participation est de 12 ans.";
  ageLimitMaxErrorMsg = "L'âge maximum de participation est de 100 ans.";
  let today = new Date();
  let dateformatYYYYMMDD = /^\d{4}[\-\/\s]?((((0[13578])|(1[02]))[\-\/\s]?(([0-2][0-9])|(3[01])))|(((0[469])|(11))[\-\/\s]?(([0-2][0-9])|(30)))|(02[\-\/\s]?[0-2][0-9]))$/;
  let dateformatDDMMYYYY = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
  let separator1 = date.split('/');
  let separator2 = date.split('-');

  if (separator1.length > 1) {
    var pdate = date.split('/');
  }
  if (separator2.length > 1) {
    var pdate = date.split('-');
  }

  let yyyy = 0;
  let mm = 0;
  let dd = 0;

  //Quand la date a le format YYYY/MM/DD (input type="date")
  if (date.match(dateformatYYYYMMDD)) {

    //parseInt va renvoyer un entier
    yyyy = parseInt(pdate[0]);
    mm = parseInt(pdate[1]);
    dd = parseInt(pdate[2]);

  } else if (date.match(dateformatDDMMYYYY)) {

    yyyy = parseInt(pdate[2]);
    mm = parseInt(pdate[1]);
    dd = parseInt(pdate[0]);

  } else if ((!date.match(dateformatYYYYMMDD) || !date.match(dateformatDDMMYYYY)) && (date.length !== 0))  { //La date ne correspond à aucun format 
    dateInput.parentNode.dataset.errorVisible = true;
    dateInput.parentNode.dataset.error = invalidDateErrorMsg;
    return false;
  } else if (date.length === 0){
    dateInput.parentNode.dataset.errorVisible = true;
    dateInput.parentNode.dataset.error = "Vous devez entrer votre date de naissance.";
    return false;
  }

  let age = today.getFullYear() - yyyy;

  if ((today.getMonth() + 1 < mm) || (today.getMonth() + 1 === mm && today.getDate() < dd)) { // Calculer l'âge
    age--;
  }
  //liste des jours dans chaque mois (par défaut, pas d'année bissextile)
  let DaysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (mm === 1 || mm > 2) { //tous les mois sauf février
    if (dd > DaysInMonth[mm - 1]) { // plus de jours qu'il n'y a dans le mois
      dateInput.parentNode.dataset.errorVisible = true;
      dateInput.parentNode.dataset.error = invalidDateErrorMsg;
      return false;
    }
  }
  if (mm === 2) { // février
    var leapYear = false;

    if (!(yyyy % 4) && yyyy % 100 || !(yyyy % 400)) { //année bissextile
      leapYear = true;
    }
    if (!leapYear && dd >= 29) {
      dateInput.parentNode.dataset.errorVisible = true;
      dateInput.parentNode.dataset.error = invalidDateErrorMsg;
      return false;
    }
    if (leapYear && dd > 29) { // année bissextile
      dateInput.parentNode.dataset.errorVisible = true;
      dateInput.parentNode.dataset.error = invalidDateErrorMsg;
      return false;
    }
  }

  // Comparaison de l'âge aux âges limites 
  if (age < ageLimitMin) {
    dateInput.parentNode.dataset.errorVisible = true;
    dateInput.parentNode.dataset.error = ageLimitMinErrorMsg;
    return false;
  } else if (age > ageLimitMax) {
    dateInput.parentNode.dataset.errorVisible = true;
    dateInput.parentNode.dataset.error = ageLimitMaxErrorMsg;
    return false;
  }

  dateInput.parentNode.dataset.errorVisible = false;
  return true;
}

// Fonction pour valider une quantité

function validateQuantity(quantityInput) {
  quantity = quantityInput.value.trim();
  quantityErrorMsg = 'Vous devez entrer une valeur entre 0 et 99.';
  const quantityMax = 99; //valeur maximum
  const quantityMin = 0; //valeur minimum
  const regex = /^[0-9]+$/; // Valeur numérique
  if (regex.test(quantity)) {// Test de notre quantité pour confirmer que c'est une valeur numérique
    if ((quantityMin <= quantity) && (quantity <= quantityMax)) { // Test pour confirmer que la valeur est entre 0 et 99
      quantityInput.parentNode.dataset.errorVisible = false;
      return true;
    } else if ((quantity > quantityMax) || (quantity < quantityMin)) {
      quantityInput.parentNode.dataset.errorVisible = true;
      quantityInput.parentNode.dataset.error = quantityErrorMsg;
      return false;
    }
  } else if (!regex.test(quantity)) {
    quantityInput.parentNode.dataset.errorVisible = true;
    quantityInput.parentNode.dataset.error = quantityErrorMsg;
    return false;
  }
}

//Fonction pour valider la localisation

function validateLocation() {
  for (i = 0; i < locations.length; i++) {
    if (locations[i].checked) {
      locationChecked = locations[i].value;
      document.getElementById('location1').parentNode.dataset.errorVisible = false;
      return true;
    }
  }
  document.getElementById('location1').parentNode.dataset.errorVisible = true;
  document.getElementById('location1').parentNode.dataset.error = 'Vous devez choisir une option.';
  return false;
}

// fonction pour valider une checkbox (CGU)

function validateCheckbox(checkbox) {
  if (checkbox.checked) {
    checkbox.parentNode.dataset.errorVisible = false;
    return true;
  } else if (!checkbox.checked) {
    checkbox.parentNode.dataset.errorVisible = true;
    checkbox.parentNode.dataset.error = "Vous devez vérifier que vous acceptez les termes et conditions.";
    return false;
  }
}

function formulaireInscription() { // Fonction avec tous nos Event Listeners
  // launch modal event
  modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

  // close modal event
  modalClose.forEach((cross) => cross.addEventListener("click", closeModal));

  // Quand on soumet le formulaire
  reserve.addEventListener("submit", validate);

  // Change l'attribut checked de la checkbox des CGU des CGU
  terms.addEventListener("click", function () {
    if (terms.checked) {
      terms.setAttribute('checked', true);
    } else if (!terms.checked) {
      terms.setAttribute('checked', false);
    }
  });

  thanksBtn.addEventListener("click", function () {
    reserve.classList.remove('select-hide');
    document.querySelector('.content > span').classList.remove('select-hide');
    document.querySelector('.thanks--msg').classList.add('select-hide');
    closeModal(); // Ferme le message de remerciement
  });
}

formulaireInscription();
