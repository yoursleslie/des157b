let currentSlide = 0;

function revealSection(id) {
    const section = document.getElementById(id);
    section.removeAttribute('hidden');
    section.style.opacity = 1;
    section.scrollIntoView({ behavior: 'smooth' });
    const elements = section.querySelectorAll('h1, h2, h3, p, ul, button, canvas, #oil-map');
    gsap.fromTo(elements,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', stagger: 0.2, delay: 0.4 }
    );
}

function timelineNext() {
    const slides = document.querySelectorAll('.timeline-slide');
    const track = document.querySelector('.timeline-track');
    if (currentSlide < slides.length - 1) {
        currentSlide++;
        track.style.transform = 'translateX(-' + (currentSlide * 100) + 'vw)';
        const elements = slides[currentSlide].querySelectorAll('h1, h2, h3, p, ul, button');
        gsap.fromTo(elements,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: 'power2.out' }
        );
    }
}


(function (){


    //b4a 
    Parse.initialize("6ms364JtJRCRE9aGMybnOHjTJe67PznQ3TfbAcpq", "2Nt6B85ydWkk8QK4igHSd7lrlACd5sLbMjwQDCai");
    Parse.serverURL = "https://parseapi.back4app.com/";

    async function nameOfFunction() {
    const pollResponse = new Parse.Object("PollResponse");
    pollResponse.set("answer", document.getElementById("input-response").value);

    try {
        await pollResponse.save();
        console.log("New object created");

        const query = new Parse.Query("PollResponse");
        const results = await query.find();

        const colors = [
            'rgb(35, 206, 107)',
            'rgb(171, 121, 103)',
            'rgb(255, 82, 27)',
        ];

        const wall = document.getElementById('responses-wall');
        wall.innerHTML = '';
        results.forEach(function(obj) {
            const tag = document.createElement('div');
            tag.classList.add('response-tag');
            const color = colors[Math.floor(Math.random() * colors.length)];
            const rotation = (Math.random() * 6 - 3).toFixed(1);
            tag.style.backgroundColor = color;
            tag.style.setProperty('--rotation', rotation + 'deg');
            tag.textContent = obj.get('answer');
            wall.appendChild(tag);
        });

        revealSection('end');
    } catch (error) {
        console.error("Error: " + error.message);
    }
    }


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
            revealSection('opening-poll-results');
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
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
                position: 'bottom',
                labels: {
                    color: 'rgb(53, 44, 40)',
                    font: {
                        family: 'Atkinson Hyperlegible',
                        size: 13
                    },
                    boxWidth: 12,
                    maxWidth: 200
                }
            },
            tooltip: {
                callbacks: {
                    labelColor: function() {
                        return false;
                    },
                    label: function(context) {
                        return ' $' + context.parsed + '/mo — ' + context.label;
                    }
                },
                displayColors: false,
                backgroundColor: 'rgb(241, 224, 197)',
                titleColor: 'rgb(53, 44, 40)',
                borderColor: 'rgb(53, 44, 40)',
                borderWidth: 1,
                bodyColor: 'rgb(53, 44, 40)',
                bodyFont: {
                    family: 'Atkinson Hyperlegible',
                    size: 13
                },
                padding: 10,
                cornerRadius: 8
            }
        }
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

        const pinData = [
            { name: 'Saudi Arabia',         coords: [45.0,  24.0] },
            { name: 'Russia',               coords: [90.0,  60.0] },
            { name: 'Canada',               coords: [-96.0, 60.0] },
            { name: 'China',                coords: [104.0, 35.0] },
            { name: 'Iraq',                 coords: [44.0,  33.0] },
            { name: 'Brazil',               coords: [-51.0,-10.0] },
            { name: 'United Arab Emirates', coords: [54.0,  24.0] },
            { name: 'Iran',                 coords: [53.0,  32.0] },
            { name: 'Kuwait',               coords: [47.5,  29.5] },
            { name: 'Venezuela',            coords: [-66.0,  8.0] },
            { name: 'Libya',                coords: [17.0,  27.0] },
            { name: 'Syria',                coords: [38.0,  35.0] },
            { name: 'Afghanistan',          coords: [67.0,  33.0] }
        ];

        svg.selectAll('circle.map-pin')
        .data(pinData)
        .enter()
        .append('circle')
        .attr('class', 'map-pin')
        .attr('cx', d => projection(d.coords)[0])
        .attr('cy', d => projection(d.coords)[1])
        .attr('r', 5)
        .attr('fill', 'white')
        .attr('stroke', 'rgb(53, 44, 40)')
        .attr('stroke-width', 1.5)
        .style('cursor', 'pointer')
        .on('mouseover', function(event, d) {
            const country = countryData[d.name];
            const tooltip = document.getElementById('map-tooltip');
            tooltip.querySelector('.tooltip-name').textContent = d.name;
            tooltip.querySelector('.tooltip-category').textContent = country.category;
            tooltip.querySelector('.tooltip-description').textContent = country.description;
            tooltip.hidden = false;
        })
        .on('mousemove', function(event) {
            const tooltip = document.getElementById('map-tooltip');
            tooltip.style.left = (event.pageX + 12) + 'px';
            tooltip.style.top  = (event.pageY + 12) + 'px';
        })
        .on('mouseout', function() {
            document.getElementById('map-tooltip').hidden = true;
        });
    
    });

    // timeline
    gsap.registerPlugin(ScrollTrigger);

   
    // closing 
    const closingPollBtns = document.querySelectorAll('#poll .poll-btn');

    closingPollBtns.forEach(function(btn) {
        btn.addEventListener("click", function(event) {
            event.preventDefault();
            const input = document.getElementById("input-response");
            if (input.value.trim() === '') {
                input.style.borderColor = 'rgb(255, 82, 27)';
                input.focus();
                return;
            }
            input.style.borderColor = 'rgb(53, 44, 40)';
            nameOfFunction();
        });
    });

   



})();  