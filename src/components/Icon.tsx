import * as LucideIcons from 'lucide-react';

interface IconProps {
  name: string;
  className?: string;
  size?: number;
}

export default function Icon({ name, className, size = 24 }: IconProps) {
  // Map database/seed keys to actual Lucide component names
  let iconName = name;
  if (name === 'ReactIcon') iconName = 'Code2';
  if (name === 'NextIcon' || name === 'NextApiIcon') iconName = 'Terminal';
  if (name === 'TSIcon') iconName = 'Braces';
  if (name === 'TailwindIcon') iconName = 'Palette';
  if (name === 'MotionIcon') iconName = 'Flame';
  if (name === 'NodeIcon') iconName = 'Server';
  if (name === 'ExpressIcon') iconName = 'Blocks';
  if (name === 'MongoIcon') iconName = 'Database';
  if (name === 'PostgresIcon') iconName = 'DatabaseBackup';
  if (name === 'JSIcon') iconName = 'FileCode2';
  if (name === 'CPPIcon') iconName = 'Cpu';
  if (name === 'PythonIcon') iconName = 'Workflow';
  if (name === 'VercelIcon') iconName = 'CloudLightning';
  if (name === 'GitIcon') iconName = 'GitBranch';
  if (name === 'DockerIcon') iconName = 'Boxes';
  if (name === 'FigmaIcon') iconName = 'PenTool';
  if (name === 'PostmanIcon') iconName = 'Radio';
  if (name === 'VSCodeIcon') iconName = 'MonitorPlay';

  const LucideIcon = (LucideIcons as any)[iconName] || LucideIcons.HelpCircle;

  return <LucideIcon className={className} size={size} />;
}
