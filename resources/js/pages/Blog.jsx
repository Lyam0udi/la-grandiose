import React, { useState, useEffect, Suspense } from 'react';
import { I18nextProvider } from 'react-i18next';
import { BrowserRouter as Router } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaSearch, FaTimes } from 'react-icons/fa'; // Add search and close icons

import i18n from '../i18n';
import axios from 'axios';

const Navbar = React.lazy(() => import('../components/Navbar'));
const Footer = React.lazy(() => import('../components/Footer'));

const Blog = () => {
  const { t } = useTranslation();
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('isDarkMode');
    return savedTheme ? JSON.parse(savedTheme) : false;
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedDateFilter, setSelectedDateFilter] = useState('');
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'fr';
    if (savedLanguage !== i18n.language) {
      i18n.changeLanguage(savedLanguage);
    }
  }, []);

  const handleLanguageChange = (language) => {
    localStorage.setItem('language', language);
    i18n.changeLanguage(language);
  };

  useEffect(() => {
    localStorage.setItem('isDarkMode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/blogs');
        const formattedBlogs = response.data.blogs.data.map((blog) => {
          const translation = blog.translations.find(t => t.locale === i18n.language) || {};
          const categoryTranslation = blog.category.translations.find(t => t.locale === i18n.language) || {};

          return {
            id: blog.id,
            title: translation.title || 'No Title',
            content: translation.content || 'No Content',
            slug: blog.slug,
            image_url: blog.image ? `/storage/${blog.image}` : null,
            category: {
              name: categoryTranslation.name || 'No Category',
            },
            created_at: blog.created_at,
          };
        });

        setBlogs(formattedBlogs);
      } catch (error) {
        console.error('Error fetching blogs:', error);
        setBlogs([]);
      }
    };

    fetchData();
  }, [i18n.language]);

  const applyDateFilter = (blogs) => {
    const now = new Date();
    return blogs.filter((post) => {
      const postDate = new Date(post.created_at);
      switch (selectedDateFilter) {
        case '24h':
          return now - postDate <= 24 * 60 * 60 * 1000;
        case 'week':
          return now - postDate <= 7 * 24 * 60 * 60 * 1000;
        case 'month':
          return now - postDate <= 30 * 24 * 60 * 60 * 1000;
        case 'year':
          return now - postDate <= 365 * 24 * 60 * 60 * 1000;
        default:
          return true;
      }
    });
  };

  const filteredPosts = applyDateFilter(
    blogs.filter((post) => {
      return (
        (post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.content.toLowerCase().includes(searchQuery.toLowerCase())) &&
        (selectedCategory ? post.category.name === selectedCategory : true)
      );
    })
  );

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const currentPosts = filteredPosts.slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage);

  const handleSearchChange = (e) => setSearchQuery(e.target.value);
  const handleCategoryChange = (e) => setSelectedCategory(e.target.value);
  const handleDateFilterChange = (e) => setSelectedDateFilter(e.target.value);
  const handlePageChange = (pageNum) => setCurrentPage(pageNum);
  const clearSearch = () => setSearchQuery('');

  return (
    <I18nextProvider i18n={i18n}>
      <Router>
        <div className={`flex flex-col min-h-screen ${isDarkMode ? 'bg-darkBackground text-darkText' : 'bg-lightBackground text-lightText'}`}>
          <Navbar
            isDarkMode={isDarkMode}
            setIsDarkMode={setIsDarkMode}
            language={i18n.language}
            setLanguage={handleLanguageChange}
          />

          <section className="py-16 mt-10">
            <div className="container mx-auto px-6 sm:px-12">
              {/* Search & Filters */}
              <div className="mb-8 flex gap-4 items-center">
                <div className="relative flex items-center w-full sm:w-1/2 space-x-2">
                  {/* Search Icon as Placeholder */}
                  <input
                    type="text"
                    placeholder={searchQuery === '' ? `${t('search_posts')}` : ''}
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className={`w-full pl-10 pr-10 p-3 border rounded-md text-lg ${isDarkMode ? 'bg-gray-800 text-gray-200' : 'bg-white text-gray-900'} focus:ring focus:ring-blue-500`}
                  />
                  {/* Search Icon shown only when input is empty */}
                  {searchQuery === '' && (
                    <FaSearch className="absolute left-3 text-gray-500" />
                  )}
                  {/* Clear Button */}
                  {searchQuery && (
                    <FaTimes
                      className="absolute right-3 cursor-pointer text-gray-500"
                      onClick={clearSearch}
                    />
                  )}
                </div>

                {/* Category Dropdown */}
                <select
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                  className={`p-3 border rounded-md text-lg w-1/4 ${isDarkMode ? 'bg-gray-800 text-gray-200' : 'bg-white text-gray-900'} focus:ring focus:ring-blue-500`}
                >
                  <option value="">{t('all_categories')}</option>
                  {blogs
                    .map((post) => post.category.name)
                    .filter((value, index, self) => self.indexOf(value) === index)
                    .map((category, index) => (
                      <option key={index} value={category}>
                        {category}
                      </option>
                    ))}
                </select>

                {/* Date Filter Dropdown */}
                <select
                  value={selectedDateFilter}
                  onChange={handleDateFilterChange}
                  className={`p-3 border rounded-md text-lg w-1/4 ${isDarkMode ? 'bg-gray-800 text-gray-200' : 'bg-white text-gray-900'} focus:ring focus:ring-blue-500`}
                >
                  <option value="">{t('all_dates')}</option>
                  <option value="24h">{t('last_24_hours')}</option>
                  <option value="week">{t('last_week')}</option>
                  <option value="month">{t('last_month')}</option>
                  <option value="year">{t('last_year')}</option>
                </select>
              </div>

              {/* Blog Cards */}
              <div className="space-y-8">
                {currentPosts.map((post) => (
                  <div
                    key={post.id}
                    className={`p-6 rounded-lg shadow-lg flex flex-col sm:flex-row gap-6 transition-transform duration-300 hover:scale-105 ${isDarkMode ? 'bg-gray-900 text-gray-200' : 'bg-white text-gray-900'}`}
                  >
                    {post.image_url && (
                      <div className="flex-shrink-0 w-full sm:w-1/3 h-64 overflow-hidden rounded-lg">
                        <img
                          src={post.image_url}
                          alt={post.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="flex-grow">
                      <div className="flex justify-between text-sm text-gray-500 mb-2">
                        <span>{post.category.name}</span>
                        <span>{new Date(post.created_at).toLocaleDateString()}</span>
                      </div>
                      <h3 className="text-3xl font-bold mb-4">{post.title}</h3>
                      <p className="text-lg mb-4 line-clamp-4">{post.content}</p>
                      <a href={`/blog/${post.slug}`} className="text-blue-500 hover:underline">
                        {t('read_more')}
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <div className="mt-12 flex justify-center space-x-4">
                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handlePageChange(index + 1)}
                    className={`px-4 py-2 text-lg rounded-md ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-blue-500'}`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            </div>
          </section>

          <Suspense fallback={<div>Loading...</div>}>
            <Footer isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
          </Suspense>
        </div>
      </Router>
    </I18nextProvider>
  );
};

export default Blog;
