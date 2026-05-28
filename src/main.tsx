import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter} from "react-router";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

import {DbProvider} from "@/context/DbContext";
import {openDb} from "@/database";
import App from '@/App.tsx'

import './index.css'

const db = await openDb();

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient} >
        <DbProvider db={db}>
          <App />
        </DbProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>,
)
