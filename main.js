"use strict";
let feats = document.querySelector(".dynamic-feats");

export const getFeatures = () => {
  console.log("Sending request..."); //checking if the promise is only completing once, and not multiple times

  const features = "./features/features.html";
  return fetch(features)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.text();
    })
    .then((html) => {
      feats.innerHTML = html;
      console.log("Request fulfilled"); //checking if the promise is only completing once, and not multiple times
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
      throw error;
    });
};

const scrollNavButtons = () => {
  const navButtons = ["contact", "aboutMe-mainButton", "projects-mainbutton"];

  navButtons.forEach((id) => {
    let button = document.getElementById(id);
    button.addEventListener("click", (e) => {
      let btn = e.target.id;
      if (btn.includes("contact")) {
        window.scrollTo(0, document.documentElement.scrollHeight);
      } else {
        window.scrollTo({
          top: 740,
          behavior: "auto",
        });

        if (btn.includes("aboutMe-mainButton")) {
          const aboutButtonR = document.getElementById("btn-about-right");
          const aboutButtonT = document.getElementById("btn-about-top");
          aboutButtonR.click();
          aboutButtonT.click();
        } else {
          const projectsButtonR = document.getElementById("btn-projects-right");
          const projectButtonT = document.getElementById("btn-projects-top");
          projectButtonT.click();
          projectsButtonR.click();
        }
      }
    });
  });
};
scrollNavButtons();

const L_sliderArrow = document.getElementById("left-slidearrow");
const R_sliderArrow = document.getElementById("right-slidearrow");
const sliders = document.querySelector(".sliders").children;
const slidersArray = [...sliders].slice(0, 3);
let index = 0;

const sliderArrows = (e) => {
  let id = e.target.id;

  if (id.includes("right")) {
    index++;
    if (index >= slidersArray.length) {
      index = 0;
    }
  } else {
    index--;
    if (index < 0) {
      index = slidersArray.length - 1;
    }
  }

  slidersArray.forEach((slider) => (slider.checked = false));
  slidersArray[index].checked = true;
};
[R_sliderArrow, L_sliderArrow].forEach((el) =>
  el.addEventListener("click", sliderArrows)
);

const btn = document.getElementById("button");

/* const recaptchaCallback = () => {
  //hacer esto con node (desde el servidor) para evitar la manipulacion desde el frontend inspeccionando la página
  btn.classList.remove("disabled");
  btn.classList.add("active");
  btn.disabled = false;
}; */

window.recaptchaCallback = recaptchaCallback;

const warning_email = document.querySelector(".warning-email");

document.getElementById("form").addEventListener("submit", function (e) {
  e.preventDefault();
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

  const email_value = document.getElementById("email_id").value;

  if (!regex.test(email_value)) {
    warning_email.style.display = "block";
  } else {
    warning_email.style.display = "none";
    btn.value = "Sending...";

    const serviceID = "default_service";
    const templateID = "template_2rjpnb2";

    emailjs
      .sendForm(serviceID, templateID, this) //emailjs service uses "this" to access form's fields data
      .then(
        () => {
          btn.value = "Enviar";
          alert("Sended!");
        },
        (err) => {
          btn.value = "Enviar";
          alert(JSON.stringify(err));
        }
      );
  }
});

/* const checkFields = () => {
  const captchaDiv = document.querySelector(".captcha");
  const fields = ["from_name", "email_id", "message"].map((e) =>
    document.getElementById(e)
  );
  const fieldsValues = fields.map((e) => e.value.trim());

  if (fieldsValues.every((value) => value !== "")) {
    captchaDiv.style.display = "flex";
  } else {
    captchaDiv.style.display = "none";
  }
  return fields; //averiguar como funciona este return solo con fields y no con fieldsvalues, por que se tiene que retornar para que funcione? por que tiene quer etornarse fields y no la ultima variable?
};
checkFields().forEach((e) => e.addEventListener("input", checkFields)); */
