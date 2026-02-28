import { docsNavigation } from "@/content/site-content";
import { DocsSidebarNav } from "@/components/pages/docs-sidebar-nav";
import { SectionShell } from "@/components/ui/section-shell";

const codeSamples = {
  install: "npm install nebula-ui framer-motion",
  usage: "import { Button, Card } from 'nebula-ui';\n\nexport function App() {\n  return <Card><Button>Deploy</Button></Card>;\n}",
  theme: "export const theme = {\n  colors: {\n    accent: '#7dd3fc',\n    surface: '#090f1f',\n  },\n};",
  components:
    "import { Navbar, FeatureGrid, PricingTable } from 'nebula-ui';\n\nexport function Landing() {\n  return <><Navbar /><FeatureGrid /><PricingTable /></>;\n}",
  deployment:
    "npm run build\nnpm run start\n\n# Deploy to Vercel\nvercel --prod",
};

const quickStartChecklist = [
  "Node.js 20+ и современный пакетный менеджер",
  "Next.js App Router в проекте",
  "Tailwind CSS v4 в базовой конфигурации",
];

const deploymentChecklist = [
  "Проверить production-сборку локально",
  "Сверить переменные окружения",
  "Включить мониторинг ошибок и web vitals",
];

const sectionIds: Record<string, string> = {
  "Getting Started": "getting-started",
  Installation: "installation",
  Usage: "usage",
  Theming: "theming",
  Components: "components",
  Deployment: "deployment",
};

export function DocsPageContent() {
  const sectionLinks = docsNavigation
    .map((label) => ({ label, id: sectionIds[label] }))
    .filter((item): item is { label: string; id: string } => Boolean(item.id));

  return (
    <SectionShell className="pt-28 sm:pt-32">
      <div className="grid gap-7 lg:grid-cols-[240px_1fr]">
        <DocsSidebarNav sectionLinks={sectionLinks} />

        <div className="space-y-6">
          <section id="getting-started" className="glass-panel rounded-2xl p-6 sm:p-8">
            <h1 className="font-display text-3xl text-white sm:text-4xl">Getting Started</h1>
            <p className="mt-4 text-sm leading-7 text-slate-300 sm:text-base">
              Nebula gives your team a premium baseline for product UI. Start from ready-made sections, then adapt them with tokens and motion presets.
            </p>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              Рекомендуемый путь: сначала запустить базовый экран с дефолтной темой, затем постепенно добавлять motion, токены и сложные layout-блоки.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-slate-200">
              {quickStartChecklist.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-teal-200" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section id="installation" className="glass-panel rounded-2xl p-6 sm:p-8">
            <h2 className="font-display text-2xl text-white">Installation</h2>
            <p className="mt-3 text-sm leading-7 text-slate-300">Install the package and motion dependency in your Next.js project.</p>
            <pre className="mt-4 overflow-x-auto rounded-xl border border-white/10 bg-slate-900/80 p-4 text-xs text-teal-100">
              <code>{codeSamples.install}</code>
            </pre>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              После установки проверьте, что стили и шрифты подключаются один раз в `app/layout.tsx`, чтобы избежать дублирования CSS и лишней гидрации.
            </p>
          </section>

          <section id="usage" className="glass-panel rounded-2xl p-6 sm:p-8">
            <h2 className="font-display text-2xl text-white">Usage</h2>
            <p className="mt-3 text-sm leading-7 text-slate-300">Compose cards, buttons, and layouts as regular React components.</p>
            <pre className="mt-4 overflow-x-auto rounded-xl border border-white/10 bg-slate-900/80 p-4 text-xs text-teal-100">
              <code>{codeSamples.usage}</code>
            </pre>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              Для лучшей производительности оставляйте страницу серверной по умолчанию и выносите только интерактивные элементы в отдельные client-компоненты.
            </p>
          </section>

          <section id="theming" className="glass-panel rounded-2xl p-6 sm:p-8">
            <h2 className="font-display text-2xl text-white">Theming</h2>
            <p className="mt-3 text-sm leading-7 text-slate-300">Override color tokens and spacing scales to align with your brand.</p>
            <pre className="mt-4 overflow-x-auto rounded-xl border border-white/10 bg-slate-900/80 p-4 text-xs text-teal-100">
              <code>{codeSamples.theme}</code>
            </pre>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              Фиксируйте набор базовых токенов (surface, text, accent, border) и используйте их в компонентах вместо произвольных цветов, чтобы тема оставалась консистентной.
            </p>
          </section>

          <section id="components" className="glass-panel rounded-2xl p-6 sm:p-8">
            <h2 className="font-display text-2xl text-white">Components</h2>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              Assemble complete pages from production-ready blocks like navbars, feature grids, and pricing layouts.
            </p>
            <pre className="mt-4 overflow-x-auto rounded-xl border border-white/10 bg-slate-900/80 p-4 text-xs text-teal-100">
              <code>{codeSamples.components}</code>
            </pre>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              Начните с композиции из крупных блоков, затем добавляйте детали. Такой подход упрощает контроль визуальной иерархии и ускоряет итерации.
            </p>
          </section>

          <section id="deployment" className="glass-panel rounded-2xl p-6 sm:p-8">
            <h2 className="font-display text-2xl text-white">Deployment</h2>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              Build, preview, and ship with your existing pipeline or deploy directly to Vercel.
            </p>
            <pre className="mt-4 overflow-x-auto rounded-xl border border-white/10 bg-slate-900/80 p-4 text-xs text-teal-100">
              <code>{codeSamples.deployment}</code>
            </pre>
            <ul className="mt-4 space-y-2 text-sm text-slate-200">
              {deploymentChecklist.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-teal-200" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>
          <div id="docs-bottom-sentinel" className="h-px w-full" aria-hidden />
        </div>
      </div>
    </SectionShell>
  );
}


