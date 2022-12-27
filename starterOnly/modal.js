function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const modalClose = document.querySelectorAll(".close");
const reserve = document.forms["reserve"];
const terms = document.querySelector('.terms');
const termsIcon = document.getElementById('terms-icon');
const locations = document.getElementsByName('location');
const thanksBtn = document.getElementById('btn-thanks');


// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// close modal form
function closeModal() {
  modalbg.style.display = "none";
}

// close modal with the thanks button
function validate(e) {

  e.preventDefault();
  let isValid = true;
  let returnValueIsValid = true;
  const firstName = document.getElementById('first').value;
  const lastName = document.getElementById('last').value;
  const email = document.getElementById('email').value;
  const birthdate = document.getElementById('birthdate').value;
  const tourneys = document.getElementById('quantity').value;

  returnValueIsValid = minChar(firstName);
  if (returnValueIsValid) {
    formData[0].dataset.errorVisible = false;
  } else if (!returnValueIsValid) {

    formData[0].dataset.errorVisible = true;
    formData[0].dataset.error = 'Veuillez entrer 2 caractères ou plus pour le champ du prénom.';

  }
  isValid = isValid && returnValueIsValid;
  returnValueIsValid = minChar(lastName);
  if (returnValueIsValid) {

    formData[1].dataset.errorVisible = false;

  } else if (!returnValueIsValid) {

    formData[1].dataset.errorVisible = true;
    formData[1].dataset.error = 'Veuillez entrer 2 caractères ou plus pour le champ du nom.';

  }

  isValid = isValid && returnValueIsValid;
  returnValueIsValid = validateEmail(email);

  if (returnValueIsValid) {
    formData[2].dataset.errorVisible = false;
  } else if (!returnValueIsValid || returnValueIsValid === null) {

    formData[2].dataset.errorVisible = true;
    formData[2].dataset.error = 'Veuillez entrer une adresse email valide.';

  }

  isValid = isValid && returnValueIsValid;
  returnValueIsValid = validateDate(birthdate);

  if (returnValueIsValid) {
    formData[3].dataset.errorVisible = false;
  } else if (!returnValueIsValid || returnValueIsValid === null) {

    formData[3].dataset.errorVisible = true;

  }

  isValid = isValid && returnValueIsValid;
  returnValueIsValid = validateQuantity(tourneys);

  if (returnValueIsValid) {
    formData[4].dataset.errorVisible = false;
  } else if (!returnValueIsValid || returnValueIsValid === null) {

    formData[4].dataset.errorVisible = true;
    formData[4].dataset.error = 'Vous devez entrer une valeur.';

  }

  isValid = isValid && returnValueIsValid;
  returnValueIsValid = validateLocation();

  if (returnValueIsValid) {
    formData[5].dataset.errorVisible = false;
  } else if (!returnValueIsValid || returnValueIsValid === null) {

    formData[5].dataset.errorVisible = true;
    formData[5].dataset.error = 'Vous devez cocher une case.';

  }

  isValid = isValid && returnValueIsValid;
  returnValueIsValid = validateCheckbox(terms);

  if (returnValueIsValid) {
    formData[6].dataset.errorVisible = false;
  } else if (!returnValueIsValid || returnValueIsValid === null) {

    formData[6].dataset.errorVisible = true;
    formData[6].dataset.error = "Vous devez accepter les conditions d'utilisation";

  }

  isValid = isValid && returnValueIsValid;

  if (isValid) {
    console.log('Prénom: ' + firstName);
    console.log('Nom: ' + lastName);
    console.log('Date de naissance: ' + birthdate);
    console.log('Nombre de participations: ' + tourneys);
    console.log('Ville: ' + locations[i].value);
    console.log('CGU: acceptées');
    reserve.classList.add('select-hide');
    document.querySelector('.content > span').classList.add('select-hide');
    document.querySelector('.button').classList.remove('select-hide');
    document.querySelector('.thanks').classList.remove('select-hide');
    reserve.reset();
    return true;
  } else if (!isValid) {
    return false;
  }

};

// Our function to make sur the name has more than 2 characters
function minChar(string) {
  if (string.trim().length >= 2) {
    return true;
  } else if (string.trim().length < 2) {
    return false;
  }
}

// Function to validate an email

function validateEmail(string) {
  const regex = "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?";
  if (string.match(regex) && !string.includes(" ")) {
    return true;
  } else if (!string.match(regex) || string.includes(" ")) {
    return false;
  }
}

// Fonction pour tester la date (date valide et âge limite)

function validateDate(date) {
  let ageLimitMin = 12;
  let ageLimitMax = 100;
  let today = new Date();
  let dateformatYYYYMMDD = /^((19\d{2})|(20\d{2}))-(((02)-(0[1-9]|[1-2][0-9]))|(((0(1|[3-9]))|(1[0-2]))-(0[1-9]|[1-2][0-9]|30))|((01|03|05|07|08|10|12)-(31)))$/;
  let dateformatDDMMYYYY = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
  
  //Quand la date a le format YYYY/MM/DD (input type="date")
  if (date.match(dateformatYYYYMMDD)) {
    let separator1 = date.split('/');
    let separator2 = date.split('-');

    if (separator1.length > 1) {
      var pdate = date.split('/');
    }
    if (separator2.length > 1) {
      var pdate = date.split('-');
    }
    //parseInt va renvoyer un entier
    let yyyy = parseInt(pdate[0]);
    let mm = parseInt(pdate[1]);
    let dd = parseInt(pdate[2]);
    let age = today.getFullYear() - yyyy;

    if ((today.getMonth() < mm) || (today.getMonth() == mm && today.getDate() < dd) ){ // Calculer l'âge
      age--;
    }
    //liste des jours dans chaque mois (par défaut, pas d'année bissextile)
    let DaysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (mm == 1 || mm > 2) { //tous les mois sauf février
      if (dd > DaysInMonth[mm - 1]) { // plus de jours qu'il n'y a dans le mois
        formData[3].dataset.error = 'Vous devez entrer une date valide.';
        return false;
      }
    }
    if (mm == 2) { // février
      var leapYear = false;

      if (!(yyyy % 4) && yyyy % 100 || !(yyyy % 400)) { //année bissextile
        leapYear = true;
      }
      if (!leapYear && dd >= 29) {
        formData[3].dataset.error = 'Vous devez entrer une date valide.';
        return false;
      }
      if (leapYear && dd > 29) { // année bissextile
        formData[3].dataset.error = 'Vous devez entrer une date valide.';
        return false;
      }
    }

    // Comparaison de l'âge aux âges limites 
    if (age < ageLimitMin) {
      formData[3].dataset.error = "L'âge minimum de participation est de 12 ans.";
      return false;
    } else if (age > ageLimitMax) {
      formData[3].dataset.error = "L'âge maximum de participation est de 100 ans.";
      return false;
    }

  //Quand la date a le format DD/MM/YYYY (input type="text")
  } else if (date.match(dateformatDDMMYYYY)) {
    let separator1 = date.split('/');
    let separator2 = date.split('-');

    if (separator1.length > 1) {
      var pdate = date.split('/');
    }
    if (separator2.length > 1) {
      var pdate = date.split('-');
    }
    //parseInt va renvoyer un entier
    let yyyy = parseInt(pdate[2]);
    let mm = parseInt(pdate[1]);
    let dd = parseInt(pdate[0]);
    let age = today.getFullYear() - yyyy;

    if ((today.getMonth() < mm) || (today.getMonth() == mm && today.getDate() < dd) ){ // Calculer l'âge
      age--;
    }

    //liste des jours dans chaque mois (par défaut, pas d'année bissextile)
    let DaysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (mm == 1 || mm > 2) { // Tous les mois sauf février
      if (dd > DaysInMonth[mm - 1]) {
        formData[3].dataset.error = 'Vous devez entrer une date valide.';
        return false;
      }
    }
    if (mm == 2) { // Février
      var leapYear = false;
    
      if (!(yyyy % 4) && yyyy % 100 || !(yyyy % 400)) { //année bissextile
        leapYear = true;
      }
      if (!leapYear && dd >= 29) {
        formData[3].dataset.error = 'Vous devez entrer une date valide.';
        return false;
      }
      if (leapYear && dd > 29) {  //année bissextile
        formData[3].dataset.error = 'Vous devez entrer une date valide.';
        return false;
      }
    }
    //Comparaison de l'âge avec nos âges limites
    if (age < ageLimitMin) {
      formData[3].dataset.error = "L'âge minimum de participation est de 12 ans.";
      return false;
    } else if (age > ageLimitMax) {
      formData[3].dataset.error = "L'âge maximum de participation est de 100 ans.";
      return false;
    }

  } else if (!date.match(dateformatYYYYMMDD) || !date.match(dateformatDDMMYYYY)) { //La date ne correspond à aucun format 
    formData[3].dataset.error = 'Vous devez entrer une date valide.';
    return false;
  }

  return true;
}

// function to validate a quantity

function validateQuantity(quantity) {
  const regex = /^[0-9]+$/; // Valeur numérique
  if (quantity) {
    if (regex.test(quantity)){ // Test de notre quantité pour confirmer que c'est une valeur numérique
      return true;
    } else if (!regex.test(quantity)){
    return false;
    }
  } else if (!quantity || quantity == null) { // Pas de valeur rentrée
    return false;
  }
}

//function to validate the location

function validateLocation() {
  for (i = 0; i < locations.length; i++) {
    if (locations[i].checked) {
      return true;
    }
  }
  return false;
}

//function validate terms

function validateCheckbox(checkbox) {
  if (checkbox.checked) {
    return true;
  } else if (!checkbox.checked) {
    return false;
  }
}


// form check

function formulaireInscription() {
  // launch modal event
  modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

  // close modal event
  modalClose.forEach((cross) => cross.addEventListener("click", closeModal));

  // une fois le formulaire soumis
  reserve.addEventListener("submit", validate);

  // Change l'attribut checked des CGU
  terms.addEventListener("click", function () {
    if (terms.checked) {
      terms.setAttribute('checked', false);
    } else if (!terms.checked) {
      terms.setAttribute('checked', true);
    }
  });

  thanksBtn.addEventListener("click", function () {
    reserve.classList.remove('select-hide');
    document.querySelector('.content > span').classList.remove('select-hide');
    document.querySelector('.button').classList.add('select-hide');
    document.querySelector('.thanks').classList.add('select-hide');
    closeModal();
  });
}

// Ferme le message de remerciement



formulaireInscription();
