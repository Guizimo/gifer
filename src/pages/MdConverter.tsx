import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { FileText, Settings, ArrowRight, Download, Loader2 } from 'lucide-react';
import { useToast } from "@/hooks/use-toast"

const MdConverter = () => {
  const { toast } = useToast();
  const [isConverting, setIsConverting] = React.useState(false);
  const [inputText, setInputText] = React.useState('');
  const [outputText, setOutputText] = React.useState('');
  const [format, setFormat] = React.useState('html');

  const convertMd = () => {
    if (!inputText) {
      toast({
        title: "错误",
        description: "请输入 Markdown 内容",
        variant: "destructive",
      });
      return;
    }

    setIsConverting(true);
    // 模拟转换过程
    setTimeout(() => {
      // 简单替换示例
      let result = inputText;
      if (format === 'html') {
        result = inputText.replace(/!\[(.*?)\]\((.*?)\)/g, '<img src="$2" alt="$1">');
      } else if (format === 'bbcode') {
        result = inputText.replace(/!\[(.*?)\]\((.*?)\)/g, '[img]$2[/img]');
      }
      
      setOutputText(result);
      setIsConverting(false);
      toast({
        title: "成功",
        description: "Markdown 转换成功！",
      });
    }, 1500);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] overflow-hidden">
      <div className="flex-1 overflow-auto scrollbar-thin p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
          {/* 输入区域 */}
          <Card className="flex flex-col h-full bg-card">
            <CardHeader className="border-b border-border py-3">
              <CardTitle className="text-sm font-medium text-primary flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Markdown 输入
              </CardTitle>
            </CardHeader>
            
            <CardContent className="flex-1 overflow-y-auto scrollbar-thin p-4 space-y-4">
              <Textarea 
                placeholder="在此粘贴 Markdown 内容..." 
                className="min-h-[400px] resize-none"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              />
              
              <div className="flex items-end gap-4">
                <div className="space-y-2 flex-1">
                  <Label htmlFor="format">目标格式</Label>
                  <Select value={format} onValueChange={setFormat}>
                    <SelectTrigger id="format">
                      <SelectValue placeholder="选择格式" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="html">HTML</SelectItem>
                      <SelectItem value="bbcode">BBCode</SelectItem>
                      <SelectItem value="custom">自定义</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Button
                  className="bg-primary hover:bg-primary/90 text-primary-foreground"
                  disabled={isConverting || !inputText}
                  onClick={convertMd}
                >
                  {isConverting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      转换中...
                    </>
                  ) : (
                    <>
                      转换
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* 输出区域 */}
          <Card className="flex flex-col h-full bg-card">
            <CardHeader className="border-b border-border py-3">
              <CardTitle className="text-sm font-medium text-primary flex items-center gap-2">
                <Settings className="w-4 h-4" />
                转换结果
              </CardTitle>
            </CardHeader>
            
            <CardContent className="flex-1 overflow-y-auto scrollbar-thin p-4">
              {isConverting ? (
                <div className="flex flex-col items-center justify-center h-full space-y-4">
                  <div className="relative">
                    <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-xs font-medium text-primary">MD</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground animate-pulse">转换中，请稍候...</p>
                </div>
              ) : (
                <Textarea 
                  value={outputText}
                  placeholder="转换结果将显示在这里..."
                  className="min-h-[400px] resize-none"
                  readOnly
                />
              )}
            </CardContent>

            <div className="border-t border-border p-4">
              <Button 
                className="w-full"
                variant="outline"
                disabled={!outputText}
                onClick={() => {
                  navigator.clipboard.writeText(outputText);
                  toast({
                    title: "已复制",
                    description: "内容已复制到剪贴板",
                  });
                }}
              >
                <Download className="w-4 h-4 mr-2" />
                复制结果
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MdConverter; 