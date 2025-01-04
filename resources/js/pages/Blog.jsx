import React, { useState, useEffect, Suspense } from 'react';
import { I18nextProvider } from 'react-i18next';
import { BrowserRouter as Router } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import i18n from '../i18n';
import axios from 'axios';

// Lazy-load Navbar and Footer
const Navbar = React.lazy(() => import(/* webpackChunkName: "navbar" */ '../components/Navbar'));
const Footer = React.lazy(() => import('../components/Footer'));

const Blog = () => {
  const { t } = useTranslation(); // Access translation hook directly
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('isDarkMode');
    return savedTheme ? JSON.parse(savedTheme) : false;
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;

  // Fetch language from localStorage or default to 'fr'
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'fr'; // Default to 'fr' if not found
    if (savedLanguage !== i18n.language) {
      i18n.changeLanguage(savedLanguage); // Change language if different from saved
    }
  }, []); // Run only on mount

  // Sync language changes to localStorage and i18n
  const handleLanguageChange = (language) => {
    localStorage.setItem('language', language); // Save language in localStorage
    i18n.changeLanguage(language); // Change language in i18n
  };

  // Save dark mode setting to localStorage
  useEffect(() => {
    localStorage.setItem('isDarkMode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  // Fetch blogs from the backend when language or page changes
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/blogs');
        console.log('API Response:', response.data);

        // Process the blog data based on the current language
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
        setBlogs([]); // Fallback to an empty array in case of an error
      }
    };

    fetchData();
  }, [i18n.language]); // Refetch blogs whenever the language changes

  // Filtered posts based on search query and category
  const filteredPosts = blogs.filter(post => {
    return (
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedCategory ? post.category.name === selectedCategory : true)
    );
  });

  // Paginate posts
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const currentPosts = filteredPosts.slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage);

  const handleSearchChange = (e) => setSearchQuery(e.target.value);
  const handleCategoryChange = (e) => setSelectedCategory(e.target.value);
  const handlePageChange = (pageNum) => setCurrentPage(pageNum);

  return (
    <I18nextProvider i18n={i18n}>
      <Router>
        <div className="flex flex-col min-h-screen">
          {/* Navbar */}
          <Navbar
            isDarkMode={isDarkMode}
            setIsDarkMode={setIsDarkMode}
            language={i18n.language}
            setLanguage={handleLanguageChange} // Pass language change handler to Navbar
          />

          <section className={`py-16 mt-10 ${isDarkMode ? 'bg-darkBackground text-darkText' : 'bg-lightBackground text-lightText'}`}>
            <div className="container mx-auto px-6 sm:px-12">
              {/* Search Bar */}
              <div className="mb-8 flex justify-between items-center">
                <input
                  type="text"
                  placeholder={t('search_posts')}  // Translated text
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="w-full sm:w-1/2 p-3 border rounded-md text-lg"
                />
                <select
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                  className="ml-4 p-3 border rounded-md text-lg"
                >
                  <option value="">{t('all_categories')}</option>
                  {blogs
                    .map(post => post.category.name)
                    .filter((value, index, self) => self.indexOf(value) === index)
                    .map((category, index) => (
                      <option key={index} value={category}>{category}</option>
                    ))}
                </select>
              </div>

              {/* Blog Posts List */}
              <div className="space-y-8">
                {currentPosts.map(post => (
                  <div key={post.id} className="flex flex-col sm:flex-row bg-lightCard p-6 rounded-lg shadow-md">
                    {post.image_url ? (
                      <img 
                        src={post.image_url} 
                        alt={post.title} 
                        className="w-full sm:w-1/4 h-48 object-cover rounded-lg mb-6 sm:mb-0 sm:mr-6" 
                      />
                    ) : (
                      <div className="w-full sm:w-1/4 h-48 bg-gray-300 rounded-lg mb-6 sm:mb-0 sm:mr-6 flex items-center justify-center">
                        <span className="text-gray-500">No Image</span>
                      </div>
                    )}
                    <div className="flex-1">
                      <h3 className="text-2xl font-semibold mb-4">{post.title}</h3>
                      <p className="text-lg mb-4">{post.content}</p>
                      <a href={`/blog/${post.slug}`} className="text-primaryBlue">{t('read_more')}</a>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <div className="mt-8 flex justify-center space-x-4">
                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handlePageChange(index + 1)}
                    className={`p-2 ${currentPage === index + 1 ? 'bg-primaryBlue text-white' : 'bg-lightCard text-primaryBlue'} rounded-md`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* Footer */}
          <Suspense fallback={<div>Loading...</div>}>
            <Footer isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
          </Suspense>
        </div>
      </Router>
    </I18nextProvider>
  );
};

export default Blog;
