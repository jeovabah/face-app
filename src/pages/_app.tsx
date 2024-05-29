import "@/styles/globals.css";
import type { AppProps } from "next/app";
import "./ComparisonPage/styles.css";
import "./FaceRecognition/styles.css";
import "../components/LivenessQuickStart/styles.css";
import "../components/RegisterDynamic/styles.css";
import { Amplify } from "aws-amplify";
import "@aws-amplify/ui-react/styles.css";
import awsExport from "../aws-exports";
Amplify.configure(awsExport);
export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
