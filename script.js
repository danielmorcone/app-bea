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