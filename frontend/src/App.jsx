import { AuthenticatedRoute, GuestRoute } from "./components/PrivateRoutes";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layouts/Layout";
import CreatePost from "./pages/CreatePost";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Register from "./pages/Register";
import ShowPost from "./pages/ShowPost";
import UpdatePost from "./pages/UpdatePost";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={
            <AuthenticatedRoute>
              <Home/>
            </AuthenticatedRoute>
          }/>
          <Route path="create" element={
            <AuthenticatedRoute>
              <CreatePost/>
            </AuthenticatedRoute>
          }/>
          <Route path="posts/:id" element={
            <AuthenticatedRoute>
              <ShowPost/>
            </AuthenticatedRoute>
          }/>
          <Route path="posts/update/:id" element={
            <AuthenticatedRoute>
              <UpdatePost/>
            </AuthenticatedRoute>
          }/>
          <Route path="register" element={
            <GuestRoute>
              <Register/>
            </GuestRoute>
          }/>
          <Route path="login" element={
            <GuestRoute>
              <Login/>
            </GuestRoute>
          }/>
        </Route>
        {/* Taro luar layout soalnya gaperlu navbar */}
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </BrowserRouter>
  );
}
export default App;