import { getDb } from './db';
import { users, organizations } from './fixtures';

async function seed() {
  const db = await getDb();
  console.log('Seeding test data...');
  try {
    for (const fixture of [users, organizations]) {
      await fixture.up(db);
    }
    console.log('Done!');
  } finally {
    await db.end();
  }
}

seed().catch((err) => { console.error(err); process.exit(1); });
