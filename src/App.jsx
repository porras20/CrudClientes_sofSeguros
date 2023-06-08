import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ListClient from "./pages/ListClient";
import CreateClient from "./pages/CreateClient";
import { SnackbarProvider } from "notistack";

function App() {
  return (
    <SnackbarProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ListClient />} />
          <Route path="/client/list" element={<ListClient />} />
          <Route path="/client/create" element={<CreateClient />} />
        </Routes>
      </BrowserRouter>
    </SnackbarProvider>
  );
}

export default App;
