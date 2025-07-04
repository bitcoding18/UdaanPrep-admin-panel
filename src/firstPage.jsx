import { Toaster } from "react-hot-toast";
import App from "./App";
import GlobalProvider from "./context/globalProvider";

const FirstPage = () => {
  return (
    <>
      <GlobalProvider>
        <App />
      </GlobalProvider>
    </>
  );
};

export default FirstPage;
