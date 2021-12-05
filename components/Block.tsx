import React from 'react'
import Bookmark from './Bookmark'
import LinkPreview from './LinkPreview'

const Block = ({type, paragraph, link_preview, heading_1, heading_2, bookmark, heading_3, code, bulleted_list_item, numbered_list_item, og}) => {
  const blockElement = (type) =>{
    switch (type) {
      case "heading_1":
        const h1 = heading_1.text.map(e=> {return annotate(e)})
        return React.createElement('h1', null, [...h1]);
        break;
      case "heading_2":
        const h2 = heading_2.text.map(e=> {return annotate(e)})
        return React.createElement('h2', null, [...h2]);
        break;
      case "heading_3":
        const h3 = heading_3.text.map(e=> {return annotate(e)})
        return React.createElement('h3', null, [...h3]);
        break;
      case "paragraph":
        const p = paragraph.text.map(e=> {return annotate(e)})
        return React.createElement('p', null, [...p]);
        break;
      case "bulleted_list_item":
        const item = bulleted_list_item.text.map(e=> {return annotate(e)})
        const itemElement = React.createElement('li', {key: 'f'}, [...item])
        if (bulleted_list_item.children) {
          const childItems = bulleted_list_item.children.map(e=>  e.bulleted_list_item.text.map(e=> {return annotate(e)}))
          const childElements = childItems.map((e, i)=> {return React.createElement('li', {key: i}, [...e])})
          return React.createElement('ul', null, [itemElement, ...childElements])
        }
        else {
          return React.createElement('ul', null, itemElement)
        }
        break;
      case "numbered_list_item":
        const nItem = numbered_list_item.text.map(e=> {return annotate(e)})
        const nItemElement = React.createElement('li', {key: 'f'}, [...nItem])
        if (numbered_list_item.children) {
          const nChildItems = numbered_list_item.children.map(e=>  e.numbered_list_item.text.map(e=> {return annotate(e)}))
          const nChildElements = nChildItems.map((e, i)=> {return React.createElement('li', {key: i}, [...e])})
          return React.createElement('ol', null, [nItemElement, ...nChildElements])
        }
        else {
          return React.createElement('ol', null, nItemElement);  
        }
        break;
      case "bookmark":
        return React.createElement(Bookmark, {bookmark, og} )
        break;
      case "link_preview":
        return React.createElement(LinkPreview, {link_preview, og} )
        break;
      default:
        return React.createElement('div', null, `unsupported block`);;
        break;
    }
  }

  const annotate = (element) =>{
    if (element.href ) {
      const childProps = {...element, href: null}
      const childElement = annotate(childProps)
      return React.createElement('a', {key:1, href: element.href}, childElement)
    }
    if (element.annotations.bold) {
      const childProps = {...element, annotations:{...element.annotations, bold: null}}
      const childElement = annotate(childProps)
      return React.createElement('strong', {key:2}, childElement)
    }
    if (element.annotations.italic) {
      const childProps = {...element, annotations:{...element.annotations, italic: null}}
      const childElement = annotate(childProps)
      return React.createElement('i', {key:3}, childElement)
    }
    if (element.annotations.strikethrough) {
      const childProps = {...element, annotations:{...element.annotations, strikethrough: null}}
      const childElement = annotate(childProps)
      return React.createElement('s', {key:4}, childElement)
    }
    if (element.annotations.underline) {
      const childProps = {...element, annotations:{...element.annotations, underline: null}}
      const childElement = annotate(childProps)
      return React.createElement('u', {key:5},  childElement)
    }
    else {
      return element.plain_text
    }
  }

  return (
    blockElement(type)
  )
}

export default Block
