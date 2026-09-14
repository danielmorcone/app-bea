const buttons = document.querySelectorAll('.btn');

buttons.forEach(btn => {
  let timer;

  const start = () => {
    btn.classList.add('pressing');
    timer = setTimeout(() => {
      window.location.href = 'calma.html';
    }, 2000);
  };

  const cancel = () => {
    clearTimeout(timer);
    btn.classList.remove('pressing');
  };

  btn.addEventListener('mousedown', start);
  btn.addEventListener('mouseup', cancel);
  btn.addEventListener('mouseleave', cancel);

  btn.addEventListener('touchstart', (e) => {
    e.preventDefault();
    start();
  });
  btn.addEventListener('touchend', cancel);
});

window.addEventListener('resize', (e) => {
    e.stopImmediatePropagation();
});

let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    deferredPrompt.prompt();
});

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/app-bea/sw.js').then(reg => {
    reg.addEventListener('updatefound', () => {
      const newWorker = reg.installing;
      newWorker.addEventListener('statechange', () => {
        if (newWorker.state === 'activated') {
          // Ricarica la pagina automaticamente per mostrare i nuovi file
          window.location.reload(); 
        }
      });
    });
  });
}



const selettore = document.querySelector('.selettore');

const noi = document.querySelector('.noi');
const home = document.querySelector('.home');
const umore = document.querySelector('.umore');

const bottoni = [noi, home, umore];

function seleziona(elemento) {

    bottoni.forEach(bottone => {
        bottone.classList.remove('active');
    });

    elemento.classList.add('active');

    // posizione del centro del bottone
    const centro =
        elemento.offsetLeft + elemento.offsetWidth / 2;

    // centro della pillola
    const centroPillola =
        selettore.offsetWidth / 2;

    const posizione = centro - centroPillola;

    // si sposta e si restringe
    selettore.style.transform =
        `translateX(${posizione}px) scaleX(0.78) scaleY(0.68)`;

    // dopo poco torna alla dimensione normale
    setTimeout(() => {
        selettore.style.transform =
            `translateX(${posizione}px) scaleX(1) scaleY(1)`;
    }, 100);
}


// click
noi.addEventListener('click', () => {
    seleziona(noi);
});

home.addEventListener('click', () => {
    seleziona(home);
});

umore.addEventListener('click', () => {
    seleziona(umore);
});


// parte con HOME
window.addEventListener('load', () => {
    seleziona(home);
});
