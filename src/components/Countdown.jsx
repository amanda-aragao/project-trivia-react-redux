import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

const INITIAL_TIMER = 30;
const FINAL_TIMER = 0;
const INTERVAL_AMOUT = 0;

function Countdown() {
  const [seconds, setSeconds] = useState(INITIAL_TIMER);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((second) => {
        if (second > FINAL_TIMER) {
          dispatch(saveTimer(second - 1));
          return second - 1;
        }
        dispatch(saveTimer(FINAL_TIMER));
        return FINAL_TIMER;
      });
    }, INTERVAL_AMOUT);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        {seconds}
        {' '}
        seconds have elapsed since mounting.
      </header>
    </div>
  );
}

export default connect()(Countdown);
