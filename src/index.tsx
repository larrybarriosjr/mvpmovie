import App from "app/App"
import ScrollToTop from "components/ScrollToTop"
import React from "react"
import ReactDOM from "react-dom"
import { QueryClient, QueryClientProvider } from "react-query"
import { BrowserRouter } from "react-router-dom"
import "styles/lib.css"
import "./index.css"
import reportWebVitals from "./reportWebVitals"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      enabled: false,
      staleTime: Infinity,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: "always"
    }
  }
})

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ScrollToTop />
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById("root")
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
