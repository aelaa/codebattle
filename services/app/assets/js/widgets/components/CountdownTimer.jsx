import React, { Component } from 'react';
import { differenceInMilliseconds, format } from 'date-fns';
import PropTypes from 'prop-types';

class CountdownTimer extends Component {
  static propTypes = {
    time: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props);
    const { time, timeoutSeconds } = props;
    const timeLeft = this.getTimeLeft(time, timeoutSeconds);
    this.state = {
      duration: this.formatTime(timeLeft),
    };
  }

  componentDidMount() {
    this.interval = setInterval(this.updateTimer, 77);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  getTimeLeft = (time, timeoutSeconds) => {
    const diff = differenceInMilliseconds(new Date(), new Date(time));
    const timeoutMiliseconds = timeoutSeconds * 1000;
    return Math.max(timeoutMiliseconds - diff, 0);
  }

  formatTime = t => format(new Date(t), 'HH:mm:ss')

  updateTimer = () => {
    const { time, timeoutSeconds } = this.props;
    const timeLeft = this.getTimeLeft(time, timeoutSeconds);

    this.setState({
      duration: this.formatTime(timeLeft),
    });
  }

  render() {
    const { duration } = this.state;
    return <span className="text-monospace">{duration}</span>;
  }
}

export default CountdownTimer;
