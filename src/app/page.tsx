import { Section } from '@/components/Section';
import { Button } from '@/components/Button';

export default function Home() {
  return (
    <>
      <Section>
        <h1 className='text-5xl font-heading font-bold'>Welcome to MyApp 🚀</h1>
        <p className='mt-4 text-lg text-gray-600'>
          A modern Next.js starter with Hero UI, Tailwind, Prettier, ESLint, and
          Husky.
        </p>
        <div className='mt-6'>
          <Button>Get Started</Button>
        </div>
      </Section>
    </>
  );
}
