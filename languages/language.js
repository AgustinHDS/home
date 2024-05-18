"use strict";

const changeLanguage = async (language) => {
  const promise = await fetch(`./languages/${language}.json`);
  const data = await promise.json();
  return data;
};

const waitFeaturesToExist = async () => {
  return new Promise((resolve, reject) => {
    let features = document.querySelector(".features");
    if (features) {
      resolve();
    } else {
      setTimeout(() => {
        waitFeaturesToExist().then(resolve, reject);
      }, 100);
    }
  });
};

document.addEventListener("DOMContentLoaded", async () => {
  await waitFeaturesToExist();

  const languageSelect = document.querySelector(".language-select");
  let textToChange = document.querySelectorAll("[data-section]");

  const changeLanguageAndSave = async (language) => {
    const data = await changeLanguage(language);

    for (const elements of textToChange) {
      const section = elements.dataset.section;
      const value = elements.dataset.value;
      elements.innerHTML = data[section][value];
    }

    let name = document.getElementById("from_name");
    let email = document.getElementById("email_id");
    let msg = document.getElementById("message");
    let btn = document.getElementById("button");

    if (languageSelect.value === "en") {
      name.placeholder = "Your name";
      email.placeholder = "Your email";
      msg.placeholder = "Message";
      btn.value = "Send";
    } else {
      name.placeholder = "Tu nombre";
      email.placeholder = "Tu email";
      msg.placeholder = "Mensaje";
      btn.value = "Enviar";
    }
    localStorage.setItem("language_stored", language);
  };

  const savedLanguage = localStorage.getItem("language_stored");
  if (savedLanguage) {
    languageSelect.value = savedLanguage;
    await changeLanguageAndSave(savedLanguage);
  }

  languageSelect.addEventListener("change", async () => {
    await changeLanguageAndSave(languageSelect.value);
    location.reload();
  });
});