import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from '@/App.tsx'
import AppPreview from '@/App.preview.tsx'

const usePreview = import.meta.env.VITE_PREVIEW === 'true'
const RootApp = usePreview ? AppPreview : App

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RootApp />
  </StrictMode>,
)
