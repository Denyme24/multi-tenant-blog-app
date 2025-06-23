"use client";
import { UserButton, OrganizationSwitcher } from "@clerk/nextjs";
import * as React from "react";

const Navbar: React.FC = () => {
  return (
    <>
      <nav className="bg-white/10 backdrop-blur-md border-b border-white/20 sticky top-0 z-50 shadow-lg shadow-black/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-gray-900 tracking-tight drop-shadow-sm">
                Blog Application
              </h1>
            </div>
            <div className="flex items-center justify-center gap-4">
              <OrganizationSwitcher afterSelectOrganizationUrl={"/org/:slug"} />
              <UserButton />
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
