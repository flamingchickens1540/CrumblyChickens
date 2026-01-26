export type User = {
  name: string;
};

export type GroupPage =
  | 'Queue'
  | 'PlusMinus'
  | 'PreMatch'
  | 'Autonomous'
  | 'Teleoperated'
  | 'PostMatch';

export type Stage = 'PreMatch' | 'Autonomous' | 'Teleoperated' | 'PostMatch';