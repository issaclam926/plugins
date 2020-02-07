import { join } from 'path';
import { Service } from 'umi';
import { readFileSync } from 'fs';

const fixtures = join(__dirname, 'fixtures');

test('normal', async () => {
  const cwd = join(fixtures, 'normal');
  const service = new Service({
    cwd,
    plugins: [require.resolve('./crossorigin')],
  });
  await service.run({
    name: 'g',
    args: {
      _: ['g', 'html'],
    },
  });
  const content = readFileSync(join(cwd, 'dist', 'index.html'), 'utf-8');
  expect(content).toContain(
    '<script src="/umi.js" crossorigin="anonymous"></script>',
  );
});
