import { BrowserRouter, Routes, Route } from "react-router-dom";

import Products from "./pages/Products";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserContextProvider from "./components/UserContextProvider";
import AuthorizationContextProvider from "./components/AuthorizationContextProvider";

import "./styles/styles.scss";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import PostProduct from "./pages/PostProduct";
import ProductDetails from "./pages/ProductDetails";
import Setting from "./pages/Setting";
import EditProduct from "./pages/EditProduct";
import VerifyEmail from "./pages/VerifyEmail";

const App = () => (
  <AuthorizationContextProvider>
    <UserContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/user/:userId/profile" element={<Profile />} />
          <Route path="/not-found" element={<NotFound />} />
          <Route path="/post-product" element={<PostProduct />} />
          <Route path="/product/:productId" element={<ProductDetails />} />
          <Route path="/edit-product/:productId" element={<EditProduct />} />
          <Route path="/setting" element={<Setting />} />

          <Route path="/verify-email/:userId" element={<VerifyEmail />} />
        </Routes>
      </BrowserRouter>
    </UserContextProvider>
  </AuthorizationContextProvider>
);

export default App;
