import React from 'react';
import { Sun, Moon, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import logoIcons from '@/assets/logo.png';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isDark, setIsDark] = React.useState(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className="flex min-h-screen min-w-[1024px] flex-col bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="fixed left-0 right-0 top-0 z-50 border-b bg-white/80 backdrop-blur-sm dark:bg-gray-950/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-2">
              <img className="h-12 w-12" src={logoIcons} alt="Gifer" />
              <span className="text-lg font-semibold">一款名为 Gifer 的 GIF 工具</span>
            </div>

            <div className="flex items-center space-x-4">
              <a
                href="https://github.com/guizimo/gifer"
                title="在浏览器中打开"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80"
              >
                <Github className="h-5 w-5" />
              </a>
              <Button variant="ghost" size="icon" onClick={toggleTheme}>
                {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mb-16 mt-16 flex-1">{children}</main>

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 border-t bg-white/80 backdrop-blur-sm dark:bg-gray-950/80">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500">
            Made with ❤️ by{' '}
            <a
              href="https://github.com/guizimo"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium hover:text-gray-800 dark:hover:text-gray-200"
            >
              Guizimo
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
