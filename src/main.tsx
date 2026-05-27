import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter} from "react-router";

import {DbProvider} from "@/context/DbContext";
import {openDb} from "@/database";
import App from '@/App.tsx'

import './index.css'

const db = await openDb()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <DbProvider db={db}>
        <App />
      </DbProvider>
    </BrowserRouter>
  </StrictMode>,
)
