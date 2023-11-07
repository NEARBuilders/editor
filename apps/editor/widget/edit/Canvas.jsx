const { value, onChange, onSubmit, onCancel } = props;

return (
  <Canvas
    handleChangeEvent={handleChangeEvent}
    handleUiEvent={handleUiEvent}
    persistanceKey={"hello"}
  />
);
