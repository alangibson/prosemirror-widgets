# prosemirror-widgets
A collection of widgets for use in the ProseMirror Editor [View Demo](https://pboysen.github.io)

In [ThinkSpace](http://www.thinkspace.org), 
instructors use CKEditor to build content in multiple pages called phases which are 
linked together, forming a complex problem for students to solve. CKEditor is great but has typical HTML editor problems and takes work to add new widgets. **Enter ProseMirror**.

The above ProseMirror editor displays a number of widgets which can be inserted into HTML.  Insert the desired widget and supply the attributes requested. Tab between fields and press Enter to insert the element. *If you don't supply an attribute nothing will be created.* For most widgets, click on the widget to change the attributes.

A brief description of the widgets are shown below:

* **Image** was moved from the inline submenu to implement editing via clicking. Enter **img.png** for a test image.
* **Textfield, Textarea, Checkbox and Select** are used by instructors to prompt for questions in the process of solving a problem.
* **CarryForward** lets an instructor display a student answer from a previous phase(webpage)
* **InlineMath and BlockMath** uses MathJax to display equations. We need these for scientific and engineering problems.
* **Spreadsheet** displays an Excel-like experience for business and engineering.  Handsontable is used for integration. It also demonstrates how many well-formed javascript toolkits can be used to provide new capabilities.
* **IFrame** lets you embed websites, youTube, GoogleMaps... The sites may not display here because of github.io iframe restrictions.
* **MultipleChoice, CheckList and Scale** form the basis for a Test/Survey/Quiz/Exam document schema. Creating MultipleChoice and CheckList were cumbersome in CKEditor because each individual checkbox and radiobutton had to be inserted. It it now as easy as a bulletlist.  It is also easier to enter than GoogleForms and allows the insertion of media in answers which faculty need. For multiplechoice and checklist, insert and click on the empty paragraph that was inserted to type the question stem.  Press Enter to add a choice.

Finally, ThinkSpace supports **team-based learning**.  The ProseMirror <strong>collaboration</strong> capabilities are 
ideal for student teams to interact on documents.

This is exciting!

[Pete Boysen](mailto: pboysen@iastate.edu)


