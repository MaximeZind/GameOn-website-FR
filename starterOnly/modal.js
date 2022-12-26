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


  minChar(firstName);
  if (minChar(firstName) == true) {
    formData[0].dataset.errorVisible = false;
  } else if (minChar(firstName) == false) {

    formData[0].dataset.errorVisible = true;
    formData[0].dataset.error = 'Veuillez entrer 2 caractères ou plus pour le champ du prénom.';

  }

  minChar(lastName);
  if (minChar(lastName) == true) {

    formData[1].dataset.errorVisible = false;

  } else if (minChar(lastName) == false) {

    formData[1].dataset.errorVisible = true;
    formData[1].dataset.error = 'Veuillez entrer 2 caractères ou plus pour le champ du nom.';

  }

  validateEmail(email);
  if (validateEmail(email) == true) {
    formData[2].dataset.errorVisible = false;
  } else if (validateEmail(email) == false || validateEmail(email) == null) {

    formData[2].dataset.errorVisible = true;
    formData[2].dataset.error = 'Veuillez entrer une adresse email valide.';

  }

  validateDate(birthdate);

  if (validateDate(birthdate) == true) {
    formData[3].dataset.errorVisible = false;
  } else if (validateDate(birthdate) == false || validateDate(birthdate) == null) {

    formData[3].dataset.errorVisible = true;
    formData[3].dataset.error = 'Vous devez choisir votre date de naissance.';

  }

  validateQuantity(tourneys);

  if (validateQuantity(tourneys) == true) {
    formData[4].dataset.errorVisible = false;
  } else if (validateQuantity(tourneys) == false || validateQuantity(tourneys) == null) {

    formData[4].dataset.errorVisible = true;
    formData[4].dataset.error = 'Vous devez rentrer une valeur.';

  }

  validateLocation();
  if (validateLocation() == true) {
    formData[5].dataset.errorVisible = false;
  } else if (validateLocation() == false || validateLocation() == null) {

    formData[5].dataset.errorVisible = true;
    formData[5].dataset.error = 'Vous devez cocher une case.';

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
  let locations = document.getElementsByName('location');
  for (i = 0; i < locations.length; i++) {
    if (locations[i].checked) {
      return true;
    }
  }
  return false;
}

//function validate terms

function validateTerms() {
  if (terms.checked) {
    return true;
  } else if (!terms.checked) {
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

  //
  terms.addEventListener("click", function () {
    if (terms.checked) {
      terms.setAttribute('checked', false);
    } else if (!terms.checked) {
      terms.setAttribute('checked', true);
    }
  });
}

formulaireInscription();