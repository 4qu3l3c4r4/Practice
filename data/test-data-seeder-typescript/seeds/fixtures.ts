import { SeedData } from './db';

// Example: seed test users
export const users: SeedData = {
  name: 'users',
  up: async (db) => {
    await db.query(`
      INSERT INTO users (email, name, role) VALUES
        ('admin@example.com', 'Test Admin', 'admin'),
        ('user@example.com', 'Test User', 'user'),
        ('viewer@example.com', 'Test Viewer', 'viewer')
      ON CONFLICT (email) DO NOTHING
    `);
    console.log('  ✓ Seeded 3 test users');
  },
  down: async (db) => {
    await db.query(`DELETE FROM users WHERE email IN ('admin@example.com', 'user@example.com', 'viewer@example.com')`);
    console.log('  ✓ Cleaned test users');
  },
};

// Example: seed test organizations
export const organizations: SeedData = {
  name: 'organizations',
  up: async (db) => {
    await db.query(`
      INSERT INTO organizations (name, country, status) VALUES
        ('Test Corp NL', 'NL', 'active'),
        ('Test GmbH DE', 'DE', 'active'),
        ('Test Ltd UK', 'GB', 'inactive')
      ON CONFLICT (name) DO NOTHING
    `);
    console.log('  ✓ Seeded 3 test organizations');
  },
  down: async (db) => {
    await db.query(`DELETE FROM organizations WHERE name LIKE 'Test %'`);
    console.log('  ✓ Cleaned test organizations');
  },
};
