import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Home from './home/Home.tsx'
import './index.scss'

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<ToastContainer
			position='top-left'
			autoClose={2500}
			hideProgressBar={false}
			newestOnTop={false}
			closeOnClick
			rtl={false}
			pauseOnFocusLoss
			draggable={false}
			pauseOnHover={false}
			theme='colored'
		/>
		<Home />
	</StrictMode>,
)
