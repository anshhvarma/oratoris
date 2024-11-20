'use client'
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, Search, X } from 'lucide-react';
import Logo from '@/assests/OratoriesLogo.png'

const Navigation = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchActive, setIsSearchActive] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const toggleSearch = () => setIsSearchActive(!isSearchActive);

    const navLinks = [
        { href: '/', label: 'Home' },
        { href: '/about', label: 'About' },
        { href: '/services', label: 'Services' },
        { href: '/profile', label: 'Profile' }
    ];

    return (
        <nav className="fixed top-0 left-0 w-full bg-white/90 backdrop-blur-md shadow-sm z-50">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link 
                        href="/" 
                        className="flex items-center space-x-3"
                        aria-label="Home"
                    >
                        <Image
                            src={Logo}
                            alt="Oratories Logo"
                            width={120}
                            height={40}
                            className="object-contain"
                        />
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center space-x-6">
                        {navLinks.map((link) => (
                            <Link 
                                key={link.href} 
                                href={link.href}
                                className="text-gray-700 hover:text-yellow-600 transition-colors duration-300 font-medium"
                            >
                                {link.label}
                            </Link>
                        ))}
                        
                        <button 
                            onClick={toggleSearch} 
                            className="text-gray-600 hover:text-blue-600 transition-colors"
                        >
                            <Search size={20} />
                        </button>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <div className="lg:hidden">
                        <button 
                            onClick={toggleMenu} 
                            className="text-gray-700 hover:text-blue-600 transition-colors"
                            aria-label="Toggle menu"
                        >
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu Dropdown */}
                {isMenuOpen && (
                    <div className="lg:hidden absolute top-16 left-0 w-full bg-white shadow-lg">
                        <div className="px-4 pt-2 pb-4 space-y-2">
                            {navLinks.map((link) => (
                                <Link 
                                    key={link.href} 
                                    href={link.href}
                                    className="block py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                                    onClick={toggleMenu}
                                >
                                    {link.label}
                                </Link>
                            ))}
                            <button 
                                onClick={toggleSearch} 
                                className="flex items-center w-full py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                            >
                                <Search size={20} className="mr-2" /> Search
                            </button>
                        </div>
                    </div>
                )}

                {/* Search Overlay */}
                {isSearchActive && (
                    <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center">
                        <div className="bg-white w-11/12 max-w-2xl rounded-xl shadow-2xl p-6">
                            <div className="flex items-center border-b pb-3 mb-4">
                                <Search size={20} className="text-gray-500 mr-3" />
                                <input 
                                    type="text" 
                                    placeholder="Search..." 
                                    className="w-full text-lg outline-none"
                                />
                                <button 
                                    onClick={toggleSearch} 
                                    className="text-gray-600 hover:text-red-500"
                                >
                                    <X size={24} />
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navigation;