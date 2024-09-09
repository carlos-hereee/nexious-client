import { useRef, useEffect } from "react";

export const useDrag = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    const button = buttonRef.current;

    if (button) {
      const handleDragStart = (event: DragEvent) => {
        // Your logic for handling the dragstart event goes here
        console.log("Drag started!");

        console.log("event :>> ", event);
        // Set the drag data if needed
        // event.dataTransfer.setData('text/plain', 'some data');
      };

      button.addEventListener("dragstart", (e) => handleDragStart(e));

      // Cleanup the event listener when the component unmounts
      return () => button.removeEventListener("dragstart", (e) => handleDragStart(e));
    }
  }, []);

  return { buttonRef };
};
