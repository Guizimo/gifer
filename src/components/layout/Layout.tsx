import React from 'react';
import { Sun, Moon, Camera, Github, Home } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link, useLocation } from 'react-router-dom';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isDark, setIsDark] = React.useState(false);
  const location = useLocation();

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className="flex flex-col min-h-screen min-w-[1024px] bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b bg-white/80 backdrop-blur-sm dark:bg-gray-950/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link to="/" className="flex items-center space-x-2">
                <Camera className="w-6 h-6 text-primary" />
                <span className="font-bold text-lg">开发者图像工具箱</span>
              </Link>
              
              <nav className="hidden md:flex space-x-1">
                <Button 
                  variant={location.pathname === '/' ? "default" : "ghost"} 
                  size="sm" 
                  asChild
                >
                  <Link to="/">
                    <Home className="w-4 h-4 mr-2" />
                    首页
                  </Link>
                </Button>
                <Button 
                  variant={location.pathname === '/gif-maker' ? "default" : "ghost"} 
                  size="sm" 
                  asChild
                >
                  <Link to="/gif-maker">GIF 生成器</Link>
                </Button>
                <Button 
                  variant={location.pathname === '/leetcode-graph' ? "default" : "ghost"} 
                  size="sm" 
                  asChild
                >
                  <Link to="/leetcode-graph">LeetCode 图表</Link>
                </Button>
                <Button 
                  variant={location.pathname === '/md-converter' ? "default" : "ghost"} 
                  size="sm" 
                  asChild
                >
                  <Link to="/md-converter">MD 转换器</Link>
                </Button>
              </nav>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={toggleTheme}
              >
                {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                asChild
              >
                <a href="https://github.com/guizimo" target="_blank" rel="noopener noreferrer">
                  <Github className="h-5 w-5" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 mt-16 mb-16">
        {children}
      </main>

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 border-t bg-white/80 backdrop-blur-sm dark:bg-gray-950/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-center text-sm text-gray-500">
            Made with ❤️ by <a href="https://github.com/guizimo" target="_blank" rel="noopener noreferrer" className="font-medium hover:text-gray-800 dark:hover:text-gray-200">Guizimo</a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
