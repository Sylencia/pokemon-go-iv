import React, { Component, PropTypes } from 'react';
import { maxBy } from 'lodash';
import '~/assets/stylesheets/IVFinder/Output.scss';
import '~/assets/stylesheets/utility.scss';
import Multiplier from '~/assets/data/Multiplier.json';
import Pokemon from '~/assets/data/Pokemon.json';
import Dust from '~/assets/data/Dust.json';
import MinmaxOutputRow from './MinmaxOutputRow';

function getPokemonData(entry) {
  const pkmn = Pokemon.find((pokemon) =>
    (pokemon.name.toLowerCase().trim() === entry.toLowerCase().trim()));
  if (pkmn !== null && pkmn !== undefined) {
    return pkmn;
  }
  return {};
}

function calculateCP(atk, def, stam) {
  return Math.max(10, Math.floor(Math.sqrt(stam) * atk * Math.sqrt(def) * 0.1));
}

class MinmaxOutput extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = { data: [] };
    this.findMinmax = this.findMinmax.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { name, level, wild } = nextProps;
    if (name !== '') {
      const data = this.findMinmax(name, level, wild);

      this.setState({
        data,
      });
    }
  }

// Assume all data here is valid, as it should've been checked by the input.
  findMinmax(name, level, wild) {
    const data = [];
    const pokemon = getPokemonData(name);
    const minLevel = 1;
    const maxLevel = Math.min((level - 1) * 2 + 1, maxBy(Multiplier, 'level').level);
    const increment = wild ? 2 : 1;

    for (let l = minLevel; l <= maxLevel; l += increment) {
      const multiplierData = Multiplier.find((m) =>
        (m.level === l));
      const m = multiplierData.multiplier;
      const dustData = Dust.find((d) =>
        (d.minLevel <= l && d.maxLevel >= l));
      const dust = dustData.cost;

      const minAtk = (pokemon.baseAtk) * m;
      const minDef = (pokemon.baseDef) * m;
      const minStam = (pokemon.baseStam) * m;
      const avgAtk = (pokemon.baseAtk + 8) * m;
      const avgDef = (pokemon.baseDef + 8) * m;
      const avgStam = (pokemon.baseStam + 8) * m;
      const maxAtk = (pokemon.baseAtk + 15) * m;
      const maxDef = (pokemon.baseDef + 15) * m;
      const maxStam = (pokemon.baseStam + 15) * m;
      const minCP = calculateCP(minAtk, minDef, minStam);
      const avgCP = calculateCP(avgAtk, avgDef, avgStam);
      const maxCP = calculateCP(maxAtk, maxDef, maxStam);
      data.push({
        id: multiplierData.level,
        level: multiplierData.level,
        minCP,
        avgCP,
        maxCP,
        minHP: Math.floor(minStam),
        avgHP: Math.floor(avgStam),
        maxHP: Math.floor(maxStam),
        dust,
      });
    }

    return data;
  }

  render() {
    const { data } = this.state;

    if (this.props.name === '') {
      return <div></div>;
    }

    return (
      <div className="section">
        <div className="table-section">
          showing min-max for {this.props.name}
          <table className="table">
            <thead>
              <tr>
                <th>lv</th>
                <th><div className="text-center">dust</div></th>
                <th><div className="text-center">min</div></th>
                <th><div className="text-center">avg</div></th>
                <th><div className="text-center">max</div></th>
              </tr>
            </thead>
            <tbody>
              {data.map((lv) => (
                <MinmaxOutputRow {...lv} key={lv.id} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default MinmaxOutput;
