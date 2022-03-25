import React from 'react'
import { render } from 'react-dom'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

import './index.css'

const App = () => (
  <MapContainer
    center={[0, 0]}
    zoom={18}
    preferCanvas
  >
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((a) => (
      <Marker key={a} position={[0 + a / 1000, 0]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    ))}
  </MapContainer>
)

document.addEventListener('DOMContentLoaded', () => {
  render(<App />, document.getElementById('root'))
})
