/* jsVectorMap 1.7.0, MIT. Local assets; no tile services, keys or tracking. */
(() => {
const node=document.querySelector('#clinic-world-map'); if(!node||!window.jsVectorMap)return;
new jsVectorMap({selector:'#clinic-world-map',map:'world',draggable:false,zoomButtons:false,zoomOnScroll:false,bindTouchEvents:false,zoomAnimate:false,showTooltip:true,selectedRegions:['AE','RU','KZ'],focusOn:{coords:[42,64],scale:1.65,animate:false},
regionStyle:{initial:{fill:'#dedbd3',fillOpacity:1,stroke:'#F8F7F3',strokeWidth:.65},hover:{fill:'#bbb6aa',fillOpacity:1},selected:{fill:'#817668',fillOpacity:1},selectedHover:{fill:'#51483e'}},
markerStyle:{initial:{r:4.5,fill:'#c9510a',stroke:'#fff',strokeWidth:1.5,strokeOpacity:1},hover:{fill:'#a33f08',r:6}},
markers:[{name:'Dubai',coords:[25.2048,55.2708]},{name:'Abu Dhabi',coords:[24.4539,54.3773]},{name:'Moscow',coords:[55.7558,37.6173]},{name:'St Petersburg',coords:[59.9311,30.3609]},{name:'Kazan',coords:[55.7961,49.1064]},{name:'Krasnodar',coords:[45.0355,38.9753]},{name:'Almaty',coords:[43.222,76.8512]},{name:'Astana',coords:[51.1694,71.4491]}]
});
})();
