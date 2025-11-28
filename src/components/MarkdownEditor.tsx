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
  Eye,
  EyeOff,
} from 'lucide-react';

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function MarkdownEditor({
  value,
  onChange,
  placeholder = 'Escreva seu conteúdo em Markdown...',
}: MarkdownEditorProps) {
  const [showPreview, setShowPreview] = useState(true);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

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

    // Restaura o foco e seleciona o texto inserido
    setTimeout(() => {
      textarea.focus();
      const newStart = start + before.length;
      const newEnd = newStart + textToInsert.length;
      textarea.setSelectionRange(newStart, newEnd);
    }, 0);
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
      case 'ul':
        insertText('- ', '', 'item da lista');
        break;
      case 'ol':
        insertText('1. ', '', 'item da lista');
        break;
      case 'quote':
        insertText('> ', '', 'citação');
        break;
      case 'link':
        insertText('[', '](https://)', 'texto do link');
        break;
      case 'image':
        insertText('![', '](https://)', 'descrição da imagem');
        break;
      case 'codeblock':
        insertText('```\n', '\n```', 'seu código aqui');
        break;
    }
  };

  const renderPreview = () => {
    try {
      const html = marked(value || '');
      return html;
    } catch {
      return '<p class="text-red-500">Erro ao renderizar Markdown</p>';
    }
  };

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden">
      {/* Toolbar */}
      <div className="bg-gray-50 border-b border-gray-300 p-2 flex flex-wrap gap-1">
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
          title="Código inline"
        >
          <Code size={18} />
        </button>

        <div className="w-px bg-gray-300 mx-1" />

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

        <div className="w-px bg-gray-300 mx-1" />

        <button
          type="button"
          onClick={() => handleToolbar('ul')}
          className="p-2 hover:bg-gray-200 rounded"
          title="Lista não ordenada"
        >
          <List size={18} />
        </button>
        <button
          type="button"
          onClick={() => handleToolbar('ol')}
          className="p-2 hover:bg-gray-200 rounded"
          title="Lista ordenada"
        >
          <ListOrdered size={18} />
        </button>
        <button
          type="button"
          onClick={() => handleToolbar('quote')}
          className="p-2 hover:bg-gray-200 rounded"
          title="Citação"
        >
          <Quote size={18} />
        </button>

        <div className="w-px bg-gray-300 mx-1" />

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
          onClick={() => handleToolbar('image')}
          className="p-2 hover:bg-gray-200 rounded"
          title="Imagem"
        >
          <Image size={18} />
        </button>

        <div className="flex-1" />

        <button
          type="button"
          onClick={() => setShowPreview(!showPreview)}
          className={`p-2 rounded ${showPreview ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-200'}`}
          title={showPreview ? 'Ocultar preview' : 'Mostrar preview'}
        >
          {showPreview ? <Eye size={18} /> : <EyeOff size={18} />}
        </button>
      </div>

      {/* Editor Area */}
      <div className="grid grid-cols-1 md:grid-cols-2 divide-x divide-gray-300">
        {/* Textarea */}
        <div className="relative">
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full h-96 p-4 font-mono text-sm resize-none focus:outline-none"
            style={{ minHeight: '400px' }}
          />
        </div>

        {/* Preview */}
        {showPreview && (
          <div className="p-4 overflow-auto bg-gray-50" style={{ minHeight: '400px' }}>
            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: renderPreview() }}
            />
          </div>
        )}
      </div>

      {/* Footer Info */}
      <div className="bg-gray-50 border-t border-gray-300 px-4 py-2 text-xs text-gray-500">
        {value.length} caracteres | Markdown suportado
      </div>
    </div>
  );
}
