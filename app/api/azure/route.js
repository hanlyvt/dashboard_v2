import fs from 'fs';
import path from 'path';

export async function GET() {
  const filePath = path.join(process.cwd(), 'app', 'data', 'azure-2.json');
  const data = fs.readFileSync(filePath, 'utf-8');
  const json = JSON.parse(data);

  return new Response(JSON.stringify(json), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
