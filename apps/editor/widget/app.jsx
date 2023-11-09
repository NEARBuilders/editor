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
      <Button onClick={() => Social.set({
        index: {
          every: JSON.stringify({
            key: "thing", // type
            value: {
              src: "efiz.near/widget/Tree"
            }
          })
        }
      })}>Publish</Button>
    </Header>
  );
}

const [editorValue, setEditorValue] = useState("");
const [editorSrc, setEditorSrc] = useState("editor.near/widget/markdown.edit");
const [viewerSrc, setViewerSrc] = useState("editor.near/widget/markdown.view");

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
          { value: "editor.near/widget/markdown.edit", label: "Markdown" },
          { value: "editor.near/widget/code.edit", label: "Code" },
          { value: "editor.near/widget/canvas.edit", label: "Canvas" },
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
          { value: "editor.near/widget/markdown.view", label: "Markdown" },
          { value: "editor.near/widget/code.view", label: "Code" },
          { value: "editor.near/widget/canvas.view", label: "Canvas" },
        ]}
        onChange={handleViewerSrcChange}
      />
      <Wrapper key={viewerSrc}>
        <Viewer value={editorValue} />
      </Wrapper>
    </Panel>
  </Container>
);
