import { siClaude, siElevenlabs, siMiro, siFigma, siGithub, siVercel } from "simple-icons";

export type Tool = {
  name: string;
  description: string;
  url: string;
  icon: { path: string; hex: string } | { letters: string; hex: string };
};

export const tools: Tool[] = [
  {
    name: "Claude",
    description:
      "Asistente de IA para escribir, programar y analizar documentos largos con razonamiento profundo.",
    url: "https://claude.ai",
    icon: { path: siClaude.path, hex: `#${siClaude.hex}` },
  },
  {
    name: "VS Code",
    description:
      "Editor de código gratuito y extensible: donde escribo, reviso y depuro todo lo que construyo.",
    url: "https://code.visualstudio.com",
    icon: { letters: "VS", hex: "#007ACC" },
  },
  {
    name: "GitHub",
    description:
      "Guarda el historial de versiones de mis proyectos y los respalda para no perder nada.",
    url: "https://github.com",
    icon: { path: siGithub.path, hex: `#${siGithub.hex}` },
  },
  {
    name: "Vercel",
    description:
      "Publica y hospeda mis sitios web en minutos, con despliegues automáticos en cada cambio.",
    url: "https://vercel.com",
    icon: { path: siVercel.path, hex: `#${siVercel.hex}` },
  },
  {
    name: "ElevenLabs",
    description:
      "Genera voces realistas con IA: locuciones, doblaje y clonación de voz a partir de texto.",
    url: "https://elevenlabs.io",
    icon: { path: siElevenlabs.path, hex: `#${siElevenlabs.hex}` },
  },
  {
    name: "Runway",
    description:
      "Crea y edita video con IA: genera clips desde texto o imágenes y aplica efectos avanzados.",
    url: "https://runwayml.com",
    icon: { letters: "RW", hex: "#000000" },
  },
  {
    name: "Miro",
    description:
      "Pizarra colaborativa online para organizar ideas, mapas mentales y planear proyectos en equipo.",
    url: "https://miro.com",
    icon: { path: siMiro.path, hex: `#${siMiro.hex}` },
  },
  {
    name: "Figma Make",
    description:
      "Genera interfaces y prototipos funcionales a partir de descripciones de texto, dentro de Figma.",
    url: "https://www.figma.com/make",
    icon: { path: siFigma.path, hex: `#${siFigma.hex}` },
  },
];
