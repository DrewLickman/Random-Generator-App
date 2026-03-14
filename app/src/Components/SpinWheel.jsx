import { useState, useRef } from 'react';
import spinningSound from "../Assets/Spinning.mp3";

const SpinWheel = () => {
    // Example items to show when textbox is empty
    const exampleItems = ['Item 1', 'Item 2', 'Item 3', 'Item 4'];

    // States
    const [isSpinning, setIsSpinning] = useState(false);
    const [rotation, setRotation] = useState(0);
    const [wheelItems, setWheelItems] = useState(
        exampleItems.map((label) => ({ label, weight: 1 }))
    );
    const [newLabel, setNewLabel] = useState('');
    const [newWeight, setNewWeight] = useState('1');
    const [selectedItem, setSelectedItem] = useState(null);
    const [pointerColor, setPointerColor] = useState('rgb(239, 68, 68)');
    const [labelDrafts, setLabelDrafts] = useState({});
    const labelTimersRef = useRef({});

    // Audio
    const spinAudio = useRef(new Audio(spinningSound));

    // Helper Functions
    const generateColors = (count) => {
        return Array(count).fill(0).map((_, i) =>
            `hsl(${(i * 360) / count}, 70%, 60%)`
        );
    };

    const normalizeWeight = (weight) => {
        const value = Number(weight);
        if (!Number.isFinite(value) || value <= 0) return 0;
        return value;
    };

    const activeItems = wheelItems
        .map((item, originalIndex) => ({
            ...item,
            originalIndex,
            normalizedWeight: normalizeWeight(item.weight)
        }))
        .filter((item) => item.normalizedWeight > 0);

    const colors = generateColors(activeItems.length || 1);

    const totalActiveWeight = activeItems.reduce(
        (sum, item) => sum + item.normalizedWeight,
        0
    );

    let cumulativeAngle = 0;
    const slices = totalActiveWeight > 0
        ? activeItems.map((item, index) => {
            const fraction = item.normalizedWeight / totalActiveWeight;
            const sliceAngle = fraction * 360;
            const startAngle = cumulativeAngle;
            const endAngle = cumulativeAngle + sliceAngle;
            cumulativeAngle = endAngle;

            return {
                item,
                startAngle,
                endAngle,
                color: colors[index]
            };
        })
        : [];

    const pickWeightedIndex = (items) => {
        if (!items.length) return -1;

        const totalWeight = items.reduce(
            (sum, item) => sum + item.normalizedWeight,
            0
        );
        if (totalWeight <= 0) return -1;

        const r = Math.random() * totalWeight;
        let acc = 0;

        for (let i = 0; i < items.length; i++) {
            acc += items[i].normalizedWeight;
            if (r < acc) {
                return i;
            }
        }

        return items.length - 1;
    };

    const handleSpin = () => {
        if (isSpinning || !slices.length) return;

        const winnerIndex = pickWeightedIndex(activeItems);
        if (winnerIndex === -1) return;

        const winnerSlice = slices[winnerIndex];
        const sliceCenter =
            (winnerSlice.startAngle + winnerSlice.endAngle) / 2;

        const baseSpins = 360 * 5;
        const pointerAngle = 270; // visual top of the SVG wheel
        const normalizedRotation =
            ((rotation % 360) + 360) % 360;
        const rotationTarget =
            ((pointerAngle - sliceCenter) % 360 + 360) % 360;
        const offset = rotationTarget - normalizedRotation;
        const finalRotation = rotation + baseSpins + offset;

        setIsSpinning(true);
        // Play sound
        spinAudio.current.currentTime = 0;
        spinAudio.current.play();

        setRotation(finalRotation);

        setTimeout(() => {
            if (!slices.length || winnerIndex === -1) {
                setIsSpinning(false);
                spinAudio.current.pause();
                spinAudio.current.currentTime = 0;
                return;
            }

            const { item, color } = slices[winnerIndex];

            setSelectedItem(item.label);
            setPointerColor(color);
            setIsSpinning(false);
            spinAudio.current.pause();
            spinAudio.current.currentTime = 0;
        }, 5000);
    };

    const handleAddItem = () => {
        const label = newLabel.trim();
        if (!label) return;

        const weightNumber = Number(newWeight);
        const weight =
            Number.isFinite(weightNumber) && weightNumber !== 0
                ? weightNumber
                : 1;

        setWheelItems((prev) => {
            const usingDefaults =
                prev.length === exampleItems.length &&
                prev.every(
                    (item, index) =>
                        item.label === exampleItems[index] &&
                        Number(item.weight) === 1
                );

            if (usingDefaults) {
                return [{ label, weight }];
            }

            return [...prev, { label, weight }];
        });
        setNewLabel('');
        setNewWeight('1');
    };

    const handleSubmitNewItem = (e) => {
        if (e) {
            e.preventDefault();
        }
        handleAddItem();
    };

    return (
        <div className="flex-1 flex flex-col justify-center items-center p-1 space-y-2 xl:p-4 xl:space-y-4">
            {/* Container */}
            <div className="relative w-64 h-64">

                {/* Triangle pointer */}
                <div className="absolute left-1/2 -translate-x-1/2 translate-y-4 z-30 rotate-180">
                    <div
                        style={{
                            width: 0,
                            height: 0,
                            borderStyle: 'solid',
                            borderWidth: '0 8px 12px 8px',
                            borderColor: `transparent transparent ${pointerColor} transparent`,
                        }}
                    />
                </div>

                {/* The Wheel */}
                <svg
                    viewBox="-50 -50 100 100"
                    className="w-full h-full transform"
                    style={{
                        transform: `rotate(${rotation}deg)`,
                        transition: `transform 5s cubic-bezier(0.2, 0.8, 0.2, 1)`
                    }}
                >
                    {slices.map(({ item, startAngle, endAngle, color }, i) => {
                        const toRad = (deg) => (deg * Math.PI) / 180;

                        const start = toRad(startAngle);
                        const end = toRad(endAngle);

                        const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;

                        // Calculate points for the sector
                        const x1 = 40 * Math.cos(start);
                        const y1 = 40 * Math.sin(start);
                        const x2 = 40 * Math.cos(end);
                        const y2 = 40 * Math.sin(end);

                        // Calculate text position
                        const textAngle = toRad(
                            (startAngle + endAngle) / 2
                        );
                        const textRadius = 25; // Slightly inside the sector
                        const textX = textRadius * Math.cos(textAngle);
                        const textY = textRadius * Math.sin(textAngle);

                        return (
                            <g key={item.label + i}>
                                <path
                                    d={`M 0 0 L ${x1} ${y1} A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2} Z`}
                                    fill={color}
                                    stroke="white"
                                    strokeWidth="0.5"
                                />
                                <text
                                    x={textX}
                                    y={textY}
                                    fontSize="8"
                                    textAnchor="middle"
                                    dominantBaseline="middle"
                                    fill="black"
                                    style={{ fontWeight: 'bold' }}
                                >
                                    {item.label}
                                </text>
                            </g>
                        );
                    })}
                </svg>

                {/* Center dot */}
                <div className="absolute top-1/2 left-1/2 w-4 h-4 -mt-2 -ml-2 bg-white rounded-full border-2 border-gray-300 z-10" />

            </div>

            <div className="w-full max-w-xs text-sm space-y-1">
                <div className="font-semibold">
                    Items & weights
                </div>
                <div className="flex gap-2 mt-1">
                    <input
                        type="text"
                        className="flex-1 px-2 py-1 border rounded text-sm"
                        placeholder="Label"
                        value={newLabel}
                        onChange={(e) => setNewLabel(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                handleSubmitNewItem(e);
                            }
                        }}
                    />
                    <input
                        type="number"
                        className="w-20 px-2 py-1 border rounded text-sm text-right"
                        value={newWeight}
                        onChange={(e) => {
                            const value = e.target.value;
                            const num = Number(value);
                            if (Number.isFinite(num) && num < 0) {
                                setNewWeight('0');
                            } else {
                                setNewWeight(value);
                            }
                        }}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                handleSubmitNewItem(e);
                            }
                        }}
                    />
                    <button
                        type="button"
                        onClick={handleAddItem}
                        className="px-3 py-1 text-sm font-semibold rounded border"
                    >
                        Add
                    </button>
                </div>
                <div className="max-h-40 overflow-y-auto space-y-1 mt-1">
                    {wheelItems.map((item, index) => {
                        const draftLabel =
                            labelDrafts[index] !== undefined
                                ? labelDrafts[index]
                                : item.label;

                        const commitLabel = (value) => {
                            setWheelItems((prev) =>
                                prev.map((it, i) =>
                                    i === index ? { ...it, label: value } : it
                                )
                            );
                            setLabelDrafts((prev) => {
                                const next = { ...prev };
                                delete next[index];
                                return next;
                            });
                            if (labelTimersRef.current[index]) {
                                clearTimeout(labelTimersRef.current[index]);
                                delete labelTimersRef.current[index];
                            }
                        };

                        const scheduleCommit = (value) => {
                            if (labelTimersRef.current[index]) {
                                clearTimeout(labelTimersRef.current[index]);
                            }
                            labelTimersRef.current[index] = setTimeout(() => {
                                commitLabel(value);
                            }, 3000);
                        };

                        return (
                        <div
                            key={item.label + index}
                            className="flex items-center gap-2"
                        >
                            <input
                                type="text"
                                className="flex-1 px-1 py-0.5 border rounded text-xs"
                                value={draftLabel}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    setLabelDrafts((prev) => ({
                                        ...prev,
                                        [index]: value,
                                    }));
                                    scheduleCommit(value);
                                }}
                                onBlur={(e) => {
                                    const value = e.target.value;
                                    commitLabel(value);
                                }}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault();
                                        const value = e.currentTarget.value;
                                        commitLabel(value);
                                    }
                                }}
                            />
                            <input
                                type="number"
                                className="w-16 px-1 py-0.5 border rounded text-right text-xs"
                                value={item.weight}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    const num = Number(value);
                                    setWheelItems((prev) =>
                                        prev.map((it, i) =>
                                            i === index
                                                ? {
                                                    ...it,
                                                    weight:
                                                        Number.isFinite(num) && num < 0
                                                            ? 0
                                                            : value,
                                                }
                                                : it
                                        )
                                    );
                                }}
                            />
                            <button
                                type="button"
                                className="px-2 py-0.5 text-xs border rounded"
                                onClick={() =>
                                    setWheelItems((prev) =>
                                        prev.filter((_, i) => i !== index)
                                    )
                                }
                            >
                                ✕
                            </button>
                        </div>
                        );
                    })}
                </div>
            </div>

            <button
                onClick={handleSpin}
                disabled={isSpinning || !slices.length}
                className="w-full max-w-xs bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded disabled:opacity-50 transition-colors"
            >
                {isSpinning ? 'Spinning...' : 'Spin'}
            </button>

            <div className="h-8 text-center">
                {selectedItem && (
                    <div className="font-semibold">Selected: {selectedItem}</div>
                )}
            </div>
        </div>
    );
};

export default SpinWheel;