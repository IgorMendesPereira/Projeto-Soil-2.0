import './mapa.css'
import React, { Component } from 'react'
import { distance } from './util/algoritmo'
var mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');

class Mapa extends Component {
    componentDidMount() {
        const coordenadasPivo = [
            [-47.13713727, -21.7463552], //PIVO 1
            [-47.13713727, -21.7543552] //PIVO 2
        ]

        const coordsIniciais = [-47.13713727, -21.7463552] // Coordenadas iniciais
        const coordsBounds = [[-47.400, -21.900], [-47.096, -21.718]] //SW - NE

        const circleSource = {
            'type': 'geojson',
            'data': {
                'type': 'FeatureCollection',
                'features': [{
                    'type': 'Feature',
                    'geometry': {
                        'type': 'Point',
                        'coordinates': coordenadasPivo[0]
                    }
                }, {
                    'type': 'Feature',
                    'geometry': {
                        'type': 'Point',
                        'coordinates': coordenadasPivo[1]
                    }
                }]
            }
        }

        const circleLayer = {
            "id": "pivos",
            "source": 'pivoCoords',
            "type": "circle",
            "paint": {
                "circle-radius": 45,
                "circle-color": "#007cbf",
                "circle-opacity": 0.3,
                "circle-stroke-width": 2,
            }
        }

        mapboxgl.accessToken = 'pk.eyJ1IjoibWFyY29zY2FwaXN0cmFubyIsImEiOiJjanUyeHo3OGgwaGJkM3lydnEzY2J4d2U4In0.UD_HN7tlXTqsSfW9b2OaRg';
        var map = new mapboxgl.Map({
            minZoom: 13,
            maxZoom: 13,
            pitchWithRotate: false,
            center: coordsIniciais,
            maxBounds: coordsBounds,
            container: 'mapid',
            style: 'mapbox://styles/mapbox/satellite-v9'
        });

        map.dragRotate.disable()
        map.touchZoomRotate.disable()

        map.on('style.load', function () {
            map.addSource('pivoCoords', circleSource)
            map.addLayer(circleLayer)
        })

       /*  map.on('click', function (e) {
            const lngLat = e.lngLat;
            var click = [lngLat.lng, lngLat.lat]
            
            var pivo = coordenadasPivo.reduce((accumulator, current) => {
                if(distance(click, accumulator) < distance(click, current)) //FUNCAO DISTANCE PARA TESTE, NAO ESTA INCLUIDO NO REPOSITORIO REAL DA SOIL!
                    return accumulator
                else
                    return current
            })

            
            const oi = coordenadasPivo.findIndex(num => {
                return num === pivo;
            })

            console.log('Pivo ' + (oi+1) + ' clicado!');
        }); */

        /* map.on('click', function (e) {
            var click = [e.point.x, e.point.y] //ponto onde foi clicado            
            var pivoSelecionado = coordenadasPivo.reduce(
                (accumulator, current) => {
                    if(distance(click, accumulator))
                }
            );
        ); */
        /* map.on('mousemove', function (ev) {
            document.getElementById('info').innerHTML =
                console.log(ev.point) + '<br />' +
                // e.lngLat is the longitude, latitude geographical position of the event
                console.log(ev.lngLat);
        }); Pegar coordenadas do mapa */
    }

    render() {
        return (
            <div id='mapid' />
        )
    }
}

export default Mapa;