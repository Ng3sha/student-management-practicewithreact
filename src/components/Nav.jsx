// import React from 'react'
import { FiSearch } from "react-icons/fi";

export default function Nav({search, setSearch}) {
    
  return (
    <div className="w-full bg-white">
        <header className="max-w-360 mx-auto h-20 border-b border-[#E9ECEF] flex items-center justify-between px-6 lg:px-10 z-50 sticky top-0 right-0 bg-white dark:bg-gray-900">
            <div className="flex items-center gap-4">
                <div>
                <div className="flex items-center gap-2 text-xs font-medium text-[#6C757D] dark:text-white mb-1">
                    <span>STUDENT MANAGEMENT SYSTEM</span>
                </div>
                </div>
            </div>
            {/* Search */}
            <div className="relative hidden md:block max-w-4xl">
                <FiSearch size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 "/>
                <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by title"
                className="w-2xl pl-10 pr-4 py-2.5 border border-[#E9ECEF] rounded-xl text-sm font-medium text-[#212529] placeholder-[#6C757D] focus:outline-none focus:border-[#808080] focus:ring-4 focus:ring-[#5412fc]/10 transition-all bg-white dark:bg-gray-900 dark:text-white"
                />
            </div>
            <div className="flex items-center gap-5 ">
                {/* Actions */}
                <div className="flex items-center gap-3 ">
                    <button
                        id="theme-toggle"
                        className="w-10 h-10 flex items-center justify-center rounded-xl border border-[#E9ECEF] text-[#495057] hover:border-[#5412fc] hover:text-[#5412fc] hover:bg-[#F8F9FA] transition-all relative "
                    >
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                        viewBox="0 0 512 512"
                        >
                        <path
                            fill="#808080"
                            fillRule="evenodd"
                            d="M277.333 405.333v85.333h-42.667v-85.333zm99.346-58.824l60.34 60.34l-30.17 30.17l-60.34-60.34zm-241.359 0l30.17 30.17l-60.34 60.34l-30.17-30.17zM256 139.353c64.422 0 116.647 52.224 116.647 116.647c0 64.422-52.225 116.647-116.647 116.647A116.427 116.427 0 0 1 139.352 256c0-64.423 52.225-116.647 116.648-116.647m0 42.666c-40.859 0-73.981 33.123-73.981 74.062a73.76 73.76 0 0 0 21.603 52.296c13.867 13.867 32.685 21.64 52.378 21.603zm234.666 52.647v42.667h-85.333v-42.667zm-384 0v42.667H21.333v-42.667zM105.15 74.98l60.34 60.34l-30.17 30.17l-60.34-60.34zm301.7 0l30.169 30.17l-60.34 60.34l-30.17-30.17zM277.332 21.333v85.333h-42.667V21.333z"
                        />
                        </svg>
                    </button>
                </div>
            </div>
        </header>
    </div>
  )
}
