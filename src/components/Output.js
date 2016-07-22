import React, { Component, PropTypes } from 'react';
import '../assets/stylesheets/Output.scss';
import Dust from '../assets/data/Dust.json';
import Multiplier from '../assets/data/Multiplier.json';
import OutputRow from './OutputRow';

function findLevelRange(input) {
  return Dust.find((dust) =>
    (dust.cost === input));
}

class Output extends Component {
  static propTypes = {
    hp: PropTypes.number.isRequired,
    cp: PropTypes.number.isRequired,
    dust: PropTypes.number.isRequired,
    pokemon: PropTypes.shape({
      name: PropTypes.string,
      number: PropTypes.number,
      baseStam: PropTypes.number,
      baseAtk: PropTypes.number,
      baseDef: PropTypes.number,
    }).isRequired,
  }

  constructor(props) {
    super(props);

    this.getSolutions = this.getSolutions.bind(this);
  }

  getSolutions(minLevel, maxLevel) {
    const { hp, cp, pokemon } = this.props;
    const solutions = [];

    let id = 0;

    for (let l = minLevel; l <= maxLevel; ++) {
      for (let s = 0; s <= 15; ++s) {
        for (let a = 0; a <= 15; ++a) {
          for (let d = 0; d <= 15; ++d) {
            const multiplierData = Multiplier.find((data) =>
              (data.level === l));
            const m = multiplierData.multiplier;

            const attack = (pokemon.baseAtk + a) * m;
            const defense = (pokemon.baseDef + d) * m;
            const stamina = (pokemon.baseStam + s) * m;
            const calcCP = Math.max(10,
              Math.floor(Math.sqrt(stamina) * attack * Math.sqrt(defense) * 0.1));

            const maxAtk = (pokemon.baseAtk + 15) * m;
            const maxDef = (pokemon.baseDef + 15) * m;
            const maxStam = (pokemon.baseStam + 15) * m;
            const maxCP = Math.max(10,
              Math.floor(Math.sqrt(maxStam) * maxAtk * Math.sqrt(maxDef) * 0.1));

            // As stamina and defense rely on the square root, they are scaled accordingly
            const percentage = (Math.sqrt(s) + a + Math.sqrt(d)) / (2 * Math.sqrt(15) + 15) * 100;

            if (calcCP === cp && hp === Math.floor(stamina)) {
              solutions.push({
                level: l,
                stamina: s,
                attack: a,
                defense: d,
                id,
                maxCP,
                percentage,
              });
              id++;
            }
          }
        }
      }
    }
    return solutions;
  }

  render() {
    const { dust, pokemon, wild, trained } = this.props;

    const dustData = findLevelRange(dust);
    let solutions = [];
    if (dustData !== undefined) {
      solutions = this.getSolutions(dustData.minLevel, dustData.maxLevel, wild, trained);
    }

    if (Object.keys(pokemon).length === 0 && pokemon.constructor === Object) {
      return <div></div>;
    }

    if (solutions.length === 0) {
      return (
        <div className="columns output-section">
          <div className="column col-sm-4"></div>
          <div className="column col-sm-4 no-solutions">
            <b>no solutions found</b>
          </div>
        </div>
      );
    }

    return (
      <div className="columns output-section">
        <div className="column col-sm-4"></div>
        <div className="column col-sm-4">
          <table className="table">
            <thead>
              <tr>
                <th>lv</th>
                <th><div className="center">ivs ({solutions.length} found)</div></th>
                <th>perfection</th>
                <th>max cp</th>
              </tr>
            </thead>
            <tbody>
              {solutions.map((solution) => (
                <OutputRow {...solution} key={solution.id} />
              ))}
            </tbody>
          </table>
        </div>
        <div className="column col-sm-4"></div>
      </div>
    );
  }
}

export default Output;
