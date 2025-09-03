import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
    User,
    Calendar,
    Clock,
    X,
    Share2,
    Bookmark,
    Heart,
    MessageCircle
} from 'lucide-react';

const BlogDetail = ({ selectedPost, onClose, t, formatDate, isRTL, categories }) => {
    if (!selectedPost) return null;

    const direction = isRTL ? 'rtl' : 'ltr';
    const textAlign = isRTL ? 'text-right' : 'text-left';
    const flexDirection = isRTL ? 'flex-row-reverse' : 'flex-row';

    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 z-50 overflow-y-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                dir={direction}
            >
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose}></div>

                <motion.div
                    className="relative max-w-4xl mx-auto my-8 bg-white dark:bg-[#031A3D] rounded-xl shadow-2xl overflow-hidden"
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 50, opacity: 0 }}
                    transition={{ type: "spring", damping: 25 }}
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="relative h-64 md:h-80">
                        <img
                            src={selectedPost.image}
                            alt={selectedPost.title}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#031A3D] to-transparent"></div>

                        <div className={`absolute top-4 ${isRTL ? 'left-4' : 'right-4'}`}>
                            <button
                                onClick={onClose}
                                className="w-10 h-10 rounded-full bg-white dark:bg-[#055BA4] flex items-center justify-center text-[#031A3D] dark:text-white hover:bg-gray-100 dark:hover:bg-[#41ADE8] transition-colors cursor-pointer"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <div className={`absolute bottom-0 left-0 right-0 p-6 ${textAlign}`}>
                            <div className="flex flex-wrap gap-2 mb-3">
                                <span className={`px-3 py-1 text-sm font-medium rounded-full bg-[#055BA4] text-white`}>
                                    {categories[selectedPost.category]}
                                </span>
                                {selectedPost.tags.map((tag, index) => (
                                    <span
                                        key={index}
                                        className="px-3 py-1 bg-[#41ADE8]/20 text-white rounded-full text-xs font-medium"
                                    >
                                        #{tag}
                                    </span>
                                ))}
                            </div>

                            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                                {selectedPost.title}
                            </h2>

                            <div className={`flex flex-wrap items-center gap-4 text-gray-200`}>
                                <div className="flex items-center gap-2">
                                    <User size={16} />
                                    <span>{selectedPost.author}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Calendar size={16} />
                                    <span>{formatDate(selectedPost.date)}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock size={16} />
                                    <span>{selectedPost.readTime} {t('blog.readTimeSuffix')}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 md:p-8">
                        <div
                            className="prose prose-slate dark:prose-invert max-w-none"
                            dangerouslySetInnerHTML={{ __html: selectedPost.content }}
                            dir={direction}
                        ></div>

                        {/*<div className="mt-8 pt-6 border-t border-gray-200 dark:border-[#055BA4]">
                            <h3 className={`text-lg font-semibold text-[#031A3D] dark:text-white mb-4 ${textAlign}`}>
                                {t('blog.shareArticle')}
                            </h3>
                            <div className={`flex gap-3`}>
                                <Button variant="outline" className="flex items-center gap-2 border-[#055BA4] text-[#055BA4] hover:bg-[#055BA4] hover:text-white">
                                    <Share2 size={16} /> {t('blog.share')}
                                </Button>
                                <Button variant="outline" className="flex items-center gap-2 border-[#055BA4] text-[#055BA4] hover:bg-[#055BA4] hover:text-white">
                                    <Bookmark size={16} /> {t('blog.save')}
                                </Button>
                                <Button variant="outline" className="flex items-center gap-2 border-[#055BA4] text-[#055BA4] hover:bg-[#055BA4] hover:text-white">
                                    <Heart size={16} /> {t('blog.like')}
                                </Button>
                            </div>
                        </div>*/}
                    </div>

                    {/* Footer */}
                    <div className="bg-gray-50 dark:bg-[#055BA4]/30 p-6">
                        <div className={`flex justify-between`}>
                            <Button 
                                variant="ghost" 
                                onClick={onClose} 
                                className="cursor-pointer text-[#055BA4] hover:text-[#41ADE8] dark:text-white dark:hover:text-gray-200"
                            >
                                {t('blog.close')}
                            </Button>
                            <Button 
                                className="flex items-center gap-2 cursor-pointer bg-gradient-to-r from-[#055BA4] to-[#41ADE8] hover:from-[#054A85] hover:to-[#2E8BC0] text-white"
                            >
                                <Share2 size={16} /> {t('blog.share')}
                            </Button>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default BlogDetail;