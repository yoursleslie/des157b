(function (){
    'use strict';
    console.log('reading js');

    //opening poll. 
    const pollBtns = document.querySelectorAll('#opening-poll .poll-btn');
    const pollOptions = document.querySelector('#opening-poll .poll-options');
    const pollResults = document.querySelector('#opening-poll-results');

    pollBtns.forEach(function(btn){
        btn.addEventListener('click', function(){
            pollOptions.hidden = true;
            pollResults.hidden = false;
            pollResults.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // opening resluts
    const ctx = document.getElementById('poll-chart').getContext('2d');

    new Chart(ctx, {
    type: 'doughnut',
    data: {
        labels: ['Depreciation', 'Insurance', 'Finance', 'Fuel', 'Maintenance', 'Registration'],
        datasets: [{
            data: [390, 143, 111, 125, 84, 68]
        }]
    }, 
    options: {
        maintainAspectRatio: false
    }
});

    // oil map
    const mapContainer = document.getElementById('oil-map');
    const mapWidth = mapContainer.offsetWidth;
    const mapHeight = 500;

    const svg = d3.select('#oil-map')
    .append('svg')
    .attr('width', mapWidth)
    .attr('height', mapHeight);
    
    const geoUrl = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';
    const countryData = {
    'Saudi Arabia': { category: 'Strategic Ally', description: 'Top oil producer and key U.S. ally despite human rights concerns.' },
    'Russia':       { category: 'Sanctioned / Adversary', description: 'Under heavy U.S. sanctions following the invasion of Ukraine.' },
    'Canada':       { category: 'Ally', description: 'Largest source of U.S. oil imports and close trade partner.' },
    'China':        { category: 'Rival', description: 'Major oil consumer and growing geopolitical competitor to the U.S.' },
    'Iraq':         { category: 'Military Presence', description: 'Site of a 20-year U.S. military occupation following the 2003 invasion.' },
    'Brazil':       { category: 'Neutral', description: 'Emerging oil producer with a generally neutral stance toward the U.S.' },
    'United Arab Emirates': { category: 'Strategic Ally', description: 'Key Gulf ally and major oil exporter with deep U.S. military ties.' },
    'Iran':         { category: 'Sanctioned / Adversary', description: 'Under decades of U.S. sanctions over its nuclear program and regional influence.' },
    'Kuwait':       { category: 'Strategic Ally', description: 'U.S. defended Kuwait during the 1991 Gulf War; hosts American military bases.' },
    'Venezuela':    { category: 'Sanctioned / Adversary', description: 'U.S. sanctions imposed following disputed elections under Maduro.' },
    'Libya':        { category: 'Military Intervention', description: 'U.S. and NATO intervened in 2011; country holds significant oil reserves.' },
    'Syria':        { category: 'Military Presence', description: 'U.S. maintains military presence near oil-rich northeastern regions.' },
    'Afghanistan':  { category: 'Military Presence', description: 'Site of the longest U.S. war; sits along key energy corridor routes.' }
    };

    const categoryColors = {
    'Saudi Arabia':'#f6ff00',
    'Russia':'#4caf50',
    'Rival':'#e53935',
    'Canada':'#b71c1c',
    'China':'#1565c0',
    'Iraq':'#6a1b9a',
    'Brazil':'#1b5d1e',
    'United Arab Emirates' : '#b463da',
    'Iran' : '#a1c1ef',
    'Kuwait' : '#f565d1',
    'Venezuela' : '#ff9900',
    'Libya' : '#1ce2e6',
    'Syria' : '#a73636',
    'Afghanistan' : '#915a91',
    };


    d3.json(geoUrl).then(function(world) {
    const projection = d3.geoNaturalEarth1()
        .scale(160)
        .translate([mapWidth / 2, mapHeight / 2]);

    const path = d3.geoPath().projection(projection);

    const countries = topojson.feature(world, world.objects.countries);

    svg.selectAll('path')
        .data(countries.features)
        .enter()
        .append('path')
        .attr('d', path)
        .attr('fill', function(d) {
            const name = d.properties.name;
            const country = countryData[name];
            return country ? categoryColors[name] : '#ccc';
        })
        .attr('stroke', '#fff')
        .attr('stroke-width', 0.5)
        .on('mouseover', function(event, d) {
            
            const name = d.properties.name;
            const country = countryData[name];
            if (!country) return;

            const tooltip = document.getElementById('map-tooltip');
            tooltip.querySelector('.tooltip-name').textContent = name;
            tooltip.querySelector('.tooltip-category').textContent = country.category;
            tooltip.querySelector('.tooltip-description') && (tooltip.querySelector('.tooltip-description').textContent = country.description);
            tooltip.hidden = false;
        })
        .on('mousemove', function(event) {
            const tooltip = document.getElementById('map-tooltip');
            tooltip.style.left = (event.pageX + 12) + 'px';
            tooltip.style.top = (event.pageY + 12) + 'px';
        })
        .on('mouseout', function() {
        document.getElementById('map-tooltip').hidden = true;
        });
    });

    // timeline
    gsap.registerPlugin(ScrollTrigger);

    const timelineTrack = document.querySelector('.timeline-track');
    const timelineSlides = document.querySelectorAll('.timeline-slide');
    const totalSlides = timelineSlides.length;

    // horizontal scroll
    gsap.to(timelineTrack, {
        x: () => -((totalSlides - 1) * window.innerWidth),
        ease: 'none',
        scrollTrigger: {
            trigger: '#timeline',
            start: 'top top',
            end: 'bottom bottom',
            scrub: true,
         }
    });

    // fade in/out per slide
    timelineSlides.forEach(function(slide, i) {
    const elements = slide.querySelectorAll('h1, h2, h3, p, ul');

    ScrollTrigger.create({
        trigger: '#timeline',
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: function(self) {
            const active = Math.round(self.progress * (totalSlides - 1));
            if (active === i && !slide.dataset.animated) {
                slide.dataset.animated = 'true';
                gsap.fromTo(elements,
                { opacity: 0, y: 50 },
                { opacity: 1, y: 0, duration: 1, stagger: 0.2 }
                );
            }
        }
    });
    });
   
    // closing 
    const closingPollBtns = document.querySelectorAll('#poll .poll-btn');
    const closingPollOptions = document.querySelector('#poll .poll-options');
    const closingPollResults = document.getElementById('poll-results');

    closingPollBtns.forEach(function(btn) {
    btn.addEventListener('click', function() {
        closingPollOptions.hidden = true;
        closingPollResults.hidden = false;
    });
});



})();  