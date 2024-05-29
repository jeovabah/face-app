import { useEffect, useRef, useState } from "react";
// import WebcamCapture from "../../components/WebcamCapture";
import { useRouter } from "next/router"; // Importar useRouter
import LivenessQuickStart from "@/components/LivenessQuickStart";
import { RegisterDynamic } from "@/components/RegisterDynamic";

export default function Page() {
  const router = useRouter();
  const { project_name } = router?.query as { project_name: string };

  const webcamRef = useRef<FaceRecognitionRefProps | null>(null);
  const appConfig = {
    logo: "https://img.freepik.com/vetores-gratis/vetor-de-gradiente-de-logotipo-colorido-de-passaro_343694-1365.jpg?size=338&ext=jpg&ga=GA1.1.1700460183.1712275200&semt=ais",
    title: project_name || "Teste",
  };

  const [imageCapture, setImageCapture] = useState<string | null>(null);

  const [steps, setSteps] = useState({
    quantity: 2,
    actualStep: 0,
  });

  const RenderStep = (step: number) => {
    const StepCurrent = {
      0: (
        <RegisterDynamic
          onFinish={(data) => {
            setSteps({
              ...steps,
              actualStep: 1,
            });
          }}
        />
      ),
      1: (
        <>
          <h3>Prepare-se para a selfie</h3>
          <p>Posicione seu rosto</p>
          {/* <div className="face-webcam"> */}
          {/* <WebcamCapture ref={webcamRef} /> */}
          <LivenessQuickStart
            faceLivenessAnalysis={(data: any) => {
              console.log(data);
            }}
          />
          {/* </div> */}

          <button
            className="button-face"
            onClick={() => {
              if (!imageCapture) {
                return setImageCapture(webcamRef.current?.capture() || null);
              }
              webcamRef.current?.clear();
              setImageCapture(null);
            }}
          >
            {imageCapture ? "Tente novamente" : "Pronto"}
          </button>
        </>
      ),
    };

    return StepCurrent[step as keyof typeof StepCurrent];
  };

  return (
    <div className="container">
      <div className="container-logo">
        <img src={appConfig.logo} alt="logo" />
      </div>

      <div className="container-face">
        <div className="container-header">
          <img src={appConfig.logo} alt="logo" />
          <h3>Entrar com o {appConfig.title}</h3>
        </div>

        <div className="container-webcam">{RenderStep(steps.actualStep)}</div>
      </div>
    </div>
  );
}
