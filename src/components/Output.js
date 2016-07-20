import React, { Component, PropTypes } from 'react';
import '../assets/stylesheets/Output.scss';
import Dust from '../assets/data/Dust.json';
import Multiplier from '../assets/data/Multiplier.json';
import OutputRow from './OutputRow';

function findLevelRange(input){
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

    for (let l = minLevel; l <= maxLevel; ++l) {
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

            if (calcCP === cp && hp === Math.floor(stamina)) {
              console.log(m);
              solutions.push({
                level: l,
                stamina: s,
                attack: a,
                defense: d,
              });
            }
          }
        }
      }
    }
    console.log(solutions);
    return solutions;
  }

  render() {
    const { dust, pokemon } = this.props;

    const dustData = findLevelRange(dust);
    let solutions = [];
    if (dustData !== undefined) {
      solutions = this.getSolutions(dustData.minLevel, dustData.maxLevel);
    }

    if (pokemon.length === 0) {
      return <div></div>;
    }

    return (
      <div className="columns output-section">
        <div className="column col-sm-4"></div>
        <div className="column col-sm-4">
          <h6>Solutions found: {solutions.length}</h6>
          <table className="table table-hover">
            <thead>
              <tr>
                <th>lv</th>
                <th>s</th>
                <th>a</th>
                <th>d</th>
                <th>%</th>
              </tr>
            </thead>
            <tbody>
              {solutions.map((solution) => (
                <OutputRow {...solution} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Output;
