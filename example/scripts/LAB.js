import React, { Component } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import PropTypes from 'prop-types';

import colorlab from '../../dist/colorlab';

import style from './LAB.css';

// http://colorizer.org/

export default class Lab extends Component {

  static propTypes = {
    L: PropTypes.number.isRequired,
    a: PropTypes.number.isRequired,
    b: PropTypes.number.isRequired,
    onUpdate: PropTypes.func.isRequired,
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      L: this.props.L || 50,
      a: this.props.a || 0,
      b: this.props.b || 0,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      L: nextProps.L,
      a: nextProps.a,
      b: nextProps.b,
    });
  }

  onUpdate = () => {
    if (this.props.onUpdate) {
      this.props.onUpdate({
        L: this.state.L,
        a: this.state.a,
        b: this.state.b,
      });
    }
  }

  onLInputChange = (event) => {
    this.setState({ L: parseFloat(event.target.value || 0) }, this.onUpdate);
  };

  onAInputChange = (event) => {
    this.setState({ a: parseFloat(event.target.value || 0) }, this.onUpdate);
  };

  onBInputChange = (event) => {
    this.setState({ b: parseFloat(event.target.value || 0) }, this.onUpdate);
  };

  onLSliderChange = (L) => {
    this.setState({ L }, this.onUpdate);
  };
  onASliderChange = (a) => {
    this.setState({ a }, this.onUpdate);
  };
  onBSliderChange = (b) => {
    this.setState({ b }, this.onUpdate);
  };

  cssGradient = (LColorMin, LColorMax) => {


    let css = 'linear-gradient(to right';

    var i;
    var steps = 9;
    for (i = 0; i < steps; i++) {
        let color = LColorMax.interpolate(LColorMin, (i/(steps-1))).toSRGB().toHexString();
        css += ', ' + color + ' ' + (i/(steps-1)*100) + '%';
    }

    css += ')';
    return css;
  };

  render() {
    const { L, a, b } = this.state;
    const color = new colorlab.CIELAB(L, a, b);

    const LStyle = {
      backgroundImage: this.cssGradient(
        new colorlab.CIELAB(0, a, b),
        new colorlab.CIELAB(100, a, b)
      ),
    };

    const aStyle = {
      backgroundImage: this.cssGradient(
        new colorlab.CIELAB(L, -128, b),
        new colorlab.CIELAB(L, 128, b)
      ),
    };

    const bStyle = {
      backgroundImage: this.cssGradient(
        new colorlab.CIELAB(L, a, -128),
        new colorlab.CIELAB(L, a, 128)
      ),
    };

    return (
      <div className={''}>
        <div className={style.container}>
          <div className={style.caption}>
            L
          </div>
          <div className={style.slider}>
            <Slider
              tipTransitionName="rc-slider-tooltip-zoom-down"
              maximumTrackStyle={LStyle}
              minimumTrackStyle={{ backgroundColor: 'transparent' }}
              value={L}
              min={0}
              max={+100}
              onChange={this.onLSliderChange}
            />
          </div>
          <div className={style.input}>
            <input
              type="number"
              value={L}
              min={0}
              max={+100}
              onChange={this.onLInputChange}
            />
          </div>
        </div>

        <div className={style.container}>
          <div className={style.caption}>
            a
          </div>
          <div className={style.slider}>
            <Slider
              tipTransitionName="rc-slider-tooltip-zoom-down"
              maximumTrackStyle={aStyle}
              minimumTrackStyle={{ backgroundColor: 'transparent' }}
              value={a}
              min={-128}
              max={+128}
              onChange={this.onASliderChange}
            />
          </div>
          <div className={style.input}>
            <input
              type="number"
              value={a}
              min={-128}
              max={+128}
              onChange={this.onAInputChange}
            />
          </div>
        </div>

        <div className={style.container}>
          <div className={style.caption}>
            b
          </div>
          <div className={style.slider}>
            <Slider
              tipTransitionName="rc-slider-tooltip-zoom-down"
              maximumTrackStyle={bStyle}
              minimumTrackStyle={{ backgroundColor: 'transparent' }}
              value={b}
              min={-128}
              max={+128}
              onChange={this.onBSliderChange}
            />
          </div>
          <div className={style.input}>
            <input
              type="number"
              value={b}
              min={-128}
              max={+128}
              onChange={this.onBInputChange}
            />
          </div>
        </div>

        <div
          className={style.testpatch}
          style={{
            backgroundColor: color.toSRGB().toHexString()
          }}
        />
      </div>
    );
  }
}
