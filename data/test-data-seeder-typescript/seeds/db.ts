import dotenv from 'dotenv';
import { Client } from 'pg';

dotenv.config();

export async function getDb(): Promise<Client> {
  const client = new Client({ connectionString: process.env.DATABASE_URL });
  await client.connect();
  return client;
}

export interface SeedData {
  name: string;
  up: (db: Client) => Promise<void>;
  down: (db: Client) => Promise<void>;
}
