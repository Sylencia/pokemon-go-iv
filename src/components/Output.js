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
    wild: PropTypes.bool.isRequired,
    trained: PropTypes.bool.isRequired,
  }

  constructor(props) {
    super(props);

    this.getSolutions = this.getSolutions.bind(this);
  }

  getSolutions(minLevel, maxLevel, wild, trained) {
    const { hp, cp, pokemon } = this.props;
    const solutions = [];

    let id = 0;
    let levelJump = 1;
    if (wild && !trained) {
      levelJump = 2;
    }

    if (!trained && ((!wild && minLevel > 40) || wild && minLevel > 60)) {
      return solutions;
    }

    for (let l = minLevel; l <= maxLevel; l += levelJump) {
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
              solutions.push({
                level: l,
                stamina: s,
                attack: a,
                defense: d,
                id,
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

    if (pokemon.length === 0) {
      return <div></div>;
    }

    return (
      <div className="columns output-section">
        <div className="column col-sm-4"></div>
        <div className="column col-sm-4">
          <table className="table">
            <thead>
              <tr>
                <th>lv</th>
                <th><div className="center">ivs ({solutions.length} sets)</div></th>
                <th><div className="right">%</div></th>
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
