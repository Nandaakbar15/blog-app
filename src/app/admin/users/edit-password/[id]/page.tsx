import NavBarAdmin from "@/components/NavbarAdmin";
import Sidebar from "@/components/Sidebar";

export default function ResetPasswordUserPages() {
  return (
    <div className="flex h-screen bg-white">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <NavBarAdmin />
        <div className="ml-64 overflow-y-auto p-6 mt-7">
          <h1 className="text-2xl font-bold">Reset Password user</h1>
        </div>
      </div>
    </div>
  );
}
