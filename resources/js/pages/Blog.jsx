import React, { useState, useEffect, Suspense } from 'react';
import { I18nextProvider } from 'react-i18next';
import { BrowserRouter as Router } from 'react-router-dom';
import i18n from '../i18n';

// Lazy-load Navbar and Footer
const Navbar = React.lazy(() => import(/* webpackChunkName: "navbar" */ '../components/Navbar'));
const Footer = React.lazy(() => import('../components/Footer'));

const Blog = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('isDarkMode');
    return savedTheme ? JSON.parse(savedTheme) : false;
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState(['Tech', 'Lifestyle', 'Education', 'News']);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;

  // Save dark mode setting to localStorage
  useEffect(() => {
    localStorage.setItem('isDarkMode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  // Fetching blog posts (simulating with static data)
  useEffect(() => {
    const fetchedPosts = [
      { id: 1, title: 'Tech in 2025', category: 'Tech', summary: 'Exploring the future of technology in 2025...', content: 'Full post content here...', imageUrl: '/images/tech.jpg' },
      { id: 2, title: 'Healthy Living', category: 'Lifestyle', summary: 'Tips for maintaining a healthy lifestyle...', content: 'Full post content here...', imageUrl: '/images/healthy_living.jpg' },
      { id: 3, title: 'AI and Education', category: 'Education', summary: 'How AI is transforming education...', content: 'Full post content here...', imageUrl: '/images/ai_education.jpg' },
      { id: 4, title: 'Global News Update', category: 'News', summary: 'Breaking global news...', content: 'Full post content here...', imageUrl: '/images/news_update.jpg' },
      { id: 5, title: 'Coding Best Practices', category: 'Tech', summary: 'A deep dive into coding best practices...', content: 'Full post content here...', imageUrl: '/images/coding_practice.jpg' },
      { id: 6, title: 'Mindfulness for Beginners', category: 'Lifestyle', summary: 'A guide to mindfulness for newcomers...', content: 'Full post content here...', imageUrl: '/images/mindfulness.jpg' },
      { id: 7, title: 'The Future of Work', category: 'Tech', summary: 'How the workplace is evolving...', content: 'Full post content here...', imageUrl: '/images/future_work.jpg' },
    ];
    setPosts(fetchedPosts);
  }, []);

  // Filtered posts based on search query and category
  const filteredPosts = posts.filter(post => {
    return (
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedCategory ? post.category === selectedCategory : true)
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
            setLanguage={i18n.changeLanguage}
          />

          <section className={`py-16 mt-10 ${isDarkMode ? 'bg-darkBackground text-darkText' : 'bg-lightBackground text-lightText'}`}>
            <div className="container mx-auto px-6 sm:px-12">

              {/* Search Bar */}
              <div className="mb-8 flex justify-between items-center">
                <input
                  type="text"
                  placeholder="Search posts..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="w-full sm:w-1/2 p-3 border rounded-md text-lg"
                />
                <select
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                  className="ml-4 p-3 border rounded-md text-lg"
                >
                  <option value="">All Categories</option>
                  {categories.map((category, index) => (
                    <option key={index} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              {/* Blog Posts List */}
              <div className="space-y-8">
                {currentPosts.map(post => (
                  <div key={post.id} className="flex flex-col sm:flex-row bg-lightCard p-6 rounded-lg shadow-md">
                    <img src={post.imageUrl} alt={post.title} className="w-full sm:w-1/4 h-48 object-cover rounded-lg mb-6 sm:mb-0 sm:mr-6" />
                    <div className="flex-1">
                      <h3 className="text-2xl font-semibold mb-4">{post.title}</h3>
                      <p className="text-lg mb-4">{post.summary}</p>
                      <button className="text-primaryBlue">Read more...</button>
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
