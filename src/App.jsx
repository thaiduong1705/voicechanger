import { useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
	const [filePath, setFilePath] = useState("");
	const [outputPath, setOutputPath] = useState("E:\DMT_AI\output\out.wav")
	// useEffect(() => {
	// 	let ignore = false;
	// 	if (file != "" && !ignore) {
	// 		// axios.post("http://127.0.0.1:5000/message", {
	// 		// 	audio_input:"E:\\RVC1006Nvidia\\RVC1006Nvidia\\opt\\vocal_y2matejljjtjx1.com - NHỮNG LỜI HỨA BỎ QUÊN  VŨ x DEAR JANE Official MV.mp3_10.wav",
    // 		// 	pitch:0,
    // 		// 	model_path:"E:\\RVC1006Nvidia\\RVC1006Nvidia\\assets\\weights\\captain-quang.pth"
	// 		// });
	// 	}

	// 	return () => {
	// 		ignore = true;
	// 	};
	// }, [file]);

	const handleClick = async () => {
		const response = await axios.post("http://127.0.0.1:5000/message", {
			audio_input: filePath,
			pitch:0,
			model_path:"E:\\RVC1006Nvidia\\RVC1006Nvidia\\assets\\weights\\captain-quang.pth"
		});

		if (response.status === 200) {
			setOutputPath(prev => response.data.path)
			console.log(outputPath)
		}
	}
	return ( 
		<div className="wrapper">
			<div className="text-xl ">
				<div className="block">
					<input type="text" onChange={(e) => setFilePath(e.target.value)} className="w-[1000px]"/>
					<button onClick={handleClick} className="block outline-none border-none bg-green-500 mt-8 text-4xl hover:cursor-pointer disabled:bg-gray-700" disabled={!filePath}>Generate</button>
					{outputPath != "" && (
						<figure>
							<figcaption className="my-4 text-4xl">Nghe giọng thánh thót của Cấn Đức Quang</figcaption>
							<audio
								controls
								className="my-4 w-[100%]"

							>
								<source src={outputPath} type="audio/wav"></source>
							</audio>

							
						</figure>
					)}
				</div>
			</div>
		</div>
	);
}

export default App;

