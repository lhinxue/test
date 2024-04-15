import React from "react";

const doNothing = () => {};
const defaultChangeHandlers = {
  onInsert: doNothing,
  onUpdate: doNothing,
  onReplace: doNothing,
  onDelete: doNothing,
};


export function useEvents(collection, changeHandlers) {
  const filter = React.useMemo(() => ({}), []);
  const handlers = { ...defaultChangeHandlers, ...changeHandlers };
  const handlersRef = React.useRef(handlers);
  React.useEffect(() => {
    handlersRef.current = {
      onInsert: handlers.onInsert,
      onUpdate: handlers.onUpdate,
      onDelete: handlers.onDelete,
    };
  }, [
    handlers.onInsert,
    handlers.onUpdate,
    handlers.onDelete,
  ]);
  
  React.useEffect(() => {
    let stream;
    const watchTodos = async () => {
      stream = collection.watch({ filter });
      for await (const change of stream) {
        switch (change.operationType) {
          case "insert": {
            handlersRef.current.onInsert(change);
            break;
          }
          case "update": {
            handlersRef.current.onUpdate(change);
            break;
          }
          case "replace": {
            handlersRef.current.onReplace(change);
            break;
          }
          case "delete": {
            handlersRef.current.onDelete(change);
            break;
          }
          default: {
            // change.operationType will always be one of the specified cases, so we should never hit this default
            throw new Error(
              `Invalid change operation type: ${change.operationType}`
            );
          }
        }
      }
    };
    watchTodos();
    return () => {
      // Close the change stream in the effect cleanup
      stream?.return()
    }
  }, [collection, filter]);
}
