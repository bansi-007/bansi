'use client';

import { useState } from 'react';

interface PostBodyProps {
    original: React.ReactNode;
    english?: React.ReactNode;
}

const PostBody = ({ original, english }: PostBodyProps) => {
    const [showEnglish, setShowEnglish] = useState(false);

    return (
        <>
            {english && (
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1.75rem' }}>
                    <button
                        type="button"
                        onClick={() => setShowEnglish((v) => !v)}
                        className="translate-btn"
                    >
                        {showEnglish ? 'తెలుగులో చదవండి' : 'Translate to English'}
                    </button>
                </div>
            )}
            <div className="prose">
                {showEnglish && english ? english : original}
            </div>
        </>
    );
};

export default PostBody;
