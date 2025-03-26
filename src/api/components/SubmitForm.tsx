import React, { useState } from 'react';
import { Todo } from '../../types/Todo';
import { USER_ID } from '../todos';
interface Props {
  inputClassName: string;

  todos?: Todo[];
  onAddTodo?: (todo: Todo) => void;

  updateTodo?: Todo;
  setIsUpdate?: (val: boolean) => void;
  OnUpdateTodo?: (todo: Todo) => void;
  OnDelete?: (id: number) => void;
}

export const SubmitForm: React.FC<Props> = ({
  todos,
  onAddTodo,
  updateTodo,
  setIsUpdate,
  OnUpdateTodo,
  inputClassName,
  OnDelete,
}) => {
  const [inputQuery, setInputQuery] = useState(updateTodo?.title || '');

  const handleOnSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (updateTodo && setIsUpdate && OnUpdateTodo && OnDelete) {
      if (inputQuery.trim()) {
        const updatedTodo = {
          id: updateTodo.id,
          userId: USER_ID,
          title: inputQuery,
          completed: updateTodo.completed,
        };

        OnUpdateTodo(updatedTodo);
      } else {
        OnDelete(updateTodo.id);
      }

      setIsUpdate(false);
    }

    if (todos && onAddTodo) {
      if (!inputQuery.trim()) {
        return;
      }

      const newTodo = {
        id: isFinite(Math.max(...todos.map(todo => todo.id)) + 1)
          ? Math.max(...todos.map(todo => todo.id)) + 1
          : +Math.random().toFixed(16).slice(2),
        userId: USER_ID,
        title: inputQuery,
        completed: false,
      };
      // console.log(newTodo)

      onAddTodo(newTodo);
      setInputQuery('');
    }
  };

  const handleOnBlur = () => {
    if (updateTodo && setIsUpdate && OnUpdateTodo && OnDelete) {
      // setIsUpdate(false);

      if (inputQuery.trim()) {
        const updatedTodo = {
          id: updateTodo.id,
          userId: USER_ID,
          title: inputQuery,
          completed: updateTodo.completed,
        };

        OnUpdateTodo(updatedTodo);
      } else {
        OnDelete(updateTodo.id);
      }

      setIsUpdate(false);
    }
  };

  return (
    <form onSubmit={handleOnSubmit}>
      <input
        onBlur={handleOnBlur}
        data-cy="NewTodoField"
        type="text"
        value={inputQuery}
        onChange={event => setInputQuery(event.target.value)}
        className={inputClassName}
        placeholder="What needs to be done?"
        autoFocus
      />
    </form>
  );
};
