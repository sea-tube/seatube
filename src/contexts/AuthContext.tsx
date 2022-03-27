import { createContext, useEffect, useState, useContext } from "react"
import ToastContext from "./ToastContext"

type User = {
	account: string
	avatar_url: string
	profile_link: string
	username: string
}

type AuthContextType = {
	isAuthenticated: boolean
	user: User
}

const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children }: any) {
	const { showSuccess, showError, showLoading } = useContext(ToastContext)

	const [user, setUser] = useState<User | null>(null)

	const isAuthenticated = !!user

	useEffect(() => {
		// recoverUserInfo()
		// 	.then((userData: User) => {
		// 		console.log("Auth user: " + JSON.stringify(userData))
		// 		setUser(userData)
		// 	})
		// 	.catch((err) => {
		// 		console.error(err)
		// 	})
	}, [])

	return (
		<AuthContext.Provider
			value={{ user, isAuthenticated }}>
			{children}
		</AuthContext.Provider>
	)
}

export default AuthContext
