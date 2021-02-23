import React, { useEffect, useRef } from "react";
import { useThree } from "react-three-fiber";

function Camera(props) {
  const ref = useRef();
  const { setDefaultCamera } = useThree();

  useEffect(() => {
    setDefaultCamera(ref.current);
  }, []);

  return <perspectiveCamera ref={ref} {...props} />;
}

export default Camera;
