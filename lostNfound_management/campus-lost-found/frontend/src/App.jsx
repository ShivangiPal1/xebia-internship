import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import AddItem from "./pages/AddItem.jsx";
import EditItem from "./pages/EditItem.jsx";
import Home from "./pages/Home.jsx";
import ItemDetails from "./pages/ItemDetails.jsx";
import NotFound from "./pages/NotFound.jsx";

function App() {
  return (
    <div className="min-h-screen bg-campus-mist text-campus-ink">
      <Navbar />
      <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddItem />} />
          <Route path="/items/:id" element={<ItemDetails />} />
          <Route path="/items/:id/edit" element={<EditItem />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
