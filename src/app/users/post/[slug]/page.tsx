"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import type { Post } from "@/app/types/Post";

export default function PostDetailPage() {
  const { slug } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [relatedPosts, setRelatedPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetchPostBySlug();
  }, [slug]);

  const fetchPostBySlug = async () => {
    setLoading(true);
    try {
      // Fetch all posts and find by slug
      const res = await axios.get("/api/post?limit=100");
      const posts = res.data.data;
      const foundPost = posts.find((p: Post) => p.slug === slug);

      if (foundPost) {
        setPost(foundPost);

        // Fetch related posts from same category
        const related = posts.filter(
          (p: Post) =>
            p.categoryId === foundPost.categoryId && p.id !== foundPost.id,
        );
        setRelatedPosts(related.slice(0, 3));
      }
    } catch (error) {
      console.error("Error fetching post:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Post Not Found
          </h1>
          <Link
            href="/users"
            className="text-blue-600 hover:text-blue-800 font-semibold"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/users">
              <h1 className="text-2xl font-bold text-blue-600 cursor-pointer">
                MyBlog
              </h1>
            </Link>
            <Link
              href="/users"
              className="text-gray-700 hover:text-blue-600 transition"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </nav>

      {/* Article Header */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-gray-500 mb-6">
          <Link href="/users" className="hover:text-blue-600">
            Home
          </Link>
          <span>/</span>
          <span className="text-gray-700">{post.category?.name}</span>
          <span>/</span>
          <span className="text-gray-700">{post.title}</span>
        </div>

        {/* Category Badge */}
        <span className="inline-block bg-blue-100 text-blue-600 text-sm font-semibold px-4 py-1 rounded-full mb-4">
          {post.category?.name || "Uncategorized"}
        </span>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          {post.title}
        </h1>

        {/* Meta Information */}
        <div className="flex items-center space-x-4 mb-8 pb-8 border-b">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold text-lg">
              {post.author?.name?.charAt(0) || "A"}
            </div>
            <div className="ml-3">
              <p className="text-gray-900 font-semibold">
                {post.author?.name || "Anonymous"}
              </p>
              <p className="text-gray-500 text-sm">
                {post.createdAt
                  ? new Date(post.createdAt).toLocaleDateString("id-ID", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })
                  : "No date"}
              </p>
            </div>
          </div>
        </div>

        {/* Featured Image */}
        {post.thumbnail && (
          <div className="relative w-full h-96 mb-8 rounded-lg overflow-hidden">
            <Image
              src={`/uploads/${post.thumbnail}`}
              alt={post.title}
              fill
              className="object-cover"
            />
          </div>
        )}

        {/* Content */}
        <div className="prose prose-lg max-w-none">
          <div className="text-gray-700 leading-relaxed whitespace-pre-line">
            {post.content}
          </div>
        </div>

        {/* Tags/Categories */}
        <div className="mt-12 pt-8 border-t">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Tags</h3>
          <div className="flex flex-wrap gap-2">
            <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm">
              {post.category?.name}
            </span>
          </div>
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="bg-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Related Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.id}
                  href={`/users/post/${relatedPost.slug}`}
                  className="group"
                >
                  <article className="bg-gray-50 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative h-48 bg-gray-200">
                      {relatedPost.thumbnail ? (
                        <Image
                          src={`/uploads/${relatedPost.thumbnail}`}
                          alt={relatedPost.title}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full bg-gradient-to-br from-blue-400 to-purple-500">
                          <span className="text-white text-3xl font-bold">
                            {relatedPost.title.charAt(0)}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition">
                        {relatedPost.title}
                      </h3>
                      <p className="text-sm text-gray-500 mt-2">
                        {relatedPost.createdAt
                          ? new Date(relatedPost.createdAt).toLocaleDateString(
                              "id-ID",
                              {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              },
                            )
                          : "No date"}
                      </p>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

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
