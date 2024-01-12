import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import axios from "axios";

function App() {
	const [file, setFile] = useState("");
	const [outputFile, setOutput] = useState("");

	useEffect(() => {
		let ignore = false;
		if (file != "" && !ignore) {
			axios.post("url", {});
		}

		return () => {
			ignore = true;
		};
	}, [file]);
	return (
		<div className="bg-gradient-to-r from-cyan-500 to-blue-500 h-[100%]">
			<div className="translate-x-[-50%] translate-y-[-50%] absolute left-[50%] top-[50%] text-4xl text-center ">
				<div className="block">
					<input
						type="file"
						onChange={(e) => {
							setFile(e.target.files[0]);
						}}
						accept="audio/*"
					></input>
					{file != "" && (
						<figure>
							<figcaption className="my-4">Nghe giọng thánh thót của Cấn Đức Quang</figcaption>
							<audio
								controls
								src={typeof file == "string" ? file : URL.createObjectURL(file)}
								className="my-4 w-[100%]"
							></audio>

							<a
								href={URL.createObjectURL(file)}
								download={`${URL.createObjectURL(file)}`}
								className="text-blue-700"
							>
								Tải bài hát do Quang hát.
							</a>
						</figure>
					)}
				</div>
			</div>
		</div>
	);
}

export default App;

