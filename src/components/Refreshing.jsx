import React, { useEffect, useState } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import { REFRESH_TIMER } from '../utils/constants';

function CircularProgressWithLabel({ value }) {
  console.log({ value });
  return (
    <Box position="relative" display="inline-flex">
      <CircularProgress variant="static" value={value} />
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="caption" component="div" color="textSecondary">{`${Math.round(
          value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

export default function Refreshing() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 10));
    }, REFRESH_TIMER / 10);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <main className="form form--refreshing">
      <CircularProgressWithLabel value={progress} />
    </main>
  );
}
