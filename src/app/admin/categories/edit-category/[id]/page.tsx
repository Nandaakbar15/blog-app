"use client";

import { BtnBack } from "@/components/Button";
import NavBarAdmin from "@/components/NavbarAdmin";
import Sidebar from "@/components/Sidebar";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Link from "next/link";

import axios from "axios";

import Modal from "@/components/Modal";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function AddCategoriesPages() {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");

  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);

  const navigate = useRouter();

  useEffect(() => {
    const fetchCategoriesById = async () => {
      try {
        const res = await axios.get(`/api/category/${id}`);

        const { name, slug } = res.data;

        setName(name);
        setSlug(slug);
      } catch (error) {
        console.error("Error : ", error);
      }
    };

    fetchCategoriesById();
  }, [id]);

  const editCategories = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.put(`/api/category/${id}`, {
        name: name,
        slug: slug,
      });

      setMessage(res.data.message);
      setShowModal(true);

      setTimeout(() => {
        setShowModal(false);
        navigate.push("/admin/categories");
      }, 2000);
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
          <h1 className="text-2xl font-bold">Form tambah kategori</h1>
          <div className="max-w mx-auto bg-white rounded-xl shadow-md border mt-5">
            <Modal
              show={showModal}
              onClose={() => setShowModal(false)}
              message={message}
            />
            <Card>
              <CardContent>
                <div className="p-6">
                  <form onSubmit={editCategories}>
                    <div className="mb-5">
                      <label
                        htmlFor="name"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="name@flowbite.com"
                        required
                      />
                    </div>
                    <div className="mb-5">
                      <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Slug <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="slug"
                        name="slug"
                        value={slug}
                        onChange={(e) => setSlug(e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Edit!
                    </button>
                  </form>
                </div>
              </CardContent>
              <CardFooter>
                <Link href={"/admin/categories"}>
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
