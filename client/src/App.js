//import logo from './logo.svg';
import './App.css';
import Login from './pages/login';
import Register from './pages/register';
import Home from './pages/home';
 import {BrowserRouter,Routes,Route} from "react-router-dom"
 import ProtectedRoute from './components/ProtectedRoute';
 import { Provider } from "react-redux";
 import store from "./redux/store";
 import Admin from './pages/Admin';
 import Profile from "./pages/Profile"
 import Partner from './pages/Partner';
 import SingleMovie from './pages/home/SingleMovie';
 import BookShow from './pages/home/BookShow';
 import Forget from './pages/Profile/ForgetPassword';
 import Reset from './pages/Profile/ResetPassword';
// export const config={
//   endpoint:"http://localhost:8082/api"
// }

function App() {
  return (
    <div className="App">
       <Provider store={store}>
       <BrowserRouter>
          <Routes>
            <Route path="/"  element={<ProtectedRoute>
              <Home />
              </ProtectedRoute>}  />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin" element={
               <ProtectedRoute>
                 <Admin />
               </ProtectedRoute>
             }
           />
           <Route path="/profile" element={<ProtectedRoute>
                                  <Profile />
                                  </ProtectedRoute>}/>
          <Route path="/partner" element={<ProtectedRoute>
                                <Partner />
                                </ProtectedRoute>}/>
         <Route path="/movie/:id" element={
                <ProtectedRoute>
                  <SingleMovie />
                </ProtectedRoute>
              }
            />
            <Route
              path="/book-show/:id"
              element={
                <ProtectedRoute>
                  <BookShow />
                </ProtectedRoute>
              }
            />
             <Route path="/forgot" element={<Forget />} />
             <Route path="/reset/:email" element={<Reset />} />
          </Routes>
      </BrowserRouter>
       </Provider>
       
    </div>
  );
}

export default App;
