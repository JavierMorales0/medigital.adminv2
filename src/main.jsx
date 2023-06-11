import React from "react";
import ReactDOM from "react-dom/client";
import '@/assets/stylesheet.css'
import 'primeicons/primeicons.css';
import "primereact/resources/primereact.min.css";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {HelmetProvider} from 'react-helmet-async';
import {addLocale, locale} from 'primereact/api';
import Router from "@/router/index.jsx"
import {setDefaultOptions} from "date-fns";
import {es} from 'date-fns/locale'
import "@/assets/react-big-calendar.css"
import {primereactLocale} from "@/utils/locale.js";

const queryClient = new QueryClient();
addLocale('es', primereactLocale);

locale('es')
setDefaultOptions({locale: es})


ReactDOM.createRoot(document.getElementById("root")).render(
    // <React.StrictMode>
    <HelmetProvider>
        <QueryClientProvider client={queryClient}>
            <Router/>
        </QueryClientProvider>
    </HelmetProvider>
    // </React.StrictMode>
);
