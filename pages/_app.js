import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import Navbar from "../components/Navbar";
import "../styles/globals.css";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex flex-col bg-gray-50 relative min-h-screen pt-16">
        <Navbar />
        <Component {...pageProps} />
      </div>
    </QueryClientProvider>
  );
}

export default MyApp;
