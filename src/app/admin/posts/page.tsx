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

import type { Post } from "@/app/types/Post";

import axios from "axios";

import Image from "next/image";

export default function PostPages() {
  const [posts, setPosts] = useState<Post[]>([]);

  const [paginations, setPaginations] = useState({
    current_page: 1,
    last_page: 1,
  });

  const fetchPost = async (page: number = 1) => {
    try {
      const res = await axios.get(`/api/post?page=${page}`);

      setPosts(res.data.data);
      setPaginations({
        current_page: res.data.meta.page,
        last_page: res.data.meta.last_page,
      });
    } catch (error) {
      console.error("Error : ", error);
    }
  };

  useEffect(() => {
    fetchPost();
  }, []);

  return (
    <div className="flex h-screen bg-white">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <NavBarAdmin />
        <div className="ml-64 overflow-y-auto p-6 mt-7">
          <h1 className="text-2xl font-bold mb-3">Data Posts</h1>
          <h2>
            <Link
              className="inline-block rounded-lg px-4 py-2 bg-blue-500 text-white hover:bg-blue-700"
              href={"/admin/posts/add-posts"}
            >
              Tambah Post
            </Link>
          </h2>
          <div className="overflow-x-auto mt-5">
            <Card>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="px-4 py-2 font-medium text-[16px]">
                        Post ID
                      </TableHead>
                      <TableHead className="px-4 py-2 font-medium text-[16px]">
                        Thumbnail
                      </TableHead>
                      <TableHead className="px-4 py-2 font-medium text-[16px]">
                        Author Name
                      </TableHead>
                      <TableHead className="px-4 py-2 font-medium text-[16px]">
                        Title
                      </TableHead>
                      <TableHead className="px-4 py-2 font-medium text-[16px]">
                        Slug
                      </TableHead>
                      <TableHead className="px-4 py-2 font-medium text-[16px]">
                        Content
                      </TableHead>
                      <TableHead className="px-4 py-2 font-medium text-[16px]">
                        Status
                      </TableHead>
                      <TableHead className="px-4 py-2 font-medium text-[16px]">
                        Category
                      </TableHead>
                      <TableHead className="px-4 py-2 font-medium text-[16px]">
                        Action
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {posts.map((data) => (
                      <TableRow key={data.id}>
                        <TableCell className="font-medium px-4 py-2 border border-gray-300">
                          {data.id}
                        </TableCell>
                        <TableCell className="font-medium px-4 py-2 border border-gray-300">
                          <Image
                            src={
                              data.thumbnail
                                ? `/uploads/${data.thumbnail}`
                                : "/images/placeholder.jpg"
                            }
                            alt={data.title}
                            width={96}
                            height={96}
                          />
                        </TableCell>
                        <TableCell className="font-medium px-4 py-2 border border-gray-300">
                          {data.author?.name}
                        </TableCell>
                        <TableCell className="font-medium px-4 py-2 border border-gray-300">
                          {data.title}
                        </TableCell>
                        <TableCell className="font-medium px-4 py-2 border border-gray-300">
                          {data.slug}
                        </TableCell>
                        <TableCell className="font-medium px-4 py-2 border border-gray-300">
                          {data.content}
                        </TableCell>
                        <TableCell className="font-medium px-4 py-2 border border-gray-300">
                          {data.status}
                        </TableCell>
                        <TableCell className="font-medium px-4 py-2 border border-gray-300">
                          {data.category?.name}
                        </TableCell>
                        <TableCell className="space-x-2 border border-gray-300 px-4 py-2">
                          <Link
                            href={`/admin/posts/edit-posts/${data.id}`}
                            className="inline-block text-white rounded-lg shadow-lg px-4 py-2 bg-blue-500 hover:bg-blue-700"
                          >
                            Edit
                          </Link>

                          <button className="inline-block text-white rounded-lg shadow-lg px-4 py-2 bg-red-500 hover:bg-red-700">
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
                    onClick={() => fetchPost(paginations.current_page - 1)}
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
                    onClick={() => fetchPost(paginations.current_page + 1)}
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
