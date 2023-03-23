import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/header/Header";
import Login from "./pages/login/Login";
import { AuthRoutes, GeneralRoutes } from "./pages/middleware/ProtectedRoute";
import Signup from "./pages/signup/Signup";
import Todo from "./pages/todo/Todo";

function App() {
	const [isUser, setIsUser] = useState(false);
	return (
		<>
		<Header isUser={isUser} setIsUser={setIsUser} />
			<Routes>
				<Route element={<GeneralRoutes />}>
					<Route path='/' element={<Login setIsUser={setIsUser} />} />
					<Route path='/signup' element={<Signup setIsUser={setIsUser} />} />
				</Route>

				<Route element={<AuthRoutes />}>
					<Route path='/todo' element={<Todo />} />
				</Route>
			</Routes>
		</>
	);
}

export default App;
