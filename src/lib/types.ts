export type User = {
  name: string;
};

export type GroupPage =
  | 'queue'
  | 'plusminus'
  | 'PreMatch'
  | 'Autonomous'
  | 'Teleoperated'
  | 'PostMatch';

export type Stage = 'PreMatch' | 'Autonomous' | 'Teleoperated' | 'PostMatch';