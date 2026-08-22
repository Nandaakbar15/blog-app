"use client";
import { User } from "@/app/types/User";
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
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function UsersDataPages() {
  const [users, setUsers] = useState<User[]>([]);

  const getUsers = async () => {
    try {
      const response = await axios.get("/api/user");

      setUsers(response.data.data);
    } catch (error) {
      console.error("Error : ", error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="flex h-screen bg-white">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <NavBarAdmin />
        <div className="ml-64 overflow-y-auto p-6 mt-7">
          <h1 className="font-bold text-2xl mb-3">Data User</h1>
          <h2>
            <Link
              href={"/admin/users/add-users"}
              className="inline-block bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-700"
            >
              Tambah User
            </Link>
          </h2>
          <div className="overflow-x-auto mt-5">
            <Card>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="px-4 py-2 font-medium">
                        Username
                      </TableHead>
                      <TableHead className="px-4 py-2 font-medium">
                        Email
                      </TableHead>
                      <TableHead className="px-4 py-2 font-medium">
                        Role
                      </TableHead>
                      <TableHead className="px-4 py-2 font-medium">
                        Aksi
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium px-4 py-2">
                          {user.name}
                        </TableCell>
                        <TableCell className="font-medium px-4 py-2">
                          {user.email}
                        </TableCell>
                        <TableCell className="font-medium px-4 py-2">
                          {user.role}
                        </TableCell>
                        <TableCell className="px-4 py-2">
                          <div className="flex items-center gap-2 space-x-2">
                            <Link
                              href={`/admin/users/edit-password/${user.id}`}
                              className="bg-blue-500 inline-block rounded-lg shadow-lg text-white px-4 py-2 hover:bg-blue-700"
                            >
                              Reset Password
                            </Link>
                            <button className="inline-block bg-red-500 px-4 py-2 text-white rounded-lg shadow-lg hover:bg-red-700">
                              Delete
                            </button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
