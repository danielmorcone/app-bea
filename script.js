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
