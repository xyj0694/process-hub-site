export type Phase =
  | '构思'
  | '需求'
  | '设计'
  | '启动'
  | '开发'
  | '交付'
  | '复盘';

export type CollabMode = 'auto' | 'human';

export interface GateCheck {
  id: string;
  label: string;
  level: 'hard' | 'soft';
  status: 'pass' | 'fail' | 'warn' | 'pending';
  detail?: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  phase: Phase;
  collabMode: CollabMode;
  progress: number; // 0-100
  gateStatus: { passed: number; total: number };
  lastUpdated: string;
}

export const PHASES: Phase[] = ['构思', '需求', '设计', '启动', '开发', '交付', '复盘'];

export const PHASE_INFO: Record<Phase, { num: string; en: string; desc: string }> = {
  '构思': { num: '01', en: 'Ideate', desc: '定义问题和范围' },
  '需求': { num: '02', en: 'Requirements', desc: 'PRD + 高保真原型' },
  '设计': { num: '03', en: 'Design', desc: '技术规约 + API 设计' },
  '启动': { num: '04', en: 'Launch', desc: '仓库 + 脚手架' },
  '开发': { num: '05', en: 'Develop', desc: '迭代 + 自动门禁' },
  '交付': { num: '06', en: 'Deliver', desc: '部署 + 验收' },
  '复盘': { num: '07', en: 'Review', desc: '经验沉淀' },
};

export const MOCK_GATE_CHECKS: Record<Phase, GateCheck[]> = {
  '构思': [
    { id: 'C0-1', label: '问题陈述清晰', level: 'hard', status: 'pending' },
    { id: 'C0-2', label: '初步范围明确', level: 'hard', status: 'pending' },
    { id: 'C0-3', label: 'plan-hub 已登记', level: 'hard', status: 'pending' },
  ],
  '需求': [
    { id: 'R1', label: '需求说明书完整', level: 'hard', status: 'pending' },
    { id: 'R2', label: 'PRD 无歧义', level: 'hard', status: 'pending' },
    { id: 'R3', label: '原型可交互', level: 'hard', status: 'pending' },
    { id: 'R4', label: '业务流无死循环', level: 'hard', status: 'pending' },
    { id: 'R5', label: '确认书已签字', level: 'hard', status: 'pending' },
  ],
  '设计': [
    { id: 'D0-1', label: '技术规约已产出', level: 'hard', status: 'pending' },
    { id: 'D0-2', label: 'API 设计符合约定', level: 'hard', status: 'pending' },
    { id: 'D0-3', label: '技术选型文档完整', level: 'hard', status: 'pending' },
    { id: 'D0-4', label: '质量检查清单覆盖三维度', level: 'soft', status: 'pending' },
    { id: 'D0-5', label: '系统架构说明书完整', level: 'soft', status: 'pending' },
  ],
  '启动': [
    { id: 'G1', label: '脚手架生成成功', level: 'hard', status: 'pending' },
    { id: 'G2', label: '项目可本地启动', level: 'hard', status: 'pending' },
    { id: 'G3', label: 'GitHub 仓库 PRIVATE', level: 'hard', status: 'pending' },
    { id: 'G4', label: '任务完成模式已设定', level: 'hard', status: 'pending' },
  ],
  '开发': [
    { id: 'C1', label: 'TypeScript 类型检查零错误', level: 'hard', status: 'pending' },
    { id: 'C2', label: '前端 dev server 可访问', level: 'hard', status: 'pending' },
    { id: 'C3', label: '后端 /health 返回 200', level: 'hard', status: 'pending' },
    { id: 'C4', label: '关键页面渲染正常', level: 'hard', status: 'pending' },
    { id: 'C5', label: '无 git 冲突标记', level: 'hard', status: 'pending' },
    { id: 'C6', label: 'ESLint 零 error', level: 'hard', status: 'pending' },
    { id: 'S1', label: '无硬编码密钥', level: 'hard', status: 'pending' },
    { id: 'S2', label: 'Token 过期机制', level: 'hard', status: 'pending' },
  ],
  '交付': [
    { id: 'D1', label: '开发门禁全部通过', level: 'hard', status: 'pending' },
    { id: 'D2', label: '代码已推送 GitHub', level: 'hard', status: 'pending' },
    { id: 'D3', label: '部署后 HTTP 200', level: 'hard', status: 'pending' },
    { id: 'D4', label: '关键功能走通', level: 'hard', status: 'pending' },
    { id: 'D5', label: '三端 git log 一致', level: 'hard', status: 'pending' },
  ],
  '复盘': [
    { id: 'RT1', label: '复盘记录已生成', level: 'hard', status: 'pending' },
    { id: 'RT2', label: '经验已写入 knowledge-hub', level: 'hard', status: 'pending' },
    { id: 'RT3', label: 'README 标记 ARCHIVED', level: 'hard', status: 'pending' },
    { id: 'RT4', label: 'plan-hub 已更新', level: 'hard', status: 'pending' },
  ],
};

export const MOCK_PROJECTS: Project[] = [
  {
    id: '1', name: 'course-player', description: '课程视频播放器',
    phase: '开发', collabMode: 'auto', progress: 65,
    gateStatus: { passed: 5, total: 8 }, lastUpdated: '2026-06-21',
  },
  {
    id: '2', name: 'contract-review', description: 'AI 合同审查工具',
    phase: '设计', collabMode: 'human', progress: 30,
    gateStatus: { passed: 2, total: 5 }, lastUpdated: '2026-06-20',
  },
  {
    id: '3', name: 'stock-trader', description: 'A 股量化交易系统',
    phase: '构思', collabMode: 'human', progress: 10,
    gateStatus: { passed: 1, total: 3 }, lastUpdated: '2026-06-19',
  },
  {
    id: '4', name: 'tag-hub', description: '标签管理平台',
    phase: '需求', collabMode: 'human', progress: 20,
    gateStatus: { passed: 0, total: 5 }, lastUpdated: '2026-06-18',
  },
];
