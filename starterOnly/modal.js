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
  const formData = document.querySelectorAll('.formData');
  const firstName = document.getElementById('first').value;
  const lastName = document.getElementById('last').value;
  const email = document.getElementById('email').value;
  const birthdate = document.getElementById('birthdate').value;
  const tourneys = document.getElementById('quantity').value;

  if (minChar(firstName) == true) {
    formData[0].dataset.errorVisible = false;
  } else if (minChar(firstName) == false) {

    formData[0].dataset.errorVisible = true;
    formData[0].dataset.error = 'Veuillez entrer 2 caractères ou plus pour le champ du prénom.';

  }

  if (minChar(lastName) == true) {

    formData[1].dataset.errorVisible = false;

  } else if (minChar(lastName) == false) {

    formData[1].dataset.errorVisible = true;
    formData[1].dataset.error = 'Veuillez entrer 2 caractères ou plus pour le champ du nom.';

  }

  if (validateEmail(email) == true) {
    formData[2].dataset.errorVisible = false;
  } else if (validateEmail(email) == false || validateEmail(email) == null) {

    formData[2].dataset.errorVisible = true;
    formData[2].dataset.error = 'Veuillez entrer une adresse email valide.';

  }

  if (validateDate(birthdate) == true) {
    formData[3].dataset.errorVisible = false;
  } else if (validateDate(birthdate) == false || validateDate(birthdate) == null) {

    formData[3].dataset.errorVisible = true;
    formData[3].dataset.error = 'Vous devez choisir votre date de naissance.';

  }

  if (validateQuantity(tourneys) == true) {
    formData[4].dataset.errorVisible = false;
  } else if (validateQuantity(tourneys) == false || validateQuantity(tourneys) == null) {

    formData[4].dataset.errorVisible = true;
    formData[4].dataset.error = 'Vous devez entrer une valeur.';

  }

  if (validateLocation() == true) {
    formData[5].dataset.errorVisible = false;
  } else if (validateLocation() == false || validateLocation() == null) {

    formData[5].dataset.errorVisible = true;
    formData[5].dataset.error = 'Vous devez cocher une case.';

  }

  if (validateCheckbox(terms) == true) {
    formData[6].dataset.errorVisible = false;
  } else if (validateCheckbox(terms) == false || validateCheckbox(terms) == null) {

    formData[6].dataset.errorVisible = true;
    formData[6].dataset.error = "Vous devez accepter les conditions d'utilisation";

  }

  if (minChar(firstName) && minChar(lastName) && validateEmail(email) && validateDate(birthdate) && validateQuantity(tourneys) && validateLocation() && validateCheckbox(terms)) {
    console.log('Prénom: ' + firstName);
    console.log('Nom: ' + lastName);
    console.log('Date de naissance: ' + birthdate);
    console.log('Nombre de participations: ' + tourneys);
    console.log('Ville: ' + locations[i].value);
    console.log('CGU: acceptées');
    document.querySelector('.modal-body').innerHTML = '<p class="thanks">Merci ! Votre réservation a été reçue.</p>';
    return true;
  } else if (!minChar(firstName) || !minChar(lastName) || !validateEmail(email) || !validateDate(birthdate) || !validateQuantity(tourneys) || !validateLocation() || !validateCheckbox(terms)){
    return false;
  }

};

// Our function to make sur the name has more than 2 characters
function minChar(string) {
  if (string.length >= 2) {
    return true;
  } else if (string.length < 2) {
    return false;
  }
}

// Function to validate an email

function validateEmail(string) {
  const regex = "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?";
  if (string.match(regex)) {
    return true;
  } else if (!string.match(regex)) {
    return false;
  }
}

//function to validate the birthdate

function validateDate(date) {
  if (date) {
    return true;
  } else if (date == false) {
    return false;
  }
}

// function to validate a quantity

function validateQuantity(quantity) {
  if (quantity) {
    return true;
  } else if (!quantity || quantity == null) {
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
}

formulaireInscription();