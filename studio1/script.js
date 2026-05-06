(function (){

    'use strict';
    console.log('readingjs');

    const video = document.querySelector('video');
    const replay = document.querySelector('#replay');
    const hearts = document.querySelector('#hearts');
    const screen = document.querySelector('#screen');
    const lyric1 = document.querySelector('#lyric1');
    const lyric2 = document.querySelector('#lyric2');
    const lyric3 = document.querySelector('#lyric3');
    const lyric4 = document.querySelector('#lyric4');
    const lyric5 = document.querySelector('#lyric5');
    let fadeInInterval;
    let fadeOutInterval;
    let checkTimeInterval;

    lyric1.style.opacity = 0;
    lyric2.style.opacity = 0;
    lyric3.style.opacity = 0;
    lyric4.style.opacity = 0;
    lyric5.style.opacity = 0;

    video.style.opacity = 0;
    video.play();

    screen.addEventListener('click', function (){
        video.requestFullscreen();
    });

    fadeInInterval = setInterval(function(){
        video.style.opacity = Number(video.style.opacity) + 0.025;

        if (video.style.opacity >= 1){
            clearInterval(fadeInInterval);
        }
    }, 100);
    

    checkTimeInterval = setInterval(function(){
        if (video.currentTime >= video.duration - 2){
            clearInterval(checkTimeInterval);
            fadeOutInterval = setInterval(function(){
                video.style.opacity = Number(video.style.opacity) - 0.025;

                if (video.style.opacity <= 0){
                    clearInterval(fadeOutInterval);
                    replay.style.display = 'block';
                }
            },50);
        }
    }, 50);

    replay.addEventListener('click', function(){
        replay.style.display = 'none';
        video.currentTime = 0;
        video.play();

        fadeInInterval = setInterval (function (){
            video.style.opacity = Number(video.style.opacity) + 0.025;

            if (video.style.opacity >= 1){
                clearInterval(fadeInInterval);
            }
        }, 50);
    });
    setInterval(function(){
        const time = video.currentTime;

        if (time >= 12 && time < 16) {
             
            lyric1.style.opacity = Math.min(Number(lyric1.style.opacity) + 0.05, 1);
            console.log('opacity now:', lyric1.style.opacity);
        } else {
            lyric1.style.opacity = Math.max(Number(lyric1.style.opacity) - 0.05, 0);
        }

        if (time >= 15 && time < 16) {
            lyric2.style.opacity = Math.min(Number(lyric2.style.opacity) + 0.05, 1);
        } else {
            lyric2.style.opacity = Math.max(Number(lyric2.style.opacity) - 0.05, 0);
        }

        if (time >= 15 && time < 17) {
            lyric3.style.opacity = Math.min(Number(lyric3.style.opacity) + 0.05, 1);
        } else {
            lyric3.style.opacity = Math.max(Number(lyric3.style.opacity) - 0.05, 0);
        }

        if (time >= 19 && time < 23) {
            lyric4.style.opacity = Math.min(Number(lyric4.style.opacity) + 0.05, 1);
        } else {
            lyric4.style.opacity = Math.max(Number(lyric4.style.opacity) - 0.05, 0);
        }

        if (time >= 25 && time < 28) {
            lyric5.style.opacity = Math.min(Number(lyric5.style.opacity) + 0.05, 1);
        } else {
            lyric5.style.opacity = Math.max(Number(lyric5.style.opacity) - 0.05, 0);
        }

        if (time >= 27 && time < 30 ) {
            lyric6.style.opacity = Math.min(Number(lyric6.style.opacity) + 0.05, 1);
        } else {
            lyric6.style.opacity = Math.max(Number(lyric6.style.opacity) - 0.05, 0);
        }
    }, 50);

    let grayscale = false;

    hearts.addEventListener('click', function(){ 
        grayscale = !grayscale;

        if (grayscale){
            video.style.filter = 'grayscale(100%)';
            document.body.style.background = 'linear-gradient(90deg, rgba(158, 158, 158, 1) 0%, rgba(0, 0, 0, 1) 49%, rgba(158, 158, 158, 1) 100%)';
            replay.style.color = 'rgba(32, 38, 74, 1)';
            screen.style.color = 'rgba(32, 38, 74, 1)';
            hearts.style.color = 'rgba(32, 38, 74, 1)';
        } else {
            video.style.filter = 'none';
            document.body.style.background = 'linear-gradient(90deg, rgba(32, 38, 74, 1) 0%, rgba(0, 0, 0, 1) 41%, rgba(32, 38, 74, 1) 100%)';
            replay.style.color = 'rgb(213, 204, 168)';
            screen.style.color = 'rgb(213, 204, 168)';
            hearts.style.color = 'rgb(213, 204, 168)';
        }

    });

})();