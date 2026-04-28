const selectMenu = document.querySelector('#select-menu');
const songEl     = document.querySelector('#song h2');
const artistEl   = document.querySelector('#artist h2');
const imageEl    = document.querySelector('#image img');

function updateStars(level) {
    const starsEl = document.querySelector('#stars');
    let html = '';
    for (let i = 1; i <= 5; i++) {
        html += i <= level ? '⭐' : '☆';
    }
    starsEl.textContent = html;
}

async function getData() {
    const response = await fetch('data/data.json');
    const data = await response.json();

    selectMenu.addEventListener('change', function() {
        document.querySelector('#music img').style.visibility = 'visible';
        document.querySelector('#song h2').style.visibility = 'visible';
        document.querySelector('#artist h2').style.visibility = 'visible';
        for (let key in data) {
            if (data[key].time.toLowerCase() === this.value.toLowerCase()) {
                
                let albumNum = key.replace('point', '');
                if (albumNum === '2') albumNum = '1';
                else if (parseInt(albumNum) > 2) albumNum = String(parseInt(albumNum) - 1);

                songEl.textContent   = data[key].song;
                artistEl.textContent = data[key].artist;
                imageEl.src          = `images/album${albumNum}.png`;
                updateStars(data[key].energy);
            }
        }
    });
}

getData();