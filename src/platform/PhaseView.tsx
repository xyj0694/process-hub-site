import { useState } from 'react';
import type { Phase, GateCheck, CollabMode } from './types';
import { PHASES, PHASE_INFO, MOCK_GATE_CHECKS } from './types';

interface Props {
  phase: Phase;
  collabMode: CollabMode;
  onBack: () => void;
  onChangePhase: (phase: Phase) => void;
  onToggleMode: () => void;
}

export default function PhaseView({ phase, collabMode, onBack, onChangePhase, onToggleMode }: Props) {
  const [checks, setChecks] = useState<GateCheck[]>(() => {
    const gate = MOCK_GATE_CHECKS[phase];
    const passedCount = phase === '开发' ? 5 : phase === '设计' ? 3 : phase === '交付' ? 2 : 0;
    return gate.map((g, i) => ({
      ...g,
      status: i < passedCount ? 'pass' as const : 'pending' as const,
    }));
  });

  const info = PHASE_INFO[phase];
  const currentIdx = PHASES.indexOf(phase);

  const passed = checks.filter(c => c.status === 'pass').length;
  const total = checks.length;
  const allHardPassed = checks.filter(c => c.level === 'hard').every(c => c.status === 'pass');

  const runCheck = (id: string) => {
    setChecks(prev => prev.map(c =>
      c.id === id ? { ...c, status: 'pass' as const } : c
    ));
  };

  const runAll = () => {
    setChecks(prev => prev.map(c => ({ ...c, status: 'pass' as const })));
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button onClick={onBack} className="text-zinc-500 hover:text-zinc-300 transition-colors text-sm">
          ← 返回
        </button>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-lg font-bold text-white">{info.num} {phase}</span>
            <span className="text-sm text-zinc-500">{info.en}</span>
          </div>
          <p className="text-xs text-zinc-500">{info.desc}</p>
        </div>
      </div>

      {/* Phase flow */}
      <div className="flex items-center gap-2 mb-8">
        {PHASES.map((p, i) => (
          <div key={p} className="flex items-center gap-2">
            <button
              onClick={() => onChangePhase(p)}
              className={`text-xs px-2 py-1 rounded-md transition-colors ${
                p === phase
                  ? 'bg-brand-500/20 text-brand-400 font-medium'
                  : 'text-zinc-600 hover:text-zinc-400'
              }`}
            >
              {PHASE_INFO[p].num} {p}
            </button>
            {i < PHASES.length - 1 && <span className="text-zinc-700 text-[10px]">→</span>}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Gate checks */}
        <div className="col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-white">门禁检查</h3>
            <div className="flex items-center gap-3">
              <span className="text-xs text-zinc-500">
                通过 {passed}/{total}
                {!allHardPassed && passed > 0 && <span className="text-amber-400 ml-1">（硬门禁未全部通过）</span>}
                {allHardPassed && total > 0 && passed === total && <span className="text-green-400 ml-1">✓ 全部通过</span>}
              </span>
              <button
                onClick={runAll}
                className="text-xs px-3 py-1 rounded-md bg-brand-500/20 text-brand-400 hover:bg-brand-500/30 transition-colors"
              >
                一键检查
              </button>
            </div>
          </div>

          <div className="space-y-2">
            {checks.map(check => (
              <div
                key={check.id}
                className={`flex items-center justify-between rounded-lg border px-4 py-3 ${
                  check.status === 'pass'
                    ? 'border-green-500/20 bg-green-500/[0.04]'
                    : 'border-white/[0.06] bg-white/[0.02]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`text-xs font-mono ${
                    check.status === 'pass' ? 'text-green-400' : 'text-zinc-600'
                  }`}>
                    {check.id}
                  </span>
                  <span className={`text-sm ${check.status === 'pass' ? 'text-zinc-300' : 'text-zinc-500'}`}>
                    {check.label}
                  </span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                    check.level === 'hard' ? 'bg-red-500/10 text-red-400' : 'bg-amber-500/10 text-amber-400'
                  }`}>
                    {check.level === 'hard' ? '硬' : '软'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {check.status === 'pass' ? (
                    <span className="text-green-400 text-xs">✓ 通过</span>
                  ) : (
                    <button
                      onClick={() => runCheck(check.id)}
                      className="text-xs px-2 py-1 rounded bg-white/[0.06] text-zinc-400 hover:bg-white/[0.10] transition-colors"
                    >
                      执行检查
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Next phase */}
          {allHardPassed && currentIdx < PHASES.length - 1 && (
            <div className="mt-6 p-4 rounded-xl border border-brand-500/20 bg-brand-500/[0.04]">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-white font-medium mb-1">硬门禁已全部通过</div>
                  <div className="text-xs text-zinc-500">
                    可以进入下一阶段：{PHASES[currentIdx + 1]}
                  </div>
                </div>
                <button
                  onClick={() => onChangePhase(PHASES[currentIdx + 1])}
                  className="px-4 py-2 rounded-lg bg-brand-500 text-white text-sm font-medium hover:bg-brand-400 transition-colors"
                >
                  进入 {PHASES[currentIdx + 1]} →
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Side panel */}
        <div className="space-y-4">
          {/* Skills */}
          <div className="rounded-xl border border-white/[0.06] bg-zinc-900/50 p-5">
            <h4 className="text-sm font-semibold text-white mb-3">Skills 加载</h4>
            <div className="space-y-2">
              <SkillItem name="flows/web.md" desc="当前阶段流程" />
              <SkillItem name="disciplines.md" desc="提交纪律" />
              {phase === '需求' && (
                <>
                  <SkillItem name="DS: prd-to-tech.md" desc="需求→技术规约" />
                  <SkillItem name="documents" desc="文档生成" />
                </>
              )}
              {phase === '设计' && (
                <>
                  <SkillItem name="DS: api-design.md" desc="API 设计规范" />
                  <SkillItem name="DS: scaffolds/" desc="脚手架标准" />
                </>
              )}
              {phase === '开发' && (
                <>
                  <SkillItem name="browser" desc="Playwright 截图" />
                  <SkillItem name="docker-deploy" desc="本地 Docker" />
                </>
              )}
              {phase === '交付' && (
                <>
                  <SkillItem name="env-hub manifest" desc="服务器配置" />
                  <SkillItem name="docker-deploy" desc="部署流水线" />
                </>
              )}
              {phase === '复盘' && (
                <>
                  <SkillItem name="knowledge-hub" desc="经验写入" />
                  <SkillItem name="plan-hub" desc="状态更新" />
                </>
              )}
            </div>
          </div>

          {/* Collaboration mode */}
          <div className="rounded-xl border border-white/[0.06] bg-zinc-900/50 p-5">
            <h4 className="text-sm font-semibold text-white mb-3">协作模式</h4>
            <div className="flex rounded-lg border border-white/[0.06] overflow-hidden">
              <button
                onClick={onToggleMode}
                className={`flex-1 py-2 text-xs font-medium transition-colors ${
                  collabMode === 'auto'
                    ? 'bg-brand-500/20 text-brand-400'
                    : 'text-zinc-500 hover:text-zinc-400'
                }`}
              >
                自动评审
              </button>
              <button
                onClick={onToggleMode}
                className={`flex-1 py-2 text-xs font-medium transition-colors ${
                  collabMode === 'human'
                    ? 'bg-brand-500/20 text-brand-400'
                    : 'text-zinc-500 hover:text-zinc-400'
                }`}
              >
                人工评审
              </button>
            </div>
            <p className="text-[11px] text-zinc-600 mt-2 leading-relaxed">
              {collabMode === 'auto'
                ? 'AI 自评 ≥96 分自动进入下一任务，3 轮不达标则反馈。'
                : '每任务完成后等待你评审通过。'}
            </p>
          </div>

          {/* Phase doc */}
          <div className="rounded-xl border border-white/[0.06] bg-zinc-900/50 p-5">
            <h4 className="text-sm font-semibold text-white mb-3">产出物</h4>
            <div className="space-y-1.5">
              <DocItem name="项目需求说明书" format="md + docx" />
              <DocItem name="产品 PRD" format="md + docx" />
              <DocItem name="高保真交互原型" format="HTML" />
              {phase === '设计' && (
                <>
                  <DocItem name="技术规约文档" format="md + docx" />
                  <DocItem name="系统架构说明书" format="md + docx" />
                </>
              )}
              {phase === '开发' && (
                <>
                  <DocItem name="系统代码" format="源文件" />
                  <DocItem name="测试用例" format="源文件" />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SkillItem({ name, desc }: { name: string; desc: string }) {
  return (
    <div className="flex items-center justify-between text-xs">
      <span className="text-zinc-300 font-mono">{name}</span>
      <span className="text-zinc-600">{desc}</span>
    </div>
  );
}

function DocItem({ name, format }: { name: string; format: string }) {
  return (
    <div className="flex items-center justify-between text-xs">
      <span className="text-zinc-300">{name}</span>
      <span className="text-zinc-600">{format}</span>
    </div>
  );
}
