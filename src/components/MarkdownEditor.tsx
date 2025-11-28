import { useState, useRef, ChangeEvent } from 'react';
import { marked } from 'marked';
import {
  Bold,
  Italic,
  Code,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Link as LinkIcon,
  Image,
  Upload,
  Eye,
  EyeOff,
  LayoutGrid,
  LayoutPanelTop,
  Loader2,
  X,
} from 'lucide-react';
import { uploadService } from '../services/upload.service';

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

type PreviewLayout = 'side' | 'bottom';

export default function MarkdownEditor({
  value,
  onChange,
  placeholder = 'Escreva seu conteúdo em Markdown...',
}: MarkdownEditorProps) {
  const [showPreview, setShowPreview] = useState(true);
  const [previewLayout, setPreviewLayout] = useState<PreviewLayout>('side');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [showImageModal, setShowImageModal] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const insertText = (before: string, after: string = '', placeholder: string = '') => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);
    const textToInsert = selectedText || placeholder;

    const newValue =
      value.substring(0, start) +
      before +
      textToInsert +
      after +
      value.substring(end);

    onChange(newValue);

    setTimeout(() => {
      textarea.focus();
      const newStart = start + before.length;
      const newEnd = newStart + textToInsert.length;
      textarea.setSelectionRange(newStart, newEnd);
    }, 0);
  };

  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      setUploadError('');

      const result = await uploadService.uploadImage(file);
      const fullUrl = uploadService.getImageUrl(result.url);

      const altText = file.name.replace(/\.[^/.]+$/, '');
      insertText(`![${altText}](`, `${fullUrl})`);

      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      setUploadError(error instanceof Error ? error.message : 'Erro ao fazer upload');
    } finally {
      setIsUploading(false);
    }
  };

  const handleImageUrlInsert = () => {
    if (imageUrl.trim()) {
      insertText('![Descrição da imagem](', `${imageUrl.trim()})`);
      setImageUrl('');
      setShowImageModal(false);
    }
  };

  const handleToolbar = (action: string) => {
    switch (action) {
      case 'bold':
        insertText('**', '**', 'texto em negrito');
        break;
      case 'italic':
        insertText('*', '*', 'texto em itálico');
        break;
      case 'code':
        insertText('`', '`', 'código');
        break;
      case 'h1':
        insertText('# ', '', 'Título 1');
        break;
      case 'h2':
        insertText('## ', '', 'Título 2');
        break;
      case 'h3':
        insertText('### ', '', 'Título 3');
        break;
      case 'list':
        insertText('- ', '', 'item da lista');
        break;
      case 'ordered-list':
        insertText('1. ', '', 'item da lista');
        break;
      case 'quote':
        insertText('> ', '', 'citação');
        break;
      case 'link':
        insertText('[', '](url)', 'texto do link');
        break;
      case 'image-url':
        setShowImageModal(true);
        break;
      case 'image-upload':
        fileInputRef.current?.click();
        break;
    }
  };

  const renderPreview = () => {
    try {
      const html = marked(value || '*Nenhum conteúdo ainda...*');
      return <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: html }} />;
    } catch (error) {
      return <div className="text-red-500">Erro ao renderizar Markdown</div>;
    }
  };

  const isLayoutSide = previewLayout === 'side';

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="border border-gray-200 rounded-lg p-3 bg-gray-50">
        <div className="flex flex-wrap gap-2">
          {/* Formatação */}
          <div className="flex gap-1 border-r pr-2">
            <button
              type="button"
              onClick={() => handleToolbar('bold')}
              className="p-2 hover:bg-gray-200 rounded"
              title="Negrito"
            >
              <Bold size={18} />
            </button>
            <button
              type="button"
              onClick={() => handleToolbar('italic')}
              className="p-2 hover:bg-gray-200 rounded"
              title="Itálico"
            >
              <Italic size={18} />
            </button>
            <button
              type="button"
              onClick={() => handleToolbar('code')}
              className="p-2 hover:bg-gray-200 rounded"
              title="Código"
            >
              <Code size={18} />
            </button>
          </div>

          {/* Títulos */}
          <div className="flex gap-1 border-r pr-2">
            <button
              type="button"
              onClick={() => handleToolbar('h1')}
              className="p-2 hover:bg-gray-200 rounded"
              title="Título 1"
            >
              <Heading1 size={18} />
            </button>
            <button
              type="button"
              onClick={() => handleToolbar('h2')}
              className="p-2 hover:bg-gray-200 rounded"
              title="Título 2"
            >
              <Heading2 size={18} />
            </button>
            <button
              type="button"
              onClick={() => handleToolbar('h3')}
              className="p-2 hover:bg-gray-200 rounded"
              title="Título 3"
            >
              <Heading3 size={18} />
            </button>
          </div>

          {/* Listas */}
          <div className="flex gap-1 border-r pr-2">
            <button
              type="button"
              onClick={() => handleToolbar('list')}
              className="p-2 hover:bg-gray-200 rounded"
              title="Lista"
            >
              <List size={18} />
            </button>
            <button
              type="button"
              onClick={() => handleToolbar('ordered-list')}
              className="p-2 hover:bg-gray-200 rounded"
              title="Lista Numerada"
            >
              <ListOrdered size={18} />
            </button>
          </div>

          {/* Links e Imagens */}
          <div className="flex gap-1 border-r pr-2">
            <button
              type="button"
              onClick={() => handleToolbar('quote')}
              className="p-2 hover:bg-gray-200 rounded"
              title="Citação"
            >
              <Quote size={18} />
            </button>
            <button
              type="button"
              onClick={() => handleToolbar('link')}
              className="p-2 hover:bg-gray-200 rounded"
              title="Link"
            >
              <LinkIcon size={18} />
            </button>
            <button
              type="button"
              onClick={() => handleToolbar('image-url')}
              className="p-2 hover:bg-gray-200 rounded"
              title="Inserir Imagem (URL)"
            >
              <Image size={18} />
            </button>
            <button
              type="button"
              onClick={() => handleToolbar('image-upload')}
              className={`p-2 hover:bg-gray-200 rounded ${isUploading ? 'opacity-50' : ''}`}
              title="Upload de Imagem"
              disabled={isUploading}
            >
              {isUploading ? <Loader2 size={18} className="animate-spin" /> : <Upload size={18} />}
            </button>
          </div>

          {/* Controles de visualização */}
          <div className="flex gap-1 ml-auto">
            <button
              type="button"
              onClick={() => setPreviewLayout(isLayoutSide ? 'bottom' : 'side')}
              className="p-2 hover:bg-gray-200 rounded"
              title={isLayoutSide ? 'Preview Abaixo' : 'Preview ao Lado'}
            >
              {isLayoutSide ? <LayoutPanelTop size={18} /> : <LayoutGrid size={18} />}
            </button>
            <button
              type="button"
              onClick={() => setShowPreview(!showPreview)}
              className="p-2 hover:bg-gray-200 rounded"
              title={showPreview ? 'Ocultar Preview' : 'Mostrar Preview'}
            >
              {showPreview ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {/* Erros de upload */}
        {uploadError && (
          <div className="mt-2 p-2 bg-red-50 border border-red-200 text-red-700 text-sm rounded">
            {uploadError}
          </div>
        )}
      </div>

      {/* Input file escondido */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
      />

      {/* Editor e Preview */}
      <div className={`flex gap-4 ${isLayoutSide ? 'flex-row' : 'flex-col'}`}>
        {/* Editor */}
        <div className={showPreview ? (isLayoutSide ? 'w-1/2' : 'w-full') : 'w-full'}>
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className={`w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm resize-y ${
              isLayoutSide ? 'min-h-[500px]' : 'min-h-[300px]'
            }`}
            style={{ height: isLayoutSide ? '500px' : '300px' }}
          />
          <div className="text-xs text-gray-500 mt-1">
            {value.length} caracteres
          </div>
        </div>

        {/* Preview */}
        {showPreview && (
          <div className={isLayoutSide ? 'w-1/2' : 'w-full'}>
            <div
              className={`border border-gray-300 rounded-lg p-4 bg-white overflow-auto ${
                isLayoutSide ? 'min-h-[500px]' : 'min-h-[300px]'
              }`}
              style={{ height: isLayoutSide ? '500px' : '300px' }}
            >
              <div className="text-xs text-gray-500 mb-2 font-semibold">Preview:</div>
              {renderPreview()}
            </div>
          </div>
        )}
      </div>

      {/* Modal para inserir URL de imagem */}
      {showImageModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Inserir Imagem por URL</h3>
              <button
                onClick={() => {
                  setShowImageModal(false);
                  setImageUrl('');
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://exemplo.com/imagem.jpg"
              className="w-full p-2 border border-gray-300 rounded mb-4"
              autoFocus
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleImageUrlInsert();
                }
              }}
            />
            <div className="flex gap-2 justify-end">
              <button
                onClick={() => {
                  setShowImageModal(false);
                  setImageUrl('');
                }}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
              >
                Cancelar
              </button>
              <button
                onClick={handleImageUrlInsert}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                disabled={!imageUrl.trim()}
              >
                Inserir
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
