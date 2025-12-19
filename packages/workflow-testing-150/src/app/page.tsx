'use client';

import { useState } from 'react';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isDark, setIsDark] = useState(false);

  const addTodo = () => {
    if (inputValue.trim() === '') return;
    
    const newTodo: Todo = {
      id: Date.now(),
      text: inputValue,
      completed: false,
    };
    
    setTodos([...todos, newTodo]);
    setInputValue('');
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };

  return (
    <div className={`min-h-screen p-6 flex items-center justify-center transition-colors ${
      isDark 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
        : 'bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500'
    }`}>
      <div className={`w-full max-w-2xl rounded-2xl shadow-2xl p-8 transition-colors ${
        isDark ? 'bg-gray-800' : 'bg-white'
      }`}>
        <div className="flex items-center justify-between mb-8">
          <h1 className={`text-4xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>
            Get Things Done
          </h1>
          <button
            onClick={() => setIsDark(!isDark)}
            className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
              isDark 
                ? 'bg-yellow-400 text-gray-900 hover:bg-yellow-300' 
                : 'bg-gray-800 text-white hover:bg-gray-700'
            }`}
          >
            {isDark ? '☀️ Light' : '🌙 Dark'}
          </button>
        </div>
        
        {/* Input Section */}
        <div className="flex gap-2 mb-6">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Add a new task..."
            className={`flex-1 px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors ${
              isDark 
                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-purple-400' 
                : 'bg-white border-gray-300 text-gray-800 placeholder-gray-500 focus:border-purple-500'
            }`}
          />
          <button
            onClick={addTodo}
            className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-semibold"
          >
            Add
          </button>
        </div>

        {/* Todo List */}
        <div className="space-y-2">
          {todos.length === 0 ? (
            <p className={`text-center py-8 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
              No tasks yet. Add one above!
            </p>
          ) : (
            todos.map((todo) => (
              <div
                key={todo.id}
                className={`flex items-center gap-3 p-4 rounded-lg transition-colors ${
                  isDark 
                    ? 'bg-gray-700 hover:bg-gray-600' 
                    : 'bg-gray-50 hover:bg-gray-100'
                }`}
              >
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                  className="w-5 h-5 cursor-pointer accent-purple-600"
                />
                <span
                  className={`flex-1 text-lg ${
                    todo.completed
                      ? `line-through ${isDark ? 'text-gray-500' : 'text-gray-400'}`
                      : isDark ? 'text-white' : 'text-gray-800'
                  }`}
                >
                  {todo.text}
                </span>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>

        {/* Stats */}
        {todos.length > 0 && (
          <div className={`mt-6 pt-6 border-t text-center ${
            isDark 
              ? 'border-gray-700 text-gray-400' 
              : 'border-gray-200 text-gray-600'
          }`}>
            <p>
              {todos.filter(t => t.completed).length} of {todos.length} tasks completed
            </p>
          </div>
        )}
      </div>
    </div>
  );
}







