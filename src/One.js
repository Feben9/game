import React, { useState, useEffect } from 'react';
import './styles.css';

export default function One() {
    const [isJumping, setIsJumping] = useState(false);
    const [currentPosition, setCurrentPosition] = useState(0);

    useEffect(() => {
        const box = document.querySelector('.dino');

        function updatePosition() {
            const computedStyle = window.getComputedStyle(box);
            const transformValue = computedStyle.getPropertyValue('transform');
            const matches = transformValue.match(/matrix\((.+), (.+), (.+), (.+), (.+), (.+)\)/);
            const x = parseFloat(matches[5]);
            setCurrentPosition(x);
        }

        function animate() {
            updatePosition();
            box.style.transform = `translateX(${currentPosition}px)`;
            requestAnimationFrame(animate);
        }

        animate();

        return () => cancelAnimationFrame(animate);
    }, [currentPosition]);

    const handleDinoClick = () => {
        setIsJumping(true);
        setTimeout(() => {
            setIsJumping(false);
        }, 500);
    };

    return (
        <div className={`wrapper ${isJumping ? 'jump' : ''}`} onClick={handleDinoClick}>
            <div className={`dino ${!isJumping ? 'slide' : ''}`}></div>
        </div>
    );
}
