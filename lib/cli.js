const inquirer = require('inquirer');
const Colors = require('colors');
const SVG = require("./svg");
const { Circle, Triangle, Square } = require('./shapes')
const { writeFile } = require('fs/promises');
const { error } = require('console');


class CLI {
    run() {
        return inquirer
            .prompt([
        {
            type: 'input',
            name: 'Initials',
            message: Colors.magenta('Enter up to 3 characters for your initials...')
        },
        {
            type: 'input',
            name: 'TextColor',
            message: Colors.magenta('Enter color keyword or #hex for your text color...')
        },
        {
            type: 'list',
            name: 'Shape',
            message: Colors.magenta('Choose a shape for your logo...'),
            choices: ['Circle', 'Triangle', 'Square']
        },
        {
            type: 'input',
            name: 'ShapeColor',
            message: Colors.magenta('Enter a color keyword or #hex for your background color...')
        },
        ]) 
        .then((response) => {
            console.log(response)
        }) .catch((error) => {
            console.log(error)
        });
    }

}

function writeToFile(fileName, data) {
    console.log("Writing [" + data + "] to file [" + fileName + "]")
    filesystem.writeFile(fileName, data, function (err) {
        if (err) {
            return console.log(err);
        }
        console.log("Congratulations, you have Generated a logo.svg!");
    });
}


async function init() {
    console.log("Starting init");
	var svgString = "";
	var svg_file = "logo.svg";

    // Prompt the user for answers
    const answers = await inquirer.prompt(questions);

	//user text
	var user_text = "";
	if (answers.text.length > 0 && answers.text.length < 4) {
		// 1-3 chars, valid entry
		user_text = answers.text;
	} else {
		// 0 or 4+ chars, invalid entry
		console.log("Invalid user text field detected! Please enter 1-3 Characters, no more and no less");
        return;
	}
	console.log("User text: [" + user_text + "]");
	//user font color
	user_font_color = answers["text-color"];
	console.log("User font color: [" + user_font_color + "]");
	//user shape color
	user_shape_color = answers.shape;
	console.log("User shape color: [" + user_shape_color + "]");
	//user shape type
	user_shape_type = answers["pixel-image"];
	console.log("User entered shape = [" + user_shape_type + "]");
	
	//user shape
	let user_shape;
	if (user_shape_type === "Square" || user_shape_type === "square") {
		user_shape = new Square();
		console.log("User selected Square shape");
	}
	else if (user_shape_type === "Circle" || user_shape_type === "circle") {
		user_shape = new Circle();
		console.log("User selected Circle shape");
	}
	else if (user_shape_type === "Triangle" || user_shape_type === "triangle") {
		user_shape = new Triangle();
		console.log("User selected Triangle shape");
	}
	else {
		console.log("Invalid shape!");
	}
	user_shape.setColor(user_shape_color);

	// Create a new Svg instance and add the shape and text elements to it
	var svg = new Svg();
	svg.setTextElement(user_text, user_font_color);
	svg.setShapeElement(user_shape);
	svgString = svg.render();
	
	//Print shape to log
	console.log("Displaying shape:\n\n" + svgString);
	//document.getElementById("svg_image").innerHTML = svgString;

	console.log("Shape generation complete!");
	console.log("Writing shape to file...");
	writeToFile(svg_file, svgString); 
}
init()

module.exports = CLI;