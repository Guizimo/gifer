import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Image } from 'lucide-react';

const Home = () => {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <div className="mb-6">
          <img src="/logo.svg" alt="Gifer Logo" className="w-24 h-24 mx-auto" />
        </div>
        <h1 className="text-4xl font-bold text-primary mb-4">Gifer</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          简单易用的 GIF 制作工具，让图片动起来
        </p>
      </div>

      <div className="max-w-2xl mx-auto">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Image className="w-5 h-5 text-primary" />
              GIF 生成器
            </CardTitle>
            <CardDescription>
              轻松将多张图片合成为高质量 GIF 动图
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="aspect-video bg-muted/30 rounded-md flex items-center justify-center mb-4">
              <img 
                src="/screenshots/home.png" 
                alt="GIF 生成器预览" 
                className="rounded-md w-full object-cover"
              />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/30">
                <span className="text-primary">⚡️</span>
                <span>高性能生成</span>
              </div>
              <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/30">
                <span className="text-primary">🎨</span>
                <span>质量可调</span>
              </div>
              <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/30">
                <span className="text-primary">⏱️</span>
                <span>帧率控制</span>
              </div>
              <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/30">
                <span className="text-primary">🔄</span>
                <span>循环设置</span>
              </div>
              <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/30">
                <span className="text-primary">🚀</span>
                <span>快速模式</span>
              </div>
              <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/30">
                <span className="text-primary">🌓</span>
                <span>深色模式</span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link to="/gif-maker">
                开始使用
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Home;