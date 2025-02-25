import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Code, Image, FileText } from 'lucide-react';

const Home = () => {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-primary mb-4">开发者图像工具箱</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          一站式解决开发者常见的图像处理需求，提高工作效率
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* GIF 生成器 */}
        <Card className="flex flex-col h-full hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Image className="w-5 h-5 text-primary" />
              GIF 生成器
            </CardTitle>
            <CardDescription>
              将多张图片合成为动态 GIF，支持多种动画效果
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1">
            <div className="aspect-video bg-muted/30 rounded-md flex items-center justify-center mb-4">
              <img 
                src="/screenshots/gif-maker.png" 
                alt="GIF 生成器预览" 
                className="h-full object-contain"
              />
            </div>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>支持多图片导入和排序</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>自定义帧率、尺寸和质量</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>多种动画效果（淡入淡出、滑动、缩放）</span>
              </li>
            </ul>
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

        {/* LeetCode 动态图生成器 */}
        <Card className="flex flex-col h-full hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code className="w-5 h-5 text-primary" />
              LeetCode 动态图生成器
            </CardTitle>
            <CardDescription>
              将 LeetCode 提交记录转换为动态连续提交图
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1">
            <div className="aspect-video bg-muted/30 rounded-md flex items-center justify-center mb-4">
              <img 
                src="/screenshots/leetcode.png" 
                alt="LeetCode 动态图预览" 
                className="h-full object-contain"
              />
            </div>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>导入 LeetCode 提交数据</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>自定义颜色和样式</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>生成连续提交热力图</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link to="/leetcode-graph">
                开始使用
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </CardFooter>
        </Card>

        {/* MD 格式转换器 */}
        <Card className="flex flex-col h-full hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" />
              MD 格式转换器
            </CardTitle>
            <CardDescription>
              将 Markdown 文档中的图片转换为指定格式
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1">
            <div className="aspect-video bg-muted/30 rounded-md flex items-center justify-center mb-4">
              <img 
                src="/screenshots/md-converter.png" 
                alt="MD 格式转换器预览" 
                className="h-full object-contain"
              />
            </div>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>批量处理 Markdown 文档</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>自动提取和转换图片链接</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>支持多种图片格式转换</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link to="/md-converter">
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