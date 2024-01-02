import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import './App.css'
import Root from './containers/Root/Root.container'
import Login from './containers/Login/Login.container'
import Registration from './containers/Registration/Registration.container'
import Homepage from './containers/Homepage/Homepage.container'
import AddTransaction from './containers/AddTransaction/AddTransaction.container'
import Budgeting from './containers/Budgeting/Budgeting.container'
import ProtectedRoute from './containers/ProtectedRoute/ProtectedRoute.container'

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        <Route index element={<Login/>} />
        <Route path="registration" element={<Registration />} />
        <Route element={<ProtectedRoute />}>
          <Route path="homepage" element={<Homepage />} />
          <Route path="addTransaction" element={<AddTransaction />} />
          <Route path="budgeting" element={<Budgeting />} />
        </Route>
        <Route />
      </Route>
    )
  )

  return <RouterProvider router={router} />
}

export default App
