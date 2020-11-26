import * as React from 'react';
import Head from 'next/head';

import './styles/globals.compiled.css';

type CardProps = {
  href: string;
  title: string;
  description: string;
};

const Card: React.FC<CardProps> = ({ href, title, description }) => (
  <a
    href={href}
    className="m-4 p-6 sm:w-5/12 border rounded-xl border-gray-200 hover:border-blue-600 hover:text-blue-600"
  >
    <h3 className="mb-3 text-2xl">{title} &rarr;</h3>
    <p className="text-xl">{description}</p>
  </a>
);

export default function Home() {
  return (
    <div className="min-h-screen px-2 py-12 flex flex-col justify-center items-center">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="sm:px-20 pt-0 pb-12 flex flex-col justify-center items-center">
        <h1 className="text-5xl text-center text-gray-700 dark:text-gray-100">
          React.js + Tailwind CSS 2.0
        </h1>

        <p className="text-2xl text-center leading-loose text-gray-700 dark:text-gray-100">
          Get started by editing{' '}
          <code className="bg-gray-200 dark:bg-gray-700 rounded-md p-1">src/pages/index.tsx</code>
        </p>

        <div className="mt-12 flex justify-center items-center flex-wrap w-full sm:max-w-3xl">
          <Card
            href="https://nextjs.org/docs"
            title="Documentation"
            description="Find in-depth information about Next.js features and API."
          />

          <Card
            href="https://nextjs.org/learn"
            title="Learn"
            description="Learn about Next.js in an interactive course with quizzes!"
          />

          <Card
            href="https://github.com/vercel/next.js/tree/master/examples"
            title="Examples"
            description="Discover and deploy boilerplate example Next.js projects."
          />

          <Card
            href="https://vercel.com/import?filter=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            title="Deploy"
            description="Instantly deploy your Next.js site to a public URL with Vercel."
          />
        </div>
      </main>

      <footer className="w-full h-40 border-t border-gray-200 flex justify-center items-center">
        <a
          className="flex justify-center items-center"
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by <img src="/vercel.svg" alt="Vercel Logo" className="h-4 m-2" />
        </a>
      </footer>
    </div>
  );
}
