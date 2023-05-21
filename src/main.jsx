import React from "react";
import ReactDOM from "react-dom/client";
import '@/assets/stylesheet.css'
import 'primeicons/primeicons.css';
import "primereact/resources/primereact.min.css";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

import Router from "@/router/index.jsx"

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <Router/>
        </QueryClientProvider>
    </React.StrictMode>
);
