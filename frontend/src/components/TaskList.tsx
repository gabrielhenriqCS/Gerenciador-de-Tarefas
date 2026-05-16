import type { Task } from "../@types";

interface TaskListProps {
  tasks: Task[];
  onToggleStatus: (id: string, currentStatus: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

const categoryColors: Record<string, string> = {
  TRABALHO: "bg-blue-500/20 text-blue-300",
  PESSOAL: "bg-purple-500/20 text-purple-300",
  ESTUDOS: "bg-orange-500/20 text-orange-300",
};

const statusEmoji: Record<string, string> = {
  NOVA: "🆕",
  PENDENTE: "⏳",
  CONCLUIDA: "✅",
};

export function TaskList({
  tasks,
  onToggleStatus,
  onEdit,
  onDelete,
}: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-12 bg-slate-700/30 border border-slate-600 rounded-lg">
        <p className="text-slate-400 text-lg">Nenhuma tarefa por enquanto 🎉</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <div
          key={task.id}
          className={`flex items-start gap-4 p-4 bg-slate-700/50 border border-slate-600 rounded-lg hover:bg-slate-700/70 transition ${
            task.status === "CONCLUIDA" ? "opacity-60" : ""
          }`}
        >
          {/* Checkbox - Marcar como concluída */}
          <button
            onClick={() => onToggleStatus(task.id, task.status)}
            className={`mt-1 flex-shrink-0 w-6 h-6 rounded border-2 flex items-center justify-center font-bold text-sm transition ${
              task.status === "CONCLUIDA"
                ? "bg-green-500 border-green-500 text-white"
                : "border-slate-500 hover:border-green-500 text-slate-400"
            }`}
            title={
              task.status === "CONCLUIDA"
                ? "Marcar como pendente"
                : "Marcar como concluído"
            }
          >
            {task.status === "CONCLUIDA" ? "✓" : ""}
          </button>

          {/* Conteúdo da Tarefa */}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">{statusEmoji[task.status]}</span>
              <h3
                className={`font-medium text-lg transition ${
                  task.status === "CONCLUIDA"
                    ? "line-through text-slate-400"
                    : "text-white"
                }`}
              >
                {task.titulo}
              </h3>
            </div>

            {task.descricao && (
              <p className="text-sm text-slate-400 mb-3 line-clamp-2">
                {task.descricao}
              </p>
            )}

            <div className="flex items-center gap-2 flex-wrap">
              <span
                className={`text-xs px-2 py-1 rounded ${categoryColors[task.categoria]}`}
              >
                {task.categoria}
              </span>
              <span className="text-xs text-slate-400">
                📅 {new Date(task.prazo).toLocaleDateString("pt-BR")}
              </span>
            </div>
          </div>

          {/* Botões de Ação */}
          <div className="flex gap-2 flex-shrink-0">
            <button
              onClick={() => onEdit(task)}
              className="p-2 text-slate-400 hover:bg-blue-500/20 hover:text-blue-300 rounded transition"
              title="Editar"
            >
              ✏️
            </button>
            <button
              onClick={() => onDelete(task.id)}
              className="p-2 text-slate-400 hover:bg-red-500/20 hover:text-red-300 rounded transition"
              title="Deletar"
            >
              🗑️
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
