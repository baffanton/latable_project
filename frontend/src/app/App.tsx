import { ModalProvider } from "./providers/ModalProvider";
import "./styles/global.scss";
import "@shared/vendors/index";
import "./styles/main.scss";
import { AppRouter } from "./routers";
import { Header } from "@widgets/Header";
import { BrowserRouter } from "react-router-dom";
import { AntdConfigProvider } from "./providers/AntdConfigProvider";
import userStore from "./stores/UserStore";
import { LoadingProvider } from "./providers/LoadingProvider";

const App = (): JSX.Element => {
  userStore.init();

  return (
    <BrowserRouter>
      <AntdConfigProvider>
        <ModalProvider>
          <LoadingProvider>
            <div className="page">
              <Header />
              <AppRouter />
            </div>
          </LoadingProvider>
        </ModalProvider>
      </AntdConfigProvider>
    </BrowserRouter>
  );
};

export default App;
