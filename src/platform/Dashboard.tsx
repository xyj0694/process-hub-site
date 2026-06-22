import type { Project } from './types';
import { PHASES, PHASE_INFO } from './types';

interface Props {
  projects: Project[];
  onSelectProject: (id: string) => void;
}

const phaseColors: Record<string, string> = {
  '构思': 'text-brand-300 border-brand-300/30 bg-brand-300/[0.06]',
  '需求': 'text-brand-400 border-brand-400/30 bg-brand-400/[0.06]',
  '设计': 'text-brand-500 border-brand-500/30 bg-brand-500/[0.06]',
  '启动': 'text-brand-600 border-brand-600/30 bg-brand-600/[0.06]',
  '开发': 'text-blue-400 border-blue-400/30 bg-blue-400/[0.06]',
  '交付': 'text-green-400 border-green-400/30 bg-green-400/[0.06]',
  '复盘': 'text-zinc-400 border-zinc-500/30 bg-zinc-500/[0.06]',
};

const phaseBarColors: Record<string, string> = {
  '构思': 'bg-brand-300',
  '需求': 'bg-brand-400',
  '设计': 'bg-brand-500',
  '启动': 'bg-brand-600',
  '开发': 'bg-blue-500',
  '交付': 'bg-green-500',
  '复盘': 'bg-zinc-500',
};

export default function Dashboard({ projects, onSelectProject }: Props) {
  const phaseCounts: Record<string, number> = {};
  PHASES.forEach(p => { phaseCounts[p] = 0; });
  projects.forEach(p => { phaseCounts[p.phase]++; });

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-1">项目总览</h1>
        <p className="text-sm text-zinc-500">{projects.length} 个项目</p>
      </div>

      {/* Phase distribution */}
      <div className="grid grid-cols-7 gap-2 mb-8">
        {PHASES.map(phase => (
          <div key={phase} className="text-center">
            <div className="text-2xl font-bold text-white">{phaseCounts[phase]}</div>
            <div className="text-[11px] text-zinc-500">{phase}</div>
          </div>
        ))}
      </div>

      {/* Flow bar */}
      <div className="flex h-1.5 rounded-full overflow-hidden mb-8 bg-white/[0.04]">
        {PHASES.map(phase => {
          const count = phaseCounts[phase];
          if (count === 0) return null;
          return (
            <div
              key={phase}
              className={`${phaseBarColors[phase]} h-full`}
              style={{ width: `${(count / projects.length) * 100}%` }}
            />
          );
        })}
      </div>

      {/* Project cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map(project => {
          const info = PHASE_INFO[project.phase];
          const colors = phaseColors[project.phase];
          return (
            <div
              key={project.id}
              onClick={() => onSelectProject(project.id)}
              className="rounded-xl border border-white/[0.06] bg-zinc-900/50 p-6 cursor-pointer hover:bg-white/[0.04] transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="text-sm font-semibold text-white mb-0.5">{project.name}</div>
                  <div className="text-xs text-zinc-500">{project.description}</div>
                </div>
                <span className={`inline-flex items-center rounded-md border px-2 py-0.5 text-[11px] font-medium ${colors}`}>
                  {info.num} {project.phase}
                </span>
              </div>

              {/* Progress bar */}
              <div className="mb-3">
                <div className="flex items-center justify-between text-xs text-zinc-500 mb-1.5">
                  <span>进度</span>
                  <span>{project.progress}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                  <div
                    className={`h-full rounded-full ${phaseBarColors[project.phase]}`}
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-500">
                  门禁 {project.gateStatus.passed}/{project.gateStatus.total}
                </span>
                <span className="text-zinc-600">
                  {project.collabMode === 'auto' ? '自动评审' : '人工评审'} · {project.lastUpdated}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
