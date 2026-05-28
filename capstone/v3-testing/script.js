(function (){
    'use strict';
    console.log('reading js');

    //opening poll
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
})();  