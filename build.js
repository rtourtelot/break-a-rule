const { execSync } = require('child_process');

try {
  console.log('Running Prisma Generate...');
  execSync('npx prisma generate');
  console.log('Prisma Client generated successfully');
} catch (error) {
  console.error('Error generating Prisma Client:', error);
  process.exit(1);
} 