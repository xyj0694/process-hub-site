import { Link } from 'react-router-dom';

const phases = [
  { num: '01', name: '构思', en: 'Ideate', desc: '定义问题和范围，快速验证想法可行性', color: 'text-brand-300' },
  { num: '02', name: '需求', en: 'Requirements', desc: '输出 PRD + 高保真原型，签字确认', color: 'text-brand-400' },
  { num: '03', name: '设计', en: 'Design', desc: '技术规约 + API 设计 + 组件分解', color: 'text-brand-500' },
  { num: '04', name: '启动', en: 'Launch', desc: '创建仓库、生成脚手架、配置环境', color: 'text-brand-600' },
  { num: '05', name: '开发', en: 'Develop', desc: '里程碑迭代 + 自动门禁 + 持续自测', color: 'text-brand-500' },
  { num: '06', name: '交付', en: 'Deliver', desc: '部署上线 + 用户验收 + 文档归档', color: 'text-brand-400' },
  { num: '07', name: '复盘', en: 'Review', desc: '经验沉淀 + 资源释放 + 知识入库', color: 'text-brand-300' },
];

const features = [
  { title: '阶段门禁', desc: '每个阶段有硬性门禁清单，自动执行 tsc / curl / lint / 密钥扫描，不通过不能进入下一阶段。' },
  { title: '人-AI 协作模式', desc: '自动评审模式适合常规迭代，人工评审模式管控高风险任务。按阶段自动切换，灵活可控。' },
  { title: 'Skills 策略引擎', desc: 'AI Agent 按项目阶段自动加载对应 Skills，构思用 plan-hub，设计用 design-standards，交付用 docker-deploy。' },
  { title: '部署流水线', desc: 'Docker + Cloudflare Tunnel + Traefik，三端一致性验证（Mac → GitHub → 服务器），零手动部署。' },
  { title: '知识沉淀', desc: '复盘阶段强制写入 knowledge-hub，经验不流失。每个项目都比上一个更高效。' },
  { title: '全生命周期', desc: '从构思到复盘 7 个阶段覆盖项目完整生命周期，任何阶段可跳转复盘（放弃也能总结经验）。' },
];

const pricing = [
  {
    name: 'Free',
    price: '¥0',
    period: '永久免费',
    desc: '个人开发者起步',
    features: ['1 个项目', '基础门禁检查', '社区支持', '开源方法论'],
    cta: '开始使用',
    href: '/app',
    highlight: false,
  },
  {
    name: 'Pro',
    price: '¥99',
    period: '/月',
    desc: '小团队专业版',
    features: ['10 个项目', '自动门禁 + 协作评审', 'Skills 配置管理', '文档自动生成', '邮件支持'],
    cta: '免费试用 14 天',
    href: '/app',
    highlight: true,
  },
  {
    name: 'Team',
    price: '¥499',
    period: '/月',
    desc: '工作室/外包团队',
    features: ['无限项目', '全部 Pro 功能', '部署流水线', '团队权限管理', '优先支持 + SLA'],
    cta: '联系销售',
    href: '/app',
    highlight: false,
  },
];

function App() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-200 antialiased">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/[0.06] bg-zinc-950/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-3">
          <div className="flex items-center gap-2">
            <img src="/favicon.svg" alt="Process Hub" className="h-7 w-7" />
            <span className="text-sm font-semibold tracking-tight">Process Hub</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-zinc-400">
            <a href="#methodology" className="hover:text-zinc-200 transition-colors">方法论</a>
            <a href="#features" className="hover:text-zinc-200 transition-colors">功能</a>
            <a href="#pricing" className="hover:text-zinc-200 transition-colors">定价</a>
            <Link to="/app" className="inline-flex items-center gap-1.5 rounded-lg bg-brand-500/20 px-3 py-1.5 text-brand-400 hover:bg-brand-500/30 transition-colors">
              进入平台
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-24 text-center">
        <div className="mx-auto max-w-4xl px-6">
          <div className="mb-6 inline-flex items-center gap-1.5 rounded-full border border-brand-500/30 bg-brand-500/[0.08] px-3 py-1 text-xs text-brand-400">
            AI 辅助软件开发的流程操作系统
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold tracking-tight text-white mb-6">
            让 AI 写代码从"能用"
            <br />
            到<span className="text-brand-400">可靠交付</span>
          </h1>
          <p className="mx-auto max-w-xl text-lg text-zinc-400 leading-relaxed mb-8">
            Process Hub 是一套完整的 AI 辅助开发方法论——7 个阶段、自动化门禁、人-AI 协作模式。像专业工程团队一样管理你的 AI 项目。
          </p>
          <div className="flex items-center justify-center gap-3">
            <Link to="/app" className="rounded-xl bg-brand-500 px-6 py-2.5 text-sm font-semibold text-white hover:bg-brand-400 transition-colors">
              免费使用 →
            </Link>
            <a href="https://github.com/xyj0694/process-hub" className="rounded-xl border border-zinc-700 bg-white/[0.04] px-6 py-2.5 text-sm font-medium text-zinc-300 hover:bg-white/[0.08] transition-colors">
              开源方法论 →
            </a>
          </div>
        </div>
      </section>

      {/* Phase Flow */}
      <section id="methodology" className="py-24 border-t border-white/[0.06]">
        <div className="mx-auto max-w-5xl px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold tracking-tight text-white mb-4">7 阶段完整生命周期</h2>
            <p className="text-zinc-400 max-w-xl mx-auto">每个阶段都有明确入口条件、操作 SOP 和出口门禁，阶段间流转可追溯。</p>
          </div>
          <div className="grid grid-cols-7 gap-0">
            {phases.map((p, i) => (
              <div key={i} className="flex flex-col items-center text-center phase-connector px-1">
                <div className={`text-xs font-bold mb-1 ${p.color}`}>{p.num}</div>
                <div className="text-sm font-semibold text-white mb-0.5">{p.name}</div>
                <div className="text-[10px] text-zinc-500 mb-2">{p.en}</div>
                <div className="text-[11px] text-zinc-500 leading-relaxed hidden lg:block">{p.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Flow Detail */}
      <section className="py-12 border-t border-white/[0.06] bg-white/[0.02]">
        <div className="mx-auto max-w-5xl px-6">
          <div className="flex items-center gap-3 mb-8">
            {phases.map((p, i) => (
              <span key={i} className={`text-xs font-semibold ${p.color} ${i < 3 ? '' : 'hidden sm:inline'}`}>
                {p.name}
                {i < 6 && <span className="text-zinc-700 mx-1">→</span>}
              </span>
            ))}
            <span className="text-xs text-zinc-500 ml-auto">可从任何阶段跳转复盘</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-xl border border-white/[0.06] bg-zinc-900/50 p-6">
              <div className="text-xs text-zinc-500 mb-2">门禁体系</div>
              <p className="text-sm text-zinc-300 leading-relaxed">每个阶段末尾有硬/软门禁清单。硬门禁不过关不能进入下一阶段。tsc、curl、lint、密钥扫描自动执行。</p>
            </div>
            <div className="rounded-xl border border-white/[0.06] bg-zinc-900/50 p-6">
              <div className="text-xs text-zinc-500 mb-2">协作模式</div>
              <p className="text-sm text-zinc-300 leading-relaxed">自动评审（≥96分自动进入下一任务）和人工评审（每任务需确认）两种模式，按阶段和风险自动切换。</p>
            </div>
            <div className="rounded-xl border border-white/[0.06] bg-zinc-900/50 p-6">
              <div className="text-xs text-zinc-500 mb-2">产出物规则</div>
              <p className="text-sm text-zinc-300 leading-relaxed">所有阶段产出物同时输出 MD（AI 加载）和 docx/pdf（人类评审），双格式保证人机可读。</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 border-t border-white/[0.06]">
        <div className="mx-auto max-w-5xl px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold tracking-tight text-white mb-4">不只是流程文档</h2>
            <p className="text-zinc-400 max-w-xl mx-auto">Process Hub 是一套可执行的方法论引擎，驱动 AI Agent 按标准流程交付。</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div key={i} className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-6">
                <div className="text-sm font-semibold text-white mb-2">{f.title}</div>
                <p className="text-sm text-zinc-400 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 border-t border-white/[0.06] bg-white/[0.02]">
        <div className="mx-auto max-w-5xl px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold tracking-tight text-white mb-4">简单定价</h2>
            <p className="text-zinc-400 max-w-xl mx-auto">方法论永远开源。SaaS 平台提供自动化、协作和管理能力。</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {pricing.map((p, i) => (
              <div
                key={i}
                className={`rounded-xl border p-8 flex flex-col ${
                  p.highlight
                    ? 'pricing-highlight border-brand-500/50 bg-brand-500/[0.04]'
                    : 'border-white/[0.06] bg-zinc-900/50'
                }`}
              >
                <div className="text-sm font-semibold text-white mb-1">{p.name}</div>
                <div className="text-xs text-zinc-500 mb-4">{p.desc}</div>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-bold text-white">{p.price}</span>
                  <span className="text-sm text-zinc-500">{p.period}</span>
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                  {p.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-zinc-300">
                      <span className="text-brand-400 mt-0.5 flex-shrink-0">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  to={p.href}
                  className={`block text-center rounded-lg py-2.5 text-sm font-semibold transition-colors ${
                    p.highlight
                      ? 'bg-brand-500 text-white hover:bg-brand-400'
                      : 'border border-zinc-700 text-zinc-300 hover:bg-white/[0.06]'
                  }`}
                >
                  {p.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 border-t border-white/[0.06]">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="text-4xl font-bold tracking-tight text-white mb-4">准备好让 AI 项目可控了吗？</h2>
          <p className="text-zinc-400 mb-8">方法论开源，平台免费起步。先用起来，再决定是否需要 Pro。</p>
          <div className="flex items-center justify-center gap-3">
            <Link to="/app" className="rounded-xl bg-brand-500 px-6 py-2.5 text-sm font-semibold text-white hover:bg-brand-400 transition-colors">
              免费使用 →
            </Link>
            <a href="https://github.com/xyj0694/process-hub" className="rounded-xl border border-zinc-700 bg-white/[0.04] px-6 py-2.5 text-sm font-medium text-zinc-300 hover:bg-white/[0.08] transition-colors">
              GitHub Star ⭐
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/[0.06] py-12">
        <div className="mx-auto max-w-5xl px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 text-sm text-zinc-500">
            <div className="flex items-center gap-2">
              <img src="/favicon.svg" alt="Process Hub" className="h-5 w-5" />
              <span>Process Hub</span>
            </div>
            <div className="flex items-center gap-6">
              <a href="https://github.com/xyj0694/process-hub" className="hover:text-zinc-300 transition-colors">开源仓库</a>
              <a href="https://github.com/xyj0694/design-standards" className="hover:text-zinc-300 transition-colors">Design Standards</a>
              <a href="https://github.com/xyj0694/env-hub" className="hover:text-zinc-300 transition-colors">Env Hub</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
