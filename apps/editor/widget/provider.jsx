const { path, blockHeight, Children } = props;

let data = "";
if (path) {
  data = Social.get(path, blockHeight);

  if (!data) {
    return <p>Loading...</p>;
  }
}

const [editorValue, setEditorValue] = useState(data);

function handleEditorChange(value) {
  setEditorValue(value);
}

return <Children value={data} onChange={handleEditorChange} />;
