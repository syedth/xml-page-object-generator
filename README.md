# XML to JSON Page Object Generator #
A light weight package that allows you to write the page objects in XML format and convert it into JSON key value pairs for easy maintenance for javascript and typescript files.

### Description
This package allows you to generate your XML page objects to JSON format. XML page objects allows to write clear page objects or locators that are needed for your automation tests. It uses [xml2js](https://www.npmjs.com/package/xml2js) library to parse XML data into javascript format.

### Installation
Simplest way to install xml-page-object-generator is to use npm, just [npm](https://www.npmjs.com/) install xml-page-object-generator which will download xml-page-object-generator and all dependencies.

### Usage
xml-page-object-generator will help automation testers to write the locators or page objects in the XML format and convert it into JSON key value pairs. Over time, the page objects used in the Automation Testing becomes vast and maintaining this becomes one of the biggest hurdles to manage. XML format helps tester to collaborate and write page objects in a neat and efficient manner.

An example is provided below on how page objects can be written in the XML format.

```bash
<?xml version="1.0"?>
<root>
  <page name="login_page">
		<obj name="email_input" attr="id" value="email" />
		<obj name="password_input" attr="id" value="password" />
		<obj name="login_button" attr="css" value="#login-form > button" />
	</page>
	<page name="sign_up_page">
		<obj name="email_input" attr="css" value="div.email" />
		<obj name="password_input" attr="css" value="div.password" />
	</page>
</root>
```

* _Root is a root level object which is used on hierarchical level._
* _Page object name should be unique and will generate its objects on its own._

#### Parameters passed in Xml file
1. The object  type '**name**' contains only straight forward **string** values 
2. The object  type '**attr**' contains two params '**id**' and '**css**' as values 

$${\color{red}_page name should never be duplicated as it is unique. Duplicating page names will result in overwriting of objects._$$

**_Note_**! - The default naming convention provided for the XML file is output.po.xml. However, this can be changed in the XmlToPageobj.js file as per the need.

### Conversion Logic
A function is written in a basic javascript file 'XmlToPageObj.js' to parse XML data and convert into json key value pairs. 'fs' module is used to read and write files in the desired location and 'parser' module is used to parse the XML data in the logic.

```bash
fs.readFile(__dirname + '/page_objects/output.po.xml', function (err, data) {
		parser.parseString(data, function (err, result) {
			const page = result.root.page;
			let pobj = {};
			for (let i = 0; i < page.length; i++) {
				if (pobj[page[i].$.name] === undefined) {
					pobj[page[i].$.name] = {};
				}
				for (let j = 0; j < page[i].obj.length; j++) {
					if (page[i].obj[j].$.attr === 'id') {
						pobj[page[i].$.name][page[i].obj[j].$.name] = '#' + page[i].obj[j].$.value;
					} else {
						pobj[page[i].$.name][page[i].obj[j].$.name] = page[i].obj[j].$.value;
					}
				}
			}
			fs.writeFile(__dirname + '/page_objects/output.po.json', JSON.stringify(pobj, null, 2), function () {
				console.log('Page Objects generated successfully');
			});
		});
	})
```
_The logic is written in such a way that page objects can be considered under two major criteria_
1. id - The logic concatenates '#' in the value and generates objects
2. css - The logic just generates the provided value as objects

### JSON Conversion
After the execution of logic, the XML data is parsed and converted into JSON format as follows in the _page_objects/output.po.json_ directory location.
```bash
{
  "login_page": {
    "email_input": "#email",
    "password_input": "#password",
    "login_button": "#login-form > button"
  },
  "sign_up_page": {
    "email_input": "div.email",
    "password_input": "div.password"
  }
}
```
### Page objects Generation and Execution
A simple javascript command is used to generate the page objects. Using node, compile the XmlToPageObj.js file to execute 
```bash
 node XmlToPageobj.js 
```
_A successful message is shown if the compilation is properly executed. And make sure to add this file to lint ignore as it may fail your lint since it has console logs added in the file._

### Usage of Multiple XML files ?
As of now multiple files are not supported. Only one XML file can be parsed and converted into JSON. However, infinite number of unique page names can be generated within the XML file.

### Page Objects usage in the Test Suites 
A js object can be created in the .js or .ts files and can be imported into the desired location and can be used. The below example states how page objects are being used in **Cypress** tests. An example is provided in the examples folder as well for visibility, but the tests won't compile as we need to install required dependencies. This can be used as a reference on how page objects can be used in the test suites.
```bash
import * as pageObj from '../page_objects/output.po.json';

describe('Login Test', () => {

    it('Examples', () => {
    cy.get(pageObj.login_page.email_input).type('test@email.com');
	cy.get(pageObj.login_page.password_input).type('P@ssWord1');
	cy.get(pageObj.login_page.login_button).click();
    });
    
});
```
_The above similar way can be used for all **Javascript** and **Typescript** based frameworks like Cypress, Night Watch Js, Playwright etc._

## Author

- [@syedth](https://github.com/syedth)



