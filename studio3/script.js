(function(){
    
    'use strict'
    console.log('reading js');
    gsap.registerPlugin(ScrollTrigger);

    gsap.from("#panel-0 h1", {
        scrollTrigger: "#panel-0 h1",
        opacity: 0,
        y: 50,
        duration: 1
    });

    gsap.utils.toArray(".panel article").forEach(function(article) {
    gsap.from(article.querySelectorAll("h1, h2, h3, p, ul"), {
        scrollTrigger: {
            trigger: article,
            start: "top 80%",
        },
        opacity: 0,
        y: 50,
        duration: 1,
        stagger: 0.2
    });
});

particlesJS("particles-js", {
    particles: {
        number: { value: 80 },
        color: { value: "#444343" },
        opacity: { value: 0.5 },
        size: { value: 3 },
        move: { enable: true, speed: 1 }
    }
});

})();