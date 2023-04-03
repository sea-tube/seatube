import { ToastProvider } from '../contexts/ToastContext'
import { RouteGuardProvider } from '../contexts/RouteGuard'
import { Analytics } from '@vercel/analytics/react'
import { AuthProvider } from '../contexts/AuthContext'
import { Web3Provider } from '../contexts/Web3Context'
import { WalletProvider } from '../contexts/WalletContext'
import { MoralisProvider } from 'react-moralis'
import '../styles/globals.css'
import 'react-toastify/dist/ReactToastify.css'
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()

function MyApp({ Component, pageProps }) {
  return (
    <MoralisProvider initializeOnMount={false}>
      <ToastProvider>
        <QueryClientProvider client={queryClient}>
          {/*<RouteGuardProvider>*/}
          <AuthProvider>
            <Web3Provider>
              <WalletProvider>
                <Component {...pageProps} />
                <Analytics />
              </WalletProvider>
            </Web3Provider>
          </AuthProvider>
          {/*</RouteGuardProvider>*/}
        </QueryClientProvider>
      </ToastProvider>
    </MoralisProvider>
  )
}

export default MyApp
