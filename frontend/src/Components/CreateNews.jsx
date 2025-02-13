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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        setFormData((prev) => ({ ...prev, files: Array.from(e.target.files) }));
    };

    const handleQuillChange = (value, field) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e) => {
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
    };

    return (
        <div>
            <h1>{t('createNews')}</h1>
            <form onSubmit={handleSubmit}>
                <label>{t('title')} (English)</label>
                <input type="text" name="title_en" value={formData.title_en} onChange={handleChange} placeholder={t('enterTitle')} required />

                <label>{t('content')} (English)</label>
                <ReactQuill
                    name="content_en"
                    value={formData.content_en}
                    onChange={(value) => handleQuillChange(value, 'content_en')}
                    placeholder={t('enterContent')}
                    required
                />

                <label>{t('title')} (German)</label>
                <input type="text" name="title_de" value={formData.title_de} onChange={handleChange} placeholder={t('enterTitle')} required />

                <label>{t('content')} (German)</label>
                <ReactQuill
                    name="content_de"
                    value={formData.content_de}
                    onChange={(value) => handleQuillChange(value, 'content_de')}
                    placeholder={t('enterContent')}
                    required
                />

                <label>{t('uploadFiles')}</label>
                <input ref={fileInputRef} type="file" multiple onChange={handleFileChange} />
                {formData.files.length > 0 && (
                    <ul>
                        {formData.files.map((file, index) => (
                            <li key={index}>{file.name}</li>
                        ))}
                    </ul>
                )}

                <label>{t('createdAt')}</label>
                <input type="datetime-local" name="createdAt" value={formData.createdAt} onChange={handleChange} />

                <button type="submit" disabled={loading}>{loading ? t('creating') : t('create')}</button>
            </form>
        </div>
    );
};

export default CreateNewsForm;
