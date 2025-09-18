
import React from 'react';
import { XIcon, BrainCircuitIcon } from './icons';

interface AnalysisModalProps {
    onClose: () => void;
    analysis: string;
    isLoading: boolean;
}

const AnalysisModal: React.FC<AnalysisModalProps> = ({ onClose, analysis, isLoading }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-4" onClick={onClose}>
            <div className="bg-gray-800 rounded-xl shadow-lg w-full max-w-3xl h-[90vh] flex flex-col border border-gray-700" onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-center p-4 border-b border-gray-700">
                    <div className="flex items-center gap-3">
                        <BrainCircuitIcon className="w-7 h-7 text-indigo-400"/>
                        <h2 className="text-xl font-bold text-white">تحلیل هوشمند ژورنال</h2>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-white">
                        <XIcon className="w-6 h-6" />
                    </button>
                </div>
                <div className="p-6 overflow-y-auto flex-grow">
                    {isLoading ? (
                        <div className="flex flex-col items-center justify-center h-full">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-400"></div>
                            <p className="mt-4 text-gray-300">در حال تحلیل معاملات شما... این فرآیند ممکن است چند لحظه طول بکشد.</p>
                        </div>
                    ) : (
                        // FIX: Cast style object to React.CSSProperties to allow CSS custom properties.
                        <div className="prose prose-invert max-w-none text-gray-200" style={{'--tw-prose-bullets': '#818cf8'} as React.CSSProperties}>
                            {analysis.split('\n').map((line, index) => {
                                if (line.startsWith('**') && line.endsWith('**')) {
                                    return <h3 key={index} className="text-lg font-semibold text-indigo-300 mt-4">{line.replace(/\*\*/g, '')}</h3>
                                }
                                if (line.startsWith('* ')) {
                                    return <li key={index} className="ml-4">{line.substring(2)}</li>
                                }
                                return <p key={index}>{line}</p>
                            })}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AnalysisModal;
