(function() {
    'use strict';

    const button = document.querySelector('button');
    const body = document.querySelector('body');
    const sections = document.querySelectorAll('section');
    const imgLight = document.querySelector('#img-light');
    const imgDark = document.querySelector('#img-dark');
    const switchImg = document.querySelector('#switch');
    let mode = 'light';

    button.addEventListener('click', function() {
        if (mode === 'light') {
            imgLight.style.display = 'none';
            imgDark.classList.add('visible');
            switchImg.src = 'images/yoda.png';
            switchImg.alt = 'yoda';
            body.className = 'switch';
            for (const section of sections) {
                section.className = 'switch';
            }
            mode = 'dark';
        } else {
            imgLight.style.display = 'block';
            imgDark.classList.remove('visible');
            switchImg.src = 'images/maul.png';
            switchImg.alt = 'darth maul';
            body.removeAttribute('class');
            for (const section of sections) {
                section.removeAttribute('class');
            }
            mode = 'light';
        }
    });
})();