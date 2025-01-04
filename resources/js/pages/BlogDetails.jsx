import React, { useState, useEffect, Suspense } from 'react';
import { usePage } from '@inertiajs/react';  // Inertia hook to access props
import axios from 'axios';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n';

const Navbar = React.lazy(() => import('../components/Navbar'));
const Footer = React.lazy(() => import('../components/Footer'));

const BlogDetails = () => {
  const { blog } = usePage().props;  // Access the full blog data passed from Laravel via Inertia
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('isDarkMode');
    return savedTheme ? JSON.parse(savedTheme) : false;
  });

  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    if (!blog) {
      console.error('Blog data is missing!');
      return;
    }
    setLoading(false); // Data is already available through Inertia, so no need to fetch again.
  }, [blog]);

  if (loading) {
    return <div>Loading...</div>; // Loading state until blog data is ready
  }

  const translation = blog.translations.find(t => t.locale === i18n.language) || {};
  const categoryTranslation = blog.category.translations.find(t => t.locale === i18n.language) || {};

  const formattedBlog = {
    title: translation.title || 'No Title Available',
    content: translation.content || 'No Content Available',
    image_url: blog.image ? `/storage/${blog.image}` : null,
    category: categoryTranslation.name || 'No Category',
    created_at: blog.created_at,
  };

  return (
    <I18nextProvider i18n={i18n}>
      <div className={`flex flex-col min-h-screen ${isDarkMode ? 'bg-darkBackground text-darkText' : 'bg-lightBackground text-lightText'}`}>
        <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} language={i18n.language} setLanguage={i18n.changeLanguage} />

        <section className="py-16 mt-10">
          <div className="container mx-auto px-6 sm:px-12">
            <div className="space-y-8">
              <div className={`p-6 rounded-lg shadow-lg ${isDarkMode ? 'bg-gray-900 text-gray-200' : 'bg-white text-gray-900'}`}>
                {formattedBlog.image_url && (
                  <div className="flex-shrink-0 w-full sm:w-1/3 h-64 overflow-hidden rounded-lg">
                    <img src={formattedBlog.image_url} alt={formattedBlog.title} className="w-full h-full object-cover" />
                  </div>
                )}
                <div className="flex-grow">
                  <div className="flex justify-between text-sm text-gray-500 mb-2">
                    <span>{formattedBlog.category}</span>
                    <span>{new Date(formattedBlog.created_at).toLocaleDateString()}</span>
                  </div>
                  <h3 className="text-3xl font-bold mb-4">{formattedBlog.title}</h3>
                  <p className="text-lg">{formattedBlog.content}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Suspense fallback={<div>Loading Footer...</div>}>
          <Footer isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
        </Suspense>
      </div>
    </I18nextProvider>
  );
};

export default BlogDetails;
