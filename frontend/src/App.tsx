import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Signup } from './pages/Signup'
import { Signin } from './pages/Signin'
import { Dashboard } from './pages/Dashboard'
import { AddIncome } from './pages/AddIncome'
import { History } from './pages/History'
import { AddExpense } from './pages/AddExpense'
import { AddLoan } from './pages/AddLoan'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <BrowserRouter>
      <Routes>
        <Route path='/signup' element={<Signup></Signup>}></Route>
        <Route path='/signin' element={<Signin></Signin>}></Route>
        <Route path='/dashboard' element={<Dashboard></Dashboard>}></Route>
        <Route path='/dashboard/income' element={<AddIncome></AddIncome>}></Route>
        <Route path='/dashboard/history' element={<History></History>}></Route>
        <Route path='/dashboard/expense' element={<AddExpense></AddExpense>}></Route>
        <Route path='/dashboard/loan' element={<AddLoan></AddLoan>}></Route>
      </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
