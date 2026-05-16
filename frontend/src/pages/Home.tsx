import { useState, useEffect } from "react";
import { TaskForm } from "../components/TaskForm";
import { TaskList } from "../components/TaskList";
import { tasksApi } from "../services/api";
import { CreateTaskFormData, Task } from "../@types";

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
      const response = await tasksApi.list();
      setTasks(response.data);
      setError(null);
    } catch (err) {
      setError("Erro ao carregar tarefas");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleCreateTask(formData: CreateTaskFormData) {
    try {
      await tasksApi.create(formData);
      await loadTasks();
      setShowForm(false);
      setEditingTask(null);
    } catch (err) {
      setError("Erro ao criar tarefa");
      console.error(err);
    }
  }

  async function handleUpdateTask(id: string, formData: CreateTaskFormData) {
    try {
      await tasksApi.update(id, formData);
      await loadTasks();
      setShowForm(false);
      setEditingTask(null);
    } catch (err) {
      setError("Erro ao atualizar tarefa");
      console.error(err);
    }
  }

  async function handleToggleStatus(id: string, currentStatus: string) {
    try {
      const newStatus = currentStatus === "PENDENTE" ? "CONCLUIDA" : "PENDENTE";
      await tasksApi.updateStatus(id, newStatus);
      await loadTasks();
    } catch (err) {
      setError("Erro ao atualizar status");
      console.error(err);
    }
  }

  async function handleDeleteTask(id: string) {
    if (!window.confirm("Tem certeza que deseja excluir?")) return;
    try {
      await tasksApi.delete(id);
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

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-300">
            {error}
          </div>
        )}

        {/* Main Container */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Form Section */}
          {showForm && (
            <div className="lg:col-span-1">
              <TaskForm
                task={editingTask}
                onSubmit={(data) => editingTask ?
                  handleUpdateTask(editingTask.id, data as CreateTaskFormData) :
                  handleCreateTask(data as CreateTaskFormData)
                }
                onCancel={() => {
                  setShowForm(false);
                  setEditingTask(null);
                }}
              />
            </div>
          )}

          {/* Tasks Section */}
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
