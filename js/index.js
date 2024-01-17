var map = new maplibregl.Map({
    container: 'map',
    style: 'https://gsi-cyberjapan.github.io/gsivectortile-mapbox-gl-js/std.json',
    center: [139.6831213, 35.6602488],
    zoom: 10,
    hash: true
});

// コントロール
map.addControl(new maplibregl.NavigationControl(), 'top-right');
map.addControl(new maplibregl.ScaleControl(), 'bottom-left');


// 