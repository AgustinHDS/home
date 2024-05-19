'use strict'
import { getFeatures } from '../main.js';

let ready = false;
const waitForFeatures = async () => {
   if (!ready) { // esto esta mal, siempre pasa por el if y cambia de forma obligatoria a true sin importar que la promesa este resuelta. Creo que se resuelve por el poco tiempo que espera para hacer esta accion, hay que encontrar una forma de que cambie a true solo cuando la promesa este resuelta (cambiar la condicion del if y cambiar el estado de ready despues de la linea de await getFEATURES());
    ready = true
    await getFeatures();
  }

  const DOM = {
    
    BUTTONS: {
      //features-right buttons
      TECHS_R: 'btn-technologies-right',
      PROJECTS_R: 'btn-projects-right',
      ABOUT_R: 'btn-about-right',

      //features-top buttons
      TECHS_T: 'btn-technologies-top',
      PROJECTS_T: 'btn-projects-top',
      ABOUT_T: 'btn-about-top',

      //techs buttons
      USES: 'btn-uses',
      PRACTICE: 'btn-practice',
      PROF: 'btn-pro',

      //projects arrows
      UP_LEFT_Arrow: 'up-arrow',
      DOWN_RIGHT_Arrow: 'down-arrow',

      //about me arrows (mobile only)
      LEFT_ARROW: 'left-arrow',
      RIGHT_ARROW: 'right-arrow',
      
      // get all technologies icons and store in different arrays
      iArray: function() {
        let iconsArr = document.querySelector('.container-img').children;
        iconsArr = Array.from(iconsArr);

        let iconsUses = [iconsArr[0], iconsArr[1], iconsArr[2], iconsArr[3], iconsArr[4], iconsArr[5]];
        let iconsPractice = [iconsArr[5], iconsArr[6], iconsArr[9], iconsArr[10]];
        let iconsProf = [iconsArr[1], iconsArr[2], iconsArr[3], iconsArr[5], iconsArr[7], iconsArr[8]];

        return { 
          iconsUses: iconsUses, 
          iconsPractice: iconsPractice, 
          iconsProf: iconsProf 
        };
      },
      
      // asign previous array-images as key-values to the buttons to work later in showTechIcons()
      initializeButtonStatus: function() {
        const setIcons = this.iArray();

        const buttonStates = {
          [this.USES]: { icons: setIcons.iconsUses },
          [this.PRACTICE]: { icons: setIcons.iconsPractice },
          [this.PROF]: { icons: setIcons.iconsProf }
        };
        return { setIcons, buttonStates };
      }
    }
  };
  
  return DOM;
};

//global variables
let pixelValueTop;
let pixelValueLeft = 0;
let number = null;
let numberAbout = 0;
let isMobile = false;
let isWriting;

//desktop and mobile
document.addEventListener('DOMContentLoaded', ()=> {
  const makeFeaturesResponsive = ()=> {
    const flexRight = document.querySelector('.flexbuttons-right');
    const flexTop = document.querySelector('.flexbuttons-top');

    const projects = document.querySelector('.myprojects-carousel');

    let aboutInfo = document.querySelector('.info-container').children;
     if (!aboutInfo) {
     location.reload();
    };
    const aboutElements = [...aboutInfo];

    if (window.innerWidth >= 1024) {
      //desktop

      flexTop.style.display = 'none';
      flexRight.style.display = 'flex';

      projects.style.top = 0 + 'px';
      projects.style.left = 0 + 'px';
      projects.style.width = 100 + '%';
      pixelValueLeft = 0;

      aboutElements[0].style.display = 'flex';
      aboutElements[1].style.display = 'flex';
      aboutElements[2].style.display = 'flex';
      numberAbout = 0;

      isMobile = false;
    } else {
      //mobile

      flexTop.style.display = 'flex';
      flexRight.style.display = 'none';

      isMobile = true;
      if (window.innerWidth >= 768 && window.innerWidth <= 911 && window.innerWidth !== 853) {
        //iPad
        pixelValueTop = 0;
        projects.style.top = 0 + 'px';
        projects.style.left = 96 + 'px';
        projects.style.width = 60 + '%';
      } else if(window.innerWidth <= 540 && window.innerWidth >= 431) {
        //Surface Duo
        pixelValueTop = 0;
        projects.style.top = 0 + 'px';
        projects.style.left = 0 + 'px';
        projects.style.width = 95  + '%';
      }
      else if(window.innerWidth >= 541 && window.innerWidth <= 767) {
        //responsive general mobile
        pixelValueTop = 0;
        projects.style.top = 0 + 'px';
        projects.style.left = 100 + 'px';
        projects.style.width = 50  + '%';
      }
      else if(window.innerWidth <= 912 && window.innerWidth >= 540) {
        //Asus zenbook Fold
        pixelValueTop = 0;
        projects.style.top = 0 + 'px';
        projects.style.left = 140 + 'px';
        projects.style.width = 50  + '%';
      }
      else if (window.innerWidth <= 430) {
        //iPhone SE, iPhone XR, iPhone 12 Pro, iPhone 14 Pro Max, Pixel 7, SG S8+, SG S20 Ultra, G Z Fold 5, SG A51/71
        pixelValueTop = 0;
        projects.style.top = 0 + 'px';
        projects.style.left = 0 + 'px';
        projects.style.width = 100 + '%';
      }

      aboutElements[0].style.display = 'none';
      aboutElements[1].style.display = 'flex';
      aboutElements[2].style.display = 'none';
      numberAbout = 0;
    }
  }
  window.addEventListener('load', makeFeaturesResponsive);
  window.addEventListener('resize', makeFeaturesResponsive);

  //navbar responsive

  let isCollapsed = false;
  const mobileNavToggle = document.querySelector('.navbar-toggler');
  const mobileNavBtns = document.getElementById('navbarNav');
  
  mobileNavToggle.addEventListener('click', ()=> {
    if(isMobile && !isCollapsed) {
      mobileNavBtns.style.display = 'block';
      isCollapsed = true;
    }else {
      mobileNavBtns.style.display = 'none';
      isCollapsed = false;
    }
  });
});

//technologies icons

const showTechIcons = async (e) => {
  const data = await waitForFeatures();

  const { id } = e.target;
  const { setIcons, buttonStates } = data.BUTTONS.initializeButtonStatus();
  const description = document.getElementById('description-text');
  const techNames = document.getElementById('tech-names');

  const addOpacity = () => {
    const allIcons = [
      ...setIcons.iconsUses,
      ...setIcons.iconsPractice,
      ...setIcons.iconsProf
    ];

    for (let i = 0; i < allIcons.length; i++) {
      allIcons[i].classList.add('opacity');
    }
  };

  let index_text = 0;
  let index_names = 0;

  const addDynamicText = (text, names)=> {
    if (index_text < text.length) {
      isWriting = true; 
      description.innerHTML += text[index_text];
      index_text++;

      if(index_names < names.length) {
        techNames.innerHTML += names[index_names];
        index_names++;
      }
      setTimeout(() => {
        addDynamicText(text, names);
      }, 5);
    }else {
      isWriting = false;
    }
  }

  const techDescription = (id) => {
    id = e.target.id;
    const languageSelect = document.querySelector('.language-select');

    if(id === data.BUTTONS.USES) {
      let usesText;
      let usesNames = `boostrap, javascript, sass, git, sql, node`;

      if(languageSelect.value === 'es') {
        usesText = `Las tecnologías que estoy usando en proyectos personales y con las que me siento más cómodo, siendo node y sql las que menos domino y tengo pensado profundizar.`;
      }else {
        usesText = `The technologies that i'm using in personal projects and with which i feel most comfortable, being node and sql the ones i know the least and i'm planning to delve deeper.`;
      }
      addDynamicText(usesText, usesNames);
    }
    else if(id === data.BUTTONS.PRACTICE) {
      let practiceText;
      let practiceNames = `node, angular, typescript, python`;

      if(languageSelect.value === 'es') {
        practiceText = `Las tecnologías que me interesan y a las que les voy a dedicar mas tiempo en proyectos personales.`;
      }else {
        practiceText = `The technologies i have more interest in and those i will dedicate more time in my personal projects.`;
      }
      addDynamicText(practiceText, practiceNames);
    }
    else if(id === data.BUTTONS.PROF) {
      let prof_text;
      let prof_names = `javascript, sass, git, node, wordpress, vue`;

      if(languageSelect.value === 'es') {
        prof_text = `Las tecnologías que usé en mi ultimo trabajo.`;
      }else {
        prof_text = `The technologies i used in my last job.`;
      }
      addDynamicText(prof_text, prof_names);
    }
  };

switch (id) {
  case data.BUTTONS.USES:
    if(!isWriting) {
      if (number === 0) {
        description.innerHTML = '';
        techNames.innerHTML = '';
  
        buttonStates[id].icons.forEach(e => e.classList.add('opacity'));
        number = 1;
        
      }else {
        addOpacity(buttonStates[data.BUTTONS.PRACTICE].icons);
        addOpacity(buttonStates[data.BUTTONS.PROF].icons);
        buttonStates[id].icons.forEach(e => e.classList.remove('opacity'));
        number = 0;
  
        description.innerHTML = '';
        techNames.innerHTML = '';
        techDescription(id);
      }
    }
    break;

    case data.BUTTONS.PRACTICE:
      if(!isWriting) {
        if (number === 3) {
          description.innerHTML = '';
          techNames.innerHTML = '';
  
          buttonStates[id].icons.forEach(e => e.classList.add('opacity'));
          number = 2;
        }else {
          addOpacity(buttonStates[data.BUTTONS.USES].icons);
          addOpacity(buttonStates[data.BUTTONS.PROF].icons);
          buttonStates[data.BUTTONS.PRACTICE].icons.forEach(e => e.classList.remove('opacity'));
          number = 3;
          
          description.innerHTML = '';
          techNames.innerHTML = '';
          techDescription(id);
        }
      }
    break;

    case data.BUTTONS.PROF:
      if(!isWriting) {
        if (number === 5) {
          description.innerHTML = '';
          techNames.innerHTML = '';
  
          buttonStates[id].icons.forEach(e => e.classList.add('opacity'));
          number = 4;
        }else {
          addOpacity(buttonStates[data.BUTTONS.USES].icons);
          addOpacity(buttonStates[data.BUTTONS.PRACTICE].icons);
          buttonStates[id].icons.forEach(e => e.classList.remove('opacity'));
          number = 5;
  
          description.innerHTML = '';
          techNames.innerHTML = '';
          techDescription(id);
        }
      }
    break;
  }
};

//setup all listeners for some data inside waitForFeatures() in only one function since it does multiple calls to getFeatures() when using await waitForFeatures() more than once in the code, and it will break (although we are already using await waitForFeatures() again in showTechIcons(), so i have to figure it out why is not working when doing multiple calls)
const setupEventListeners = async () => {
  const data = await waitForFeatures();

  const buttons_id = Object.values(data.BUTTONS).filter(values => typeof values !== 'function');
  const flex_buttons = buttons_id.filter(id => id.includes('right') || id.includes('top'));
  const tech_buttons = buttons_id.filter(id => !id.includes('right') && !id.includes('top') && !id.includes('arrow'));
  const project_arrows = buttons_id.filter(value => typeof value === 'string' && (value.includes('up') || value.includes('down')));
  const about_arrows = buttons_id.filter(value => typeof value === 'string' && (value.includes('left') || value.includes('right')));

  const techs = document.querySelector('.techs');
  const projects = document.querySelector('.myprojects-carousel');
  const about = document.querySelector('.about-me');
  const msg = document.querySelector('.initial-message');


  //features main buttons display

  const hideAll = ()=> {
    techs.style.display = 'none';
    projects.style.display = 'none';
    about.style.display = 'none';
  };

  flex_buttons.forEach(value => {
    let button = document.getElementById(value);
  
    button.addEventListener('click', (e) => {
      const { id } = e.target;
      msg.style.display = 'none';
  
      if (id === data.BUTTONS.TECHS_R || id === data.BUTTONS.TECHS_T) {
        hideAll();
        techs.style.display = 'block';
      } else if (id === data.BUTTONS.PROJECTS_R || id === data.BUTTONS.PROJECTS_T) {
        hideAll();
        projects.style.display = 'flex';
      } else if (id === data.BUTTONS.ABOUT_R || id === data.BUTTONS.ABOUT_T) {
        hideAll();
        about.style.display = 'flex';
      }
    });
  });

  tech_buttons.forEach(value => {
    let button = document.getElementById(value);
    button.addEventListener('click', showTechIcons);
  });

  //projects section - arrows

  const slideProjects = (event)=> {
    const id = event.target.id;
    if(!isMobile) {
      if(id.includes('up')) {
        if(window.innerWidth >= 1024) {
          if(pixelValueLeft === 0 || pixelValueLeft === -760) {
            pixelValueLeft += 760;
            projects.style.left = pixelValueLeft + 'px';
          }
        }
        else if(pixelValueLeft === 0 || pixelValueLeft === -800) {
          //some mobile display
          pixelValueLeft += 800;
          projects.style.left = pixelValueLeft + 'px';
        }
      }else {
        if(window.innerWidth >= 1024) {
          if(pixelValueLeft === 0 || pixelValueLeft === 760) {
            pixelValueLeft -= 760;
            projects.style.left = pixelValueLeft + 'px';
          }
        }
        else if(pixelValueLeft === 0 || pixelValueLeft === 800) {
          //some mobile display
          pixelValueLeft -= 800;
          projects.style.left = pixelValueLeft + 'px';
        }
      }
    }
    
    if(isMobile) {
      if(id.includes('up')) {
        if(window.innerWidth >= 768 && window.innerWidth <= 911 && window.innerWidth !== 853) {
          //iPad
          if(pixelValueTop === 0 || pixelValueTop === -310) {
          pixelValueTop += 310;
          projects.style.top = pixelValueTop + 'px';
          }
        }
        else if(window.innerWidth === 912) {
          //Surface Pro 7
          if(pixelValueTop === 0 || pixelValueTop === -300) {
            pixelValueTop += 300;
            projects.style.top = pixelValueTop + 'px';
          }
        }
        else if(window.innerWidth <= 540 && window.innerWidth >= 431) {
          //Surface Duo
          if(pixelValueTop === 0 || pixelValueTop === -335) {
            pixelValueTop += 335;
            projects.style.top = pixelValueTop + 'px';
          }
        }
        else if(window.innerWidth <= 853 && window.innerWidth >= 540) {
          //Asus zenbook Fold
          if(pixelValueTop === 0 || pixelValueTop === -300) {
            pixelValueTop += 300;
            projects.style.top = pixelValueTop + 'px';
          }
        }
        else if(window.innerWidth <= 430) {
          //iPhone
          if(pixelValueTop === 0 || pixelValueTop === -270) {
          pixelValueTop += 270;
          projects.style.top = pixelValueTop + 'px';
          }
        }
      }else {
        if(window.innerWidth >= 768 && window.innerWidth <= 911 && window.innerWidth !== 853) { 
          //iPad
          if(pixelValueTop === 0 || pixelValueTop === 310) {
          pixelValueTop -= 310;
          projects.style.top = pixelValueTop + 'px';
          }
        }
        else if(window.innerWidth === 912) {
          //Surface Pro 7
          if(pixelValueTop === 0 || pixelValueTop === 300) {
            pixelValueTop -= 300;
            projects.style.top = pixelValueTop + 'px';
            }
        }
        else if(window.innerWidth <= 540 && window.innerWidth >= 431) {
          //Surface Duo
          if(pixelValueTop === 0 || pixelValueTop === 335) {
            pixelValueTop -= 335;
            projects.style.top = pixelValueTop + 'px';
          }
        }
        else if(window.innerWidth <= 853 && window.innerWidth >= 540) {
          //Asus zenbook Fold
          if(pixelValueTop === 0 || pixelValueTop === 300) {
            pixelValueTop -= 300;
            projects.style.top = pixelValueTop + 'px';
          }
        }
        else if(window.innerWidth <= 430) {
          //iPhone
          if(pixelValueTop === 0 || pixelValueTop === 270) {
          pixelValueTop -= 270;
          projects.style.top = pixelValueTop + 'px';
          }
        }
      }
    }
  }

  project_arrows.forEach(id => {
    let btn = document.getElementById(id);
    btn.addEventListener('click', slideProjects);
  });

  //about-me section - arrows (mobile only)

  const slideAbout = (event)=> {
    if(isMobile) {
      let id = event.target.id;
      let aboutInfo = document.querySelector('.info-container').children;
      const array = [...aboutInfo];
    
      if(id.includes('left') && numberAbout === 0) {
        array[0].style.display = 'flex';
        array[1].style.display = 'none';
        array[2].style.display = 'none';
        numberAbout = 1;
      } else if(id.includes('right') && numberAbout === 1) {
        array[0].style.display = 'none';
        array[1].style.display = 'flex';
        array[2].style.display = 'none';
        numberAbout = 0;
      } else if (id.includes('right') && numberAbout === 0) {
        array[0].style.display = 'none';
        array[1].style.display = 'none';
        array[2].style.display = 'flex';
        numberAbout = 2;
      } else if ((id.includes('left') && numberAbout === 2)) {
        array[0].style.display = 'none';
        array[1].style.display = 'flex';
        array[2].style.display = 'none';
        numberAbout = 0;
      }
    }
  };

  about_arrows.forEach(id => {
    let btn = document.getElementById(id);
    btn.addEventListener('click', slideAbout);
  });
};
setupEventListeners();
