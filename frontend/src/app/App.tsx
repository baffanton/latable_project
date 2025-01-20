import { UserProvider } from "./providers/UserProvider";
import { ModalProvider } from "./providers/ModalProvider";
import "./styles/global.scss";
import "@shared/vendors/index";
import "./styles/main.scss";
import { AppRouter } from "./routers";
import { Header } from "@widgets/Header";
import { BrowserRouter } from "react-router-dom";
import { AntdConfigProvider } from "./providers/AntdConfigProvider";

const App = (): JSX.Element => {
  return (
    <BrowserRouter>
      <UserProvider>
        <AntdConfigProvider>
          <ModalProvider>
            <div className="page">
              <Header />
              <AppRouter />
            </div>
          </ModalProvider>
        </AntdConfigProvider>
      </UserProvider>
    </BrowserRouter>
  );
};

export default App;
