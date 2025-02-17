import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import ReactQuill from 'react-quill';  // Import Quill
import 'react-quill/dist/quill.snow.css';  // Import Quill styles

const CreateNewsForm = ({ refreshPosts }) => {
    const { t } = useTranslation();

    const [formData, setFormData] = useState({
        title_en: '',
        content_en: '',
        title_de: '',
        content_de: '',
        createdAt: '',
        files: []
    });

    const [loading, setLoading] = useState(false);
    const fileInputRef = useRef(null);

    // Handle file upload
    const handleFileChange = (e) => {
        const newFiles = Array.from(e.target.files);
        setFormData((prev) => ({
            ...prev,
            files: [...prev.files, ...newFiles],
        }));
    };

    // Handle drag start
    const handleDragStart = (index, e) => {
        e.dataTransfer.setData('draggedIndex', index);
    };

    // Handle drop for drag and drop
    const handleDrop = (e, dropIndex) => {
        const draggedIndex = e.dataTransfer.getData('draggedIndex');
        const draggedFile = formData.files[draggedIndex];
        const newFiles = [...formData.files];
        newFiles.splice(draggedIndex, 1);
        newFiles.splice(dropIndex, 0, draggedFile);

        setFormData((prev) => ({
            ...prev,
            files: newFiles,
        }));
    };

    // Handle file drag over (to allow drop)
    const handleDragOver = (e) => {
        e.preventDefault();
    };

    return (
        <div>
            <h2>{t('createNews')}</h2>
            <form
                onSubmit={async (e) => {
                    e.preventDefault();

                    if (!formData.title_en || !formData.content_en || !formData.title_de || !formData.content_de) {
                        alert(t('pleaseFillAllFields'));
                        return;
                    }

                    setLoading(true);
                    const submissionData = new FormData();

                    Object.entries(formData).forEach(([key, value]) => {
                        if (key === 'files') {
                            value.forEach((file) => submissionData.append('files', file));
                        } else {
                            submissionData.append(key, value);
                        }
                    });

                    try {
                        const response = await fetch('http://localhost:5000/api/news', {
                            method: 'POST',
                            body: submissionData,
                        });

                        if (response.ok) {
                            alert(t('newsCreatedSuccess'));
                            setFormData({ title_en: '', content_en: '', title_de: '', content_de: '', createdAt: '', files: [] });
                            if (fileInputRef.current) fileInputRef.current.value = '';
                            refreshPosts();
                        } else {
                            alert(t('errorCreatingNews'));
                        }
                    } catch (error) {
                        console.error('Error:', error);
                        alert(t('networkError'));
                    } finally {
                        setLoading(false);
                    }
                }}
            >
                <label>{t('title')} (English)</label>
                <input
                    type="text"
                    name="title_en"
                    value={formData.title_en}
                    onChange={(e) => setFormData((prev) => ({ ...prev, title_en: e.target.value }))}
                    placeholder={t('enterTitle')}
                    required
                />

                <label>{t('content')} (English)</label>
                <ReactQuill
                    name="content_en"
                    value={formData.content_en}
                    onChange={(value) => setFormData((prev) => ({ ...prev, content_en: value }))}
                    placeholder={t('enterContent')}
                    required
                />

                <label>{t('title')} (German)</label>
                <input
                    type="text"
                    name="title_de"
                    value={formData.title_de}
                    onChange={(e) => setFormData((prev) => ({ ...prev, title_de: e.target.value }))}
                    placeholder={t('enterTitle')}
                    required
                />

                <label>{t('content')} (German)</label>
                <ReactQuill
                    name="content_de"
                    value={formData.content_de}
                    onChange={(value) => setFormData((prev) => ({ ...prev, content_de: value }))}
                    placeholder={t('enterContent')}
                    required
                />

                <label>{t('uploadFiles')}</label>
                <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    onChange={handleFileChange}
                />
                {formData.files.length > 0 && (
                    <ul
                        style={{ listStyleType: 'none', paddingLeft: 0 }}
                    >
                        {formData.files.map((file, index) => (
                            <li
                                key={index}
                                draggable
                                onDragStart={(e) => handleDragStart(index, e)}
                                onDrop={(e) => handleDrop(e, index)}
                                onDragOver={handleDragOver}
                                style={{
                                    marginBottom: '10px',
                                    border: '1px solid #ccc',
                                    padding: '10px',
                                    cursor: 'move',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <span>{file.name}</span>
                                <span>
                                    <img
                                        src={URL.createObjectURL(file)}
                                        alt={file.name}
                                        style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                                    />
                                </span>
                            </li>
                        ))}
                    </ul>
                )}

                <label>{t('createdAt')}</label>
                <input
                    type="datetime-local"
                    name="createdAt"
                    value={formData.createdAt}
                    onChange={(e) => setFormData((prev) => ({ ...prev, createdAt: e.target.value }))}
                />

                <button type="submit" disabled={loading}>
                    {loading ? t('creating') : t('create')}
                </button>
            </form>
        </div>
    );
};

export default CreateNewsForm;
