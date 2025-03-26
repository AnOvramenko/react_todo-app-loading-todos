import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoItem } from './TodoItem';

interface Props {
  todos: Todo[];
  OnChangeTodoStatus: (id: number) => void;
  OnDelete: (id: number) => void;
  OnUpdateTodo: (todo: Todo) => void;
}

export const TodoList: React.FC<Props> = ({
  todos,
  OnChangeTodoStatus,
  OnDelete,
  OnUpdateTodo,
}) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.map(todo => {
        return (
          <TodoItem
            todo={todo}
            key={todo.id}
            OnChangeTodoStatus={OnChangeTodoStatus}
            OnDelete={OnDelete}
            OnUpdateTodo={OnUpdateTodo}
          />
        );
      })}
    </section>
  );
};
