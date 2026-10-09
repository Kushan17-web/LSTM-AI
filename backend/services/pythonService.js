const { PythonShell } = require("python-shell");
const path = require("path");

exports.predictCategory = async (studentData) => {

    const options = {
        mode: "text",
        pythonOptions: ["-u"],
        scriptPath: path.join(__dirname, "../python"),
        args: [JSON.stringify(studentData)]
    };

    const result = await PythonShell.run("predict.py", options);

    return result[0];
};