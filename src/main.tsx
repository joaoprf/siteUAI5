import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Blog from "./components/Blog.tsx";
import BlogPost from "./components/BlogPost.tsx";
import React from "react";
import Layout from "./components/Layout.tsx";
import ChatbotWhatsApp from "./components/ChatbotWhatsApp.tsx";
import { I18nProvider } from "./i18n/index.tsx";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <I18nProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/chatbot-whatsapp" element={<ChatbotWhatsApp />} />
          <Route
            path="/blog"
            element={
              <Layout>
                <Blog />
              </Layout>
            }
          />
          <Route
            path="/blog/:slug"
            element={
              <Layout>
                <BlogPost />
              </Layout>
            }
          />
        </Routes>
      </BrowserRouter>
    </I18nProvider>
  </React.StrictMode>
);
