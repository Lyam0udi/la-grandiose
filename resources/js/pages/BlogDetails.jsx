import React, { useState, useEffect, Suspense } from 'react';  
import { usePage } from '@inertiajs/react'; 
import { Swiper, SwiperSlide } from 'swiper/react'; 
import { Navigation, Pagination } from 'swiper/modules'; 
import 'swiper/css'; 
import 'swiper/css/navigation'; 
import 'swiper/css/pagination'; 
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n';

const Navbar = React.lazy(() => import('../components/Navbar'));
const Footer = React.lazy(() => import('../components/Footer'));

const BlogDetails = () => {
  const { blog, allBlogs } = usePage().props; 
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('isDarkMode');
    return savedTheme ? JSON.parse(savedTheme) : false;
  });

  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    if (!blog) {
      console.error('Blog data is missing!');
      return;
    }
    setLoading(false); 
  }, [blog]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>; 
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
      <div
        className={`flex flex-col min-h-screen ${isDarkMode ? 'bg-darkBackground text-darkText' : 'bg-lightBackground text-lightText'}`}
      >
        <Navbar
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
          language={i18n.language}
          setLanguage={i18n.changeLanguage}
        />

        {/* Blog Details Section */}
        <section className="py-16 mt-10 relative">
          <div className="container mx-auto px-6 sm:px-12">
            <div className="space-y-8">
              <div
                className={`relative ${isDarkMode ? 'bg-darkSecondary text-darkText' : 'bg-lightSecondary text-lightText'} rounded-lg shadow-xl overflow-hidden`}
              >
                {formattedBlog.image_url && (
                  <div className="w-full h-auto overflow-hidden rounded-lg mb-8 relative">
                    <img
                      src={formattedBlog.image_url}
                      alt={formattedBlog.title}
                      className="w-full h-auto object-contain max-h-[500px] max-w-full"
                    />
                  </div>
                )}

                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent to-black opacity-40" />
                
                <div className="relative z-10 p-6">
                  <div className="text-center mb-4">
                    <span
                      className={`text-lg font-semibold ${isDarkMode ? 'text-accentYellow' : 'text-primaryBlue'}`}
                    >
                      {formattedBlog.category}
                    </span>
                    <h1 className="text-4xl font-extrabold mb-6">{formattedBlog.title}</h1>
                    <p className="text-xl mb-8 text-gray-600">{new Date(formattedBlog.created_at).toLocaleDateString()}</p>
                  </div>
                  
                  <div className="prose max-w-full mb-8">
                    <p>{formattedBlog.content}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Carousel Section */}
        <section className={`py-8 ${isDarkMode ? 'bg-darkSecondary' : 'bg-lightSecondary'}`}>
          <div className="container mx-auto px-6 sm:px-12">
            <h2 className="text-xl font-bold mb-6">Explore More Blogs</h2>
            <Swiper
              modules={[Navigation, Pagination]}
              navigation
              pagination={{ clickable: true }}
              spaceBetween={15}  // Reduced space between slides
              slidesPerView={2}  // Show 2 slides by default
              breakpoints={{
                640: {
                  slidesPerView: 3,  // Show 3 slides on medium screens
                },
                768: {
                  slidesPerView: 4,  // Show 4 slides on larger screens
                },
                1024: {
                  slidesPerView: 5,  // Show 5 slides on very large screens
                }
              }}
              loop={true}
              className={`carousel-container ${isDarkMode ? 'bg-darkBackground' : 'bg-lightBackground'}`}
            >
              {allBlogs.map((item, index) => {
                const itemTranslation = item.translations.find(t => t.locale === i18n.language) || {};
                return (
                  <SwiperSlide key={index} className="flex justify-center">
                    <div
                      className={`p-4 rounded-lg shadow-lg ${
                        isDarkMode ? 'bg-darkCard text-darkText' : 'bg-lightCard text-lightText'
                      } transition-transform duration-300 ease-in-out hover:scale-105`}
                    >
                      {item.image && (
                        <img
                          src={`/storage/${item.image}`}
                          alt={itemTranslation.title || 'Blog Image'}
                          className="rounded-lg mb-4 w-full h-28 object-cover"  // Reduced height for smaller images
                        />
                      )}
                      <h3 className="text-sm font-semibold mb-2 hover:text-accentYellow transition duration-200 ease-in-out">
                        <a href={`/blog/${item.slug}`}>{itemTranslation.title || 'No Title'}</a>
                      </h3>
                      <p className="text-xs text-gray-500">{new Date(item.created_at).toLocaleDateString()}</p>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
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
