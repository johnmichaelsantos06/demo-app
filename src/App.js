import { Provider } from "react-redux";
import { MemberInformationPage } from "./member/MemberInformationPage";
import store from "./store";

function App() {
  return (
    <Provider store={store}>
      <MemberInformationPage />
    </Provider>
  );
}

export default App;
