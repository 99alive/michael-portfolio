import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import * as THREE from "three";
import { ArrowUpRight, Download, Flag, Gamepad2, Github, Linkedin, Mail, Play, Sparkles, Star, Trophy, Zap, Pencil } from "lucide-react";
import Modal from "./Modal";

const projects = [
  {
    title: "viSionX",
    role: "Built and shipped a Manifest V3 Chrome accessibility extension for people who find the web hard to read, combining dyslexia support, text-to-speech, translation, reader mode, focus mode, and color tools in one product.",
    year: "2025",
    stack: "JavaScript / Chrome Extensions API / Cloudflare Workers",
    tag: "Chrome Web Store",
    image: "/aura-coding.gif",
    demoGif: "/aura-coding.gif",
    visualLabel: "accessibility power-up",
    github: "https://github.com/99alive",
    liveUrl: "https://chromewebstore.google.com/detail/kmpfgdbppfenfohcjiipfioigebjkndj?utm_source=item-share-cb",
    highlights: [
      "Passed Chrome Web Store review, maintained in production, reached 20+ installs, and earned a 75% positive pilot response.",
      "Delivered speech and translation in 40+ languages through a Cloudflare Workers backend that keeps third-party TTS credentials off the client.",
      "Added browser speech fallback so the extension stays usable when the upstream TTS service fails.",
    ],
  },
  {
    title: "Math DJ",
    role: "Built a music-driven math game for grades 1-8 where learners unlock track stems across 120 procedurally generated tracks as they master concepts.",
    year: "2026",
    stack: "TypeScript / React / Vite / Supabase / PostgreSQL",
    tag: "Learning game",
    image: "/aura-spiderman.gif",
    demoGif: "/aura-spiderman.gif",
    visualLabel: "learning-game stage",
    github: "https://github.com/99alive",
    liveUrl: "https://math-dj.vercel.app",
    highlights: [
      "Launched to 20+ users with Google OAuth, a PostgreSQL schema, and Supabase-powered leaderboards across 20 concepts.",
      "Built a recommendation engine that adapts difficulty from recent accuracy and response time.",
      "Routed repeated misses to the matching Khan Academy lesson and added DJ Nova as a real-time AI competitor.",
    ],
  },
];

const experiences = [
  {
    role: "AI Research Intern",
    place: "MIT HealthyML Lab",
    where: "Cambridge, MA",
    time: "Jun 2026 - Aug 2026",
    color: "sun",
    emblem: "/mit-lockup-red.png",
    poster: "https://drive.google.com/file/d/1c01rp__JZ5FsLMSboZYEKZ35oYvwX-9U/view?usp=sharing",
    auraGif: "/aura-anime-focus.gif",
    points: [
      "Helped extend NegBench into Twi (Akan), creating a 5,914-example human-verified set plus 500 native Twi retrieval examples.",
      "Ran PyTorch evaluation on a SLURM cluster across 10 vision-language models and 5 languages.",
      "Surfaced a 61% to 14% Recall@1 gap across languages on identical inputs and presented the finding with mentors.",
    ],
  },
  {
    role: "AI Research Assistant, Evidence Detection Benchmark",
    place: "Morehouse Supercomputing Facility, NOBLE-funded Research Grant",
    where: "Atlanta, GA",
    time: "Jan 2026 - May 2026",
    color: "sky",
    emblem: "/morehouse-seal.jpg",
    code: "https://github.com/ashleyscruse/ai-generated-image-detection",
    auraGif: "/aura-dc.gif",
    points: [
      "Processed 74,000+ image instances on the TACC Vista supercomputer using NVIDIA GH200 Grace Hopper GPUs via SLURM as one of three contributors, tuning batch size and I/O after profiling showed reads, not compute, were the bottleneck.",
      "Co-built a benchmark spanning FLUX.1, SDXL, and Realistic Vision at three degradation levels in Python and diffusers, in a shared Git repo on Linux; published to Hugging Face Hub.",
      "Helped establish that a widely used open-source AI-image detector performs worse than random chance on this domain, with AUC-ROC falling from 0.37 on clean images to 0.09 at bodycam quality.",
    ],
  },
  {
    role: "Data Science Research Fellow",
    place: "Morehouse College Summer Bridge Experience",
    where: "Atlanta, GA",
    time: "Jul 2025 - Oct 2025",
    color: "mint",
    emblem: "/morehouse-seal.jpg",
    poster: "https://drive.google.com/file/d/1fr15IF9VJqaB5uGntnS009K2kHr7kfyw/view?usp=sharing",
    auraGif: "/aura-coding.gif",
    points: [
      "Modeled screen time, TikTok use, sleep, stress, and mood across a 100,000-record synthetic dataset.",
      "Used EDA, Pearson correlations, and OLS regression in Python with pandas and statsmodels.",
      "Found TikTok use was the strongest stress predictor and sleep the strongest protective factor, with the model explaining 75% of variance.",
    ],
  },
  {
    role: "Machine Learning Research Intern",
    place: "Morehouse College, Atlanta University Center Consortium Study",
    where: "Atlanta, GA",
    time: "Jan 2026 - May 2026",
    color: "grape",
    emblem: "/morehouse-seal.jpg",
    poster: "https://drive.google.com/file/d/1gCg4pvYIGmWJU8xE71Qlqo9SB-CbuKGh/view?usp=sharing",
    auraGif: "/aura-messi.gif",
    points: [
      "Predicted food insecurity across 400+ student responses on a three-campus team study, co-designing the survey instruments and building the logistic regression pipeline in Python and scikit-learn.",
    ],
  },
  {
    role: "Class President",
    place: "Oprah Winfrey Scholars Program, Scholars Class Council",
    where: "Atlanta, GA",
    time: "Aug 2025 - Present",
    color: "sakura",
    auraGif: "/aura-sigma.gif",
    points: [
      "Raised the annual scholarship award from $25,000 to $30,000 for 57 scholars by making the case to program administrators.",
      "Presented research at four national conferences, including the CRA UR2PhD Research Showcase.",
    ],
  },
];

const stats = [
  ["74K+", "images processed on TACC Vista"],
  ["5,914", "Twi NegBench examples"],
  ["0.09", "bodycam-quality detector AUC"],
  ["100K", "digital habits records modeled"],
];

const skillGroups = [
  { label: "Languages", color: "coral", items: ["C++", "Python", "JavaScript", "TypeScript", "SQL", "HTML/CSS"] },
  { label: "AI/ML", color: "sky", items: ["PyTorch", "scikit-learn", "pandas", "NumPy", "diffusers", "model evaluation"] },
  { label: "Tools", color: "mint", items: ["Git/GitHub", "Docker", "Linux", "SLURM", "Hugging Face"] },
  { label: "Full-Stack", color: "grape", items: ["React", "Node.js", "PostgreSQL", "Supabase", "Cloudflare Workers", "REST APIs"] },
];

const routes = ["research", "tech", "accessibility", "systems", "community", "prototype"];
const routeSolution = ["research", "tech", "accessibility", "systems"];
const chaosCodes = ["R-07", "M-02"];
const levelMarkers = [
  ["start", "Spawn"],
  ["work", "Quests"],
  ["story", "Campaign"],
  ["skills", "Power-ups"],
  ["contact", "Boss Gate"],
];
const auraGifs = ["/aura-spiderman.gif", "/aura-anime.gif", "/aura-dc.gif", "/aura-sigma.gif"];
const stickerSquads = {
  hero: [
    ["/aura-spiderman.gif", "web-sense sticker"],
    ["/aura-anime.gif", "anime aura sticker"],
    ["/aura-coding.gif", "coding sticker"],
    ["/aura-hi.gif", "hello sticker"],
    ["/aura-lockin.gif", "lock-in sticker"],
  ],
  work: [
    ["/aura-coding.gif", "build mode sticker"],
    ["/aura-spiderman.gif", "swing sticker"],
    ["/aura-messi.gif", "motion sticker"],
    ["/aura-whassup.gif", "quest reaction sticker"],
    ["/aura-disco.gif", "party mode sticker"],
  ],
  story: [
    ["/aura-anime-focus.gif", "research focus sticker"],
    ["/aura-dc.gif", "dark knight sticker"],
    ["/aura-sigma.gif", "leadership sticker"],
    ["/aura-cj.gif", "level-up reaction sticker"],
    ["/aura-mua.gif", "win reaction sticker"],
  ],
  skills: [
    ["/aura-coding.gif", "terminal sticker"],
    ["/aura-anime.gif", "power-up sticker"],
    ["/aura-rat-dance.gif", "dance emote sticker"],
    ["/aura-lockin.gif", "focus mode sticker"],
  ],
};

const mvPalette = ["#ffd23e", "#ff7a88", "#6fc6ff", "#74e6bd", "#ffb0d6", "#b18cf2"];
// deterministic pseudo-random so shard scatter is stable across renders
const seeded = (n) => {
  const x = Math.sin(n * 127.1) * 43758.5453;
  return Number((x - Math.floor(x)).toFixed(5));
};
const fixed = (value, digits = 3) => Number(value).toFixed(digits);

function Tag({ children }) {
  return <span className="aura-tag">{children}</span>;
}

function AuraStickerSquad({ items, className = "" }) {
  return (
    <div className={`cartoon-sticker-squad ${className}`} aria-hidden="true">
      {items.map(([src, label], index) => (
        <div key={`${src}-${index}-${className}`} className={`cartoon-sticker sticker-${index + 1}`}>
          <Image src={src} alt={label} width={260} height={160} unoptimized />
          <span>{index + 1}P</span>
        </div>
      ))}
    </div>
  );
}

function LevelBadge({ level, label }) {
  return (
    <div className="level-title-badge">
      <Flag size={16} />
      <span>Level {level}</span>
      <strong>{label}</strong>
    </div>
  );
}

function GameBackdrop() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return undefined;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.set(0, 0, 8);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    const ambient = new THREE.AmbientLight(0xffffff, 2.4);
    scene.add(ambient);
    const key = new THREE.DirectionalLight(0xffffff, 2.2);
    key.position.set(3, 5, 4);
    scene.add(key);

    const shapes = Array.from({ length: 26 }).map((_, i) => {
      const geometry = i % 3 === 0
        ? new THREE.TorusKnotGeometry(0.22, 0.07, 56, 8)
        : i % 3 === 1
          ? new THREE.BoxGeometry(0.42, 0.42, 0.42)
          : new THREE.OctahedronGeometry(0.34, 0);
      const material = new THREE.MeshToonMaterial({
        color: mvPalette[i % mvPalette.length],
      });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(
        (seeded(i + 100) - 0.5) * 11,
        (seeded(i + 130) - 0.5) * 7,
        -seeded(i + 170) * 5
      );
      mesh.rotation.set(seeded(i + 2) * Math.PI, seeded(i + 4) * Math.PI, 0);
      mesh.userData = {
        speed: 0.004 + seeded(i + 8) * 0.008,
        bob: 0.35 + seeded(i + 12) * 0.5,
        baseY: mesh.position.y,
      };
      group.add(mesh);
      return mesh;
    });

    let frame = 0;
    let animationId;
    const animate = () => {
      frame += 1;
      shapes.forEach((mesh, i) => {
        mesh.rotation.x += mesh.userData.speed;
        mesh.rotation.y += mesh.userData.speed * 1.4;
        mesh.position.y = mesh.userData.baseY + Math.sin(frame * 0.018 + i) * mesh.userData.bob;
      });
      group.rotation.z = Math.sin(frame * 0.004) * 0.06;
      renderer.render(scene, camera);
      animationId = window.requestAnimationFrame(animate);
    };

    const resize = () => {
      if (!mount) return;
      const width = mount.clientWidth || 1;
      const height = mount.clientHeight || 1;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    resize();
    animate();
    window.addEventListener("resize", resize);

    return () => {
      window.cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      mount.removeChild(renderer.domElement);
      shapes.forEach((mesh) => {
        mesh.geometry.dispose();
        mesh.material.dispose();
      });
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="game-backdrop" aria-hidden="true" />;
}

function ProjectFeature({ project, index, onOpen }) {
  const flipped = index % 2 === 1;

  return (
    <motion.article
      initial={{ opacity: 0, y: 60, rotate: flipped ? 8 : -8, scale: 0.94 }}
      whileInView={{ opacity: 1, y: 0, rotate: flipped ? 3.2 : -3.2, scale: 1 }}
      viewport={{ once: true, amount: 0.24 }}
      transition={{ type: "spring", stiffness: 85, damping: 13 }}
      className={`aura-project ${flipped ? "md:[&>*:first-child]:order-2" : ""}`}
    >
      <div className="aura-project-media">
        <span className="paper-tape tape-a" aria-hidden="true" />
        <span className="paper-tape tape-b" aria-hidden="true" />
        <div className="project-asset-stage">
          <Image src={project.image} alt={`${project.title} aura visual`} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" unoptimized />
          {project.emblem && (
            <div className="project-emblem">
              <Image src={project.emblem} alt="MIT logo" fill sizes="160px" className="object-contain" />
            </div>
          )}
          <div className="asset-caption">{project.visualLabel}</div>
        </div>
        <div className="level-banner">
          <Trophy size={15} />
          Level {index + 1}
        </div>
        <div className="project-video project-gif-card">
          <Image src={project.demoGif || project.image} alt={`${project.title} animated aura`} fill sizes="220px" className="object-cover" unoptimized />
        </div>
        <div className="project-burst">
          <span>Build</span>
          <strong>{project.year}</strong>
        </div>
        <div className="aura-scanline" />
        <div className="manga-sfx">CUT {String(index + 1).padStart(2, "0")}</div>
        <div className="project-index-mark">{project.year}</div>
      </div>
      <div className="aura-project-copy">
        <div className="project-corner-code">{chaosCodes[index]}</div>
        <p className="aura-kicker">Episode {String(index + 1).padStart(2, "0")} · {project.tag}</p>
        <h3>{project.title}</h3>
        <p>{project.role}</p>
        <ul className="project-highlights" aria-label={`${project.title} build highlights`}>
          {project.highlights.map((highlight) => (
            <li key={highlight}>{highlight}</li>
          ))}
        </ul>
        <div className="power-meter mt-5">
          <span>difficulty</span>
          <i style={{ width: `${82 - index * 9}%` }} />
        </div>
        <div className="mt-5 flex flex-wrap gap-2">
          {project.stack.split(" / ").map((item) => (
            <Tag key={item}>{item}</Tag>
          ))}
        </div>
        <div className="mt-7 flex flex-wrap gap-3">
          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="aura-button aura-button-primary">
            <Play size={17} />
            View live app
          </a>
          <a href={project.github} target="_blank" rel="noopener noreferrer" className="aura-button">
            <Github size={17} />
            Code
          </a>
        </div>
      </div>
    </motion.article>
  );
}

function ExperienceCard({ item, index }) {
  return (
    <motion.article
      initial={{ opacity: 0, x: index % 2 ? 60 : -60, rotate: index % 2 ? 7 : -7 }}
      whileInView={{ opacity: 1, x: 0, rotate: index % 2 ? 2.6 : -2.6 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ type: "spring", stiffness: 80, damping: 13 }}
      className={`exp-card exp-${item.color}`}
      data-xp={(index + 1) * 250}
    >
      {item.emblem && (
        <div className="exp-emblem">
          <Image src={item.emblem} alt={`${item.place} visual mark`} fill sizes="110px" className="object-contain" />
        </div>
      )}
      {item.auraGif && (
        <div className="exp-aura-gif">
          <Image src={item.auraGif} alt={`${item.place} aura`} fill sizes="180px" className="object-cover" unoptimized />
        </div>
      )}
      <div className="exp-aura-chip">
        <span>rank</span>
        S{index + 1}
      </div>
      <div className="exp-time">{item.time}</div>
      <h3>{item.place}</h3>
      <p className="exp-role">{item.role}</p>
      <p className="exp-place">{item.where}</p>
      {(item.code || item.poster) && (
        <div className="exp-link-row">
          {item.poster && (
            <a href={item.poster} target="_blank" rel="noopener noreferrer" className="exp-code-link">
              <ArrowUpRight size={15} />
              poster
            </a>
          )}
          {item.code && (
            <a href={item.code} target="_blank" rel="noopener noreferrer" className="exp-code-link">
              <Github size={15} />
              code
            </a>
          )}
        </div>
      )}
      <ul>
        {item.points.map((p) => (
          <li key={p}>{p}</li>
        ))}
      </ul>
    </motion.article>
  );
}

export default function AuraPortfolio() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [routeStep, setRouteStep] = useState(0);
  const [systemMessage, setSystemMessage] = useState("All sectors open. Tap the route nodes to trace the build.");
  const { scrollYProgress } = useScroll();
  const playerTop = useTransform(scrollYProgress, [0, 1], ["7.5rem", "calc(100vh - 8rem)"]);
  const playerRotate = useTransform(scrollYProgress, [0, 0.5, 1], [-8, 8, -4]);

  const handleRouteClick = (route) => {
    const expected = routeSolution[routeStep];
    if (route === expected) {
      const nextStep = routeStep + 1;
      setRouteStep(nextStep);
      if (nextStep === routeSolution.length) {
        setSystemMessage("Route solved. The Stata floor plan holds — for now.");
      } else {
        setSystemMessage(`Route accepted. Next node: ${routeSolution[nextStep]}.`);
      }
      return;
    }
    setRouteStep(0);
    setSystemMessage("Route collapsed. Restart at research.");
  };

  const openProject = (project) => {
    setSelectedProject(project);
    setSystemMessage(`${project.title} opened. Focus shifted.`);
  };

  return (
    <main className="aura-site min-h-screen overflow-hidden">
      <GameBackdrop />
      <div className="scroll-game-hud" aria-hidden="true">
        <div className="scroll-track">
          <motion.div className="scroll-fill" style={{ scaleY: scrollYProgress }} />
          <motion.div className="scroll-player" style={{ top: playerTop, rotate: playerRotate }}>
            <span />
          </motion.div>
        </div>
        <div className="scroll-markers">
          {levelMarkers.map(([href, label], index) => (
            <a key={href} href={`#${href}`}>
              <span>{index + 1}</span>
              {label}
            </a>
          ))}
        </div>
      </div>
      <nav className="fixed inset-x-0 top-0 z-50 border-b-[3px] border-ink bg-white/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 md:px-8">
          <a href="#" className="brand-lockup font-display text-base font-extrabold tracking-tight">
            <Gamepad2 size={18} />
            Michael Owusu
          </a>
          <div className="hidden items-center gap-2.5 md:flex">
            <a href="#work" className="manga-nav">Work</a>
            <a href="#story" className="manga-nav">Story</a>
            <a href="#skills" className="manga-nav">Skills</a>
            <a href="#contact" className="manga-nav">Contact</a>
            <a href="/Michael_Owusu_Resume.pdf" download className="manga-nav inline-flex items-center gap-1.5">
              <Download size={14} />
              Resume
            </a>
          </div>
        </div>
      </nav>

      <header id="start" className="game-level level-hero relative min-h-screen">
        <div className="sky-layer" aria-hidden="true" />
        <div className="mv-vortex" aria-hidden="true" />
        <div className="aura-gif-strip aura-gif-strip-hero" aria-hidden="true">
          {auraGifs.map((src, index) => (
            <Image key={src} src={src} alt="" width={240} height={150} unoptimized style={{ ["--gif-i"]: index }} />
          ))}
        </div>
        <AuraStickerSquad items={stickerSquads.hero} className="hero-sticker-squad" />
        <div className="sketchbook-layer" aria-hidden="true">
          <span className="doodle doodle-star-a" />
          <span className="doodle doodle-star-b" />
          <span className="doodle doodle-web-a" />
          <span className="doodle doodle-web-b" />
          <span className="doodle doodle-arrow" />
          <span className="doodle doodle-stamp" />
        </div>
        <div className="shard-field" aria-hidden="true">
          {Array.from({ length: 11 }).map((_, i) => (
            <span
              key={i}
              className="shard"
              style={{
                top: `${fixed(6 + seeded(i + 1) * 80)}%`,
                left: `${fixed(seeded(i + 20) * 90)}%`,
                width: `${fixed(2.4 + seeded(i + 5) * 3)}rem`,
                height: `${fixed(2 + seeded(i + 9) * 3)}rem`,
                background: mvPalette[i % mvPalette.length],
                transform: `rotate(${fixed(seeded(i + 3) * 70 - 35)}deg)`,
                animationDelay: `${fixed(seeded(i) * 5)}s`,
                opacity: fixed(0.65 + seeded(i + 2) * 0.25, 4),
              }}
            />
          ))}
        </div>
        <div className="debris-field" aria-hidden="true">
          {Array.from({ length: 18 }).map((_, i) => (
            <span
              key={i}
              className={`debris ${i % 3 === 0 ? "debris-star" : ""}`}
              style={{
                top: `${fixed(seeded(i + 40) * 94)}%`,
                left: `${fixed(seeded(i + 60) * 95)}%`,
                transform: `rotate(${fixed(seeded(i + 11) * 90)}deg)`,
                background: mvPalette[(i + 2) % mvPalette.length],
                animationDelay: `${fixed(seeded(i + 4) * 6)}s`,
              }}
            />
          ))}
        </div>
        <div className="orbit-label orbit-label-a">reality 616 ✦</div>
        <div className="orbit-label orbit-label-b">variant · MO</div>
        <div className="orbit-label orbit-label-c">timeline ✧</div>
        <div className="aura-noise" />

        <div className="relative z-10 mx-auto grid min-h-screen max-w-7xl gap-10 px-5 pb-14 pt-28 md:grid-cols-[0.95fr_1.05fr] md:px-8 md:pt-32">
          <section className="flex flex-col justify-center">
            <LevelBadge level="01" label="Spawn Point" />
            <div className="flex flex-wrap gap-2">
              <span className="hero-badge hero-badge-a">Morehouse · CS + Math</span>
              <span className="hero-badge hero-badge-b">Oprah Winfrey Scholar</span>
            </div>
            <div className="game-hud mt-5">
              <div>
                <span>XP</span>
                <strong>AI research + product</strong>
                <i style={{ width: "87%" }} />
              </div>
              <div>
                <span>Mana</span>
                <strong>Community tech</strong>
                <i style={{ width: "76%" }} />
              </div>
            </div>
            <div className="portfolio-ticket mt-5">
              <Pencil size={16} />
              playable portfolio field guide
            </div>
            <h1 className="aura-title mt-4">
              Michael
              <span>Owusu</span>
            </h1>
            <p className="manga-bubble mt-8 max-w-xl text-lg font-bold leading-7">
              I build AI research systems, accessibility tools, and learning games - playful on the surface, engineered for real benchmarks underneath.
            </p>
            <div className="route-strip mt-7">
              {routes.map((route) => (
                <button
                  key={route}
                  type="button"
                  className={routeSolution.slice(0, routeStep).includes(route) ? "is-solved" : ""}
                  onClick={() => handleRouteClick(route)}
                >
                  <Star size={14} />
                  {route}
                </button>
              ))}
            </div>
            <div className="chaos-console mt-6">
              <span>build mode</span>
              <strong>research arcade</strong>
              <span>status</span>
              <strong>{systemMessage}</strong>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#work" className="aura-button aura-button-primary">
                View work <ArrowUpRight size={18} />
              </a>
              <a href="mailto:michaeloowusu61@gmail.com" className="aura-button">
                Email <Mail size={18} />
              </a>
            </div>
          </section>

          <section className="portal-stage relative min-h-[560px]">
            <div className="paper-stack paper-stack-a" aria-hidden="true" />
            <div className="paper-stack paper-stack-b" aria-hidden="true" />
            <div className="pixel-avatar" aria-hidden="true">
              <div className="avatar-head" />
              <div className="avatar-body" />
              <div className="avatar-leg avatar-leg-a" />
              <div className="avatar-leg avatar-leg-b" />
            </div>
            <div className="game-platform" aria-hidden="true" />
            <div className="rift">
              <div className="rift-window">
                <video autoPlay muted loop playsInline poster="/nyc-hero.jpeg" className="rift-video">
                  <source src="/hero-bg.mp4" type="video/mp4" />
                </video>
                <div className="rift-swirl" aria-hidden="true" />
                <div className="rift-tint" aria-hidden="true" />
              </div>
              <div className="rift-label">rift · open</div>
            </div>
            <div className="mv-shard mv-shard-main">
              <Image src="/nyc-portrait-2.jpeg" alt="Michael Owusu portrait" fill priority sizes="(max-width: 768px) 92vw, 44vw" className="object-cover" />
            </div>
            <div className="mv-shard mv-shard-2">
              <Image src="/nyc-portrait-1.jpeg" alt="Michael Owusu in New York" fill sizes="(max-width: 768px) 48vw, 22vw" className="object-cover" />
            </div>
            <div className="mv-shard mv-shard-3">
              <Image src="/nyc-portrait-3.jpeg" alt="Michael Owusu detail" fill sizes="(max-width: 768px) 40vw, 18vw" className="object-cover" />
            </div>
            <div className="frag frag-a" aria-hidden="true" />
            <div className="frag frag-b" aria-hidden="true" />
            <div className="frag frag-c" aria-hidden="true" />
            <div className="frag frag-d" aria-hidden="true" />
            <div className="sparkle sparkle-a" aria-hidden="true">✦</div>
            <div className="sparkle sparkle-b" aria-hidden="true">✧</div>
            <div className="sparkle sparkle-c" aria-hidden="true">✦</div>
            <div className="aura-callout">
              <span>Variant profile</span>
              CS major, math minor, AI research builder.
            </div>
          </section>
        </div>
      </header>

      <section id="signal" className="game-level level-stats relative border-y-[3px] border-ink px-5 py-20 md:px-8">
        <div className="ticker-rail" aria-hidden="true">
          <span>morehouse cs + math</span>
          <span>research</span>
          <span>accessibility</span>
          <span>data science</span>
          <span>community</span>
          <span>morehouse cs + math</span>
          <span>research</span>
        </div>
        <div className="mx-auto grid max-w-7xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map(([number, label], i) => (
            <div key={label} className="aura-stat" style={{ ["--i"]: i }}>
              <Zap className="stat-icon" size={22} />
              <p>{number}</p>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </section>

      <section id="work" className="game-level level-work relative px-5 py-24 md:px-8">
        <div className="portal-ring section-portal section-portal-a" aria-hidden="true" />
        <div className="frag section-frag section-frag-a" aria-hidden="true" />
        <div className="frag section-frag section-frag-b" aria-hidden="true" />
        <div className="sparkle sparkle-work" aria-hidden="true">✦</div>
        <AuraStickerSquad items={stickerSquads.work} className="work-sticker-squad" />
        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="grid gap-8 md:grid-cols-[0.8fr_1.2fr] md:items-end">
            <div>
              <LevelBadge level="02" label="Quest Select" />
              <p className="aura-kicker">Selected work</p>
              <h2 className="aura-heading mt-4">Project episodes.</h2>
            </div>
            <p className="manga-bubble max-w-2xl text-lg font-bold leading-7">
              Every build is a playable level: benchmark, product, learning loop, and a clean path to the code or demo.
            </p>
          </div>
          <div className="world-map mt-12" aria-label="Portfolio world map">
            {projects.map((project, index) => (
              <button key={project.title} type="button" onClick={() => setSelectedProject(project)}>
                <span>{index + 1}</span>
                {project.title}
              </button>
            ))}
          </div>
          <div className="mt-14 grid gap-14">
            {projects.map((project, index) => (
              <ProjectFeature key={project.title} project={project} index={index} onOpen={openProject} />
            ))}
          </div>
        </div>
      </section>

      <section id="story" className="game-level level-story training-arc-section relative px-5 py-24 md:px-8">
        <div className="portal-ring section-portal section-portal-b" aria-hidden="true" />
        <div className="frag section-frag section-frag-c" aria-hidden="true" />
        <div className="frag section-frag section-frag-d" aria-hidden="true" />
        <AuraStickerSquad items={stickerSquads.story} className="story-sticker-squad" />
        <div className="aura-gif-strip aura-gif-strip-story" aria-hidden="true">
          <Image src="/aura-anime.gif" alt="" width={240} height={150} unoptimized />
          <Image src="/aura-dc.gif" alt="" width={240} height={150} unoptimized />
        </div>
        <div className="relative z-10 mx-auto grid max-w-7xl gap-12 md:grid-cols-[0.62fr_1.38fr]">
          <div className="md:sticky md:top-28 md:self-start">
            <LevelBadge level="03" label="Campaign Log" />
            <p className="aura-kicker">Field notes</p>
            <h2 className="aura-heading mt-4">Training arc.</h2>
            <p className="mt-5 max-w-sm text-base font-semibold leading-7 text-ink-soft">
              AI evaluation, supercomputing, digital-health modeling, and scholarship leadership - stacked like a cartoon campaign map.
            </p>
          </div>
          <div className="exp-stack grid gap-8">
            {experiences.map((item, index) => (
              <ExperienceCard key={item.role} item={item} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section id="skills" className="game-level level-skills skills-section relative px-5 py-24 md:px-8">
        <div className="sparkle skills-spark-a" aria-hidden="true">✦</div>
        <div className="sparkle skills-spark-b" aria-hidden="true">✿</div>
        <AuraStickerSquad items={stickerSquads.skills} className="skills-sticker-squad" />
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <LevelBadge level="04" label="Power-up Room" />
            <p className="aura-kicker">Toolkit</p>
            <h2 className="aura-heading mt-4">Skill scatter.</h2>
          </div>
          <div className="mt-14 grid gap-8 md:grid-cols-2">
            {skillGroups.map((group, gi) => (
              <div key={group.label} className={`skill-panel skill-${group.color}`} style={{ ["--gi"]: gi }}>
                <p className="skill-panel-label">{group.label}</p>
                <div className="mt-4 flex flex-wrap gap-2.5">
                  {group.items.map((s) => (
                    <span key={s} className="skill-chip">{s}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="game-level level-base edu-section relative border-y-[3px] border-ink px-5 py-20 md:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[0.7fr_1.3fr] md:items-center">
          <div>
            <LevelBadge level="05" label="Home Base" />
            <p className="aura-kicker">Education</p>
            <h2 className="aura-heading mt-4">Home base.</h2>
          </div>
          <div className="grid gap-4">
            <div className="edu-card edu-main">
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <h3 className="font-display text-2xl font-extrabold md:text-3xl">Morehouse College</h3>
                <span className="edu-when">Expected May 2029</span>
              </div>
              <p className="mt-2 text-base font-bold text-ink-soft">
                B.S. Computer Science · Minor in Mathematics · Second year · GPA 3.76 / 4.00 · Atlanta, GA
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <div className="honor-chip">
                <Sparkles size={16} /> Oprah Winfrey Scholar — First-Year Class President
              </div>
              <div className="honor-chip honor-alt">
                <Sparkles size={16} /> Howard Thurman Honors Scholar
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="game-level level-contact relative px-5 py-24 md:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[0.9fr_1.1fr] md:items-end">
          <div>
            <LevelBadge level="06" label="Final Gate" />
            <p className="aura-kicker">Contact</p>
            <h2 className="aura-heading mt-4">Send the brief.</h2>
            <p className="mt-5 max-w-md text-lg font-semibold leading-7">
              AI research, accessibility tools, learning products, or community tech - send the mission and I&rsquo;ll bring the build system.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 md:justify-end">
            <a href="mailto:michaeloowusu61@gmail.com" className="aura-button aura-button-primary">
              Email Michael <Mail size={18} />
            </a>
            <a href="https://linkedin.com/in/michael-owusu-42a481268" target="_blank" rel="noopener noreferrer" className="aura-button">
              LinkedIn <Linkedin size={18} />
            </a>
            <a href="/Michael_Owusu_Resume.pdf" download className="aura-button">
              Resume <Download size={18} />
            </a>
          </div>
        </div>
        <div className="mx-auto mt-16 max-w-7xl border-t-[3px] border-white/20 pt-6 text-center font-display text-sm font-bold text-white/70">
          Built by Michael Owusu · {new Date().getFullYear()} · research arcade mode
        </div>
      </section>

      <Modal open={!!selectedProject} onClose={() => setSelectedProject(null)}>
        {selectedProject && (
          <div className="w-full">
            <h3 className="font-display pr-12 text-4xl font-extrabold leading-none text-ink">{selectedProject.title}</h3>
            <p className="mb-5 mt-2 text-sm font-extrabold uppercase tracking-[0.14em] text-ink-soft">{selectedProject.stack}</p>
            <p className="mb-4 text-base font-bold leading-7 text-ink-soft">{selectedProject.role}</p>
            <ul className="project-highlights project-highlights-modal mb-5">
              {selectedProject.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
            <div className="modal-gif-preview">
              <Image src={selectedProject.demoGif || selectedProject.image} alt={`${selectedProject.title} aura preview`} fill sizes="(max-width: 768px) 90vw, 720px" className="object-cover" unoptimized />
            </div>
          </div>
        )}
      </Modal>
    </main>
  );
}
