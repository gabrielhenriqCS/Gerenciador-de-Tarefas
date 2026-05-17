import { useState } from "react";
import { Task } from "../@types";

interface TaskFormProps {
  task?: Task | null;
  onSubmit: (data: {
    titulo: string;
    descricao?: string;
    prazo: string;
    categoria: string;
  }) => void;
  onCancel: () => void;
}

export function TaskForm({ task, onSubmit, onCancel }: TaskFormProps) {
  const [titulo, setTitulo] = useState(task?.titulo ?? "");
  const [descricao, setDescricao] = useState(task?.descricao ?? "");
  const [prazo, setPrazo] = useState(task ? task.prazo.split("T")[0] : "");
  const [categoria, setCategoria] = useState<
    "TRABALHO" | "PESSOAL" | "ESTUDOS"
  >(task?.categoria ?? "PESSOAL");
  const [isLoading, setIsLoading] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!titulo.trim() || !prazo) {
      alert("Preencha todos os campos obrigatórios");
      return;
    }

    setIsLoading(true);
    try {
      onSubmit({
        titulo: titulo.trim(),
        descricao: descricao.trim() || undefined,
        prazo,
        categoria,
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-slate-700/50 border border-slate-600 rounded-lg p-6 space-y-4"
    >
      <h3 className="text-xl font-semibold text-white mb-4">
        {task ? "✏️ Editar Tarefa" : "+ Nova Tarefa"}
      </h3>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Título *
        </label>
        <input
          type="text"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          placeholder="Digite o título"
          className="w-full px-3 py-2 bg-slate-600 border border-slate-500 rounded text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Descrição
        </label>
        <textarea
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          placeholder="Digite a descrição (opcional)"
          rows={3}
          className="w-full px-3 py-2 bg-slate-600 border border-slate-500 rounded text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 resize-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Data de Vencimento *
        </label>
        <input
          type="date"
          value={prazo}
          onChange={(e) => setPrazo(e.target.value)}
          className="w-full px-3 py-2 bg-slate-600 border border-slate-500 rounded text-white focus:outline-none focus:border-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Categoria *
        </label>
        <select
          value={categoria}
          onChange={(e) =>
            setCategoria(e.target.value as "TRABALHO" | "PESSOAL" | "ESTUDOS")
          }
          className="w-full px-3 py-2 bg-slate-600 border border-slate-500 rounded text-white focus:outline-none focus:border-blue-500"
        >
          <option value="TRABALHO">Trabalho</option>
          <option value="PESSOAL">Pessoal</option>
          <option value="ESTUDOS">Estudos</option>
        </select>
      </div>

      <div className="flex gap-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 px-4 py-2 bg-slate-600 hover:bg-slate-500 text-white rounded font-medium transition"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white rounded font-medium transition"
        >
          {isLoading ? "Salvando..." : task ? "Atualizar" : "Criar"}
        </button>
      </div>
    </form>
  );
}
