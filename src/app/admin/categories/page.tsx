"use client";

import NavBarAdmin from "@/components/NavbarAdmin";
import Sidebar from "@/components/Sidebar";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { useEffect, useState } from "react";

import type { Category } from "@/app/types/Category";
import axios from "axios";

import Modal from "@/components/Modal";
import { useRouter } from "next/navigation";

export default function CategoriesPages() {
  const [categories, setCategories] = useState<Category[]>([]);

  const [paginations, setPaginations] = useState({
    current_page: 1,
    last_page: 1,
  });

  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);

  const navigate = useRouter();

  const fetchCategories = async (page: number = 1) => {
    try {
      const res = await axios.get(`/api/category?page=${page}`);

      setCategories(res.data.data);

      setPaginations({
        current_page: res.data.meta.page,
        last_page: res.data.meta.last_page,
      });
    } catch (error) {
      console.error("Error : ", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const deleteCategories = async (id: number) => {
    try {
      const res = await axios.delete(`/api/category/${id}`);

      setMessage(res.data.message);
      setShowModal(true);

      setTimeout(() => {
        setShowModal(false);
        navigate.push("/admin/categories");
      }, 2000);

      // refresh the data
      fetchCategories();
    } catch (error) {
      console.error("Error : ", error);
    }
  };

  return (
    <div className="flex h-screen bg-white">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <NavBarAdmin />
        <div className="ml-64 overflow-y-auto p-6 mt-7">
          <Modal
            show={showModal}
            onClose={() => setShowModal(false)}
            message={message}
          />
          <h1 className="text-2xl font-bold mb-3">Data Kategori</h1>
          <h2>
            <Link
              className="inline-block px-4 py-2 rounded-lg shadow-lg bg-blue-500 hover:bg-blue-700 text-white"
              href={"/admin/categories/add-category"}
            >
              Tambah Kategori
            </Link>
          </h2>
          <div className="overflow-x-auto mt-5">
            <Card>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="px-4 py-2 font-medium">
                        Category ID
                      </TableHead>
                      <TableHead className="px-4 py-2 font-medium">
                        Name
                      </TableHead>
                      <TableHead className="px-4 py-2 font-medium">
                        Slug
                      </TableHead>
                      <TableHead className="px-4 py-2 font-medium">
                        Action
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {categories.map((data) => (
                      <TableRow key={data.id}>
                        <TableCell className="font-medium px-4 py-2 border border-gray-300">
                          {data.id}
                        </TableCell>
                        <TableCell className="font-medium px-4 py-2 border border-gray-300">
                          {data.name}
                        </TableCell>
                        <TableCell className="font-medium px-4 py-2 border border-gray-300">
                          {data.slug}
                        </TableCell>
                        <TableCell className="space-x-2 border border-gray-300 px-4 py-2">
                          <Link
                            href={`/admin/categories/edit-category/${data.id}`}
                            className="inline-block text-white rounded-lg shadow-lg px-4 py-2 bg-blue-500 hover:bg-blue-700"
                          >
                            Edit
                          </Link>

                          <button
                            className="inline-block text-white rounded-lg shadow-lg px-4 py-2 bg-red-500 hover:bg-red-700"
                            onClick={() => deleteCategories(data.id)}
                          >
                            Delete
                          </button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                {/* Paginations */}
                <div className="flex justify-center items-center mt-6 space-x-2">
                  <button
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={paginations.current_page === 1}
                    onClick={() =>
                      fetchCategories(paginations.current_page - 1)
                    }
                  >
                    Previous
                  </button>
                  <span className="text-sm text-gray-600">
                    Pages {paginations.current_page} from{" "}
                    {paginations.last_page}
                  </span>
                  <button
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={
                      paginations.current_page === paginations.last_page
                    }
                    onClick={() =>
                      fetchCategories(paginations.current_page + 1)
                    }
                  >
                    Next
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
