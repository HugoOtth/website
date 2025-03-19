import * as migration_20250308_183843 from './20250308_183843';
import * as migration_20250308_210559 from './20250308_210559';

export const migrations = [
  {
    up: migration_20250308_183843.up,
    down: migration_20250308_183843.down,
    name: '20250308_183843',
  },
  {
    up: migration_20250308_210559.up,
    down: migration_20250308_210559.down,
    name: '20250308_210559'
  },
];
