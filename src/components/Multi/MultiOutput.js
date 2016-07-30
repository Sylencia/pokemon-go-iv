import React, { Component, PropTypes } from 'react';
import { maxBy } from 'lodash';
import '~/assets/stylesheets/Output.scss';
import '~/assets/stylesheets/Utility.scss';
import Multiplier from '~/assets/data/Multiplier.json';
import Dust from '~/assets/data/Dust.json';
import MultiOutputRow from './MultiOutputRow';
import * as Helper from '~/components/Helper/HelperFunctions';

class MultiOutput extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    level: PropTypes.number.isRequired,
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
    const minLevel = 1;
    // Pokemon can be trained to their (level + 1) * 2, which is different to the max wild level.
    const maxLevel = Math.min((level + 1) * 2, maxBy(Multiplier, 'level').level);
    const increment = wild ? 2 : 1;

    for (let l = minLevel; l <= maxLevel; l += increment) {
      const multiplierData = Multiplier.find((m) =>
        (m.level === l));
      const m = multiplierData.multiplier;
      const dustData = Dust.find((d) =>
        (d.minLevel <= l && d.maxLevel >= l));
      const dust = dustData.cost;

      const minimum = Helper.getPokemonStats(0, 0, 0, m);
      const average = Helper.getPokemonStats(8, 8, 8, m);
      const maximum = Helper.getPokemonStats(15, 15, 15, m);
      const minCP = Helper.calculateCP(minimum.attack, minimum.defense, minimum.stamina);
      const avgCP = Helper.calculateCP(average.attack, average.defense, average.stamina);
      const maxCP = Helper.calculateCP(maximum.attack, maximum.defense, maximum.stamina);
      data.push({
        id: multiplierData.level,
        level: multiplierData.level,
        minCP,
        avgCP,
        maxCP,
        minHP: Math.floor(minimum.stamina),
        avgHP: Math.floor(average.stamina),
        maxHP: Math.floor(maximum.stamina),
        dust,
      });
    }

    return data;
  }

  render() {
    const { data } = this.state;

    if (this.props.name === '' || this.props.level <= 0) {
      return <div></div>;
    }

    return (
      <div className="section">
        <div className="new-section">
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
                <MultiOutputRow {...lv} key={lv.id} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default MultiOutput;
