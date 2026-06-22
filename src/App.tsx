import { useState } from 'react';

function WaitlistForm() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="text-center py-6">
        <p className="text-green-400 text-lg">We'll be in touch.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
        required
        className="flex-1 px-4 py-3 rounded-lg bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500 transition-colors"
      />
      <button
        type="submit"
        className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-lg transition-colors cursor-pointer"
      >
        Join Waitlist
      </button>
    </form>
  );
}

function PricingCard({
  name,
  price,
  period,
  features,
  cta,
  highlight = false,
}: {
  name: string;
  price: string;
  period: string;
  features: string[];
  cta: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-xl p-8 border ${
        highlight
          ? 'border-blue-500/50 bg-blue-950/30'
          : 'border-zinc-800 bg-zinc-900/50'
      }`}
    >
      <h3 className="text-lg font-semibold text-zinc-200">{name}</h3>
      <div className="mt-4 mb-6">
        <span className="text-4xl font-bold text-white">{price}</span>
        <span className="text-zinc-500 ml-2">{period}</span>
      </div>
      <ul className="space-y-3 mb-8">
        {features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-sm text-zinc-400">
            <span className="text-blue-400 mt-0.5 flex-shrink-0">—</span>
            {f}
          </li>
        ))}
      </ul>
      <button
        className={`w-full py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
          highlight
            ? 'bg-blue-600 hover:bg-blue-500 text-white'
            : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-200'
        }`}
      >
        {cta}
      </button>
    </div>
  );
}

function App() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-300 antialiased">
      {/* Hero */}
      <section className="relative px-6 pt-32 pb-24 max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/50 border border-blue-800/30 text-blue-300 text-xs mb-6">
          For Codex · AI-Native
        </div>
        <h1 className="text-5xl sm:text-6xl font-bold text-white tracking-tight">
          Process Hub
        </h1>
        <p className="mt-6 text-lg text-zinc-400 max-w-xl mx-auto leading-relaxed">
          A 7-stage development lifecycle enforced by AI. Gates that can't be skipped, reviews
          that can't be ignored, and discipline that ships.
        </p>
        <div className="mt-10">
          <WaitlistForm />
        </div>
        <p className="mt-4 text-xs text-zinc-600">
          Early access. No spam. Cancel anytime.
        </p>
      </section>

      {/* Features */}
      <section className="px-6 py-24 max-w-5xl mx-auto">
        <h2 className="text-2xl font-semibold text-white text-center mb-16">
          What it does
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: '7-Stage Lifecycle',
              desc: '构思 → 需求 → 设计 → 启动 → 开发 → 交付 → 复盘. Every stage has SOPs, deliverables, and exit gates your AI enforces.',
            },
            {
              title: 'Automated Gate Checks',
              desc: 'TypeScript, ESLint, curl health checks, git conflict detection, hardcoded secret scanning — all run before you can move to the next stage.',
            },
            {
              title: 'Review Modes',
              desc: 'Auto-review for dev iterations (AI self-scores ≥96 or retries). Manual review for high-risk stages. You control when AI moves forward.',
            },
            {
              title: 'Cross-Project Discipline',
              desc: 'Commit format enforcement, file cleanup after doc generation, stale reference scanning — engineering hygiene baked in.',
            },
            {
              title: 'Skills Auto-Loading',
              desc: 'AI loads the right design standards, deployment configs, and testing tools per stage. No manual setup.',
            },
            {
              title: 'Post-Mortem Analytics',
              desc: 'Bug density, gate pass rate trends, dev efficiency metrics. Data that improves your next project.',
            },
          ].map(({ title, desc }) => (
            <div key={title} className="p-6 rounded-xl bg-zinc-900/50 border border-zinc-800">
              <h3 className="font-medium text-white mb-2">{title}</h3>
              <p className="text-sm text-zinc-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="px-6 py-24 max-w-5xl mx-auto">
        <h2 className="text-2xl font-semibold text-white text-center mb-4">Pricing</h2>
        <p className="text-zinc-500 text-center mb-16 text-sm">
          Start free. Upgrade when you need automation.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <PricingCard
            name="Free"
            price="$0"
            period="/month"
            cta="Install Skill"
            features={[
              '7-stage lifecycle with manual review',
              'Gate check reports (read-only)',
              'Single project',
              'Community updates',
            ]}
          />
          <PricingCard
            name="Pro"
            price="$19"
            period="/month"
            cta="Join Waitlist"
            highlight
            features={[
              'Auto-review mode (AI self-scores)',
              'Automated gate enforcement',
              'Unlimited projects',
              'Gate report exports (PDF)',
              'Priority support',
            ]}
          />
          <PricingCard
            name="Team"
            price="$49"
            period="/month"
            cta="Join Waitlist"
            features={[
              'Everything in Pro',
              'Multi-project dashboards',
              'Post-mortem analytics',
              'Cross-project trend reports',
              'Team role management',
            ]}
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 border-t border-zinc-900 text-center text-xs text-zinc-600">
        Process Hub · Built with Codex ·{' '}
        <a href="https://github.com/xyj0694/process-hub" className="hover:text-zinc-400 transition-colors">
          GitHub
        </a>
      </footer>
    </div>
  );
}

export default App;
