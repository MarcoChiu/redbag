#!/usr/bin/env node
// postdeploy.js — automatically commit & push source changes to main after deploying
import { execSync } from 'child_process';

const formatter = new Intl.DateTimeFormat('en-CA', {
  timeZone: 'Asia/Taipei',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  hour12: false
});
const parts = formatter.formatToParts(new Date());
const get = (type) => parts.find((p) => p.type === type)?.value || '';
const timestamp = `${get('year')}${get('month')}${get('day')}${get('hour')}${get('minute')}`;

try {
  execSync('git add -A', { stdio: 'inherit' });

  // Check if there is anything staged to commit
  try {
    execSync('git diff --cached --quiet');
    console.log('Nothing to commit — source unchanged, skipping commit.');
  } catch {
    // diff --cached --quiet exits with code 1 when there ARE staged changes
    execSync(`git commit -m "deploy: ${timestamp}"`, { stdio: 'inherit' });
    console.log(`Committed: deploy: ${timestamp}`);
  }

  execSync('git push origin main', { stdio: 'inherit' });
  console.log('Pushed source to main ✓');
} catch (err) {
  console.error('postdeploy failed:', err.message);
  process.exit(1);
}
