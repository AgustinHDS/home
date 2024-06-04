web link: https://agustinhds.github.io/home/

This is just a webpage that introduces me showing my capabilities. For now it's only a frontend work since github pages doesn't allow me to
upload node files. So i will be working in the backend for this page with node before the deploy using other host

----------------------------------------------------------------------------------------------------------------------------
Known issues/changes to make: 

- issue with the production environment. Some elements like "projects, flexTop, flexRight" in makeFeaturesResponsive() aren't finded due to async time. This only happens in production environment.
  file: features.js in the makeFeaturesResponsive() function.
  This bug was solved with location.reload() until i find a better solution. It seems that the element only aren't finded when the user visits the webpage for the very first time.

- Use MatchMedia() to work with the css mediaqueries and resolution in the features.js file

- issue with form recaptcha, pending to fix the google recaptcha service

- Implement redirect 301 system

- Use global variable to hide the key on head html

- Validate the form is completed before sending, do this via server-side with node so the user can't edit the front-end to bypass this

- Show the user 3rd party cookies banner and a link to its service's information (google recapcha)

----------------------------------------------------------------------------------------------------------------------------
Secondary changes to make:

. Make about slide animation
. Nav buttons aren't working properly sometimes
. Change the name of the project to the actual one in package.json

----------------------------------------------------------------------------------------------------------------------------
Last changes i made:

- Saving current language on localstorage

 //problema con el slide  a la derecha
 cambiar color 3 lineas responsive del desplay en lenguaje mobile
 


----------------------------------------------------------------------------------------------------------------------------
Technologies used in this project:
javascript, sass, a bit of node (only in my local environment)
