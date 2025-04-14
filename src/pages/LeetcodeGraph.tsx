import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, Settings, Eye, Download, Loader2, Calendar } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const LeetcodeGraph = () => {
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = React.useState(false);
  const [username, setUsername] = React.useState('');
  const [previewImage, setPreviewImage] = React.useState<string | null>(null);
  const [timeRange, setTimeRange] = React.useState('year');
  const [theme, setTheme] = React.useState('github');

  const generateGraph = async () => {
    if (!username) {
      toast({
        title: "提示",
        description: "请输入 LeetCode 用户名",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    try {
      // 模拟生成过程
      await new Promise(resolve => setTimeout(resolve, 2000));
      setPreviewImage('/screenshots/leetcode-preview.png');
      toast({
        title: "成功",
        description: "提交记录图生成成功！",
      });
    } catch (error) {
      toast({
        title: "错误",
        description: String(error),
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <Card className="mb-6">
          <CardHeader className="border-b">
            <CardTitle className="text-xl font-medium flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              LeetCode 提交记录图
            </CardTitle>
          </CardHeader>
          
          <CardContent className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>用户名</Label>
                  <Input 
                    placeholder="输入 LeetCode 用户名" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>时间范围</Label>
                  <Select value={timeRange} onValueChange={setTimeRange}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="year">最近一年</SelectItem>
                      <SelectItem value="half">最近半年</SelectItem>
                      <SelectItem value="quarter">最近三个月</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>主题风格</Label>
                  <Select value={theme} onValueChange={setTheme}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="github">GitHub</SelectItem>
                      <SelectItem value="gitlab">GitLab</SelectItem>
                      <SelectItem value="custom">自定义</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  className="w-full"
                  disabled={isGenerating}
                  onClick={generateGraph}
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      生成中...
                    </>
                  ) : (
                    '生成提交记录图'
                  )}
                </Button>
              </div>

              <div className="space-y-4">
                {isGenerating ? (
                  <div className="flex flex-col items-center justify-center h-[300px] bg-muted/10 rounded-lg">
                    <div className="relative">
                      <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-xs font-medium text-primary">LC</span>
                      </div>
                    </div>
                    <p className="mt-4 text-sm text-muted-foreground animate-pulse">生成中，请稍候...</p>
                  </div>
                ) : previewImage ? (
                  <div className="space-y-4">
                    <img
                      src={previewImage}
                      alt="LeetCode Graph"
                      className="w-full rounded-lg border"
                    />
                    <Button 
                      variant="outline"
                      className="w-full"
                      onClick={() => {/* 下载逻辑 */}}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      下载图片
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-[300px] bg-muted/10 rounded-lg">
                    <Upload className="w-8 h-8 text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">生成后在此处预览</p>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LeetcodeGraph;