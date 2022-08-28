import { useEffect, useRef, useState } from "react";
import { classNames } from "utils";

interface CategoriesProps {
    categories: string[];
    onSelected?: (category: string) => void;
    defaultValue?: string;
}

export default function Categories({ categories, onSelected, defaultValue }: CategoriesProps) {

    const [active, setActive] = useState<string>(defaultValue || '');
    const [pressingFrom, setPressingFrom] = useState<number | null>(null);
    const [initialTranslateX, setInitialTranslateX] = useState<number>(0);

    const containerRef = useRef<HTMLDivElement>();
    const categoriesRef = useRef<HTMLDivElement>();

    useEffect(() => {
        if (active && onSelected) {
            onSelected(active);
        }
    }, [active]);

    const pressing = (e) => {
        const translatedX = Number(categoriesRef.current.style.transform.replace('translateX(', '').replace('px)', ''));
        setInitialTranslateX(translatedX);
        setPressingFrom(e.nativeEvent.layerX);
    };

    const release = () => {
        setPressingFrom(null);
        setInitialTranslateX(0);
    };

    // This function uses javascript to allow desktop users
    // to scroll with the mouse even with the scrollbar hidden.
    const scroll = (e) => {

        if (pressingFrom === null) return;

        const rangeWidth = categoriesRef.current.getBoundingClientRect().width;
        const containerWidth = containerRef.current.getBoundingClientRect().width;

        const pointer = e.nativeEvent.layerX;

        const diff = pointer - pressingFrom;
        const translateTo = initialTranslateX + diff;

        // Avoid scrolling out of bounds
        if (translateTo > 0) return
        if (translateTo < containerWidth - rangeWidth) return

        categoriesRef.current.style.transform = `translateX(${translateTo}px)`;
    }

    return (
        <div className="overflow-x-auto no-scrollbar flex" ref={containerRef} >
            <div className="mx-2 border-b border-gray-200 py-2 "
                onMouseUp={release}
                onMouseDown={pressing}
                onMouseMove={scroll}
                onMouseLeave={release}
                ref={categoriesRef}
                style={{
                    transform: 'translateX(0px)'
                }}
            >
                <ul
                    className='flex list-none lg:justify-start'
                >
                    {categories.map((category, index) => (
                        <li className='nav-item' key={index}>
                            <button
                                className={classNames(
                                    'block mx-4 py-1 text-gray-600 hover:text-teal border-b-2 border-transparent text-xs font-medium leading-tight',
                                    (active == category) ? 'border-teal-muted font-bold text-teal' : ''
                                )}
                                onClick={() => setActive(category)}>
                                {category}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}