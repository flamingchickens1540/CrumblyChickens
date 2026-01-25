export type User = {
	name: string;
};

export type GroupPage =
  | 'home'
  | 'login'
  | 'queue'
  | 'pitscout'
  | 'analysis'
  | 'leaderboard'
  | 'plusminus'
  | 'prematch'
  | 'auto'
  | 'tele'
  | 'postmatch';

export type Stage = 'Pre-Match' | 'Autonomous' | 'Teleoperated' | 'Post-Match';