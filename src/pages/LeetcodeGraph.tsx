import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, Settings, Eye, Download, Loader2 } from 'lucide-react';
import { useToast } from "@/hooks/use-toast"

const LeetcodeGraph = () => {
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = React.useState(false);
  const [username, setUsername] = React.useState('');
  const [previewImage, setPreviewImage] = React.useState<string | null>(null);

  const generateGraph = async () => {
    if (!username) {
      toast({
        title: "错误",
        description: "请输入 LeetCode 用户名",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    // 模拟生成过程
    setTimeout(() => {
      setPreviewImage('/screenshots/leetcode-preview.png');
      setIsGenerating(false);
      toast({
        title: "成功",
        description: "LeetCode 动态图生成成功！",
      });
    }, 2000);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] overflow-hidden">
      <div className="flex-1 overflow-auto scrollbar-thin p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
          {/* 配置区域 */}
          <Card className="flex flex-col h-full bg-card">
            <CardHeader className="border-b border-border py-3">
              <CardTitle className="text-sm font-medium text-primary flex items-center gap-2">
                <Settings className="w-4 h-4" />
                配置
              </CardTitle>
            </CardHeader>
            
            <CardContent className="flex-1 overflow-y-auto scrollbar-thin p-4 space-y-6">
              <Tabs defaultValue="username">
                <TabsList className="grid grid-cols-2">
                  <TabsTrigger value="username">用户名</TabsTrigger>
                  <TabsTrigger value="file">文件导入</TabsTrigger>
                </TabsList>
                <TabsContent value="username" className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="username">LeetCode 用户名</Label>
                    <Input 
                      id="username" 
                      placeholder="输入 LeetCode 用户名" 
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                </TabsContent>
                <TabsContent value="file" className="space-y-4 mt-4">
                  <div 
                    className="border-2 border-dashed border-primary/20 hover:border-primary/40 
                    transition-colors rounded-lg p-6 text-center dark:bg-card/50"
                  >
                    <div className="flex flex-col items-center gap-2">
                      <Upload className="w-8 h-8 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">拖放 JSON 文件或点击上传</p>
                      <Button variant="outline" size="sm" className="mt-2">
                        选择文件
                      </Button>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              <div className="space-y-4">
                <Label>样式设置</Label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="color1" className="text-xs">主题色</Label>
                    <div className="flex">
                      <Input id="color1" type="color" value="#2463eb" className="w-12 h-8 p-1" />
                      <Input type="text" value="#2463eb" className="flex-1 ml-2" readOnly />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="color2" className="text-xs">背景色</Label>
                    <div className="flex">
                      <Input id="color2" type="color" value="#ffffff" className="w-12 h-8 p-1" />
                      <Input type="text" value="#ffffff" className="flex-1 ml-2" readOnly />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>

            <div className="border-t border-border p-4">
              <Button
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                disabled={isGenerating}
                onClick={generateGraph}
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    生成中...
                  </>
                ) : (
                  '生成动态图'
                )}
              </Button>
            </div>
          </Card>

          {/* 预览区域 */}
          <Card className="flex flex-col h-full bg-card">
            <CardHeader className="border-b border-border py-3">
              <CardTitle className="text-sm font-medium text-primary flex items-center gap-2">
                <Eye className="w-4 h-4" />
                预览
              </CardTitle>
            </CardHeader>
            
            <CardContent className="flex-1 overflow-y-auto scrollbar-thin p-4 flex items-center justify-center">
              {isGenerating ? (
                <div className="flex flex-col items-center justify-center space-y-4">
                  <div className="relative">
                    <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-xs font-medium text-primary">LC</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground animate-pulse">生成中，请稍候...</p>
                </div>
              ) : previewImage ? (
                <img
                  src={previewImage}
                  alt="LeetCode Graph"
                  className="max-w-full max-h-[calc(100vh-16rem)] object-contain rounded-lg"
                />
              ) : (
                <div className="text-center text-muted-foreground">
                  <p className="text-sm">生成动态图后在此处预览</p>
                </div>
              )}
            </CardContent>

            <div className="border-t border-border p-4">
              {previewImage && (
                <Button 
                  className="w-full"
                  variant="outline"
                >
                  <Download className="w-4 h-4 mr-2" />
                  下载图片
                </Button>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LeetcodeGraph; 