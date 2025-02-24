"use client";
import React, { useState } from "react";
import { Calendar, ChevronRight, Plus, Menu, X } from "lucide-react";

type Profile = {
    name: string;
    notesCreated: number;
};

interface SidebarProps {
    profile: Profile | null;
    activeView: "notes" | "groups";
    setActiveView: (view: "notes" | "groups") => void;
    onCreateNote: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
    profile,
    activeView,
    setActiveView,
    onCreateNote,
}) => {
    const [isOpen, setIsOpen] = useState(false); // Closed by default on mobile

    return (
        <>
            {/* Mobile Menu Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                aria-label={isOpen ? "Close menu" : "Open menu"}
                className="lg:hidden fixed bottom-8 left-4 z-50 p-3 rounded-lg bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors duration-200"
            >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Sidebar Container */}
            <div
                className={`
                    fixed top-0 left-0 h-screen bg-white shadow-lg
                    transform transition-transform duration-300 ease-in-out
                    w-full sm:w-80 lg:w-64 max-w-[20rem]
                    ${isOpen ? "translate-x-0" : "-translate-x-full"}
                    lg:translate-x-0 z-40 overflow-y-auto
                `}
            >
                <div className="p-4 sm:p-6 mt-16 lg:mt-0 flex flex-col h-full">
                    <div className="mb-6 sm:mb-8">
                        <h1 className="font-bold text-xl sm:text-2xl text-gray-900 truncate">
                            {profile ? `${profile.name} Goggins` : "Loading profile..."}
                        </h1>
                    </div>

                    <div className="flex-1 space-y-4 sm:space-y-6">
                        <button
                            onClick={() => {
                                onCreateNote();
                                if (window.innerWidth < 1024) setIsOpen(false);
                            }}
                            className="w-full bg-blue-500 text-white rounded-lg p-3 
                                flex items-center justify-center gap-2 
                                hover:bg-blue-600 transition-all duration-300 
                                shadow-md hover:shadow-lg font-semibold 
                                focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                            <Plus size={20} />
                            <span>New Note</span>
                        </button>

                        <div className="space-y-2">
                            <button
                                onClick={() => {
                                    setActiveView("notes");
                                    if (window.innerWidth < 1024) setIsOpen(false);
                                }}
                                className={`w-full p-3 rounded-xl flex items-center gap-3 
                                    ${
                                        activeView === "notes"
                                            ? "bg-blue-100 text-blue-700 border-2 border-blue-400 shadow-inner shadow-blue-200/50"
                                            : "bg-white text-gray-700 border-2 border-blue-300 hover:bg-gray-50 hover:text-blue-600"
                                    } 
                                    transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-300`}
                            >
                                <Calendar size={20} />
                                <span>My Notes</span>
                            </button>

                            <button
                                onClick={() => {
                                    setActiveView("groups");
                                    if (window.innerWidth < 1024) setIsOpen(false);
                                }}
                                className={`w-full p-3 rounded-xl flex items-center gap-3 
                                    ${
                                        activeView === "groups"
                                            ? "bg-blue-100 text-blue-700 border-2 border-blue-400 shadow-inner shadow-blue-200/50"
                                            : "bg-white text-gray-700 border-2 border-blue-300 hover:bg-gray-50 hover:text-blue-600"
                                    } 
                                    transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-300`}
                            >
                                <ChevronRight size={20} />
                                <span>Group Notes</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Overlay for mobile */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
                    onClick={() => setIsOpen(false)}
                    aria-hidden="true"
                />
            )}
        </>
    );
};

export default Sidebar;