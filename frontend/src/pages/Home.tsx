import { useState, useEffect } from "react";
import { TaskForm } from "../components/TaskForm";
import { TaskList } from "../components/TaskList";
import { CreateTaskFormData, Task } from "../@types";
import { 
  listTasks, 
  createTask, 
  updateTask, 
  updateTaskStatus, 
  deleteTask, 
  CreateTaskInput
} from "../services/api";

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    loadTasks();
  }, []);

  async function loadTasks() {
    try {
      setIsLoading(true);
      const response = await listTasks();
      
      if (response.data.success) {
        setTasks(response.data.data);
      }
      setError(null);
    } catch (err) {
      setError("Erro ao carregar tarefas da API");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleCreateTask(formData: CreateTaskInput) {
    try {
      const response = await createTask(formData);
      if (response.data.success) {
        await loadTasks();
        setShowForm(false);
        setEditingTask(null);
      }
    } catch (err) {
      setError("Erro ao criar tarefa");
      console.error(err);
    }
  }

  async function handleUpdateTask(id: string, formData: CreateTaskFormData) {
    try {
      const response = await updateTask(id, formData);
      if (response.data.success) {
        await loadTasks();
        setShowForm(false);
        setEditingTask(null);
      }
    } catch (err) {
      setError("Erro ao atualizar tarefa");
      console.error(err);
    }
  }

  function handleToggleStatus(id: string, currentStatus: string) {
    const newStatus = currentStatus === "PENDENTE" ? "CONCLUIDA" : "PENDENTE";

    updateTaskStatus(id, newStatus)
      .then((response) => {
        if (response.data.success) {
          loadTasks();
        }
      })
      .catch((err) => {
        setError("Erro ao atualizar status da tarefa");
        console.error(err);
      });
  }

  async function handleDeleteTask(id: string) {
    if (!window.confirm("Tem certeza que deseja excluir esta tarefa?")) return;
    try {
      await deleteTask(id);
      await loadTasks(); 
    } catch (err) {
      setError("Erro ao excluir tarefa");
      console.error(err);
    }
  }

  function handleEdit(task: Task) {
    setEditingTask(task);
    setShowForm(true);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">📋 Minhas Tarefas</h1>
          <p className="text-slate-400">Gerencie suas tarefas de forma simples e eficiente</p>
        </div>

       
        {error && (
          <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-300">
            {error}
          </div>
        )}

      
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {showForm && (
            <div className="lg:col-span-1">
              <TaskForm
                task={editingTask}
                onSubmit={(data) => editingTask ?
                  handleUpdateTask(editingTask.id, data as CreateTaskFormData) :
                  handleCreateTask(data as CreateTaskInput)
                }
                onCancel={() => {
                  setShowForm(false);
                  setEditingTask(null);
                }}
              />
            </div>
          )}

         
          <div className={showForm ? "lg:col-span-2" : "lg:col-span-3"}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-white">
                Tarefas ({tasks.length})
              </h2>
              {!showForm && (
                <button
                  onClick={() => setShowForm(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition"
                >
                  <span>+</span>
                  Criar Tarefa
                </button>
              )}
            </div>

            {isLoading ? (
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-20 bg-slate-700/50 rounded-lg animate-pulse" />
                ))}
              </div>
            ) : (
              <TaskList
                tasks={tasks}
                onToggleStatus={handleToggleStatus}
                onEdit={handleEdit}
                onDelete={handleDeleteTask}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}