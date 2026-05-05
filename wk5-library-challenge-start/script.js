(function () {
    console.log('reading js');

    const map = L.map('map').setView([36.7378, -119.7871], 13); // Fresno coordinates!

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // marker
    L.marker([37.745958, -122.179592]).addTo(map)
    .bindPopup('This is my house!');

    // circle
    L.circle([37.746363, -122.171849], {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5,
        radius: 300
        }).addTo(map)
        .bindPopup('This my High School!');

    // polygon (needs at least 3 coordinate pairs)
    L.polygon([
    [36.742, -119.785],
    [36.744, -119.780],
    [36.740, -119.778]
    ]).addTo(map)
    .bindPopup('This is a polygon!');

})();