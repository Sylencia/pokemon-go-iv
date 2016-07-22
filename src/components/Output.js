import React, { Component, PropTypes } from 'react';
import '../assets/stylesheets/Output.scss';
import '../assets/stylesheets/utility.scss';
import Dust from '../assets/data/Dust.json';
import Multiplier from '../assets/data/Multiplier.json';
import Pokemon from '../assets/data/Pokemon.json';
import OutputRow from './OutputRow';

function findLevelRange(input) {
  return Dust.find((dust) =>
    (dust.cost === input));
}

function getPokemonData(entry) {
  const pkmn = Pokemon.find((pokemon) =>
    (pokemon.name.toLowerCase().trim() === entry.toLowerCase().trim()));
  if (pkmn !== null && pkmn !== undefined) {
    return pkmn;
  }
  return {};
}

class Output extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    hp: PropTypes.number.isRequired,
    cp: PropTypes.number.isRequired,
    dust: PropTypes.number.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = { solutions: [] };
    this.filterSolutions = this.filterSolutions.bind(this);
    this.findSolutions = this.findSolutions.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const newSolutions = this.findSolutions(nextProps);
    this.setState({
      solutions: this.filterSolutions(nextProps.newSearch, newSolutions),
    });
  }

  filterSolutions(newSearch, newSolutions) {
    const oldSolutions = this.state.solutions;
    if (oldSolutions.length === 0 || newSearch) {
      return newSolutions;
    }

    const filteredSolutions = [];
    // Fix this naive loop
    for (let o = 0; o < oldSolutions.length; ++o) {
      for (let n = 0; n < newSolutions.length; ++n) {
        const solution1 = oldSolutions[o];
        const solution2 = newSolutions[n];

        if (solution1.stamina === solution2.stamina &&
          solution1.attack === solution2.attack &&
          solution1.defense === solution2.defense) {
          filteredSolutions.push(solution2);
        }
      }
    }

    return filteredSolutions;
  }

// Assume all data here is valid, as it should've been checked by the input.
  findSolutions(newProps) {
    const { hp, cp, name, dust, wild } = newProps;
    const dustData = findLevelRange(dust);
    const newSolutions = [];
    const pokemon = getPokemonData(name);

    let id = 0;
    const increment = wild ? 2 : 1;

    for (let l = dustData.minLevel; l <= dustData.maxLevel; l += increment) {
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
              newSolutions.push({
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
    return newSolutions;
  }

  render() {
    const { solutions } = this.state;

    if (this.props.name === '') {
      return <div></div>;
    }

    const word = solutions.length === 1 ? 'solution' : 'solutions';

    return (
      <div className="section">
          {solutions.length} {word} found.
          <table className="table">
            <thead>
              <tr>
                <th>lv</th>
                <th><div className="center">ivs</div></th>
                <th><div className="center">perfection</div></th>
                <th><div className="center">max cp</div></th>
              </tr>
            </thead>
            <tbody>
              {solutions.map((solution) => (
                <OutputRow {...solution} key={solution.id} />
              ))}
            </tbody>
          </table>
      </div>
    );
  }
}

export default Output;
