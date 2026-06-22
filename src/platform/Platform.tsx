import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Dashboard from './Dashboard';
import PhaseView from './PhaseView';
import type { Project, Phase } from './types';
import { MOCK_PROJECTS, PHASES } from './types';

export default function Platform() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>(() => {
    const saved = localStorage.getItem('ph_projects');
    return saved ? JSON.parse(saved) : MOCK_PROJECTS;
  });
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [view, setView] = useState<'dashboard' | 'phase' | 'new-project'>('dashboard');

  const selectedProject = useMemo(
    () => projects.find(p => p.id === selectedId) || null,
    [projects, selectedId]
  );

  const persistProjects = (updated: Project[]) => {
    setProjects(updated);
    localStorage.setItem('ph_projects', JSON.stringify(updated));
  };

  const handleSelectProject = (id: string) => {
    setSelectedId(id);
    setView('phase');
  };

  const handleChangePhase = (newPhase: Phase) => {
    if (!selectedId) return;
    persistProjects(
      projects.map(p =>
        p.id === selectedId
          ? { ...p, phase: newPhase, gateStatus: { passed: 0, total: p.gateStatus.total } }
          : p
      )
    );
  };

  const handleToggleMode = () => {
    if (!selectedId) return;
    persistProjects(
      projects.map(p =>
        p.id === selectedId
          ? { ...p, collabMode: p.collabMode === 'auto' ? 'human' : 'auto' }
          : p
      )
    );
  };

  const handleCreateProject = (name: string, description: string) => {
    const newProject: Project = {
      id: String(Date.now()),
      name,
      description,
      phase: '构思',
      collabMode: 'human',
      progress: 0,
      gateStatus: { passed: 0, total: 3 },
      lastUpdated: new Date().toISOString().slice(0, 10),
    };
    persistProjects([...projects, newProject]);
    setSelectedId(newProject.id);
    setView('phase');
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-200">
      {/* Top bar */}
      <div className="border-b border-white/[0.06] bg-zinc-950/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="mx-auto max-w-6xl px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button
              onClick={() => { setView('dashboard'); setSelectedId(null); }}
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <img src="/favicon.svg" alt="PH" className="h-6 w-6" />
              <span className="text-sm font-semibold tracking-tight">Process Hub</span>
            </button>
            <nav className="flex items-center gap-4 text-sm">
              <button
                onClick={() => { setView('dashboard'); setSelectedId(null); }}
                className={`transition-colors ${view === 'dashboard' ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
              >
                项目
              </button>
              <span className="text-zinc-500 hover:text-zinc-300 cursor-pointer">设置</span>
            </nav>
          </div>
          <div className="flex items-center gap-3">
            {view === 'dashboard' && (
              <button
                onClick={() => setView('new-project')}
                className="rounded-lg bg-brand-500 px-3 py-1.5 text-xs font-medium text-white hover:bg-brand-400 transition-colors"
              >
                + 新建项目
              </button>
            )}
            <a
              href="/"
              onClick={(e) => { e.preventDefault(); navigate('/'); }}
              className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
            >
              ← 回到首页
            </a>
            <div className="h-8 w-8 rounded-full bg-brand-500/20 flex items-center justify-center text-xs font-medium text-brand-400">
              XY
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-6xl px-6 py-8">
        {view === 'dashboard' && (
          <Dashboard
            projects={projects}
            onSelectProject={handleSelectProject}
            onCreateNew={() => setView('new-project')}
          />
        )}
        {view === 'phase' && selectedProject && (
          <PhaseView
            phase={selectedProject.phase}
            collabMode={selectedProject.collabMode}
            onBack={() => { setView('dashboard'); setSelectedId(null); }}
            onChangePhase={handleChangePhase}
            onToggleMode={handleToggleMode}
          />
        )}
        {view === 'new-project' && (
          <NewProjectWizard
            onCancel={() => {
              setView(selectedId ? 'phase' : 'dashboard');
            }}
            onCreate={handleCreateProject}
          />
        )}
      </div>
    </div>
  );
}

function NewProjectWizard({ onCancel, onCreate }: {
  onCancel: () => void;
  onCreate: (name: string, desc: string) => void;
}) {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = () => {
    if (name.trim() && description.trim()) {
      onCreate(name.trim(), description.trim());
    }
  };

  return (
    <div className="max-w-xl mx-auto">
      <button onClick={onCancel} className="text-zinc-500 hover:text-zinc-300 transition-colors text-sm mb-6">
        ← 返回
      </button>

      <h2 className="text-2xl font-bold text-white mb-2">新建项目</h2>
      <p className="text-sm text-zinc-500 mb-8">按照方法论，项目从构思阶段开始。</p>

      {/* Steps indicator */}
      <div className="flex items-center gap-3 mb-8">
        {[1, 2].map(s => (
          <div key={s} className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
              s <= step ? 'bg-brand-500 text-white' : 'bg-white/[0.06] text-zinc-600'
            }`}>
              {s}
            </div>
            <span className={`text-xs ${s <= step ? 'text-zinc-300' : 'text-zinc-600'}`}>
              {s === 1 ? '基本信息' : '确认创建'}
            </span>
            {s < 2 && <div className={`w-8 h-px ${step >= 2 ? 'bg-brand-500' : 'bg-white/[0.06]'}`} />}
          </div>
        ))}
      </div>

      {step === 1 && (
        <div className="space-y-4">
          <div>
            <label className="block text-xs text-zinc-400 mb-1.5">项目名称</label>
            <input
              type="text"
              placeholder="例如：course-player"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-900/50 px-4 py-3 text-sm text-white placeholder-zinc-500 focus:border-brand-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs text-zinc-400 mb-1.5">项目描述</label>
            <textarea
              placeholder="这个项目做什么、为谁做…"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-900/50 px-4 py-3 text-sm text-white placeholder-zinc-500 focus:border-brand-500 focus:outline-none resize-none"
            />
          </div>
          <button
            onClick={() => setStep(2)}
            disabled={!name.trim() || !description.trim()}
            className="w-full rounded-lg bg-brand-500 py-3 text-sm font-semibold text-white hover:bg-brand-400 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            下一步 →
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-6">
          <div className="rounded-xl border border-white/[0.06] bg-zinc-900/50 p-6">
            <div className="text-xs text-zinc-500 mb-3">项目信息确认</div>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-zinc-500">名称</span>
                <span className="text-white font-medium">{name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">描述</span>
                <span className="text-zinc-300 max-w-xs text-right">{description}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">初始阶段</span>
                <span className="text-brand-400 font-medium">构思</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">协作模式</span>
                <span className="text-zinc-300">人工评审（默认）</span>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setStep(1)}
              className="flex-1 rounded-lg border border-zinc-700 py-3 text-sm font-medium text-zinc-300 hover:bg-white/[0.06] transition-colors"
            >
              修改
            </button>
            <button
              onClick={handleSubmit}
              className="flex-1 rounded-lg bg-brand-500 py-3 text-sm font-semibold text-white hover:bg-brand-400 transition-colors"
            >
              创建项目
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
