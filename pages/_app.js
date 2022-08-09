import '../styles/globals.css'

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import configStore from "../redux/store";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={configStore.store}>
      <PersistGate loading={null} persistor={configStore.persistor}>
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  );
}

export default MyApp;