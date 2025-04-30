import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ContentManagement = () => {
    const [contentType, setContentType] = useState('pages');
    const [contentItems, setContentItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [editorContent, setEditorContent] = useState('');

    useEffect(() => {
        fetchContent();
    }, [contentType]);

    const fetchContent = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`/api/admin/content/${contentType}`);
            setContentItems(response.data);
            setLoading(false);
        } catch (error) {
            console.error(`Error fetching ${contentType}:`, error);
            setLoading(false);
        }
    };

    const handleAddNew = () => {
        let newItem = {};

        if (contentType === 'pages') {
            newItem = {
                title: '',
                slug: '',
                content: '',
                metaTitle: '',
                metaDescription: '',
                status: 'draft'
            };
        } else if (contentType === 'blog') {
            newItem = {
                title: '',
                slug: '',
                content: '',
                excerpt: '',
                author: '',
                categories: [],
                tags: [],
                featuredImage: '',
                status: 'draft'
            };
        } else if (contentType === 'faq') {
            newItem = {
                question: '',
                answer: '',
                category: '',
                order: 0
            };
        }

        setCurrentItem(newItem);
        setEditorContent(newItem.content || '');
        setIsModalOpen(true);
    };

    const handleEditItem = (item) => {
        setCurrentItem(item);
        setEditorContent(item.content || item.answer || '');
        setIsModalOpen(true);
    };

    const handleDeleteItem = async (id) => {
        if (window.confirm('Are you sure you want to delete this item?')) {
            try {
                await axios.delete(`/api/admin/content/${contentType}/${id}`);
                // Remove the item from the state
                setContentItems(contentItems.filter(item => item._id !== id));
            } catch (error) {
                console.error(`Error deleting ${contentType}:`, error);
            }
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCurrentItem({
            ...currentItem,
            [name]: value
        });
    };

    const handleEditorChange = (content) => {
        setEditorContent(content);

        if (contentType === 'faq') {
            setCurrentItem({
                ...currentItem,
                answer: content
            });
        } else {
            setCurrentItem({
                ...currentItem,
                content
            });
        }
    };

    const handleTagsChange = (e) => {
        const tags = e.target.value.split(',').map(tag => tag.trim());
        setCurrentItem({
            ...currentItem,
            tags
        });
    };

    const handleCategoriesChange = (e) => {
        const categories = e.target.value.split(',').map(category => category.trim());
        setCurrentItem({
            ...currentItem,
            categories
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            let response;

            if (currentItem._id) {
                // Update existing item
                response = await axios.put(`/api/admin/content/${contentType}/${currentItem._id}`, currentItem);

                // Update the item in the state
                setContentItems(contentItems.map(item =>
                    item._id === currentItem._id ? response.data : item
                ));
            } else {
                // Create new item
                response = await axios.post(`/api/admin/content/${contentType}`, currentItem);

                // Add the new item to the state
                setContentItems([...contentItems, response.data]);
            }

            setIsModalOpen(false);
            setCurrentItem(null);
            setEditorContent('');
        } catch (error) {
            console.error(`Error saving ${contentType}:`, error);
        }
    };

    const filteredItems = contentItems.filter(item => {
        if (contentType === 'pages' || contentType === 'blog') {
            return (
                item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.slug.toLowerCase().includes(searchTerm.toLowerCase())
            );
        } else if (contentType === 'faq') {
            return (
                item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.category.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        return true;
    });

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Content Management</h1>

            {/* Content Type Tabs */}
            <div className="mb-6 border-b border-gray-200">
                <ul className="flex flex-wrap -mb-px">
                    <li className="mr-2">
                        <button
                            className={`inline-block p-4 rounded-t-lg ${
                                contentType === 'pages'
                                    ? 'text-blue-600 border-b-2 border-blue-600'
                                    : 'text-gray-500 hover:text-gray-600 hover:border-gray-300'
                            }`}
                            onClick={() => setContentType('pages')}
                        >
                            Pages
                        </button>
                    </li>
                    <li className="mr-2">
                        <button
                            className={`inline-block p-4 rounded-t-lg ${
                                contentType === 'blog'
                                    ? 'text-blue-600 border-b-2 border-blue-600'
                                    : 'text-gray-500 hover:text-gray-600 hover:border-gray-300'
                            }`}
                            onClick={() => setContentType('blog')}
                        >
                            Blog Posts
                        </button>
                    </li>
                    <li>
                        <button
                            className={`inline-block p-4 rounded-t-lg ${
                                contentType === 'faq'
                                    ? 'text-blue-600 border-b-2 border-blue-600'
                                    : 'text-gray-500 hover:text-gray-600 hover:border-gray-300'
                            }`}
                            onClick={() => setContentType('faq')}
                        >
                            FAQs
                        </button>
                    </li>
                </ul>
            </div>

            {/* Search and Add New Button */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                <div className="w-full md:w-1/3 mb-4 md:mb-0">
                    <input
                        type="text"
                        placeholder={`Search ${contentType}...`}
                        className="w-full px-4 py-2 border rounded-lg"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <button
                    onClick={handleAddNew}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Add New {contentType === 'pages' ? 'Page' : contentType === 'blog' ? 'Blog Post' : 'FAQ'}
                </button>
            </div>

            {/* Content Items Table */}
            {loading ? (
                <div className="flex justify-center items-center h-64">Loading content...</div>
            ) : (
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                        <tr>
                            {contentType === 'pages' || contentType === 'blog' ? (
                                <>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Title
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Slug
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Last Updated
                                    </th>
                                </>
                            ) : (
                                <>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Question
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Category
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Order
                                    </th>
                                </>
                            )}
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                        {filteredItems.length > 0 ? (
                            filteredItems.map((item) => (
                                <tr key={item._id}>
                                    {contentType === 'pages' || contentType === 'blog' ? (
                                        <>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="font-medium text-gray-900">{item.title}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {item.slug}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                          <span
                              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                  item.status === 'published'
                                      ? 'bg-green-100 text-green-800'
                                      : 'bg-yellow-100 text-yellow-800'
                              }`}
                          >
                            {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                          </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {new Date(item.updatedAt).toLocaleDateString()}
                                            </td>
                                        </>
                                    ) : (
                                        <>
                                            <td className="px-6 py-4">
                                                <div className="font-medium text-gray-900">{item.question}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {item.category}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {item.order}
                                            </td>
                                        </>
                                    )}
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button
                                            onClick={() => handleEditItem(item)}
                                            className="text-blue-600 hover:text-blue-900 mr-4"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDeleteItem(item._id)}
                                            className="text-red-600 hover:text-red-900"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan={contentType === 'faq' ? 4 : 5}
                                    className="px-6 py-4 text-center text-gray-500"
                                >
                                    No {contentType} found
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Add/Edit Modal */}
            {isModalOpen && currentItem && (
                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center">
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
                        <div className="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:max-w-2xl sm:w-full">
                            <form onSubmit={handleSubmit}>
                                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                                        {currentItem._id ? 'Edit' : 'Add New'} {contentType === 'pages' ? 'Page' : contentType === 'blog' ? 'Blog Post' : 'FAQ'}
                                    </h3>

                                    {/* Pages and Blog Form Fields */}
                                    {(contentType === 'pages' || contentType === 'blog') && (
                                        <>
                                            <div className="mb-4">
                                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                                    Title
                                                </label>
                                                <input
                                                    type="text"
                                                    name="title"
                                                    value={currentItem.title}
                                                    onChange={handleInputChange}
                                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                    required
                                                />
                                            </div>
                                            <div className="mb-4">
                                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                                    Slug (URL)
                                                </label>
                                                <input
                                                    type="text"
                                                    name="slug"
                                                    value={currentItem.slug}
                                                    onChange={handleInputChange}
                                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                    required
                                                />
                                            </div>
                                            <div className="mb-4">
                                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                                    Content
                                                </label>
                                                <textarea
                                                    name="content"
                                                    value={editorContent}
                                                    onChange={(e) => handleEditorChange(e.target.value)}
                                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                    rows="10"
                                                    required
                                                />
                                            </div>

                                            {/* Extra fields for Blog */}
                                            {contentType === 'blog' && (
                                                <>
                                                    <div className="mb-4">
                                                        <label className="block text-gray-700 text-sm font-bold mb-2">
                                                            Excerpt
                                                        </label>
                                                        <textarea
                                                            name="excerpt"
                                                            value={currentItem.excerpt}
                                                            onChange={handleInputChange}
                                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                            rows="3"
                                                        />
                                                    </div>
                                                    <div className="mb-4">
                                                        <label className="block text-gray-700 text-sm font-bold mb-2">
                                                            Author
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name="author"
                                                            value={currentItem.author}
                                                            onChange={handleInputChange}
                                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                        />
                                                    </div>
                                                    <div className="mb-4">
                                                        <label className="block text-gray-700 text-sm font-bold mb-2">
                                                            Categories (comma separated)
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name="categories"
                                                            value={currentItem.categories ? currentItem.categories.join(', ') : ''}
                                                            onChange={handleCategoriesChange}
                                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                        />
                                                    </div>
                                                    <div className="mb-4">
                                                        <label className="block text-gray-700 text-sm font-bold mb-2">
                                                            Tags (comma separated)
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name="tags"
                                                            value={currentItem.tags ? currentItem.tags.join(', ') : ''}
                                                            onChange={handleTagsChange}
                                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                        />
                                                    </div>
                                                    <div className="mb-4">
                                                        <label className="block text-gray-700 text-sm font-bold mb-2">
                                                            Featured Image URL
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name="featuredImage"
                                                            value={currentItem.featuredImage}
                                                            onChange={handleInputChange}
                                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                        />
                                                    </div>
                                                </>
                                            )}

                                            <div className="mb-4">
                                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                                    Status
                                                </label>
                                                <select
                                                    name="status"
                                                    value={currentItem.status}
                                                    onChange={handleInputChange}
                                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                >
                                                    <option value="draft">Draft</option>
                                                    <option value="published">Published</option>
                                                </select>
                                            </div>

                                            {contentType === 'pages' && (
                                                <>
                                                    <div className="mb-4">
                                                        <label className="block text-gray-700 text-sm font-bold mb-2">
                                                            Meta Title
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name="metaTitle"
                                                            value={currentItem.metaTitle}
                                                            onChange={handleInputChange}
                                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                        />
                                                    </div>
                                                    <div className="mb-4">
                                                        <label className="block text-gray-700 text-sm font-bold mb-2">
                                                            Meta Description
                                                        </label>
                                                        <textarea
                                                            name="metaDescription"
                                                            value={currentItem.metaDescription}
                                                            onChange={handleInputChange}
                                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                            rows="2"
                                                        />
                                                    </div>
                                                </>
                                            )}
                                        </>
                                    )}

                                    {/* FAQ Form Fields */}
                                    {contentType === 'faq' && (
                                        <>
                                            <div className="mb-4">
                                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                                    Question
                                                </label>
                                                <input
                                                    type="text"
                                                    name="question"
                                                    value={currentItem.question}
                                                    onChange={handleInputChange}
                                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                    required
                                                />
                                            </div>
                                            <div className="mb-4">
                                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                                    Answer
                                                </label>
                                                <textarea
                                                    name="answer"
                                                    value={editorContent}
                                                    onChange={(e) => handleEditorChange(e.target.value)}
                                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                    rows="6"
                                                    required
                                                />
                                            </div>
                                            <div className="mb-4">
                                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                                    Category
                                                </label>
                                                <input
                                                    type="text"
                                                    name="category"
                                                    value={currentItem.category}
                                                    onChange={handleInputChange}
                                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                />
                                            </div>
                                            <div className="mb-4">
                                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                                    Order
                                                </label>
                                                <input
                                                    type="number"
                                                    name="order"
                                                    value={currentItem.order}
                                                    onChange={handleInputChange}
                                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                    min="0"
                                                />
                                            </div>
                                        </>
                                    )}
                                </div>
                                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                    <button
                                        type="submit"
                                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                                    >
                                        {currentItem._id ? 'Update' : 'Create'}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setIsModalOpen(false);
                                            setCurrentItem(null);
                                            setEditorContent('');
                                        }}
                                        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ContentManagement;