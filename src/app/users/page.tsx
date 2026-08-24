"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import type { Post } from "@/app/types/Post";
import type { Category } from "@/app/types/Category";

export default function UsersPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  useEffect(() => {
    fetchPosts();
    fetchCategories();
  }, [page]);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`/api/post?page=${page}&limit=6`);
      setPosts(res.data.data);
      setTotalPages(res.data.meta.last_page);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get("/api/category?limit=100");
      setCategories(res.data.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const filteredPosts = selectedCategory
    ? posts.filter((post) => post.categoryId === parseInt(selectedCategory))
    : posts;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-blue-600">MyBlog</h1>
            </div>
            <div className="hidden md:flex space-x-8">
              <a
                href="#"
                className="text-gray-700 hover:text-blue-600 transition"
              >
                Home
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-blue-600 transition"
              >
                Categories
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-blue-600 transition"
              >
                About
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-blue-600 transition"
              >
                Contact
              </a>
              <a
                href="/login"
                className="text-gray-700 hover:text-blue-600 transition"
              >
                Login
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-4">Welcome to MyBlog</h1>
          <p className="text-xl mb-8 text-blue-100">
            Discover amazing stories, insights, and knowledge
          </p>
          <div className="flex justify-center">
            <input
              type="text"
              placeholder="Search articles..."
              className="px-6 py-3 w-full max-w-md rounded-l-lg text-gray-900 focus:outline-none"
            />
            <button className="bg-blue-800 hover:bg-blue-900 px-6 py-3 rounded-r-lg font-semibold transition">
              Search
            </button>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="bg-white py-6 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-4 overflow-x-auto">
            <button
              onClick={() => setSelectedCategory("")}
              className={`px-4 py-2 rounded-full font-medium whitespace-nowrap transition ${
                selectedCategory === ""
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              All
            </button>
            {categories
              .filter((category) => category.id !== undefined)
              .map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id!.toString())}
                  className={`px-4 py-2 rounded-full font-medium whitespace-nowrap transition ${
                    selectedCategory === category.id!.toString()
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {category.name}
                </button>
              ))}
          </div>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No posts found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative h-48 bg-gray-200">
                  {post.thumbnail ? (
                    <Image
                      src={`/uploads/${post.thumbnail}`}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full bg-gradient-to-br from-blue-400 to-purple-500">
                      <span className="text-white text-4xl font-bold">
                        {post.title.charAt(0)}
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-3">
                    <span className="bg-blue-100 text-blue-600 text-xs font-semibold px-3 py-1 rounded-full">
                      {post.category?.name || "Uncategorized"}
                    </span>
                    <span className="text-gray-400 text-xs ml-auto">
                      {post.createdAt
                        ? new Date(post.createdAt).toLocaleDateString("id-ID", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })
                        : "No date"}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2 hover:text-blue-600 transition">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {post.content}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                        {post.author?.name?.charAt(0) || "A"}
                      </div>
                      <span className="text-sm text-gray-600 ml-2">
                        {post.author?.name || "Anonymous"}
                      </span>
                    </div>
                    <Link
                      href={`/users/post/${post.slug}`}
                      className="text-blue-600 hover:text-blue-800 font-semibold text-sm transition"
                    >
                      Read more →
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Pagination */}
        {!loading && filteredPosts.length > 0 && !selectedCategory && (
          <div className="flex justify-center items-center space-x-2 mt-12">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              Previous
            </button>
            <div className="flex space-x-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (pageNum) => (
                  <button
                    key={pageNum}
                    onClick={() => setPage(pageNum)}
                    className={`px-4 py-2 rounded-lg transition ${
                      page === pageNum
                        ? "bg-blue-600 text-white"
                        : "bg-white border border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    {pageNum}
                  </button>
                ),
              )}
            </div>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              Next
            </button>
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">MyBlog</h3>
              <p className="text-gray-400">
                Your source for amazing stories and insights.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition"
                >
                  Twitter
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition"
                >
                  Facebook
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition"
                >
                  Instagram
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 MyBlog. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
