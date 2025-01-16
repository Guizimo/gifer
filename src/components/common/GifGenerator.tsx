import React from 'react';
import { invoke } from '@tauri-apps/api/core';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Upload, X, Loader2, Settings, Eye, Download, Trash2, SortAsc } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface ImageFile {
  preview: string;
  name: string;
  path?: string;
  blob?: Blob;
}

const GifGenerator = () => {
  const [previewGif, setPreviewGif] = React.useState<string | null>(null);
  const [images, setImages] = React.useState<ImageFile[]>([]);
  const [fps, setFps] = React.useState(24);
  const [quality, setQuality] = React.useState(80);
  const [width, setWidth] = React.useState(500);
  const [height, setHeight] = React.useState(500);
  const [repeat, setRepeat] = React.useState('infinite');
  const [optimization, setOptimization] = React.useState(3);
  const [delay, setDelay] = React.useState(1000); // 每帧延迟时间（毫秒）
  const [animation, setAnimation] = React.useState('none'); // 动画效果
  const [isGenerating, setIsGenerating] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const downloadGif = async () => {
    if (!previewGif) return;

    try {
      // 使用 Tauri 的 save dialog
      const filePath = await save({
        filters: [
          {
            name: 'GIF Image',
            extensions: ['gif'],
          },
        ],
      });

      if (filePath) {
        // 转换 base64 为二进制
        const base64Data = previewGif.split(',')[1];
        const binaryData = Uint8Array.from(atob(base64Data), (c) => c.charCodeAt(0));

        // 保存文件
        await writeBinaryFile(filePath, binaryData);

        toast({
          title: '成功',
          description: 'GIF 已保存！',
        });
      }
    } catch (error) {
      toast({
        title: '错误',
        description: String(error),
        variant: 'destructive',
      });
    }
  };

  // 处理拖拽结束
  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(images);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setImages(items);
  };

  // 清空所有图片
  const clearAllImages = () => {
    setImages([]);
    setPreviewGif(null);
  };

  // 按文件名排序
  const sortImages = () => {
    const sorted = [...images].sort((a, b) => a.name.localeCompare(b.name));
    setImages(sorted);
  };

  // 修改文件处理函数
  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newImages = await Promise.all(
      files.map(async (file) => ({
        preview: URL.createObjectURL(file),
        name: file.name,
        blob: file,
      }))
    );
    setImages((prev) => [...prev, ...newImages]);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    const newImages = await Promise.all(
      files.map(async (file) => ({
        preview: URL.createObjectURL(file),
        name: file.name,
        blob: file,
      }))
    );
    setImages((prev) => [...prev, ...newImages]);
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  // 修改 generateGif 函数
  const generateGif = async () => {
    if (images.length === 0) return;

    setIsGenerating(true);
    try {
      // 将图片数据转换为 base64 字符串
      const imageBase64s = await Promise.all(
        images.map(async (img) => {
          if (!img.blob) return '';
          const buffer = await img.blob.arrayBuffer();
          return btoa(String.fromCharCode(...new Uint8Array(buffer)));
        })
      );

      const result: string = await invoke('generate_gif', {
        imageData: imageBase64s,
        options: {
          fps,
          quality,
          width,
          height,
          repeat,
          optimization,
          delay,
          animation, // 添加动画参数
        },
      });

      setPreviewGif(result);

      toast({
        title: '成功',
        description: 'GIF 生成成功！',
      });
    } catch (error) {
      toast({
        title: '错误',
        description: String(error),
        variant: 'destructive',
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex h-[calc(100vh-8rem)] flex-col overflow-hidden">
      <div className="flex-1 overflow-auto p-4">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* 图片上传管理区域 */}
          <Card className="flex h-[calc(100vh-10rem)] flex-col bg-card md:col-span-1">
            <CardHeader className="border-b border-border py-3">
              <CardTitle className="flex items-center gap-2 text-lg font-medium text-primary">
                <Upload className="h-5 w-5" />
                图片管理
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto p-4">
              <div
                className="rounded-lg border-2 border-dashed border-primary/20 p-6 text-center transition-colors hover:border-primary/40 dark:bg-card/50"
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
              >
                <div className="flex flex-col items-center gap-2">
                  <Upload className="h-8 w-8 text-gray-400" />
                  <p className="text-sm">拖放图片或点击上传</p>
                  <Button variant="outline" size="sm" onClick={() => fileInputRef.current?.click()}>
                    选择文件
                  </Button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileSelect}
                  />
                </div>
              </div>

              <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="image-list">
                  {(provided) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="mt-4 space-y-2"
                    >
                      {images.map((image, index) => (
                        <Draggable key={image.preview} draggableId={image.preview} index={index}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={`group relative flex items-center gap-2 rounded-lg bg-secondary/20 p-2 dark:bg-secondary/10 ${snapshot.isDragging ? 'ring-2 ring-primary' : ''}`}
                            >
                              <img
                                src={image.preview}
                                alt={image.name}
                                className="h-12 w-12 rounded object-cover"
                              />
                              <span className="flex-1 truncate text-sm">{image.name}</span>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="opacity-0 group-hover:opacity-100"
                                onClick={() => removeImage(index)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            </CardContent>

            <div className="space-y-2 border-t border-border p-4">
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearAllImages}
                  disabled={images.length === 0}
                  className="w-full"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  清空
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={sortImages}
                  disabled={images.length < 2}
                  className="w-full"
                >
                  <SortAsc className="mr-2 h-4 w-4" />
                  排序
                </Button>
              </div>
            </div>
          </Card>

          {/* 参数控制区域 */}
          <Card className="flex h-[calc(100vh-10rem)] flex-col bg-card md:col-span-1">
            <CardHeader className="border-b border-border py-3">
              <CardTitle className="flex items-center gap-2 text-lg font-medium text-primary">
                <Settings className="h-5 w-5" />
                参数设置
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 space-y-6 overflow-auto p-4">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>宽度</Label>
                  <input
                    type="number"
                    value={width}
                    onChange={(e) => setWidth(Number(e.target.value))}
                    className="w-full rounded-md border px-3 py-2"
                  />
                </div>
                <div className="space-y-2">
                  <Label>高度</Label>
                  <input
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(Number(e.target.value))}
                    className="w-full rounded-md border px-3 py-2"
                  />
                </div>
              </div>
              <div className="space-y-4">
                <Label>帧率 (FPS)</Label>
                <div className="flex items-center gap-4">
                  <Slider
                    value={[fps]}
                    onValueChange={([value]) => setFps(value)}
                    max={60}
                    step={1}
                    className="flex-1"
                  />
                  <span className="w-12 text-right">{fps}</span>
                </div>
              </div>
              <div className="space-y-4">
                <Label>帧间延迟</Label>
                <div className="flex items-center gap-4">
                  <Slider
                    value={[delay]}
                    onValueChange={([value]) => setDelay(value)}
                    min={10}
                    max={1000}
                    step={10}
                    className="flex-1"
                  />
                  <span className="w-16 text-right">{delay}ms</span>
                </div>
              </div>

              {/* 动画效果 */}
              <div className="space-y-2">
                <Label>动画效果</Label>
                <Select value={animation} onValueChange={setAnimation}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">无效果</SelectItem>
                    <SelectItem value="fade">淡入淡出</SelectItem>
                    <SelectItem value="slide">滑动</SelectItem>
                    <SelectItem value="zoom">缩放</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                <Label>质量</Label>
                <div className="flex items-center gap-4">
                  <Slider
                    value={[quality]}
                    onValueChange={([value]) => setQuality(value)}
                    max={100}
                    step={1}
                    className="flex-1"
                  />
                  <span className="w-12 text-right">{quality}%</span>
                </div>
              </div>
              <div className="space-y-2">
                <Label>循环方式</Label>
                <Select value={repeat} onValueChange={setRepeat}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="infinite">无限循环</SelectItem>
                    <SelectItem value="none">不循环</SelectItem>
                    <SelectItem value="3">循环3次</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>优化级别</Label>
                <Select
                  value={optimization.toString()}
                  onValueChange={(v) => setOptimization(Number(v))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">低</SelectItem>
                    <SelectItem value="3">中</SelectItem>
                    <SelectItem value="5">高</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                disabled={images.length === 0 || isGenerating}
                onClick={generateGif}
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    生成中...
                  </>
                ) : (
                  '生成 GIF'
                )}
              </Button>
            </CardContent>
          </Card>

          {/* 预览区域 */}
          <Card className="flex h-[calc(100vh-10rem)] flex-col bg-card md:col-span-1">
            <CardHeader className="border-b border-border py-3">
              <CardTitle className="flex items-center justify-between text-lg font-medium text-primary">
                <div className="flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  预览
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-1 items-center justify-center overflow-auto p-4">
              {previewGif ? (
                <img
                  src={previewGif}
                  alt="Generated GIF"
                  className="max-h-[600px] max-w-full rounded-lg object-contain"
                />
              ) : (
                <div className="text-center text-muted-foreground">
                  <p>生成 GIF 后在此处预览</p>
                </div>
              )}
            </CardContent>

            <div className="border-t border-border p-4">
              {previewGif && (
                <Button
                  variant="outline"
                  className="w-full border-primary/20 hover:border-primary dark:border-primary/40 dark:hover:border-primary/80"
                  onClick={downloadGif}
                >
                  <Download className="mr-2 h-4 w-4" />
                  下载 GIF
                </Button>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default GifGenerator;
