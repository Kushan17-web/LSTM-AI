const { PythonShell } = require("python-shell");

const predictCategory = async (student) => {
    try {
        const options = {
            mode: "text",
            pythonOptions: ["-u"],
            scriptPath: "./python",
            args: [JSON.stringify(student)]
        };

        const results = await PythonShell.run("predict.py", options);

        return results[0];

    } catch (error) {
        console.error("Python Prediction Error:", error);
        throw new Error("Unable to predict student category.");
    }
};

module.exports = {
    predictCategory
};