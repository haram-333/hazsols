"use client";
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface GooeyCanvasProps {
    imageSrc: string;
}

export default function GooeyCanvas({ imageSrc }: GooeyCanvasProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const container = containerRef.current;
        const scene = new THREE.Scene();
        
        // Orthographic camera for 2D plane rendering
        const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.appendChild(renderer.domElement);

        const loader = new THREE.TextureLoader();
        const texture = loader.load(imageSrc);

        const uniforms = {
            uTime: { value: 0 },
            uMouse: { value: new THREE.Vector2(0.5, 0.5) },
            uTexture: { value: texture },
            uResolution: { value: new THREE.Vector2(container.clientWidth, container.clientHeight) },
            uHoverState: { value: 0.0 }
        };

        const vertexShader = `
            varying vec2 vUv;
            void main() {
                vUv = uv;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `;

        const fragmentShader = `
            uniform float uTime;
            uniform vec2 uMouse;
            uniform sampler2D uTexture;
            uniform vec2 uResolution;
            uniform float uHoverState;
            varying vec2 vUv;

            // Simplex 2D noise (Ashima Arts)
            vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
            float snoise(vec2 v){
              const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                       -0.577350269189626, 0.024390243902439);
              vec2 i  = floor(v + dot(v, C.yy) );
              vec2 x0 = v -   i + dot(i, C.xx);
              vec2 i1;
              i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
              vec4 x12 = x0.xyxy + C.xxzz;
              x12.xy -= i1;
              i = mod(i, 289.0);
              vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
                + i.x + vec3(0.0, i1.x, 1.0 ));
              vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
                dot(x12.zw,x12.zw)), 0.0);
              m = m*m ;
              m = m*m ;
              vec3 x = 2.0 * fract(p * C.www) - 1.0;
              vec3 h = abs(x) - 0.5;
              vec3 ox = floor(x + 0.5);
              vec3 a0 = x - ox;
              m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
              vec3 g;
              g.x  = a0.x  * x0.x  + h.x  * x0.y;
              g.yz = a0.yz * x12.xz + h.yz * x12.yw;
              return 130.0 * dot(m, g);
            }

            void main() {
                // Background cover logic for texture
                // We use vUv but we scale it by aspect ratio if needed,
                // but since our plane matches the container, we don't strictly need it for texture lookup,
                // but we might want it if the texture stretches.
                vec2 uv = vUv;
                
                // Calculate correct aspect ratio to keep mouse radius perfectly circular
                vec2 aspect = vec2(uResolution.x/uResolution.y, 1.0);
                float dist = distance(uv * aspect, uMouse * aspect);
                
                // Only distort if close to mouse and hovered. Radius of 0.3
                float hoverMask = smoothstep(0.3, 0.0, dist) * uHoverState;
                
                // High frequency flowing noise
                float noise = snoise(vec2(uv.x * 10.0 + uTime * 0.8, uv.y * 10.0 - uTime * 0.8));
                
                // Apply distortion mapping
                vec2 distortedUv = uv + (noise * 0.05 * hoverMask);
                
                vec4 texColor = texture2D(uTexture, distortedUv);
                
                // Slightly darken the texture to prevent mix-blend-screen from washing it out to white,
                // while keeping it extremely vibrant.
                texColor.rgb *= 0.85;
                
                gl_FragColor = texColor;
            }
        `;

        const material = new THREE.ShaderMaterial({
            vertexShader,
            fragmentShader,
            uniforms
        });

        const geometry = new THREE.PlaneGeometry(2.1, 2.1);
        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);

        let animationFrameId: number;
        const clock = new THREE.Clock();

        let targetHover = 0;
        let targetMouse = new THREE.Vector2(0.5, 0.5);

        const onMouseMove = (e: MouseEvent) => {
            const rect = container.getBoundingClientRect();
            targetMouse.x = (e.clientX - rect.left) / rect.width;
            targetMouse.y = 1.0 - ((e.clientY - rect.top) / rect.height);
        };

        const onMouseEnter = () => { targetHover = 1.0; };
        const onMouseLeave = () => { targetHover = 0.0; };

        container.addEventListener('mousemove', onMouseMove);
        container.addEventListener('mouseenter', onMouseEnter);
        container.addEventListener('mouseleave', onMouseLeave);

        const animate = () => {
            animationFrameId = requestAnimationFrame(animate);
            
            // Smoothly interpolate hover state and mouse pos for buttery smooth entry/exit
            uniforms.uTime.value = clock.getElapsedTime();
            uniforms.uHoverState.value += (targetHover - uniforms.uHoverState.value) * 0.1;
            uniforms.uMouse.value.lerp(targetMouse, 0.15);
            
            renderer.render(scene, camera);
        };
        animate();

        const handleResize = () => {
            renderer.setSize(container.clientWidth, container.clientHeight);
            uniforms.uResolution.value.set(container.clientWidth, container.clientHeight);
        };
        window.addEventListener('resize', handleResize);

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', handleResize);
            container.removeEventListener('mousemove', onMouseMove);
            container.removeEventListener('mouseenter', onMouseEnter);
            container.removeEventListener('mouseleave', onMouseLeave);
            if (container.contains(renderer.domElement)) {
                container.removeChild(renderer.domElement);
            }
            geometry.dispose();
            material.dispose();
            texture.dispose();
            renderer.dispose();
        };
    }, [imageSrc]);

    return <div ref={containerRef} className="w-full h-full pointer-events-auto" />;
}
