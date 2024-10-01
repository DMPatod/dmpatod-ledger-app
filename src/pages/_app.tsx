import { AppProps } from "next/app";
import "./styles.scss";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <Component {...pageProps} />
    </LocalizationProvider>
  );
};

export default App;
