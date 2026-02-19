import { getDb } from './db';
import { users, organizations } from './fixtures';

async function clean() {
  const db = await getDb();
  console.log('Cleaning test data...');
  try {
    for (const fixture of [organizations, users]) {
      await fixture.down(db);
    }
    console.log('Done!');
  } finally {
    await db.end();
  }
}

clean().catch((err) => { console.error(err); process.exit(1); });
