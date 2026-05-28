interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
}

export default function Modal({ isOpen, onClose, title, description }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-zinc-900 border border-zinc-800 rounded-lg max-w-md w-full p-6 relative shadow-2xl">
        <button 
          onClick={onClose} 
          className="absolute top-3 right-4 text-zinc-400 hover:text-white text-xl"
        >
          &times;
        </button>
        <h3 className="text-xl font-bold text-white mb-4 pr-6">{title}</h3>
        <p className="text-zinc-400 text-sm leading-relaxed whitespace-pre-line">{description}</p>
        <button 
          onClick={onClose}
          className="mt-6 w-full py-2 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded text-sm transition"
        >
          Fechar
        </button>
      </div>
    </div>
  );
}