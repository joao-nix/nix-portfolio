import { createRoot } from 'react-dom/client'
import { useEffect, useState } from 'react'
import Public from './Public'
import Admin from './Admin'
import './styles.css'
function App() {
  const [admin, setAdmin] = useState(location.hash === '#/admin')
  useEffect(() => { const f = () => setAdmin(location.hash === '#/admin'); addEventListener('hashchange', f); return () => removeEventListener('hashchange', f) }, [])
  return admin ? <Admin /> : <Public />
}
createRoot(document.getElementById('root')!).render(<App />)
