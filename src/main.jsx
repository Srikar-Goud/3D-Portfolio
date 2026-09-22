import React, { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { Sparkles } from '@react-three/drei';
import * as THREE from 'three';
import { ArrowDown, ArrowUpRight, BriefcaseBusiness, Code2, Download, ExternalLink, Github, GraduationCap, Linkedin, Mail, Trophy, X } from 'lucide-react';
import './styles.css';

const projects = [
  {
    number: '01',
    title: 'ShopMyUniform',
    subtitle: 'AI E-Commerce Platform',
    description: 'A full-stack uniform marketplace with school-based catalogs, cart, checkout, order tracking and a Gemini-powered customer-support agent connected to live MongoDB data.',
    stack: ['React', 'Node.js', 'Express', 'MongoDB', 'Gemini API'],
    accent: 'lime',
    href: 'https://shopmyuniform1.vercel.app/',
    github: 'https://github.com/Srikar-Goud/shopmyuniform',
    images: ['/projects/shopmyuniform-home.png','/projects/shopmyuniform-orders.png','/projects/shopmyuniform-products.png']
  },
  {
    number: '02',
    title: 'Applicant Tracking System',
    subtitle: 'AI Resume Intelligence',
    description: 'A React application using Puter.js for authentication and storage, AI-driven resume scoring against job descriptions, and Zustand for global state.',
    stack: ['React', 'Puter.js', 'Zustand', 'AI'],
    accent: 'violet',
    github: 'https://github.com/Srikar-Goud/ai-resume-analyzer',
    href: 'https://puter.com/app/jsm-ai-resume-analyzer-87',
    images: ['/projects/resume-analyzer-dashboard.png','/projects/resume-analyzer-loading.png']
  },
  {
    number: '03',
    title: 'Real-Time Chat',
    subtitle: 'Full-Stack Communication',
    description: 'A real-time messaging platform with online presence, Socket.IO communication, JWT authentication, bcrypt password hashing and indexed MongoDB message history.',
    stack: ['React', 'Node.js', 'Socket.IO', 'MongoDB'],
    accent: 'cyan',
    github: 'https://github.com/Srikar-Goud/Realtime-Chat',
    href: 'https://realtime-chat-1-izcu.onrender.com/',
    images: ['/projects/realtime-chat-login.png','/projects/realtime-chat-settings.png']
  },
  {
    number: '04',
    title: 'Fairway Forward',
    subtitle: 'Golf Membership & Charity Platform',
    description: 'A full-stack platform for golf memberships, monthly draws, cause discovery, contributions and an administrator control room. The current build includes member-facing flows and operational dashboards.',
    stack: ['React', 'Supabase', 'Vercel', 'Dashboard', 'Payments'],
    accent: 'gold',
    href: 'https://fairway-forward-nine.vercel.app/',
    github: 'https://github.com/Srikar-Goud/fairway-forward',
    images: ['/projects/fairway-home.png','/projects/fairway-dashboard.png','/projects/fairway-charities.png']
  }
];

const skills = ['JavaScript', 'React.js', 'Node.js', 'Express.js', 'MongoDB', 'MySQL', 'REST APIs', 'Git', 'GitHub', 'Three.js'];

const experience = [
  {
    period: 'JUN 2025 — OCT 2025',
    role: 'Frontend Web Developer Intern',
    company: 'Raise Digital · Hyderabad',
    description: 'Worked on front-end web development and completed a single-page website project during the program.',
    stack: ['HTML', 'CSS', 'JavaScript', 'Responsive UI']
  }
];

const education = {
  degree: 'B.Tech — Electronics & Communication Engineering',
  institution: 'CMR Institute of Technology · Hyderabad',
  period: 'CLASS OF 2026',
  grade: '8.49 / 10 CGPA'
};

const codingPlatforms = [
  { name: 'LeetCode', handle: '22R01A0449', href: 'https://leetcode.com/u/22R01A0449/', icon: Code2 },
  { name: 'GeeksforGeeks', handle: '22r01a0449', href: 'https://www.geeksforgeeks.org/profile/22r01a0449', icon: Code2 },
  { name: 'CodeChef', handle: 'srikargoud', href: 'https://www.codechef.com/users/srikargoud', icon: Trophy },
  { name: 'Take U Forward', handle: 'srikargoud', href: 'https://takeuforward.org/profile/srikargoud', icon: BriefcaseBusiness }
];

function ProjectGallery({ project }) {
  const images = project.images || [];
  if (!images.length) return null;
  return (
    <div className={`project-gallery project-gallery-${images.length}`} aria-hidden="true">
      {images.map((src, index) => (
        <div className={`project-shot project-shot-${index + 1}`} key={src}>
          <img src={src} alt="" loading="lazy" />
        </div>
      ))}
      <div className="gallery-glass">LIVE BUILD / {String(images.length).padStart(2, '0')} VIEWS</div>
    </div>
  );
}

const certificates = [
  { title: 'Exploratory Data Analysis — Gold Assessment', issuer: 'FutureSkills Prime / IT-ITeS SSC / NASSCOM', date: '05 Aug 2026', image: '/certificates/eda-gold-assessment.jpg', pdf: '/certificates/eda-gold-assessment.pdf', featured: true },
  { title: 'Postman API Fundamentals Student Expert', issuer: 'Postman', date: '04 Oct 2025', image: '/certificates/postman-api-fundamentals.jpg', pdf: '/certificates/postman-api-fundamentals.pdf', featured: true },
  { title: 'AI Foundation', issuer: 'Hexart.In / Li2 Edu', date: '11 Jul 2025', image: '/certificates/ai-foundation.jpg', pdf: '/certificates/ai-foundation.pdf', featured: true },
  { title: 'Explore Machine Learning using Python', issuer: 'Infosys / Springboard', date: '26 Jun 2025', image: '/certificates/infosys-machine-learning-python.jpg', pdf: '/certificates/infosys-machine-learning-python.pdf' },
  { title: 'Python 101 for Data Science', issuer: 'Cognitive Class / IBM Developer Skills Network', date: '07 Feb 2025', image: '/certificates/ibm-python-101.jpg', pdf: '/certificates/ibm-python-101.pdf' },
  { title: 'Data Science & Analytics', issuer: 'HP LIFE / HP Foundation', date: '16 Mar 2025', image: '/certificates/hp-data-science-analytics.jpg', pdf: '/certificates/hp-data-science-analytics.pdf' },
  { title: "MongoDB Developer's Toolkit", issuer: 'GeeksforGeeks / MongoDB', date: 'Date not shown', image: '/certificates/mongodb-developers-toolkit.jpg', pdf: '/certificates/mongodb-developers-toolkit.pdf' },
  { title: 'Ethical Hacking Virtual Internship', issuer: 'AICTE / EduSkills', date: 'Jan–Mar 2025', image: '/certificates/ethical-hacking-internship.jpg', pdf: '/certificates/ethical-hacking-internship.pdf' },
  { title: 'Ethical Hacking', issuer: 'EduSkills Academy', date: '11 Mar 2025', image: '/certificates/ethical-hacking-completion.jpg', pdf: '/certificates/ethical-hacking-completion.pdf' },
  { title: 'Web Development Front-End Project Completion', issuer: 'Raise Digital', date: '20 Aug 2024', image: '/certificates/raise-digital-web-development.jpg', pdf: '/certificates/raise-digital-web-development.pdf' },
  { title: 'Exploratory Data Analysis — Course Completion', issuer: 'FutureSkills Prime / IT-ITeS SSC / NASSCOM', date: '03 Aug 2026', image: '/certificates/eda-completion.jpg', pdf: '/certificates/eda-completion.pdf' },
  { title: "Space Brainiac: Kalam's Quiz — Participation", issuer: "Kalam's Institute of Youth Excellence", date: '07 Oct 2024', image: '/certificates/space-brainiac-kalams-quiz.jpg', pdf: '/certificates/space-brainiac-kalams-quiz.pdf' }
];

// The Earth demo you supplied uses this family of multi-layer Earth maps.
// They are served through jsDelivr from the referenced public repository so the portfolio
// doesn't need to ship ~10MB+ of raw texture files in its own bundle.
const EARTH_ASSETS = {
  day: 'https://cdn.jsdelivr.net/gh/bobbyroe/threejs-earth@update-2024/textures/earth-daymap-4k.jpg',
  night: 'https://cdn.jsdelivr.net/gh/bobbyroe/threejs-earth@update-2024/textures/earth-nightmap-4k.jpg',
  clouds: 'https://cdn.jsdelivr.net/gh/bobbyroe/threejs-earth@update-2024/textures/earth-clouds-4k.jpg',
  bump: 'https://cdn.jsdelivr.net/gh/bobbyroe/threejs-earth@update-2024/textures/earth-bump-4k.jpg',
  specular: 'https://cdn.jsdelivr.net/gh/bobbyroe/threejs-earth@update-2024/textures/earth-specular-4k.jpg'
};

function setTextureColorSpace(texture, colorSpace = THREE.SRGBColorSpace) {
  texture.colorSpace = colorSpace;
  texture.anisotropy = Math.min(8, texture.anisotropy || 8);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}

function Earth({ groupRef }) {
  const [day, night, clouds, bump, specular] = useLoader(THREE.TextureLoader, [
    EARTH_ASSETS.day,
    EARTH_ASSETS.night,
    EARTH_ASSETS.clouds,
    EARTH_ASSETS.bump,
    EARTH_ASSETS.specular
  ]);

  useMemo(() => {
    setTextureColorSpace(day);
    setTextureColorSpace(night);
    setTextureColorSpace(clouds);
    bump.colorSpace = THREE.NoColorSpace;
    specular.colorSpace = THREE.NoColorSpace;
    bump.anisotropy = 8;
    specular.anisotropy = 8;
  }, [day, night, clouds, bump, specular]);

  const material = useMemo(() => new THREE.ShaderMaterial({
    uniforms: {
      uDay: { value: day },
      uNight: { value: night },
      uClouds: { value: clouds },
      uBump: { value: bump },
      uSpecular: { value: specular },
      uSun: { value: new THREE.Vector3(-2.4, 0.7, 2.6).normalize() },
      uBumpStrength: { value: 0.065 },
      uTime: { value: 0 }
    },
    vertexShader: `
      uniform sampler2D uBump;
      uniform float uBumpStrength;
      varying vec2 vUv;
      varying vec3 vWorldNormal;
      varying vec3 vWorldPosition;

      void main() {
        vUv = uv;
        float elevation = texture2D(uBump, uv).r;
        vec3 displaced = position + normal * ((elevation - 0.5) * uBumpStrength);
        vec4 worldPosition = modelMatrix * vec4(displaced, 1.0);
        vWorldPosition = worldPosition.xyz;
        vWorldNormal = normalize(mat3(modelMatrix) * normal);
        gl_Position = projectionMatrix * viewMatrix * worldPosition;
      }
    `,
    fragmentShader: `
      uniform sampler2D uDay;
      uniform sampler2D uNight;
      uniform sampler2D uClouds;
      uniform sampler2D uSpecular;
      uniform vec3 uSun;
      uniform float uTime;
      varying vec2 vUv;
      varying vec3 vWorldNormal;
      varying vec3 vWorldPosition;

      void main() {
        vec3 normal = normalize(vWorldNormal);
        vec3 viewDirection = normalize(cameraPosition - vWorldPosition);
        float sunFacing = dot(normal, normalize(uSun));
        float dayMix = smoothstep(-0.15, 0.42, sunFacing);
        float twilight = smoothstep(-0.24, 0.08, sunFacing) * (1.0 - smoothstep(0.08, 0.45, sunFacing));

        vec3 dayColor = texture2D(uDay, vUv).rgb;
        vec3 nightColor = texture2D(uNight, vUv).rgb;
        vec3 specMap = texture2D(uSpecular, vUv).rgb;

        vec3 color = mix(nightColor * 0.78, dayColor, dayMix);
        color += vec3(0.14, 0.035, 0.008) * twilight * 1.35;

        float cloudMask = texture2D(uClouds, vUv + vec2(uTime * 0.0022, 0.0)).r;
        float cloudLight = smoothstep(0.24, 0.82, cloudMask) * dayMix;
        color = mix(color, vec3(1.0), cloudLight * 0.22);

        float fresnel = pow(1.0 - max(dot(normal, viewDirection), 0.0), 4.5);
        float oceanSpec = pow(max(dot(reflect(-normalize(uSun), normal), viewDirection), 0.0), 72.0) * specMap.r;
        color += oceanSpec * 0.32;
        color += fresnel * vec3(0.04, 0.16, 0.36);

        gl_FragColor = vec4(color, 1.0);
      }
    `,
    toneMapped: true
  }), [day, night, clouds, bump, specular]);

  const cloudMaterial = useMemo(() => new THREE.ShaderMaterial({
    uniforms: { uClouds: { value: clouds }, uTime: { value: 0 } },
    vertexShader: `
      varying vec2 vUv;
      varying vec3 vWorldPosition;
      void main() {
        vUv = uv;
        vec4 worldPosition = modelMatrix * vec4(position, 1.0);
        vWorldPosition = worldPosition.xyz;
        gl_Position = projectionMatrix * viewMatrix * worldPosition;
      }
    `,
    fragmentShader: `
      uniform sampler2D uClouds;
      uniform float uTime;
      varying vec2 vUv;
      varying vec3 vWorldPosition;
      void main() {
        vec3 viewDirection = normalize(cameraPosition - vWorldPosition);
        float fresnel = pow(1.0 - max(dot(viewDirection, normalize(vWorldPosition)), 0.0), 1.8);
        float cloudsA = texture2D(uClouds, vUv + vec2(uTime * 0.003, 0.0)).r;
        float alpha = smoothstep(0.42, 0.72, cloudsA) * (0.16 + fresnel * 0.32);
        gl_FragColor = vec4(vec3(0.94, 0.98, 1.0), alpha);
      }
    `,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    side: THREE.DoubleSide
  }), [clouds]);

  const atmosphereMaterial = useMemo(() => new THREE.ShaderMaterial({
    uniforms: { uColor: { value: new THREE.Color('#63b9ff') }, uStrength: { value: 1.05 } },
    vertexShader: `
      varying vec3 vWorldNormal;
      varying vec3 vWorldPosition;
      void main() {
        vec4 worldPosition = modelMatrix * vec4(position, 1.0);
        vWorldPosition = worldPosition.xyz;
        vWorldNormal = normalize(mat3(modelMatrix) * normal);
        gl_Position = projectionMatrix * viewMatrix * worldPosition;
      }
    `,
    fragmentShader: `
      uniform vec3 uColor;
      uniform float uStrength;
      varying vec3 vWorldNormal;
      varying vec3 vWorldPosition;
      void main() {
        vec3 viewDirection = normalize(cameraPosition - vWorldPosition);
        float rim = pow(1.0 - max(dot(viewDirection, vWorldNormal), 0.0), 3.4);
        float nightSide = smoothstep(-0.25, 0.25, dot(vWorldNormal, normalize(vec3(-2.4,0.7,2.6))));
        float alpha = rim * (0.18 + 0.4 * nightSide) * uStrength;
        gl_FragColor = vec4(uColor, alpha);
      }
    `,
    transparent: true,
    blending: THREE.AdditiveBlending,
    side: THREE.BackSide,
    depthWrite: false
  }), []);

  useFrame((state) => {
    material.uniforms.uTime.value = state.clock.elapsedTime;
    cloudMaterial.uniforms.uTime.value = state.clock.elapsedTime;
  });

  return (
    <group ref={groupRef} rotation={[0, 0, THREE.MathUtils.degToRad(-23.4)]}>
      <mesh geometry={new THREE.SphereGeometry(1.82, 96, 64)} material={material} />
      <mesh geometry={new THREE.SphereGeometry(1.845, 96, 64)} material={cloudMaterial} />
      <mesh geometry={new THREE.SphereGeometry(1.885, 96, 64)} material={atmosphereMaterial} />
      <pointLight position={[-4, 2, 5]} intensity={2.4} distance={9} color="#8db8ff" />
    </group>
  );
}

function StarField() {
  const pointsRef = useRef();
  const count = 3600;
  const { positions, colors, sizes } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    for (let i = 0; i < count; i += 1) {
      const radius = THREE.MathUtils.lerp(45, 180, Math.pow(Math.random(), 0.42));
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(THREE.MathUtils.randFloatSpread(2));
      const i3 = i * 3;
      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.cos(phi);
      positions[i3 + 2] = radius * Math.sin(phi) * Math.sin(theta);
      const color = new THREE.Color().setHSL(THREE.MathUtils.randFloat(0.54, 0.68), 0.32, THREE.MathUtils.randFloat(0.6, 1));
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;
      sizes[i] = THREE.MathUtils.randFloat(0.55, 1.55);
    }
    return { positions, colors, sizes };
  }, []);

  const material = useMemo(() => new THREE.ShaderMaterial({
    uniforms: { uPixelRatio: { value: Math.min(window.devicePixelRatio, 1.5) }, uTime: { value: 0 } },
    vertexShader: `
      attribute float aSize;
      attribute float aSeed;
      varying vec3 vColor;
      uniform float uPixelRatio;
      uniform float uTime;
      void main() {
        vColor = color;
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        float twinkle = 0.78 + 0.22 * sin(uTime * (0.65 + aSeed) + aSeed * 8.0);
        gl_PointSize = max(0.65, aSize * uPixelRatio * (260.0 / -mvPosition.z) * twinkle);
        gl_Position = projectionMatrix * mvPosition;
      }
    `,
    fragmentShader: `
      varying vec3 vColor;
      void main() {
        vec2 p = gl_PointCoord - 0.5;
        float d = dot(p, p);
        if (d > 0.25) discard;
        float alpha = smoothstep(0.25, 0.0, d);
        gl_FragColor = vec4(vColor, alpha);
      }
    `,
    transparent: true,
    depthWrite: false,
    vertexColors: true,
    blending: THREE.AdditiveBlending
  }), []);

  const geometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1));
    const seeds = new Float32Array(count);
    for (let i = 0; i < count; i += 1) seeds[i] = Math.random();
    geometry.setAttribute('aSeed', new THREE.BufferAttribute(seeds, 1));
    return geometry;
  }, [positions, colors, sizes]);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y -= delta * 0.0025;
    pointsRef.current.rotation.x += delta * 0.00045;
    material.uniforms.uTime.value = state.clock.elapsedTime;
  });

  return <points ref={pointsRef} geometry={geometry} material={material} frustumCulled={false} />;
}

function AccretionDisk() {
  const material = useMemo(() => new THREE.ShaderMaterial({
    uniforms: { uTime: { value: 0 } },
    vertexShader: `
      varying vec2 vUv;
      varying float vRadius;
      varying float vAngle;
      void main() {
        vUv = uv;
        vRadius = length(position.xy);
        vAngle = atan(position.y, position.x);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float uTime;
      varying vec2 vUv;
      varying float vRadius;
      varying float vAngle;

      float hash(vec2 p) {
        p = fract(p * vec2(123.34, 456.21));
        p += dot(p, p + 45.32);
        return fract(p.x * p.y);
      }

      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        f = f * f * (3.0 - 2.0 * f);
        float a = hash(i);
        float b = hash(i + vec2(1.0, 0.0));
        float c = hash(i + vec2(0.0, 1.0));
        float d = hash(i + vec2(1.0, 1.0));
        return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
      }

      void main() {
        float r = clamp((vRadius - 1.42) / 3.75, 0.0, 1.0);
        float swirl = vAngle * 5.0 - 2.5 / (r + 0.12) + uTime * (0.75 + 1.35 * (1.0 - r));
        vec2 p = vec2(cos(swirl), sin(swirl)) * (3.2 + r * 1.6) + vec2(vUv.x * 7.0, vUv.y * 4.0);
        float n = noise(p) * 0.58 + noise(p * 2.5 + 4.7) * 0.3 + noise(p * 5.0 - 3.0) * 0.12;
        float innerHeat = pow(1.0 - r, 1.85);
        float edgeFade = smoothstep(0.0, 0.05, r) * (1.0 - smoothstep(0.83, 1.0, r));
        float turbulentBand = smoothstep(0.28, 0.65, n) * (0.45 + 0.55 * sin(swirl * 1.25));
        vec3 hot = vec3(1.0, 0.94, 0.78);
        vec3 orange = vec3(1.0, 0.23, 0.015);
        vec3 magenta = vec3(0.86, 0.08, 0.58);
        vec3 violet = vec3(0.16, 0.16, 1.0);
        vec3 color = mix(violet, magenta, smoothstep(0.0, 0.35, r));
        color = mix(color, orange, smoothstep(0.23, 0.72, r));
        color = mix(color, hot, smoothstep(0.66, 0.96, r));
        float brightness = (0.45 + n * 1.65) * (0.4 + innerHeat * 3.25) * (0.72 + turbulentBand * 0.62);
        float alpha = edgeFade * (0.24 + n * 0.95);
        gl_FragColor = vec4(color * brightness, alpha);
      }
    `,
    transparent: true,
    side: THREE.DoubleSide,
    depthWrite: false,
    blending: THREE.AdditiveBlending
  }), []);

  useFrame((state) => { material.uniforms.uTime.value = state.clock.elapsedTime; });

  return <mesh geometry={new THREE.RingGeometry(1.42, 4.55, 320, 96)} material={material} rotation={[THREE.MathUtils.degToRad(58), 0.12, -0.08]} />;
}

function BlackHole({ groupRef }) {
  const haloRef = useRef();
  const ringRef = useRef();

  const haloMaterial = useMemo(() => new THREE.ShaderMaterial({
    uniforms: { uTime: { value: 0 }, uColor: { value: new THREE.Color('#8f4dff') } },
    vertexShader: `
      varying vec3 vNormal;
      varying vec3 vWorldPosition;
      void main() {
        vNormal = normalize(mat3(modelMatrix) * normal);
        vec4 worldPosition = modelMatrix * vec4(position, 1.0);
        vWorldPosition = worldPosition.xyz;
        gl_Position = projectionMatrix * viewMatrix * worldPosition;
      }
    `,
    fragmentShader: `
      uniform float uTime;
      uniform vec3 uColor;
      varying vec3 vNormal;
      varying vec3 vWorldPosition;
      void main() {
        vec3 viewDirection = normalize(cameraPosition - vWorldPosition);
        float rim = pow(1.0 - abs(dot(vNormal, viewDirection)), 2.25);
        float pulse = 0.9 + 0.1 * sin(uTime * 1.8);
        float alpha = rim * 0.52 * pulse;
        gl_FragColor = vec4(uColor * (1.25 + rim), alpha);
      }
    `,
    transparent: true,
    blending: THREE.AdditiveBlending,
    side: THREE.BackSide,
    depthWrite: false
  }), []);

  const photonMaterial = useMemo(() => new THREE.MeshBasicMaterial({ color: '#fff2cf', transparent: true, opacity: 0.76, blending: THREE.AdditiveBlending, depthWrite: false }), []);
  const outerGlowMaterial = useMemo(() => new THREE.MeshBasicMaterial({ color: '#ff6138', transparent: true, opacity: 0.22, blending: THREE.AdditiveBlending, depthWrite: false }), []);

  useFrame((state, delta) => {
    if (haloRef.current) haloRef.current.material.uniforms.uTime.value = state.clock.elapsedTime;
    if (ringRef.current) ringRef.current.rotation.z += delta * 0.04;
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <sphereGeometry args={[1.34, 96, 64]} />
        <meshBasicMaterial color="#000000" />
      </mesh>
      <mesh ref={haloRef} scale={1.055}>
        <sphereGeometry args={[1.38, 96, 64]} />
        <primitive object={haloMaterial} attach="material" />
      </mesh>
      <mesh ref={ringRef} geometry={new THREE.TorusGeometry(1.46, 0.032, 16, 220)} rotation={[1.11, 0.02, 0.1]} material={photonMaterial} />
      <mesh geometry={new THREE.TorusGeometry(1.56, 0.065, 16, 220)} rotation={[1.11, 0.02, 0.1]} material={outerGlowMaterial} />
      <AccretionDisk />
    </group>
  );
}

function SceneJourney({ progressRef, pointerRef }) {
  const earthRef = useRef();
  const blackHoleRef = useRef();
  const farStars = useRef();
  const cameraTarget = useMemo(() => new THREE.Vector3(), []);

  useFrame((state, delta) => {
    const raw = THREE.MathUtils.clamp(progressRef.current, 0, 1);
    const pointer = pointerRef.current;

    // Camera is part of the storytelling rather than a static viewport.
    const cameraDrift = raw < 0.5 ? raw * 0.6 : 0.3 + (raw - 0.5) * 0.9;
    const targetCamera = {
      x: pointer.x * 0.34 + Math.sin(raw * Math.PI * 1.25) * 0.55,
      y: pointer.y * 0.2 + Math.cos(raw * Math.PI * 1.4) * 0.18,
      z: 8.4 - cameraDrift * 1.15
    };
    state.camera.position.x = THREE.MathUtils.damp(state.camera.position.x, targetCamera.x, 2.4, delta);
    state.camera.position.y = THREE.MathUtils.damp(state.camera.position.y, targetCamera.y, 2.4, delta);
    state.camera.position.z = THREE.MathUtils.damp(state.camera.position.z, targetCamera.z, 2.4, delta);
    cameraTarget.set(pointer.x * 0.4, pointer.y * 0.2, -raw * 0.9);
    state.camera.lookAt(cameraTarget);

    if (earthRef.current) {
      const earthPhase = THREE.MathUtils.smoothstep(raw, 0.0, 0.52);
      const fadeOut = 1 - THREE.MathUtils.smoothstep(raw, 0.30, 0.48);
      const x = THREE.MathUtils.lerp(3.25, 1.95, earthPhase) + pointer.x * 0.22;
      const y = THREE.MathUtils.lerp(-0.75, 0.2, earthPhase) + pointer.y * 0.1;
      const z = THREE.MathUtils.lerp(0.35, -0.95, earthPhase);
      const scale = THREE.MathUtils.lerp(1.12, 1.32, earthPhase) * (0.84 + fadeOut * 0.22);
      earthRef.current.position.x = THREE.MathUtils.damp(earthRef.current.position.x, x, 3.8, delta);
      earthRef.current.position.y = THREE.MathUtils.damp(earthRef.current.position.y, y, 3.8, delta);
      earthRef.current.position.z = THREE.MathUtils.damp(earthRef.current.position.z, z, 3.8, delta);
      earthRef.current.scale.setScalar(scale);
      earthRef.current.rotation.y += delta * 0.12 * fadeOut;
      earthRef.current.rotation.x = THREE.MathUtils.damp(earthRef.current.rotation.x, pointer.y * 0.08 + Math.sin(raw * 5.0) * 0.04, 2.2, delta);
      earthRef.current.visible = raw < 0.50;
    }

    if (blackHoleRef.current) {
      const enter = THREE.MathUtils.smoothstep(raw, 0.38, 0.62);
      const exitDrift = THREE.MathUtils.smoothstep(raw, 0.78, 1.0);
      const x = THREE.MathUtils.lerp(4.15, 1.62, enter) - exitDrift * 0.28 + pointer.x * 0.16;
      const y = THREE.MathUtils.lerp(1.45, -0.05, enter) + pointer.y * 0.10;
      const z = THREE.MathUtils.lerp(-3.4, -0.45, enter);
      const scale = THREE.MathUtils.lerp(0.14, 1.02, enter) * THREE.MathUtils.lerp(1.0, 1.08, exitDrift);
      blackHoleRef.current.position.x = THREE.MathUtils.damp(blackHoleRef.current.position.x, x, 3.5, delta);
      blackHoleRef.current.position.y = THREE.MathUtils.damp(blackHoleRef.current.position.y, y, 3.5, delta);
      blackHoleRef.current.position.z = THREE.MathUtils.damp(blackHoleRef.current.position.z, z, 3.5, delta);
      blackHoleRef.current.scale.setScalar(scale);
      blackHoleRef.current.rotation.y += delta * 0.05;
      blackHoleRef.current.rotation.x = THREE.MathUtils.damp(blackHoleRef.current.rotation.x, pointer.y * 0.08, 2.4, delta);
      blackHoleRef.current.visible = raw > 0.36;
      blackHoleRef.current.traverse((child) => {
        if (child.material && 'opacity' in child.material) child.material.opacity = THREE.MathUtils.smoothstep(raw, 0.34, 0.46);
      });
    }

    if (farStars.current) {
      farStars.current.rotation.y += delta * (0.004 + raw * 0.012);
      farStars.current.rotation.x = Math.sin(raw * Math.PI * 1.2) * 0.035;
    }
  });

  return (
    <>
      <ambientLight intensity={0.18} />
      <directionalLight position={[-4, 3, 6]} intensity={2.6} />
      <pointLight position={[4, 0, 4]} intensity={9} distance={18} color="#ff7b3d" />
      <pointLight position={[-5, 0, 2]} intensity={8} distance={16} color="#5e65ff" />
      <group ref={farStars}>
        <StarField />
      </group>
      <Suspense fallback={null}>
        <Earth groupRef={earthRef} />
      </Suspense>
      <BlackHole groupRef={blackHoleRef} />
      <Sparkles count={160} scale={[18, 14, 14]} size={1.2} speed={0.12} opacity={0.3} />
    </>
  );
}

function Scene({ progressRef, pointerRef }) {
  return (
    <Canvas
      className="scene"
      camera={{ position: [0, 0, 8.4], fov: 43 }}
      dpr={[1, 1.55]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      onCreated={({ gl }) => {
        gl.outputColorSpace = THREE.SRGBColorSpace;
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.15;
      }}
    >
      <color attach="background" args={['#020207']} />
      <fog attach="fog" args={['#020207', 24, 120]} />
      <SceneJourney progressRef={progressRef} pointerRef={pointerRef} />
    </Canvas>
  );
}

function Cursor() {
  const dot = useRef(null);
  const ring = useRef(null);
  const pos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const [hover, setHover] = useState(false);

  useEffect(() => {
    const move = (e) => { pos.current = { x: e.clientX, y: e.clientY }; };
    const over = (e) => setHover(Boolean(e.target.closest('a,button,[data-cursor]')));
    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('pointerover', over, { passive: true });
    return () => { window.removeEventListener('pointermove', move); window.removeEventListener('pointerover', over); };
  }, []);

  useEffect(() => {
    let raf;
    const tick = () => {
      if (dot.current) dot.current.style.transform = `translate3d(${pos.current.x}px,${pos.current.y}px,0) translate(-50%,-50%)`;
      ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.14;
      ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.14;
      if (ring.current) {
        ring.current.style.transform = `translate3d(${ringPos.current.x}px,${ringPos.current.y}px,0) translate(-50%,-50%)`;
        ring.current.classList.toggle('cursor-hover', hover);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [hover]);

  return <><span ref={ring} className="cursor-ring" /><span ref={dot} className="cursor-dot" /></>;
}

function CertificateModal({ certificate, onClose }) {
  useEffect(() => {
    const close = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', close);
    if (certificate) document.body.classList.add('modal-open');
    return () => { document.removeEventListener('keydown', close); document.body.classList.remove('modal-open'); };
  }, [onClose, certificate]);

  if (!certificate) return null;
  return (
    <div className="modal-backdrop" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="certificate-modal">
        <button className="modal-close" type="button" onClick={onClose} aria-label="Close certificate"><X /></button>
        <div className="certificate-preview"><img src={certificate.image} alt={certificate.title} /></div>
        <div className="certificate-modal-info">
          <p className="kicker">CREDENTIAL</p>
          <h3>{certificate.title}</h3>
          <p>{certificate.issuer} · {certificate.date}</p>
          <a className="button primary" href={certificate.pdf} target="_blank" rel="noreferrer">Open certificate <ExternalLink size={16} /></a>
        </div>
      </div>
    </div>
  );
}

function App() {
  const progressRef = useRef(0);
  const pointerRef = useRef({ x: 0, y: 0 });
  const [menu, setMenu] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState(null);

  useEffect(() => {
    let raf = 0;
    const updateScroll = () => {
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      progressRef.current = THREE.MathUtils.clamp(window.scrollY / max, 0, 1);
      raf = 0;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(updateScroll);
    };
    const onPointer = (e) => {
      pointerRef.current = {
        x: (e.clientX / Math.max(1, window.innerWidth) - 0.5) * 2,
        y: -(e.clientY / Math.max(1, window.innerHeight) - 0.5) * 2
      };
    };
    updateScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    window.addEventListener('pointermove', onPointer, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      window.removeEventListener('pointermove', onPointer);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="app">
      <Scene progressRef={progressRef} pointerRef={pointerRef} />
      <Cursor />
      <header className="nav">
        <a href="#top" className="brand" data-cursor>NSG<span>.</span></a>
        <div className={`nav-links ${menu ? 'open' : ''}`}>
          <a href="#about" onClick={() => setMenu(false)}>About</a>
          <a href="#work" onClick={() => setMenu(false)}>Work</a>
          <a href="#experience" onClick={() => setMenu(false)}>Experience</a>
          <a href="#credentials" onClick={() => setMenu(false)}>Credentials</a>
          <a href="#contact" onClick={() => setMenu(false)}>Contact</a>
        </div>
        <a className="resume-mini" href="/Nemuri-Srikar-Goud-Resume.pdf" target="_blank" rel="noreferrer" data-cursor>Resume <Download size={14} /></a>
        <button className="menu" type="button" onClick={() => setMenu(!menu)} aria-label="Toggle menu">{menu ? '×' : '☰'}</button>
      </header>

      <main id="top" className="page-content">
        <section className="hero section-shell">
          <div className="hero-copy reveal">
            <p className="eyebrow"><span /> FULL-STACK DEVELOPER · HYDERABAD</p>
            <h1>Nemuri<br /><em>Srikar Goud</em></h1>
            <p className="hero-description">I build web products where <strong>clean interfaces</strong>, <strong>full-stack engineering</strong> and <strong>AI</strong> meet.</p>
            <div className="hero-actions">
              <a className="button primary" href="#work" data-cursor>Explore my work <ArrowDown size={17} /></a>
              <a className="button ghost" href="/Nemuri-Srikar-Goud-Resume.pdf" target="_blank" rel="noreferrer" data-cursor>View resume <ArrowUpRight size={17} /></a>
            </div>
          </div>
          <div className="hero-meta"><span>MOVE YOUR CURSOR · SCROLL TO EXPLORE</span><span className="line" /><span>01 — 08</span></div>
        </section>

        <section id="about" className="section-shell split-section">
          <div className="section-index">02 / ABOUT</div>
          <div className="content-block">
            <p className="kicker">THE PERSON BEHIND THE CODE</p>
            <h2>ECE roots.<br /><span>Web-first mindset.</span></h2>
            <p>I'm a 2026 B.Tech ECE graduate from CMR Institute of Technology, building toward a career in full-stack software development. I enjoy taking an idea from interface to API, database and deployment — then adding a useful layer of AI on top.</p>
            <div className="stat-row"><div><strong>8.49</strong><small>CGPA / 10</small></div><div><strong>10+</strong><small>UI COMPONENTS</small></div><div><strong>5+</strong><small>API INTEGRATIONS</small></div></div>
          </div>
        </section>

        <section id="work" className="section-shell work-section">
          <div className="section-index">03 / SELECTED WORK</div>
          <div className="work-heading"><p className="kicker">THINGS I'VE BUILT</p><h2>Projects with a<br /><span>reason to exist.</span></h2></div>
          <div className="projects">
            {projects.map((project) => (
              <article className={`project-card ${project.accent}`} key={project.number} data-cursor>
                <div className="project-number">{project.number}</div>
                <ProjectGallery project={project} />
                <div className="project-body">
                  <p>{project.subtitle}</p>
                  <div className="project-title-row"><h3>{project.title}</h3><span className="project-index-chip">{project.number}</span></div>
                  <div className="project-orb" aria-hidden="true"><div /><div /><div /></div>
                  <p className="project-description">{project.description}</p>
                  <div className="tags">{project.stack.map(s => <span key={s}>{s}</span>)}</div>
                  {project.href && <a className="project-link" href={project.href} target="_blank" rel="noreferrer" data-cursor>Open live project <ExternalLink size={15} /></a>}
                  {project.github && <a className="project-link secondary-link" href={project.github} target="_blank" rel="noreferrer" data-cursor><Github size={15} /> View source</a>}
                </div>
              </article>
            ))}
          </div>
        </section>


        <section id="experience" className="section-shell experience-section">
          <div className="section-index">04 / EXPERIENCE</div>
          <div className="experience-heading">
            <div><p className="kicker">WHERE I STARTED SHIPPING</p><h2>Hands-on work.<br /><span>Built for the web.</span></h2></div>
            <p>My early experience focused on front-end web development: turning requirements into responsive interfaces and shipping complete web pages.</p>
          </div>
          <div className="experience-list">
            {experience.map((item) => (
              <article className="experience-card" key={item.company} data-cursor>
                <div className="experience-date">{item.period}</div>
                <div className="experience-main">
                  <div className="experience-role">{item.role}</div>
                  <div className="experience-company">{item.company}</div>
                  <p>{item.description}</p>
                  <div className="tags experience-tags">{item.stack.map(tag => <span key={tag}>{tag}</span>)}</div>
                </div>
                <BriefcaseBusiness className="experience-icon" size={26} strokeWidth={1.4} />
              </article>
            ))}
          </div>
        </section>

        <section id="skills" className="section-shell skills-section">
          <div className="section-index">05 / TOOLKIT</div>
          <div className="skills-layout">
            <div><p className="kicker">WHAT I WORK WITH</p><h2>A toolkit built<br /><span>for shipping.</span></h2></div>
            <div className="skill-cloud">{skills.map((skill, i) => <span key={skill} style={{ '--i': i }} data-cursor>{skill}</span>)}</div>
          </div>
        </section>


        <section id="education" className="section-shell education-section">
          <div className="section-index">06 / EDUCATION & PLATFORMS</div>
          <div className="education-layout">
            <div className="education-card" data-cursor>
              <div className="education-card-top"><span>{education.period}</span><GraduationCap size={24} strokeWidth={1.5} /></div>
              <p className="kicker">EDUCATION</p>
              <h2>{education.degree}</h2>
              <p>{education.institution}</p>
              <strong>{education.grade}</strong>
            </div>
            <div className="platforms">
              <p className="kicker">CODING PLATFORMS</p>
              <h3>Practice, solve,<br /><span>keep shipping.</span></h3>
              <div className="platform-grid">
                {codingPlatforms.map(({ name, handle, href, icon: Icon }) => (
                  <a className="platform-card" href={href} target="_blank" rel="noreferrer" key={name} data-cursor>
                    <span className="platform-icon"><Icon size={20} strokeWidth={1.5} /></span>
                    <span><strong>{name}</strong><small>{handle}</small></span>
                    <ArrowUpRight size={16} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="credentials" className="section-shell credentials-section">
          <div className="section-index">07 / CREDENTIALS</div>
          <div className="credentials-heading">
            <div><p className="kicker">CERTIFICATES & MILESTONES</p><h2>Proof of<br /><span>the learning.</span></h2></div>
            <p>Click any credential to inspect it. The portfolio keeps the original certificate as a PDF, so the visual gallery never replaces the source document.</p>
          </div>
          <div className="certificate-grid">
            {certificates.map((certificate) => (
              <button className={`certificate-card ${certificate.featured ? 'featured' : ''}`} key={certificate.title} type="button" onClick={() => setSelectedCertificate(certificate)} data-cursor>
                <div className="certificate-image"><img src={certificate.image} alt="" loading="lazy" /></div>
                <div className="certificate-copy"><span>{certificate.date}</span><h3>{certificate.title}</h3><p>{certificate.issuer}</p><strong>View credential <ArrowUpRight size={14} /></strong></div>
              </button>
            ))}
          </div>
        </section>

        <section id="contact" className="section-shell contact-section">
          <div className="section-index">08 / CONTACT</div>
          <div className="contact-inner">
            <p className="kicker">HAVE A PROJECT IN MIND?</p>
            <h2>Let's build<br /><em>something memorable.</em></h2>
            <a className="email-link" href="mailto:nemurisrikargoud@gmail.com">nemurisrikargoud@gmail.com <ArrowUpRight /></a>
            <div className="socials">
              <a href="https://github.com/Srikar-Goud" target="_blank" rel="noreferrer" data-cursor><Github size={18} /> GitHub</a>
              <a href="https://linkedin.com/in/nemuri-srikar-goud-5403b632a" target="_blank" rel="noreferrer" data-cursor><Linkedin size={18} /> LinkedIn</a>
              <a href="mailto:nemurisrikargoud@gmail.com" data-cursor><Mail size={18} /> Email</a>
            </div>
          </div>
          <footer>© 2026 Nemuri Srikar Goud <span>BUILT WITH REACT + THREE.JS</span></footer>
        </section>
      </main>
      <CertificateModal certificate={selectedCertificate} onClose={() => setSelectedCertificate(null)} />
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);
