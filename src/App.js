import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { generatePalette } from './ColorHelpers';
import NewPaletteForm from './NewPaletteForm';
import Palette from './Palette';
import PaletteList from './PaletteList';
import SeedColors from './SeedColors';
import SingleColorPalette from './SingleColorPalette';

class App extends Component {
  getPalettes = JSON.parse(localStorage.getItem('palettes'));

  state = {
    palettes: this.getPalettes || SeedColors,
  };

  findPalette = (id) => {
    const { palettes } = this.state;
    return palettes.find((palette) => palette.id === id);
  };

  savePalette = (newPalette) => {
    this.setState((state) => ({ palettes: [...state.palettes, newPalette] }));
  };

  deletePalette = (id) => {
    this.setState((state) => ({ palettes: state.palettes.filter((palette) => palette.id !== id) }));
  };

  render() {
    const { palettes } = this.state;
    return (
      <Switch>
        <Route
          exact
          path="/palette/new"
          render={(routeProps) => (
            <NewPaletteForm savePalette={this.savePalette} palettes={palettes} {...routeProps} />
          )}
        />
        <Route
          exact
          path="/"
          render={(routeProps) => (
            <PaletteList palettes={palettes} {...routeProps} deletePalette={this.deletePalette} />
          )}
        />
        <Route
          exact
          path="/palette/:id"
          render={(routeProps) => (
            <Palette palette={generatePalette(this.findPalette(routeProps.match.params.id))} />
          )}
        />
        <Route
          exact
          path="/palette/:paletteId/:colorId"
          render={(routeProps) => (
            <SingleColorPalette
              colorId={routeProps.match.params.colorId}
              palette={generatePalette(this.findPalette(routeProps.match.params.paletteId))}
              {...routeProps}
            />
          )}
        />
        <Route
          render={(routeProps) => (
            <PaletteList palettes={palettes} {...routeProps} deletePalette={this.deletePalette} />
          )}
        />
      </Switch>
    );
  }
}

export default App;
