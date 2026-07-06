import "../css/app.css";

import { createInertiaApp } from "@inertiajs/react";
import { createRoot } from "react-dom/client";
import { Suspense, lazy } from "react";

import { DataProvider } from "./context/DataContext";
import { AuthProvider } from "./context/AuthContext";

createInertiaApp({
    resolve: (name) => {
        const pages = import.meta.glob("./Pages/**/*.jsx");

        const page = pages[`./Pages/${name}.jsx`];

        if (!page) {
            throw new Error(`Page not found: ${name}`);
        }

        const PageComponent = lazy(page);

        return {
            default: (props) => (
                <Suspense
                    fallback={
                        <div className="min-h-screen flex items-center justify-center bg-white">
                            <div className="flex flex-col items-center gap-3">
                                <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                                <p className="text-sm text-gray-500 font-medium">
                                    Memuat...
                                </p>
                            </div>
                        </div>
                    }
                >
                    <PageComponent {...props} />
                </Suspense>
            ),
        };
    },

    setup({ el, App, props }) {
        // console.log("INERTIA PROPS =", props);

        createRoot(el).render(
            <AuthProvider>
                <DataProvider>
                    <App {...props} />
                </DataProvider>
            </AuthProvider>,
        );
    },
});
