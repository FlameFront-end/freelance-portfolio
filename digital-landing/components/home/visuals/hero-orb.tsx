"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import * as THREE from "three";

type Orbiter = {
  mesh: THREE.Mesh<THREE.SphereGeometry, THREE.MeshStandardMaterial>;
  track: OrbitTrack;
  speedFactor: number;
  phase: number;
};

type OrbitTrack = {
  mesh: THREE.Mesh<THREE.TorusGeometry, THREE.MeshBasicMaterial>;
  radius: number;
  tilt: THREE.Euler;
  speed: number;
  baseOpacity: number;
  pulsePhase: number;
};

function createSoftParticleTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 64;
  canvas.height = 64;

  const context = canvas.getContext("2d");
  if (!context) return null;

  const gradient = context.createRadialGradient(32, 32, 3, 32, 32, 30);
  gradient.addColorStop(0, "rgba(255,255,255,1)");
  gradient.addColorStop(0.3, "rgba(216,229,255,0.9)");
  gradient.addColorStop(1, "rgba(190,208,255,0)");

  context.fillStyle = gradient;
  context.fillRect(0, 0, 64, 64);

  return new THREE.CanvasTexture(canvas);
}

function disposeSceneObjects(root: THREE.Object3D) {
  root.traverse((object) => {
    const maybeMesh = object as THREE.Mesh<THREE.BufferGeometry, THREE.Material | THREE.Material[]>;

    if (maybeMesh.geometry) {
      maybeMesh.geometry.dispose();
    }

    if (!maybeMesh.material) return;

    if (Array.isArray(maybeMesh.material)) {
      maybeMesh.material.forEach((material) => material.dispose());
      return;
    }

    maybeMesh.material.dispose();
  });
}

export default function HeroOrb() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;

    if (!container || !canvas) return;

    let animationFrameId = 0;
    let disposed = false;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 42);
    camera.position.set(0, 0, 5.6);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });
    } catch {
      return;
    }

    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.22;
    renderer.setClearColor(0x000000, 0);

    const sceneRoot = new THREE.Group();
    scene.add(sceneRoot);

    const ambientLight = new THREE.AmbientLight(0xbfd0ff, 0.84);
    const keyLight = new THREE.PointLight(0xcce0ff, 2.8, 18, 2);
    const rimLight = new THREE.PointLight(0x99ffd8, 1.6, 18, 2);
    keyLight.position.set(2.8, 2.2, 3.8);
    rimLight.position.set(-3.6, -2.2, -2.6);

    scene.add(ambientLight, keyLight, rimLight);

    const orbGroup = new THREE.Group();
    sceneRoot.add(orbGroup);

    const core = new THREE.Mesh(
      new THREE.SphereGeometry(1.04, 72, 72),
      new THREE.MeshPhysicalMaterial({
        color: 0xc8d7ff,
        emissive: 0x486ee6,
        emissiveIntensity: 0.48,
        roughness: 0.16,
        metalness: 0.24,
        clearcoat: 1,
        clearcoatRoughness: 0.08,
        transmission: 0.28,
        thickness: 1,
        ior: 1.25,
        opacity: 0.95,
        transparent: true,
      }),
    );

    const innerCore = new THREE.Mesh(
      new THREE.IcosahedronGeometry(0.68, 3),
      new THREE.MeshStandardMaterial({
        color: 0xf7fbff,
        emissive: 0x8ca8ff,
        emissiveIntensity: 0.72,
        roughness: 0.22,
        metalness: 0.32,
      }),
    );

    const aura = new THREE.Mesh(
      new THREE.SphereGeometry(1.26, 64, 64),
      new THREE.MeshBasicMaterial({
        color: 0x90b6ff,
        opacity: 0.22,
        transparent: true,
        blending: THREE.AdditiveBlending,
        side: THREE.BackSide,
        depthWrite: false,
      }),
    );

    const lattice = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.14, 2),
      new THREE.MeshBasicMaterial({
        color: 0xd4e2ff,
        wireframe: true,
        transparent: true,
        opacity: 0.2,
        blending: THREE.AdditiveBlending,
      }),
    );

    orbGroup.add(core, innerCore, aura, lattice);

    const ringGroup = new THREE.Group();
    const orbitConfigs = [
      {
        radius: 1.72,
        thickness: 0.014,
        color: 0xcfe2ff,
        tilt: new THREE.Euler(1.08, 0.08, 0.22),
        speed: 0.38,
        baseOpacity: 0.36,
        pulsePhase: 0.1,
      },
      {
        radius: 1.98,
        thickness: 0.013,
        color: 0xbfe6ff,
        tilt: new THREE.Euler(-0.74, 0.34, -0.36),
        speed: 0.31,
        baseOpacity: 0.29,
        pulsePhase: 1.2,
      },
      {
        radius: 2.18,
        thickness: 0.011,
        color: 0xd9ddff,
        tilt: new THREE.Euler(0.3, -0.2, 0.98),
        speed: 0.24,
        baseOpacity: 0.24,
        pulsePhase: 2.1,
      },
    ];

    const orbitTracks: OrbitTrack[] = orbitConfigs.map((config) => {
      const ringMesh = new THREE.Mesh(
        new THREE.TorusGeometry(config.radius, config.thickness, 20, 260),
        new THREE.MeshBasicMaterial({
          color: config.color,
          transparent: true,
          opacity: config.baseOpacity,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        }),
      );

      ringMesh.rotation.copy(config.tilt);
      ringGroup.add(ringMesh);

      return {
        mesh: ringMesh,
        radius: config.radius,
        tilt: config.tilt,
        speed: config.speed,
        baseOpacity: config.baseOpacity,
        pulsePhase: config.pulsePhase,
      };
    });

    sceneRoot.add(ringGroup);

    const particleTexture = createSoftParticleTexture();

    const createParticleCloud = (
      count: number,
      minRadius: number,
      maxRadius: number,
      color: number,
      opacity: number,
      size: number,
    ) => {
      const positions = new Float32Array(count * 3);

      for (let i = 0; i < count; i += 1) {
        const theta = Math.random() * Math.PI * 2;
        const cosPhi = Math.random() * 2 - 1;
        const sinPhi = Math.sqrt(1 - cosPhi * cosPhi);
        const radius = THREE.MathUtils.randFloat(minRadius, maxRadius);
        const base = i * 3;

        positions[base] = radius * sinPhi * Math.cos(theta);
        positions[base + 1] = radius * cosPhi;
        positions[base + 2] = radius * sinPhi * Math.sin(theta);
      }

      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

      const material = new THREE.PointsMaterial({
        color,
        map: particleTexture ?? undefined,
        alphaMap: particleTexture ?? undefined,
        transparent: true,
        opacity,
        size,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        sizeAttenuation: true,
      });

      return new THREE.Points(geometry, material);
    };

    const particlesOuter = createParticleCloud(900, 2.2, 3.1, 0xc2d6ff, 0.72, 0.034);
    const particlesInner = createParticleCloud(520, 1.4, 2.1, 0xc7fff0, 0.45, 0.021);
    sceneRoot.add(particlesOuter, particlesInner);

    const orbiterGeometry = new THREE.SphereGeometry(0.052, 18, 18);
    const orbiters: Orbiter[] = orbitTracks.flatMap((track, trackIndex) => {
      return Array.from({ length: 2 }, (_, orbiterIndex) => {
        const isLead = orbiterIndex === 0;
        const orbiter = new THREE.Mesh(
          orbiterGeometry,
          new THREE.MeshStandardMaterial({
            color: isLead ? 0xf2f7ff : 0xdbe7ff,
            emissive: isLead ? 0x84a2ff : 0x5f88ff,
            emissiveIntensity: isLead ? 0.92 : 0.68,
            roughness: 0.16,
            metalness: 0.38,
          }),
        );

        orbiter.scale.setScalar(isLead ? 1 : 0.82);
        sceneRoot.add(orbiter);

        return {
          mesh: orbiter,
          track,
          speedFactor: isLead ? 1 : 1.12 + trackIndex * 0.03,
          phase: trackIndex * (Math.PI / 3) + orbiterIndex * Math.PI,
        };
      });
    });

    const getPixelRatio = () => Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      if (width === 0 || height === 0) return;

      renderer.setPixelRatio(getPixelRatio());
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);
    resize();

    const pointerTarget = { x: 0, y: 0 };
    const pointerCurrent = { x: 0, y: 0 };

    const handlePointerMove = (event: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const y = ((event.clientY - rect.top) / rect.height) * 2 - 1;

      pointerTarget.x = THREE.MathUtils.clamp(x, -1, 1);
      pointerTarget.y = THREE.MathUtils.clamp(y, -1, 1);
    };

    const handlePointerLeave = () => {
      pointerTarget.x = 0;
      pointerTarget.y = 0;
    };

    if (!prefersReducedMotion) {
      container.addEventListener("pointermove", handlePointerMove);
      container.addEventListener("pointerleave", handlePointerLeave);
    }

    const clock = new THREE.Clock();
    const orbitPoint = new THREE.Vector3();

    const updateTrackAndOrbiterState = (time: number) => {
      orbitTracks.forEach((track) => {
        const pulse = 0.8 + Math.sin(time * 1.25 + track.pulsePhase) * 0.2;
        track.mesh.material.opacity = track.baseOpacity * pulse;
      });

      orbiters.forEach((orbiter) => {
        const angle = time * (orbiter.track.speed * orbiter.speedFactor) + orbiter.phase;

        orbitPoint.set(Math.cos(angle) * orbiter.track.radius, Math.sin(angle) * orbiter.track.radius, 0);
        orbitPoint.applyEuler(orbiter.track.tilt);
        orbiter.mesh.position.copy(orbitPoint);
      });
    };

    const renderStatic = () => {
      orbGroup.rotation.set(0.18, 0.3, 0);
      sceneRoot.rotation.set(0.02, 0.14, 0);
      updateTrackAndOrbiterState(0.85);
      renderer.render(scene, camera);
    };

    const animate = () => {
      if (disposed) return;

      const elapsed = clock.getElapsedTime();

      pointerCurrent.x = THREE.MathUtils.lerp(pointerCurrent.x, pointerTarget.x, 0.06);
      pointerCurrent.y = THREE.MathUtils.lerp(pointerCurrent.y, pointerTarget.y, 0.06);

      sceneRoot.rotation.y = pointerCurrent.x * 0.3;
      sceneRoot.rotation.x = -pointerCurrent.y * 0.2;

      orbGroup.rotation.y = elapsed * 0.33;
      orbGroup.rotation.x = Math.sin(elapsed * 0.52) * 0.14;

      const coreScale = 1 + Math.sin(elapsed * 2.1) * 0.02;
      core.scale.setScalar(coreScale);
      innerCore.rotation.y = -elapsed * 0.57;
      innerCore.rotation.x = elapsed * 0.31;

      const auraScale = 1.24 + Math.sin(elapsed * 1.48) * 0.035;
      aura.scale.setScalar(auraScale);
      lattice.rotation.y = -elapsed * 0.18;
      lattice.rotation.z = elapsed * 0.12;

      particlesOuter.rotation.y = -elapsed * 0.06;
      particlesOuter.rotation.x = Math.sin(elapsed * 0.16) * 0.08;
      particlesInner.rotation.y = elapsed * 0.14;

      updateTrackAndOrbiterState(elapsed);

      renderer.render(scene, camera);
      animationFrameId = window.requestAnimationFrame(animate);
    };

    if (prefersReducedMotion) {
      renderStatic();
    } else {
      animate();
    }

    return () => {
      disposed = true;
      window.cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      container.removeEventListener("pointermove", handlePointerMove);
      container.removeEventListener("pointerleave", handlePointerLeave);

      if (particleTexture) {
        particleTexture.dispose();
      }

      disposeSceneObjects(sceneRoot);
      ambientLight.dispose();
      keyLight.dispose();
      rimLight.dispose();
      renderer.dispose();
    };
  }, [prefersReducedMotion]);

  return (
    <div
      ref={containerRef}
      className="relative mx-auto aspect-square w-[290px] max-w-full overflow-hidden rounded-full sm:w-[340px] lg:w-[430px]"
      aria-hidden="true"
    >
      <div className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_28%,rgba(226,232,240,0.34),rgba(71,85,105,0.2)_42%,rgba(15,23,42,0.05)_64%,transparent_78%)] blur-xl" />
      <div className="pointer-events-none absolute inset-4 rounded-full bg-[conic-gradient(from_120deg,rgba(125,211,252,0.12),rgba(196,181,253,0.07),rgba(134,239,172,0.11),rgba(125,211,252,0.12))] blur-2xl" />
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      <div className="pointer-events-none absolute inset-[33%] rounded-full border border-slate-200/20 bg-slate-950/46 backdrop-blur-[2px]" />
    </div>
  );
}
