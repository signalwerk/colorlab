import React, { Component } from 'react';
import Lab from './LAB';
import GithubCorner from 'react-github-corner';
import colorlab from '../../dist/colorlab';
import style from './app.css';


export default class App extends Component {
  state = {
    background: '#fff',
    L1: 50,
    a1: 0,
    b1: 0,
    L2: 50,
    a2: 8,
    b2: -8,
  };
  onLab1Change = (lab) => {
    this.setState({
      L1: lab.L,
      a1: lab.a,
      b1: lab.b,
    });
  };

  onLab2Change = (lab) => {
    this.setState({
      L2: lab.L,
      a2: lab.a,
      b2: lab.b,
    });
  };

  render() {
    const { L1, a1, b1, L2, a2, b2 } = this.state;

    const color1 = new colorlab.CIELAB(L1, a1, b1);
    const color2 = new colorlab.CIELAB(L2, a2, b2);

    return (
      <div className={style.sliderbox}>
        <h3>DeltaE 2000 of the two colors</h3>
        <p>ΔE: {color1.CIEDE2000(color2).toFixed(2)}</p>

        <h3>Color 1</h3>
        <Lab
          L={L1}
          a={a1}
          b={b1}
          onUpdate={this.onLab1Change}
        />
        <h3>Color 2</h3>
        <Lab
          L={L2}
          a={a2}
          b={b2}
          onUpdate={this.onLab2Change}
        />
        <br />
        <br />

        <a href="https://github.com/signalwerk/colorlab">→ colorlab @ github</a>

        <GithubCorner
          href={'https://github.com/signalwerk/colorlab'}
          bannerColor="#000"
          octoColor="#fff"
          width={60}
          height={60}
          direction="right"
        />
      </div>
    );
  }
}
