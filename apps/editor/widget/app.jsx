const Container = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
`;

const Panel = styled.div`
  flex: 1;
  border: 1px solid black;
  overflow: hidden;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: stretch;
  height: 100%;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid black;
`;

const Select = styled.select``;

const Option = styled.option``;

const Button = styled.button``;

function PanelHeader({ options, onChange }) {
  return (
    <Header>
      <Select onChange={(e) => onChange(e.target.value)}>
        {options &&
          options.map((it) => <Option value={it.value}>{it.label}</Option>)}
      </Select>
      <Button>Click Me</Button>
    </Header>
  );
}

const [editorValue, setEditorValue] = useState("");
const [editorSrc, setEditorSrc] = useState("editor.near/widget/edit.Markdown");
const [viewerSrc, setViewerSrc] = useState("editor.near/widget/view.Markdown");

function handleEditorChange(value) {
  setEditorValue(value);
}

function handleEditorSrcChange(value) {
  setEditorSrc(value);
}

function handleViewerSrcChange(value) {
  setViewerSrc(value);
}

function Editor({ value, onChange, onSubmit, onCancel }) {
  return (
    <Widget src={editorSrc} props={{ value, onChange, onSubmit, onCancel }} />
  );
}

function Viewer({ value }) {
  return <Widget src={viewerSrc} props={{ value }} />;
}

return (
  <Container>
    <Panel>
      <PanelHeader
        options={[
          { value: "editor.near/widget/edit.Markdown", label: "Markdown" },
          { value: "editor.near/widget/edit.Code", label: "Code" },
          { value: "editor.near/widget/edit.Canvas", label: "Canvas" },
        ]}
        onChange={handleEditorSrcChange}
      />
      <Wrapper key={editorSrc}>
        <Editor value={editorValue} onChange={handleEditorChange} />
      </Wrapper>
    </Panel>
    <Panel>
      <PanelHeader
        options={[
          { value: "editor.near/widget/view.Markdown", label: "Markdown" },
          { value: "editor.near/widget/view.Code", label: "Code" },
          { value: "editor.near/widget/view.Canvas", label: "Canvas" },
        ]}
        onChange={handleViewerSrcChange}
      />
      <Wrapper key={viewerSrc}>
        <Viewer value={editorValue} />
      </Wrapper>
    </Panel>
  </Container>
);
