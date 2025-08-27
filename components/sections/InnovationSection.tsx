import React, { useState } from 'react';
import Card from '../ui/Card';
import { GoogleGenAI } from '@google/genai';

const InnovationSection: React.FC = () => {
    const [topic, setTopic] = useState('quantum computing');
    const [generatedContent, setGeneratedContent] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const fetchInnovationInfo = async () => {
        if (!process.env.API_KEY) {
            setError("API key is not set. Please configure it in your environment variables.");
            return;
        }
        setIsLoading(true);
        setError('');
        setGeneratedContent('');
        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const prompt = `Explain the impact of ${topic} on the future of algorithms in a concise and exciting way for a beginner. Focus on 1-2 key ideas.`;
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: prompt,
            });
            setGeneratedContent(response.text);
        } catch (e) {
            console.error(e);
            setError('Failed to fetch information. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <h1 className="text-4xl font-black text-slate-800 mb-2">Future of Algorithms</h1>
            <p className="text-lg text-slate-600 mb-6">Explore cutting-edge topics that are shaping the next generation of algorithmic thinking, powered by AI.</p>
            
            <Card>
                <div className="flex flex-col sm:flex-row gap-4 mb-4">
                    <select
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        className="w-full sm:w-auto flex-grow p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:outline-none"
                    >
                        <option value="quantum computing">Quantum Computing</option>
                        <option value="AI and machine learning algorithms">AI & Machine Learning</option>
                        <option value="DNA computing">DNA Computing</option>
                        <option value="neuromorphic computing">Neuromorphic Computing</option>
                    </select>
                    <button
                        onClick={fetchInnovationInfo}
                        disabled={isLoading}
                        className="bg-purple-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-purple-700 transition-colors disabled:bg-slate-400"
                    >
                        {isLoading ? 'Generating...' : 'Explore Topic'}
                    </button>
                </div>
                
                {error && <p className="text-red-500 bg-red-100 p-3 rounded-lg">{error}</p>}
                
                {isLoading && (
                    <div className="text-center p-8">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
                        <p className="mt-4 text-slate-600">Thinking...</p>
                    </div>
                )}

                {generatedContent && (
                    <div className="prose max-w-none mt-4 p-4 bg-slate-50 rounded-lg">
                        <h2 className="text-2xl font-bold text-purple-700 capitalize">{topic}</h2>
                        {generatedContent.split('\n').map((paragraph, index) => (
                            <p key={index}>{paragraph}</p>
                        ))}
                    </div>
                )}

                {!generatedContent && !isLoading && (
                     <div className="text-center p-8 bg-slate-50 rounded-lg">
                        <p className="text-slate-500">Select a topic and click "Explore Topic" to learn about it with Gemini.</p>
                    </div>
                )}
            </Card>
        </div>
    );
};

export default InnovationSection;
