import { RouterProvider } from "react-router-dom";
import { router } from "./routes/Router";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { ChatContextProvider } from "./context/ChatContext";

function App() {
  const { user } = useContext(AuthContext);
  return (
    <ChatContextProvider user={user}>
      <div className="font-Kedebideri">
        <RouterProvider router={router} />
      </div>
    </ChatContextProvider>
  );
}

export default App;
