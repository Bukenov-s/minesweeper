import React, { FC, useState, useEffect } from 'react';

interface IProps {
  timer: {
    is_running: boolean;
    is_reset: boolean;
  };
}

const Timer: FC<IProps> = ({ timer }) => {
  const [time, setTime] = useState(0);
  const { is_running, is_reset } = timer;
  const zeros = '000'.slice(time.toString().length);

  useEffect(() => {
    let interval_id;

    if (is_running) {
      interval_id = setInterval(() => setTime(time + 1), 1000);
    }

    if (!is_running) {
      clearInterval(interval_id);
    }

    if (!is_running && is_reset) {
      setTime(0);
    }

    return () => {
      clearInterval(interval_id);
    };
  }, [time, setTime, is_running, is_reset]);

  return (
    <span>{zeros + time}</span>
  )
}

export { Timer };
