var map = new L.Map('map', {
    center: [59.3277, 24.5351],
    zoom: 13
});

map.attributionControl.setPrefix('');

var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Aluskaart &copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
});
var positron = L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png', {
	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
	subdomains: 'abcd',
	maxZoom: 19
}).addTo(map);
var pohi = L.tileLayer.wms("http://kaart.maaamet.ee/wms/alus-geo?", {
    format: 'image/png',
    transparent: true,
    minZoom: 15,
    layers: 'pohi_vv',
    crs: L.CRS.EPSG4326,
    attribution: 'Põhikaart &copy; <a href="http://geoportaal.maaamet.ee/est/Teenused/Avalik-WMS-teenus-p65.html" target="_blank">Maa-amet</a>'
});

var orto = L.tileLayer.wms("http://kaart.maaamet.ee/wms/alus-geo?", {
    format: 'image/png',
    transparent: true,
    layers: 'EESTIFOTO',
    crs: L.CRS.EPSG4326,
    attribution: 'Ortofoto &copy; <a href="http://geoportaal.maaamet.ee/est/Teenused/Avalik-WMS-teenus-p65.html" target="_blank">Maa-amet</a>'
});

var hybriid = L.tileLayer.wms("http://kaart.maaamet.ee/wms/alus-geo?", {
    format: 'image/png',
    transparent: true,
    layers: 'HYBRID',
    crs: L.CRS.EPSG4326
});
var kataster = L.tileLayer.wms("http://kaart.maaamet.ee/wms/alus-geo?", {
    format: 'image/png',
    transparent: true,
    minZoom: 15,
    layers: 'TOPOYKSUS_6569',
    crs: L.CRS.EPSG4326
});


var sauevyp = L.tileLayer('https://mapwarper.net/maps/tile/17658/{z}/{x}/{y}.png', {
    attribution: '<a href="http://sauevald.kovtp.ee/et/uldplaneering" target="_blank">Saue valla üldplaneering 2016</a>'
});
var sauelyp = L.tileLayer('https://mapwarper.net/maps/tile/22978/{z}/{x}/{y}.png', {
    attribution: '<a href="http://saue.kovtp.ee/uldplaneering" target="_blank">Saue linna üldplaneering 2010</a>'
});
var nommeyp = L.tileLayer('https://mapwarper.net/maps/tile/23005/{z}/{x}/{y}.png', {
    attribution: '<a href="http://www.tallinn.ee/est/ehitus/Nomme-linnaosa-uldplaneering" target="_blank">Nõmme linnaosa üldplaneering 2017</a>'
});
var keilayp = L.tileLayer('https://mapwarper.net/maps/tile/23006/{z}/{x}/{y}.png', {
    attribution: '<a href="http://www.keila.ee/uldplaneering" target="_blank">Keila linna üldplaneering 2002, kergliiklusteed</a>'
});
var stravarunning = L.tileLayer('https://globalheat.strava.com/tiles/running/color2/{z}/{x}/{y}.png', {
    attribution: '<a href="https://www.strava.com/" target="_blank">STRAVA</a>'
});
var stravacycling = L.tileLayer('https://globalheat.strava.com/tiles/cycling/color3/{z}/{x}/{y}.png', {
    attribution: '<a href="https://www.strava.com/" target="_blank">STRAVA</a>'
});
var gtdp = L.tileLayer('https://mapwarper.net/maps/tile/23004/{z}/{x}/{y}.png', {
    attribution: '<a href="https://github.com/liikuvus/rattatee-tallinn-saue-keila/issues/11" target="_blank">Gate Tallinn DP liiklusskeem</a>'
});
var topisaue = L.tileLayer('https://mapwarper.net/maps/tile/22989/{z}/{x}/{y}.png', {
    attribution: '<a href="https://github.com/liikuvus/rattatee-tallinn-saue-keila/issues/1" target="_blank">Topi-Saue teelõik</a>',
    opacity: 0.8
}).addTo(map);
var kanamavalingu = L.tileLayer('https://mapwarper.net/maps/tile/23002/{z}/{x}/{y}.png', {
    attribution: '<a href="https://github.com/liikuvus/rattatee-tallinn-saue-keila/issues/12" target="_blank">Kanama-Valingu teelõik</a>',
    opacity: 0.8
}).addTo(map);
var urda = L.tileLayer('https://mapwarper.net/maps/tile/23008/{z}/{x}/{y}.png', {
    attribution: '<a href="https://github.com/liikuvus/rattatee-tallinn-saue-keila/issues/16" target="_blank">Topi-Urda teelõik</a>'
});
var laagri = L.tileLayer('https://mapwarper.net/maps/tile/23029/{z}/{x}/{y}.png', {
    attribution: '<a href="https://www.mnt.ee/et/ehitus/tallinn-parnu-ikla-vana-paaskula-topi-loigu-tehniline-projekt" target="_blank">Vana-Pääsküla - Urda teelõik</a>',
    opacity: 0.8
}).addTo(map);

L.control.locate({
    strings: {
        title: "Näita minu asukohta"
    }
}).addTo(map);

function formatJSON(rawjson) {
    var json = {},
        res, key, loc = [];
    res = rawjson.addresses;
    for (var i in res) {
        key = res[i].ipikkaadress;
        loc = L.latLng(res[i].viitepunkt_b, res[i].viitepunkt_l);
        json[key] = loc;
    }
    return json;
};

map.addControl(new L.Control.Search({
    url: 'https://inaadress.maaamet.ee/inaadress/gazetteer?features=KATASTRIYKSUS&address={s}',
    jsonpParam: 'callback',
    formatData: formatJSON,
    textPlaceholder: 'Otsi katastriüksuse aadressi',
    marker: L.circleMarker([0, 0], {
        radius: 20,
        color: "#ffcc00"
    }),
    autoCollapse: true,
    autoType: false,
    minLength: 2,
    zoom: 18
}));

    function tStyle(tFeature) {
      return {
        weight: 8,
        opacity: 0.8,
        color: '#669900'
      }
    }
    var rattatee = omnivore.geojson('rattatee.geojson')
      .on('ready', function() {
        // map.fitBounds(rattatee.getBounds());
        map.addLayer(rattatee);
        // rattatee.eachLayer(eachLayer);
        rattatee.setStyle(tStyle);
      });

var allMapLayers = {
    'osm': osm,
    'positron': positron,
    'pohi': pohi,
    'orto': orto,
    'hybriid': hybriid,
    'kataster': kataster,
    'sauevyp': sauevyp,
    'sauelyp': sauelyp,
    'nommeyp': nommeyp,
    'keilayp': keilayp,
    'gtdp': gtdp,
    'stravarunning': stravarunning,
    'stravacycling': stravacycling,
    'topisaue': topisaue,
    'kanamavalingu': kanamavalingu,
    'urda': urda,
    'laagri': laagri,
    'rattatee': rattatee
};

L.control.layers({
    'OpenStreetMap': osm,
    'Positron': positron,
    'Põhikaart (z15+)': pohi,
    'Ortofoto': orto
}, {
    'Hübriidkaart': hybriid,
    'Katastripiirid (z15+)': kataster,
    'Saue valla ÜP': sauevyp,
    'Saue linna ÜP': sauelyp,
    'Nõmme LO ÜP': nommeyp,
    'Keila linna ÜP': keilayp,
    'Gate Tallinn DP': gtdp,
    'Strava jalgsi': stravarunning,
    'Strava rattaga': stravacycling,
    'Topi-Saue teelõik': topisaue,
    'Kanama-Valingu teelõik': kanamavalingu,
    'Topi-Urda teelõik': urda,
    'Vana-Pääsküla - Topi teelõik': laagri,
    'Rattatee': rattatee
}, {
    position: 'topleft'
}).addTo(map);


var info = L.control();
info.onAdd = function(map) {
    this._div = L.DomUtil.create('div', 'info');
    this._div.innerHTML = (
        "<h1><a href=\'\/rattatee-tallinn-saue-keila\' title=\'Rattatee Tallinn - Saue - Keila\'>Rattatee Tallinn - Saue - Keila</a></h1><a href=\'https:\/\/medium.com/\saue/\kiirtee-saue-linnast-keilasse-ja-tallinna-5529e1cd69f2\' title=\'Idee tutvustus\' target=\'_blank\'>Idee tutvustus</a> | <a href=\'https:\/\/github.com\/liikuvus\/rattatee-tallinn-saue-keila\/labels/\ettepanek\' title=\'Ettepanekud projektile\' target=\'_blank\'>Ettepanekud</a> | <a href=\'https:\/\/medium.com/\@tormi\' title=\'Kaardi teostus: Tormi Tabor\' target=\'_blank\'>Kaardi teostus: Tormi Tabor</a>"
    );
    return this._div;
};
info.addTo(map);

$(function() {
    $("#slider").slider({
        orientation: "vertical",
        range: "min",
        min: 0,
        max: 100,
        value: 80,
        slide: function(e, ui) {
            sauevyp.setOpacity(ui.value / 100);
            sauelyp.setOpacity(ui.value / 100);
            nommeyp.setOpacity(ui.value / 100);
            keilayp.setOpacity(ui.value / 100);
            gtdp.setOpacity(ui.value / 100);
            stravarunning.setOpacity(ui.value / 100);
            stravacycling.setOpacity(ui.value / 100);
            topisaue.setOpacity(ui.value / 100);
            kanamavalingu.setOpacity(ui.value / 100);
            urda.setOpacity(ui.value / 100);
        }
    });
});

L.hash(map, allMapLayers);
