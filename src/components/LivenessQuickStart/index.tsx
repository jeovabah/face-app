import React, { useEffect, useState } from "react";
import {
  Loader,
  ThemeProvider,
  Alert,
  useTheme,
  Theme,
} from "@aws-amplify/ui-react";
import { FaceLivenessDetector } from "@aws-amplify/ui-react-liveness";
import { DictionaryLiveness } from "@/utils/translate";

function LivenessQuickStart({ faceLivenessAnalysis }: any) {
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchCreateLiveness = async () => {
      setLoading(true);
      const response = await fetch("/api/liveness/create");
      const data = await response.json();
      setSessionId(data?.data?.sessionId);
      setLoading(false);
    };
    fetchCreateLiveness();
  }, []);

  const handleAnalysisComplete = async () => {
    const response = await fetch(`/api/liveness/get?sessionId=${sessionId}`);
    const data = await response.json();
    faceLivenessAnalysis(data.data);
    console.log(data?.data);
    if (data.data.status === "SUCCEEDED") {
      setMessage("Análise completa. Redirecionando...");
      setTimeout(() => {
        window.history.back();
      }, 3000);
    }
  };

  const { tokens } = useTheme();

  const theme: Theme = {
    name: "Liveness ME2",
    breakpoints: {
      values: {
        base: 0,
        small: 600,
        medium: 900,
        large: 1200,
      },
    },
    tokens: {
      colors: {
        background: {
          primary: {
            value: tokens.colors.neutral["90"].value,
          },
          secondary: {
            value: tokens.colors.neutral["100"].value,
          },
        },
        font: {
          primary: {
            value: tokens.colors.white.value,
          },
        },
        brand: {
          primary: {
            "10": tokens.colors.teal["100"],
            "80": tokens.colors.teal["40"],
            "90": tokens.colors.teal["20"],
            "100": tokens.colors.teal["10"],
          },
        },
      },
    },
  };
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <ThemeProvider theme={theme}>
          {message && <Alert variation="success">{message}</Alert>}
          <FaceLivenessDetector
            displayText={DictionaryLiveness}
            sessionId={sessionId}
            region="us-east-1"
            onAnalysisComplete={handleAnalysisComplete}
            onError={(error) => {
              console.error(error);
            }}
          />
        </ThemeProvider>
      )}
    </>
  );
}

export default LivenessQuickStart;
