import * as migration_20250308_183843 from './20250308_183843';
import * as migration_20250308_210559 from './20250308_210559';
import * as migration_20260627_022630 from './20260627_022630';
import * as migration_20260627_mark_applied from './20260627_mark_applied';

export const migrations = [
  {
    up: migration_20250308_183843.up,
    down: migration_20250308_183843.down,
    name: '20250308_183843',
  },
  {
    up: migration_20250308_210559.up,
    down: migration_20250308_210559.down,
    name: '20250308_210559',
  },
  {
    up: migration_20260627_022630.up,
    down: migration_20260627_022630.down,
    name: '20260627_022630'
  },
  {
    up: migration_20260627_mark_applied.up,
    down: migration_20260627_mark_applied.down,
    name: '20260627_mark_applied'
  },
];
