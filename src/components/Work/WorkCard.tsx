import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { Component, onMount } from 'solid-js';
import { cursor } from '../Layout';
import Arrow from '../Icons/Arrow';
import { A, useHref, useNavigate } from '@solidjs/router';

type Props = {
    name: string;
    description: string;
    image: string;
    path: string;
};

const slideUp = (image: HTMLDivElement, container: HTMLDivElement) => {
    const timeline = gsap.timeline();

    timeline.set(image, {
        willChange: 'transform',
    });

    // timeline.fromTo(container, { y: '50%' }, { y: 0, ease: 'power3.out', duration: 0.5 });

    timeline.fromTo(
        image,
        { y: '50%' },
        {
            y: 0,
            // scale: 1,
            ease: 'power3.out',
            duration: 2,
        },
        0.2
    );

    timeline.set(image, {
        willChange: 'auto',
    });

    return timeline;
};

const WorkCard: Component<Props> = ({ name, image, description, path }) => {
    let imageRef!: HTMLImageElement;
    let imageContainer!: HTMLDivElement;
    let card!: HTMLDivElement;
    const naviagte = useNavigate();
    onMount(() => {
        ScrollTrigger.create({
            trigger: card,
            animation: slideUp(imageRef, imageContainer),
            start: 'top bottom',
        });
    });
    return (
        <div ref={card} class="work-card w-[33vmax] aspect-square flex flex-col justify-center items-start gap-4">
            <div
                onClick={() => {
                    naviagte(`/case/${path}`);
                    cursor?.removeText();
                }}
                ref={imageContainer}
                onMouseOver={() => cursor?.setText('Case Study')}
                onMouseLeave={() => cursor?.removeText()}
                class="overflow-hidden h-full w-full"
            >
                <img ref={imageRef} style={{ width: 'max(50vw, 400px)', 'aspect-ratio': '1 / 1' }} class="object-cover" src={image} alt="" />
            </div>
            <div class="flex justify-between items-center w-full">
                <span class="text-[2vmax]">{name}</span>
                <button
                    onClick={() => {
                        naviagte(`/case/${path}`);
                        cursor?.removeText();
                        cursor?.removeState('-pointer');
                    }}
                >
                    <Arrow />
                </button>
            </div>

            <span class="mt-4 text-[.6vmax]">{description}</span>
        </div>
    );
};

export default WorkCard;
