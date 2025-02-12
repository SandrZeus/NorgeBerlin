import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const CreateNewsForm = ({ refreshPosts }) => {
    const { t, i18n } = useTranslation();
    const [title_en, setTitleEn] = useState('');
    const [content_en, setContentEn] = useState('');
    const [title_de, setTitleDe] = useState('');
    const [content_de, setContentDe] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            title_en,
            content_en,
            title_de,
            content_de,
        };

        try {
            const response = await fetch('http://localhost:5000/api/news', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                alert('News post created successfully!');
                setTitleEn('');
                setContentEn('');
                setTitleDe('');
                setContentDe('');
                refreshPosts(); // Refresh posts after creation
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
                {/* English fields */}
                <label>{t('title')} (English)</label>
                <input 
                    type="text" 
                    value={title_en} 
                    onChange={(e) => setTitleEn(e.target.value)} 
                    required 
                />
                <label>{t('content')} (English)</label>
                <textarea 
                    value={content_en} 
                    onChange={(e) => setContentEn(e.target.value)} 
                    required 
                />

                {/* German fields */}
                <label>{t('title')} (German)</label>
                <input 
                    type="text" 
                    value={title_de} 
                    onChange={(e) => setTitleDe(e.target.value)} 
                    required 
                />
                <label>{t('content')} (German)</label>
                <textarea 
                    value={content_de} 
                    onChange={(e) => setContentDe(e.target.value)} 
                    required 
                />

                <button type="submit">{t('create')}</button>
            </form>
        </div>
    );
};

export default CreateNewsForm;
