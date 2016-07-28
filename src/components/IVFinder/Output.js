import React, { Component, PropTypes } from 'react';
import { minBy, maxBy } from 'lodash';
import '~/assets/stylesheets/IVFinder/Output.scss';
import '~/assets/stylesheets/utility.scss';
import Dust from '~/assets/data/Dust.json';
import Multiplier from '~/assets/data/Multiplier.json';
import Pokemon from '~/assets/data/Pokemon.json';
import OutputRow from './OutputRow';
import InputTableRow from './InputTableRow';

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
    trainerLevel: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    hp: PropTypes.number.isRequired,
    cp: PropTypes.number.isRequired,
    dust: PropTypes.number.isRequired,
    wild: PropTypes.bool.isRequired,
    newSearch: PropTypes.bool.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = { solutions: [], inputs: [], nextId: 0 };
    this.filterSolutions = this.filterSolutions.bind(this);
    this.findSolutions = this.findSolutions.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.name !== '') {
      const newSolutions = this.findSolutions(nextProps);
      const inputs = nextProps.newSearch ?
      [{ ...nextProps, id: 0 }] :
      [...this.state.inputs, { ...nextProps, id: this.state.inputs.length }];

      this.setState({
        solutions: this.filterSolutions(nextProps.newSearch, newSolutions),
        inputs,
        nextId: this.state.nextId++,
      });
    }
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
    const { trainerLevel, hp, cp, name, dust, wild, newSearch } = newProps;
    const dustData = findLevelRange(dust);
    const newSolutions = [];
    const pokemon = getPokemonData(name);

    let id = 0;
    const increment = wild ? 2 : 1;
    const maxLevel = newSearch && wild ?
      // MAX LEVEL OF POKEMON IS 2 * Trainer Level - 1, capped at 30
      Math.min(59, 2 * trainerLevel - 1, dustData.maxLevel) :
      dustData.maxLevel;

    for (let l = dustData.minLevel; l <= maxLevel; l += increment) {
      const multiplierData = Multiplier.find((data) =>
        (data.level === l));
      const m = multiplierData.multiplier;

      for (let s = 0; s <= 15; ++s) {
        for (let a = 0; a <= 15; ++a) {
          for (let d = 0; d <= 15; ++d) {
            const attack = (pokemon.baseAtk + a) * m;
            const defense = (pokemon.baseDef + d) * m;
            const stamina = (pokemon.baseStam + s) * m;
            const calcCP = Math.max(10,
              Math.floor(Math.sqrt(stamina) * attack * Math.sqrt(defense) * 0.1));

            if (calcCP === cp && hp === Math.floor(stamina)) {
              let stamRatio = pokemon.baseStam / (pokemon.baseStam + pokemon.baseDef);
              let defRatio = 1 - stamRatio;
              const atkPercent = (a + 0.4 * stamRatio * s + 0.4 * defRatio * d) / 21 * 100;
              // pokemon in gyms have double the health
              stamRatio = 2 * pokemon.baseStam / (2 * pokemon.baseStam + pokemon.baseDef);
              defRatio = 1 - stamRatio;
              const defPercent = (2 * defRatio * d + 2 * stamRatio * s + 0.2 * a) / 33 * 100;
              // ratio between your ivs and max ivs
              const perfection = (a + d + s) / 45 * 100;

              newSolutions.push({
                level: l,
                stamina: s,
                attack: a,
                defense: d,
                id,
                atkPercent,
                defPercent,
                perfection,
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
    const { solutions, inputs } = this.state;

    if (this.props.name === '') {
      return <div></div>;
    }

    const word = solutions.length === 1 ? 'solution' : 'solutions';
    let range = '';
    if (solutions.length > 1) {
      const perfMin = parseFloat(minBy(solutions, 'perfection').perfection).toFixed(0);
      const perfMax = parseFloat(maxBy(solutions, 'perfection').perfection).toFixed(0);

      range = (
        <span><b>iv % range:</b> {perfMin}% - {perfMax}%<br /></span>
      );
    }

    return (
      <div className="section">
          {solutions.length} {word} found. <br />
          {range}
          <div className="new-section">
            <table className="table">
              <thead>
                <tr>
                  <th>lv</th>
                  <th><div className="text-center">ivs</div></th>
                  <th><div className="text-center">iv %</div></th>
                  <th><div className="text-center">potential</div></th>
                </tr>
              </thead>
              <tbody>
                {solutions.map((solution) => (
                  <OutputRow {...solution} key={solution.id} />
                ))}
              </tbody>
            </table>
          </div>
          <div className="new-section">
            previous data for this pokémon
            <table className="table">
              <thead>
                <tr>
                  <th><div className="text-center">name</div></th>
                  <th><div className="text-center">cp</div></th>
                  <th><div className="text-center">hp</div></th>
                  <th><div className="text-center">dust</div></th>
                </tr>
              </thead>
              <tbody>
                {inputs.map((input) => (
                  <InputTableRow {...input} key={input.id} />
                ))}
              </tbody>
            </table>
          </div>
      </div>
    );
  }
}

export default Output;
