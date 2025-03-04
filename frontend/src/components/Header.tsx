"use client";
import { Search } from "lucide-react";

const Header = () => {
  return (
    <header className="w-full p-4 bg-gray flex justify-between items-center">
      <h1 className="text-xl font-bold">📈 Биржевой монитор</h1>
      <div className="relative">
        <input
          type="text"
          placeholder="🔍 Поиск акций..."
          className="bg-gray-800 text-white p-2 pl-10 rounded-md w-72 focus:outline-none"
        />
        <Search className="absolute left-3 top-2 text-gray-400" />
      </div>
    </header>
  );
};

export default Header;
