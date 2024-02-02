document.addEventListener('DOMContentLoaded', function(){
var map = new maplibregl.Map({
    container: 'map',
     style: 'https://gsi-cyberjapan.github.io/gsivectortile-mapbox-gl-js/std.json',
    center: [139.683128, 35.660226],
    zoom: 10,
    maxZoom: 17.99,
    hash: true,
    attributionControl: false
});

// basemap


// 十字ファイルのパスを指定
var CenterIconFilePath = 'media/MapCenterCoordIcon1.svg';

// コントロール
map.addControl(new maplibregl.NavigationControl(), 'top-right');
map.addControl(new maplibregl.ScaleControl(), 'bottom-left');
map.addControl(new maplibregl.AttributionControl(), 'bottom-right');

 // Custom control
 var customControlContainer = document.createElement('div');
 customControlContainer.className = 'custom-control-container';
 customControlContainer.innerHTML = '<button id="centerIcon"><img src=" '+CenterIconFilePath+'" alt="center cross"></button>';

 // Add the custom control to the map
 map.getContainer().appendChild(customControlContainer);

 // Toggle SVG visibility function
 function toggleSvgVisibility() {
   var svgContainer = document.getElementById('centercross-container');
   if (svgContainer) {
     svgContainer.style.display = svgContainer.style.display === 'none' ? 'block' : 'none';
   }
 }

 // Attach click event to the custom button
 var toggleButton = document.getElementById('centerIcon');
 toggleButton.addEventListener('click', function () {
   toggleSvgVisibility();
 });


  // 中心に十字を表示する
  map.on('load', function () {
    loadAndCenterSvg();
  });
  
  // SVGを読み込んで中央に配置する関数
  function loadAndCenterSvg() {
  
    // SVGファイルを取得
    fetch(CenterIconFilePath)
      .then(response => response.text())
      .then(svgData => {
        // SVGファイルを #centercross-container に挿入
        document.getElementById('centercross-container').innerHTML = svgData;
  
        // SVGを中央に配置
        centerSvg();
      })
      .catch(error => console.error('Error loading SVG:', error));
  }
  
  // SVGを中央に配置する関数
  function centerSvg() {
    var svgContainer = document.getElementById('centercross-container');
    var centerIcon = document.getElementById('centerIcon');
  
    var svgWidth = svgContainer.offsetWidth;
    var svgHeight = svgContainer.offsetHeight;
  
    // 中央に配置
    svgContainer.style.marginLeft = -svgWidth / 2 + 'px';
    svgContainer.style.marginTop = -svgHeight / 2 + 'px';
    svgContainer.style.pointerEvents = 'none';
    svgContainer.style.zIndex = '1';
  }

  // ウィンドウサイズが変更されたときにも中央に配置を更新
  window.addEventListener('resize', function () {
    centerSvg();
  });



 // クリックした点の座標情報を表示し、マーカーを表示する
  var marker = null;
  map.on('click', function(event) {
    var clickedPoint = event.lngLat;
    var olc = OpenLocationCode.encode(clickedPoint.lat, clickedPoint.lng);
   var coordinatesHTML = `<div style="font-size: 1.5em; text-align: center;">${clickedPoint.lat.toFixed(6)}, ${clickedPoint.lng.toFixed(6)}` + '<br>' + `${olc}</div>`;

   // 既存のマーカーがあれば削除
    if (marker !== null) {
     marker.remove();
    }

  marker = new maplibregl.Marker()
   .setLngLat(clickedPoint)
   .addTo(map);

  new maplibregl.Popup()
    .setLngLat(clickedPoint)
    .setHTML(coordinatesHTML)
    .addTo(map);
  });
});
