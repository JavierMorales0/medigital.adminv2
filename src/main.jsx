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
import { es} from 'date-fns/locale'

const queryClient = new QueryClient();

addLocale('es', {
    firstDayOfWeek: 1,
    dayNames: ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
    dayNamesShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
    dayNamesMin: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
    monthNames: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
    monthNamesShort: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
    today: 'Hoy',
    clear: 'Limpiar',
    weekHeader: 'Sem'
});

locale('es')
setDefaultOptions({locale: es})

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <HelmetProvider>
            <QueryClientProvider client={queryClient}>
                <Router/>
            </QueryClientProvider>
        </HelmetProvider>
    </React.StrictMode>
);
