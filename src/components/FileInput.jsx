export const FileInputComponent = ({ onFileInput }) => {
  const readFile = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target.result;
      onFileInput(content)
    };
    reader.readAsText(file);
  }
  return (
    <input type="file" onChange={(e) => readFile(e)} />
  );
};