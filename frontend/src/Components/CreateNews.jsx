import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';

const CreateNewsForm = () => {
    const { t } = useTranslation();
    const [title_en, setTitleEn] = useState('');
    const [content_en, setContentEn] = useState('');
    const [title_de, setTitleDe] = useState('');
    const [content_de, setContentDe] = useState('');
    const [files, setFiles] = useState([]);
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        setFiles(Array.from(e.target.files));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        formData.append('title_en', title_en);
        formData.append('content_en', content_en);
        formData.append('title_de', title_de);
        formData.append('content_de', content_de);

        files.forEach((file) => {
            formData.append('files', file);
        });

        try {
            const response = await fetch('http://localhost:5000/api/news', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                alert('News post created successfully!');
                setTitleEn('');
                setContentEn('');
                setTitleDe('');
                setContentDe('');
                setFiles([]);

                if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                }
            } else {
                alert('Error creating news post');
            }
        } catch (error) {
            console.error('Error creating news:', error);
        }
    };

    return (
        <div>
            <h1>{t('createNews')}</h1>
            <form onSubmit={handleSubmit}>
                <label>{t('title')} (English)</label>
                <input type="text" value={title_en} onChange={(e) => setTitleEn(e.target.value)} required />

                <label>{t('content')} (English)</label>
                <textarea value={content_en} onChange={(e) => setContentEn(e.target.value)} required />

                <label>{t('title')} (German)</label>
                <input type="text" value={title_de} onChange={(e) => setTitleDe(e.target.value)} required />

                <label>{t('content')} (German)</label>
                <textarea value={content_de} onChange={(e) => setContentDe(e.target.value)} required />

                <label>{t('uploadFiles')}</label>
                <input ref={fileInputRef} type="file" multiple onChange={handleFileChange} />

                <button type="submit">{t('create')}</button>
            </form>
        </div>
    );
};

export default CreateNewsForm;
