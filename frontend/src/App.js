import "./App.css";
import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const axios = require("axios");

class App extends React.Component {
  state = { locations: [] };
  async componentDidMount() {
    axios.get("http://localhost:8080/locations").then((resp) => {
      this.setState({ locations: resp.data });
    });
  }

  render() {
    return (
      <MapContainer center={[51.505, -0.09]} zoom={2} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {this.state.locations.map((loc) => (
          <Marker position={[loc.latitude, loc.longitude]}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    );
  }
}
export default App;
