import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Blog from "./components/Blog.tsx";
import BlogPost from "./components/BlogPost.tsx";
import React from "react";
import Layout from "./components/Layout.tsx";
import ChatbotWhatsApp from "./components/ChatbotWhatsApp.tsx";
import { AuthProvider } from "./contexts/AuthContext.tsx";
import PrivateRoute from "./components/PrivateRoute.tsx";
import Login from "./pages/admin/Login.tsx";
import Dashboard from "./pages/admin/Dashboard.tsx";
import PostsList from "./pages/admin/PostsList.tsx";
import PostEditor from "./pages/admin/PostEditor.tsx";
import CategoriesManager from "./pages/admin/CategoriesManager.tsx";
import TagsManager from "./pages/admin/TagsManager.tsx";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
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

          {/* Admin Routes */}
          <Route path="/admin/login" element={<Login />} />
          <Route
            path="/admin"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/posts"
            element={
              <PrivateRoute>
                <PostsList />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/posts/new"
            element={
              <PrivateRoute>
                <PostEditor />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/posts/:id/edit"
            element={
              <PrivateRoute>
                <PostEditor />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/categories"
            element={
              <PrivateRoute>
                <CategoriesManager />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/tags"
            element={
              <PrivateRoute>
                <TagsManager />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
