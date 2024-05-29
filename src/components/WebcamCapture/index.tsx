import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import Webcam from "react-webcam";

const WebcamCapture = forwardRef((_, ref) => {
  const webcamRef = useRef<Webcam>(null);
  const [image, setImage] = useState<string | null>(null);
  useImperativeHandle(
    ref,
    () => {
      return {
        capture: () => {
          if (!webcamRef.current) return;
          const imageSrc = webcamRef.current.getScreenshot();
          setImage(imageSrc);
          return imageSrc;
        },
        clear: () => {
          setImage(null);
        },
      };
    },
    []
  );

  return (
    <>
      {image ? (
        <img
          src={image}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: "100%",
          }}
          alt="image"
        />
      ) : (
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          width="100%"
          height="100%"
          style={{ objectFit: "cover", borderRadius: "100%" }}
        />
      )}
    </>
  );
});

export default WebcamCapture;
