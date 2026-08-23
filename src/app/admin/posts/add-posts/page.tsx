"use client";

import { BtnBack } from "@/components/Button";
import NavBarAdmin from "@/components/NavbarAdmin";
import Sidebar from "@/components/Sidebar";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Link from "next/link";

import type { Category } from "@/app/types/Category";

import type { User } from "@/app/types/User";

import axios from "axios";

import Modal from "@/components/Modal";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AddPostsPages() {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [content, setContent] = useState("");
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [status, setStatus] = useState("");
  const [authorId, setAuhorId] = useState("");
  const [categoryId, setCategoryId] = useState("");

  const [users, setUsers] = useState<User[]>([]);

  const [categories, setCategories] = useState<Category[]>([]);

  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);

  const navigate = useRouter();

  const fetchUser = async () => {
    try {
      const res = await axios.get("/api/user?limit=100");

      setUsers(res.data.data);
    } catch (error) {
      console.error("error", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get("/api/category?limit=100");

      setCategories(res.data.data);
    } catch (error) {
      console.error("Error : ", error);
    }
  };

  useEffect(() => {
    fetchUser();
    fetchCategories();
  }, []);

  const AddPost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formData = new FormData();

      formData.append("title", title);
      formData.append("slug", slug);
      formData.append("content", content);
      if (thumbnail) {
        formData.append("thumbnail", thumbnail);
      }

      formData.append("status", status);

      formData.append("authorId", authorId);
      formData.append("categoryId", categoryId);

      const res = await axios.post("/api/post", formData, {
        headers: {
          "Content-Type": "mulipart/form-data",
        },
      });

      setMessage(res.data.message);
      setShowModal(true);

      setTimeout(() => {
        setShowModal(false);
        navigate.push("/admin/posts");
      }, 2000);

      // refresh the data
      setTitle("");
      setSlug("");
      setContent("");
      setThumbnail(null);
      setStatus("");
      setAuhorId("");
      setCategoryId("");
    } catch (error) {
      console.error("Error : ", error);

      setMessage("Error, cannot add new data!");
      setShowModal(true);
    }
  };

  return (
    <div className="flex h-screen bg-white">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <NavBarAdmin />
        <div className="ml-64 overflow-y-auto p-6 mt-7">
          <h1 className="font-bold text-2xl text-slate-600">
            Form tambah posts
          </h1>
          <div className="max-w mx-auto bg-white rounded-xl shadow-md border mt-5">
            <Modal
              show={showModal}
              onClose={() => setShowModal(false)}
              message={message}
            />
            <Card>
              <CardContent>
                <div className="p-6">
                  <form onSubmit={AddPost}>
                    <div className="mb-5">
                      <label
                        htmlFor="title"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Judul <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="title"
                        name="title"
                        onChange={(e) => setTitle(e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg shadow-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="name@flowbite.com"
                        required
                      />
                    </div>
                    <div className="mb-5">
                      <label
                        htmlFor="slug"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Slug <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="slug"
                        name="slug"
                        onChange={(e) => setSlug(e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg shadow-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                      />
                    </div>
                    <div className="mb-5">
                      <label
                        htmlFor="content"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Content <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        id="content"
                        rows={4}
                        onChange={(e) => setContent(e.target.value)}
                        className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-lg focus:ring-brand focus:border-brand block w-full p-3.5 shadow-lg placeholder:text-body"
                        placeholder="Tuliskan konten di sini..."
                      ></textarea>
                    </div>
                    <div className="mb-5">
                      <label
                        htmlFor="authorId"
                        className="block mb-2.5 text-sm font-medium text-heading"
                      >
                        Author / User <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="authorId"
                        name="authorId"
                        onChange={(e) => setAuhorId(e.target.value)}
                        className="block w-full px-3 py-2.5 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-lg focus:ring-brand focus:border-brand shadow-lg placeholder:text-body"
                      >
                        <option value={""}>-- Pilih User / Author --</option>
                        {users.map((data) => (
                          <option value={data.id} key={data.id}>
                            {data.name} | {data.role}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="mb-5">
                      <label
                        htmlFor="categoryId"
                        className="block mb-2.5 text-sm font-medium text-heading"
                      >
                        Kategori
                      </label>
                      <select
                        id="categoryId"
                        name="categoryId"
                        onChange={(e) => setCategoryId(e.target.value)}
                        className="block w-full px-3 py-2.5 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-lg focus:ring-brand focus:border-brand shadow-lg placeholder:text-body"
                      >
                        <option value={""}>-- Pilih kategori --</option>
                        {categories.map((data) => (
                          <option value={data.id} key={data.id}>
                            {data.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="mb-5">
                      <label
                        htmlFor="status"
                        className="block mb-2.5 text-sm font-medium text-heading"
                      >
                        Status <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="status"
                        name="status"
                        onChange={(e) => setStatus(e.target.value)}
                        className="block w-full px-3 py-2.5 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-lg focus:ring-brand focus:border-brand shadow-lg placeholder:text-body"
                      >
                        <option value={""}>-- Pilih Status -- </option>
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                        <option value="archived">Archived</option>
                      </select>
                    </div>
                    <div className="mb-5">
                      <label
                        className="block mb-2.5 text-sm font-medium text-heading"
                        htmlFor="thumbnails"
                      >
                        Upload file
                      </label>
                      <input
                        className="block w-full text-sm text-heading border border-default-medium rounded-base cursor-pointer bg-neutral-secondary-medium focus:outline-none focus:ring-brand focus:border-brand shadow-xs placeholder:text-body file:mr-4 file:py-2.5 file:px-4 file:rounded-l-base file:border-0 file:text-sm file:font-semibold file:bg-brand file:text-white hover:file:bg-brand/90"
                        id="thumbnails"
                        name="thumbnails"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            setThumbnail(e.target.files[0]);
                          }
                        }}
                        type="file"
                      ></input>
                    </div>
                    <button
                      type="submit"
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Tambah!
                    </button>
                  </form>
                </div>
              </CardContent>
              <CardFooter>
                <Link href={"/admin/posts"}>
                  <BtnBack />
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
