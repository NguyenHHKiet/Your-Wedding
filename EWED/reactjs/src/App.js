import { Container } from 'react-bootstrap'
import { HashRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './components/Header';
import Footer from './components/Footer'
import HomePage from './page/HomePage'
import ProductPage from './page/ProductPage'
import CartPage from './page/CartPage';
import LoginPage from './page/LoginPage'
import RegisterPage from './page/RegisterPage';
import ProfilePage from './page/ProfilePage';
import InvoicePage from './page/InvoicePage';
import OrderPage from './page/OrderPage';
import UserListPage from './page/UserListPage';

function App() {
  return (
    <Router>
      <Header/>
      <main className="py-3">
        <Container>
          <h1>Welcome to.. Your Wedding</h1>
          <Routes>
            <Route path="/" element={<HomePage/>} index />
            <Route path="/product/:id" element={<ProductPage/>} />
            <Route path="/cart/*" element={<CartPage/>} />
            <Route path="/cart/:id*" element={<CartPage/>} />

            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/register" element={<RegisterPage/>}/>

            <Route path="/profile" element={<ProfilePage/>}/>
            <Route path="/invoice" element={<InvoicePage/>}/>
            <Route path="/order/:id" element={<OrderPage/>} />
            <Route path="/admin/userlist" element={<UserListPage/>} />
          </Routes>
        </Container>
      </main>
      <Footer/>
    </Router>
  );
}

export default App;
