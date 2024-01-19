import { useState } from "react";
import "./App.css";
import axios from "axios";

const App = () => {
  const [filePath, setFilePath] = useState("");
  const [outputPath, setOutputPath] = useState(null);

  const handleClick = async () => {
    try {
      const formData = new FormData();
      formData.append("audioFile", filePath);
      formData.append("pitch", 0);

      const response = await axios.post(
        "http://127.0.0.1:5000/message",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          responseType: "blob",
        }
      );

      if (response.status === 200) {
        setOutputPath(response.data);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("audioFile", filePath);

      const response = await axios.post(
        "http://127.0.0.1:5000/uploads",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response.data);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };
  return (
    <div className="wrapper">
      <div className="flex flex-col justify-center items-center  text-xl gap-[40px] ">
        <div className="mb-4 text-4xl">Website chuyển đổi giọng hát.</div>
        <div className="flex flex-col justify-center items-center ">
          <div className="rounded border-2 border-black p-2 hover:cursor-pointer">
            <label className="hover:cursor-pointer" htmlFor="filepicker">
              Hãy chọn file bài hát.
            </label>
          </div>
          <input
            id="filepicker"
            type="file"
            accept="audio/wav"
            onChange={(e) => {
              if (!e.target.files[0]) return;
              setFilePath(e.target.files[0]);
            }}
            style={{ visibility: "hidden" }}
          />
          {filePath && <div>Bài bạn đã chọn: {filePath.name}</div>}
          <button
            onClick={handleClick}
            className="rounded block outline-none border-none bg-green-500 mt-8 text-4xl hover:cursor-pointer disabled:bg-cyan-500 p-2"
            disabled={!filePath}
          >
            Tạo bài hát với giọng của Quang
          </button>
          {outputPath && (
            <figure>
              <figcaption className="my-4 text-4xl">
                Nghe giọng của Quang hát bài hát của bạn
              </figcaption>
              <audio controls className="my-4 w-[100%]">
                <source
                  src={URL.createObjectURL(outputPath)}
                  type="audio/wav"
                ></source>
              </audio>
            </figure>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
