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


  // 中心に十字を表示する
  map.on('load', function () {
    loadAndCenterSvg();
  });
  
  
  // SVGを読み込んで中央に配置する関数
  function loadAndCenterSvg() {
    // SVG ファイルのパスを指定
    var svgFilePath = 'media/MapCenterCoordIcon1.svg';
  
    // SVG ファイルを取得
    fetch(svgFilePath)
      .then(response => response.text())
      .then(svgData => {
        // SVG ファイルを #centercross-container に挿入
        document.getElementById('centercross-container').innerHTML = svgData;
  
        // SVG を中央に配置
        centerSvg();
      })
      .catch(error => console.error('Error loading SVG:', error));
  }
  
  // SVGを中央に配置する関数
  function centerSvg() {
    var svgContainer = document.getElementById('centercross-container');
  
    var svgWidth = svgContainer.offsetWidth;
    var svgHeight = svgContainer.offsetHeight;
  
    // 中央に配置
    svgContainer.style.marginLeft = -svgWidth / 2 + 'px';
    svgContainer.style.marginTop = -svgHeight / 2 + 'px';
  }


  // ウィンドウサイズが変更されたときにも中央に配置を更新
  window.addEventListener('resize', function () {
    centerSvg();
  });