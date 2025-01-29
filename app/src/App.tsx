import { Provider } from "react-redux";
import store from "./redux/store";
import Products from "./components/Products";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductDetails from "./components/ProductDetails";

const App = () => {
  return (
    <Provider store={store}>
      
      <Router>
        <Routes>
        
          <Route path="/" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetails />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
