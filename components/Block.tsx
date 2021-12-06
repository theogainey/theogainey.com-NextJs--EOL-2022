import React from 'react'
import Bookmark from './Bookmark'
import LinkPreview from './LinkPreview'

const Block = ({type, quote, paragraph, link_preview, heading_1, heading_2, bookmark, heading_3, code, bulleted_list_item, numbered_list_item, og}) => {
  const blockElement = (type) =>{
    switch (type) {
      case "heading_1":
        const h1 = heading_1.text.map(e=> annotate(e))
        return React.createElement('h1', null, [...h1]);
        break;
      case "heading_2":
        const h2 = heading_2.text.map(e=> annotate(e))
        return React.createElement('h2', null, [...h2]);
        break;
      case "heading_3":
        const h3 = heading_3.text.map(e=> annotate(e))
        return React.createElement('h3', null, [...h3]);
        break;
      case "paragraph":
        const p = paragraph.text.map(e=>  annotate(e))
        return React.createElement('p', null, [...p]);
        break;
      case "quote":
        const q = quote.text.map(e=> annotate(e))
        return React.createElement('blockquote', null, [...q]);
        break;
      case "bulleted_list_item":
        const item = bulleted_list_item.text.map(e=>  annotate(e))
        const itemElement = React.createElement('li', {key: 'f'}, [...item])
        if (bulleted_list_item.children) {
          const childItems = bulleted_list_item.children.map(e=>  e.bulleted_list_item.text.map(e=>annotate(e)))
          const childElements = childItems.map((e, i)=>  React.createElement('li', {key: i}, [...e]))
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
          const nChildElements = nChildItems.map((e, i)=>  React.createElement('li', {key: i}, [...e]))
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
      case "divider":
        return React.createElement('hr', null);
        break;
      default:
        return React.createElement('div', null, `unsupported block`);;
        break;
    }
  }

  const annotate = (text) =>{
    if (text.href ) {
      const childProps = {...text, href: null}
      const childElement = annotate(childProps)
      return React.createElement('a', {key:1, href: text.href}, childElement)
    }
    if (text.annotations.bold) {
      const childProps = {...text, annotations:{...text.annotations, bold: null}}
      const childElement = annotate(childProps)
      return React.createElement('strong', {key:2}, childElement)
    }
    if (text.annotations.italic) {
      const childProps = {...text, annotations:{...text.annotations, italic: null}}
      const childElement = annotate(childProps)
      return React.createElement('i', {key:3}, childElement)
    }
    if (text.annotations.strikethrough) {
      const childProps = {...text, annotations:{...text.annotations, strikethrough: null}}
      const childElement = annotate(childProps)
      return React.createElement('s', {key:4}, childElement)
    }
    if (text.annotations.underline) {
      const childProps = {...text, annotations:{...text.annotations, underline: null}}
      const childElement = annotate(childProps)
      return React.createElement('u', {key:5},  childElement)
    }
    else {
      return text.plain_text
    }
  }

  return (
    blockElement(type)
  )
}

export default Block
