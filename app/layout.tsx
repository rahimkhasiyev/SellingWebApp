import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Online Store',
  description: 'Simple online selling web app',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 text-gray-900 antialiased">
        <header className="border-b bg-white">
          <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
            <a href="/" className="text-xl font-semibold text-brand-700">Online Store</a>
            <a href="/cart" className="text-sm font-medium text-brand-600 hover:underline">Cart</a>
          </div>
        </header>
        <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
        <footer className="border-t bg-white">
          <div className="mx-auto max-w-6xl px-4 py-6 text-sm text-gray-500">© {new Date().getFullYear()} Online Store</div>
        </footer>
      </body>
    </html>
  );
}

