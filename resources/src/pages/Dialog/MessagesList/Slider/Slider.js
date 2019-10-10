import React from "react";
import {animated, useSpring} from "react-spring";
import {useGestureResponder} from "react-gesture-responder";

const Slider = ({children}) => {
  const [{x}, set] = useSpring(() => ({x: 0}));

  const {bind} = useGestureResponder({
    onStartShouldSet: () => true,
    onMove: ({delta, xy}) => {
      if (delta[0] > 0)
        set({x: 0, immediate: true});
      else if (delta[0] < -400)
        set({x: -400, immediate: true});
      else
        set({x: delta[0], immediate: true});
    },
    onRelease: ({delta}) => {
      set({x: 0, immediate: false})
    }
  });

  const addResistance = (x) => Math.abs(x) > 40 ? x + (Math.abs(x) - 40) * 0.6 * (x < 0 ? 1 : -1) : x;

  return (
    <animated.div
      {...bind}
      style={{transform: x.interpolate(x => `translateX(${addResistance(x)}px)`)}}
      >
      {children}
    </animated.div>
  )
};

export default Slider;
