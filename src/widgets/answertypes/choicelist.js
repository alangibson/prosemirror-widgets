import {Block, Textblock, Paragraph, TextNode, Text, Fragment, Attribute, Pos} from "prosemirror/dist/model"
import {elt, insertCSS} from "prosemirror/dist/dom"
import {defParser, defParamsClick, andScroll, namePattern, nameTitle, selectedNodeAttr} from "../../utils"

export class Choice extends Textblock {
	static get kinds() { return "choice" }
	get attrs() {
		return {
			name: new Attribute(),
			value: new Attribute(),
			class: new Attribute({default: "widgets-choice"})
		}
	}
	create(attrs, content, marks) {
		// if content not null then it is a fragment with paragraph as first child
		let para = content? content.firstChild: pm.schema.defaultTextblockType().create(null)
		return super.create(attrs,[this.schema.node("radiobutton",attrs),para],marks)
	}
}
 
export class ChoiceList extends Block {
	static get contains() { return "choice"}
	get attrs() {
		return {
			name: new Attribute,
			class: new Attribute({default: "widgets-choicelist widgets-edit"})
		}
	}
	get isList() { return true }
	create(attrs, content, marks) {
		return super.create(attrs,[this.schema.node("choice",{name: attrs.name, value:1})],marks)
	}
} 
  
defParser(Choice,"div","widgets-choice")
defParser(ChoiceList,"div","widgets-choicelist")
 
Choice.prototype.serializeDOM = (node,s) => s.renderAs(node,"div",node.attrs)
 
ChoiceList.prototype.serializeDOM = (node,s) => s.renderAs(node,"div",node.attrs)
 
function renumber(pm, node) {
	let i = 1
	node.forEach(ch => {
		let radio = ch.firstChild
		if (radio) radio.attrs.value = i++
	})
}

Choice.register("command", "split", {
  label: "Split the current choice",
  run(pm) {
    let {from, to, node} = pm.selection
    if ((node && node.isBlock) || from.path.length < 2 || !Pos.samePath(from.path, to.path)) return false
    let toParent = from.shorten(), parent = pm.doc.path(toParent.path)
    if (parent.type != this) return false
    //let toMC = toParent.shorten(), mc = pm.doc.path(toMC.path)
    let nextType = to.offset == parent.child(toParent.offset).size ? pm.schema.defaultTextblockType() : null
    // need to renumber nodes and move cursor
    return pm.tr.delete(from, to).split(from, 2, nextType).apply(andScroll)
  },
  keys: ["Enter(19)"]
})

Choice.register("command", "delete", {
  label: "delete this choice or choicelist",
  run(pm) {
	let {from,to} = pm.selection
    return pm.tr.delete(from.move(-1),to).apply(andScroll)
  },
  keys: ["Backspace(20)", "Mod-Backspace(20)"]
})

ChoiceList.register("command", "insert", {
	label: "ChoiceList",
	run(pm, name) {
//    	let mc = this.create({name}, pm.schema.node("choice",{name, value: 1}))
   		return pm.tr.replaceSelection(this.create({name})).apply(andScroll)
	},
	select(pm) {
		return true
		//return pm.doc.path(pm.selection.from.path).type.canContainType(this)
	},
	params: [
 	    { name: "Name", label: "Short ID", type: "text",
   	  	  prefill: function(pm) { return selectedNodeAttr(pm, this, "name") },
 		  options: {
 			  pattern: namePattern, 
 			  size: 10, 
 			  title: nameTitle}
   	  	}
	]
})

defParamsClick(ChoiceList,"choicelist:insert")

insertCSS(`

.widgets-choice input {
	float: left;
}

.ProseMirror .widgets-choice:hover {
	cursor: text;
}

.ProseMirror .widgets-choicelist {}

`)