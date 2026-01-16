import { useState, useEffect, useRef } from 'react';

const rgbToHsl = (r, g, b) => {
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
        h = s = 0;
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
            case g: h = ((b - r) / d + 2) / 6; break;
            case b: h = ((r - g) / d + 4) / 6; break;
            default: h = 0;
        }
    }

    return {
        h: Math.round(h * 360),
        s: Math.round(s * 100),
        l: Math.round(l * 100)
    };
};

const getColorString = (r, g, b, format) => {
    if (format === 'hex') {
        return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
    } else if (format === 'rgb') {
        return `rgb(${r}, ${g}, ${b})`;
    } else if (format === 'hsl') {
        const hsl = rgbToHsl(r, g, b);
        return `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
    }
    return '';
};

const RandomColor = () => {
    const [r, setR] = useState(52);
    const [g, setG] = useState(152);
    const [b, setB] = useState(219);
    const [colorFormat, setColorFormat] = useState('hex');
    const [colorString, setColorString] = useState('#3498db');
    const colorBoxRef = useRef(null);

    useEffect(() => {
        const newColorString = getColorString(r, g, b, colorFormat);
        setColorString(newColorString);
    }, [r, g, b, colorFormat]);

    const getContrastColor = () => {
        const brightness = (r * 299 + g * 587 + b * 114) / 1000;
        return brightness > 128 ? '#000000' : '#ffffff';
    };

    const handleColorClick = () => {
        const newR = Math.floor(Math.random() * 256);
        const newG = Math.floor(Math.random() * 256);
        const newB = Math.floor(Math.random() * 256);
        
        setR(newR);
        setG(newG);
        setB(newB);
        
        const newColorStr = getColorString(newR, newG, newB, colorFormat);
        if (navigator.clipboard?.writeText) {
            navigator.clipboard.writeText(newColorStr).catch(() => {});
        }
    };

    const handleFormatClick = (format) => {
        setColorFormat(format);
        const newColorStr = getColorString(r, g, b, format);
        if (navigator.clipboard?.writeText) {
            navigator.clipboard.writeText(newColorStr).catch(() => {});
        }
    };

    useEffect(() => {
        const bgColor = `rgb(${r}, ${g}, ${b})`;
        if (colorBoxRef.current) {
            colorBoxRef.current.style.setProperty('background-color', bgColor, 'important');
        }
    }, [r, g, b]);

    return (
        <div className="flex-1 flex flex-col justify-center items-center p-1 space-y-1 xl:p-4 xl:space-y-4">
            <div 
                ref={colorBoxRef}
                className="w-full max-w-xs h-48 rounded-lg border-4 border-gray-300 shadow-lg cursor-pointer hover:scale-105"
                style={{ backgroundColor: `rgb(${r}, ${g}, ${b})` }}
                onClick={handleColorClick}
            >
                <div 
                    className="w-full h-full flex items-center justify-center rounded"
                    style={{ color: getContrastColor() }}
                >
                    <div className="text-center">
                        <div className="text-2xl font-bold mb-2">{colorString}</div>
                        <div className="text-sm opacity-90">Click for new color</div>
                    </div>
                </div>
            </div>

            <div className="flex gap-2 w-full max-w-xs">
                {['hex', 'rgb', 'hsl'].map((format) => (
                    <button
                        key={format}
                        onClick={() => handleFormatClick(format)}
                        className={`flex-1 py-2 px-4 rounded font-medium text-sm transition-colors ${
                            colorFormat === format
                                ? 'bg-indigo-600 text-white'
                                : 'bg-white text-gray-700 hover:bg-indigo-100'
                        }`}
                    >
                        {format.toUpperCase()}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default RandomColor;
