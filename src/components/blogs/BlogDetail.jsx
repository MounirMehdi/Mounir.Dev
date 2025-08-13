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
                    className="relative max-w-4xl mx-auto my-8 bg-white dark:bg-slate-900 rounded-xl shadow-2xl overflow-hidden"
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
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent"></div>

                        <div className={`absolute top-4 ${isRTL ? 'left-4' : 'right-4'}`}>
                            <button
                                onClick={onClose}
                                className="w-10 h-10 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center text-slate-800 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <div className={`absolute bottom-0 left-0 right-0 p-6 ${textAlign}`}>
                            <div className="flex flex-wrap gap-2 mb-3">
                                <span className={`px-3 py-1 text-sm font-medium rounded-full ${selectedPost?.color || 'bg-gray-500'} text-white`}>
                                    {categories[selectedPost.category]}
                                </span>
                                {selectedPost.tags.map((tag, index) => (
                                    <span
                                        key={index}
                                        className="px-3 py-1 bg-white/20 text-white rounded-full text-xs font-medium"
                                    >
                                        #{tag}
                                    </span>
                                ))}
                            </div>

                            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                                {selectedPost.title}
                            </h2>

                            <div className={`flex flex-wrap items-center gap-4 text-slate-200`}>
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

                        {/*<div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-700">
                            <h3 className={`text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4 ${textAlign}`}>
                                {t('blog.shareArticle')}
                            </h3>
                            <div className={`flex gap-3`}>
                                <Button variant="outline" className="flex items-center gap-2">
                                    <Share2 size={16} /> {t('blog.share')}
                                </Button>
                                Button variant="outline" className="flex items-center gap-2">
                                    <Bookmark size={16} /> {t('blog.save')}
                                </Button>
                                <Button variant="outline" className="flex items-center gap-2">
                                    <Heart size={16} /> {t('blog.like')}
                                </Button>
                            </div>
                        </div>*/}
                    </div>

                    {/* Footer */}
                    <div className="bg-slate-50 dark:bg-slate-800/50 p-6">
                        <div className={`flex justify-between`}>
                            <Button variant="ghost" onClick={onClose} className="cursor-pointer">
                                {t('blog.close')}
                            </Button>
                            <Button className="flex items-center gap-2 cursor-pointer">
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