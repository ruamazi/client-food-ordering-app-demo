import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import AuthCallBack from "./pages/AuthCallBack";
import UserProfilePage from "./pages/UserProfilePage";
import Layout from "./layouts/Layout";
import ProtectedRoute from "./auth/ProtectedRoute";
import ManageResturant from "./pages/ManageResturant";
import Search from "./pages/Search";
import DetailPage from "./pages/DetailPage";
import OrderStatus from "./pages/OrderStatus";

function App() {
  return (
    <div className="">
      <Routes>
        <Route
          path="/"
          element={
            <Layout showHero={true}>
              <Home />
            </Layout>
          }
        />
        <Route path="/auth-callback" element={<AuthCallBack />} />
        <Route
          path="/search/:city"
          element={
            <Layout showHero={false}>
              <Search />
            </Layout>
          }
        />
        <Route
          path="/detail/:restaurantId"
          element={
            <Layout showHero={false}>
              <DetailPage />
            </Layout>
          }
        />
        <Route element={<ProtectedRoute />}>
          <Route
            path="/profile"
            element={
              <Layout>
                <UserProfilePage />
              </Layout>
            }
          />
          <Route
            path="/manage-restaurant"
            element={
              <Layout>
                <ManageResturant />
              </Layout>
            }
          />
          <Route
            path="/order-status"
            element={
              <Layout>
                <OrderStatus />
              </Layout>
            }
          />
        </Route>

        <Route path="/*" element={<h1>Page not found</h1>} />
      </Routes>
    </div>
  );
}

export default App;
