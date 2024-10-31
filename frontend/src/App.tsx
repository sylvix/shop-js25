import { Route, Routes } from 'react-router-dom';
import { Container } from '@mui/material';
import AppToolbar from './UI/AppToolbar/AppToolbar';
import Products from './features/products/Products';
import NewProduct from './features/admin/products/NewProduct';
import OneProduct from './features/products/OneProduct';
import Register from '@/features/users/Register';
import Login from '@/features/users/Login';
import ProtectedRoute from '@/UI/ProtectedRoute/ProtectedRoute';
import { useAppSelector } from '@/app/hooks';
import { selectUser } from '@/features/users/usersSlice';
import AdminLayout from '@/features/admin/AdminLayout';
import AdminProductsList from '@/features/admin/products/AdminProductsList';
import Error404 from '@/UI/Errors/Error404';

const App = () => {
  const user = useAppSelector(selectUser);

  return (
    <>
      <header>
        <AppToolbar />
      </header>
      <Container maxWidth="xl" component="main">
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/categories/:categoryId" element={<Products />} />
          <Route path="/products/:id" element={<OneProduct />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute isAllowed={user && user.role === 'admin'}>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route path="" element={<AdminProductsList />} />
            <Route path="products" element={<AdminProductsList />} />
            <Route path="products/new" element={<NewProduct />} />
          </Route>
          <Route path="*" element={<Error404 />} />
        </Routes>
      </Container>
    </>
  );
};

export default App;
