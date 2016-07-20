import React, { Component, PropTypes } from 'react';
import '../assets/stylesheets/Output.scss';

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

  render() {
    const { hp, cp, dust, pokemon } = this.props;

    if (pokemon.length === 0) {
      return <div></div>;
    }

    return (
      <div className="columns output-section">
        <div className="column col-sm-4"></div>
        <div className="column col-sm-4">
          <table className="table table-striped table-hover">
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
              <tr>
                <th>1</th>
                <th>1</th>
                <th>1</th>
                <th>1</th>
                <th>99%</th>
              </tr>
            </tbody>
          </table>
          {hp} {cp} {dust} {pokemon.name}
        </div>
      </div>
    );
  }
}

export default Output;
