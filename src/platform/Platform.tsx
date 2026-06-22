import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Dashboard from './Dashboard';
import PhaseView from './PhaseView';
import type { Project, Phase } from './types';
import { MOCK_PROJECTS } from './types';

export default function Platform() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>(MOCK_PROJECTS);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [view, setView] = useState<'dashboard' | 'phase'>('dashboard');

  const selectedProject = useMemo(
    () => projects.find(p => p.id === selectedId) || null,
    [projects, selectedId]
  );

  const handleSelectProject = (id: string) => {
    setSelectedId(id);
    setView('phase');
  };

  const handleChangePhase = (newPhase: Phase) => {
    if (!selectedId) return;
    setProjects(prev =>
      prev.map(p =>
        p.id === selectedId
          ? { ...p, phase: newPhase, gateStatus: { passed: 0, total: p.gateStatus.total } }
          : p
      )
    );
  };

  const handleToggleMode = () => {
    if (!selectedId) return;
    setProjects(prev =>
      prev.map(p =>
        p.id === selectedId
          ? { ...p, collabMode: p.collabMode === 'auto' ? 'human' : 'auto' }
          : p
      )
    );
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
          <Dashboard projects={projects} onSelectProject={handleSelectProject} />
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
      </div>
    </div>
  );
}
