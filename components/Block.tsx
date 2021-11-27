import React from 'react'

const Block = ({type, paragraph, link_preview, heading_2, bookmark, heading_3, code, bulleted_list_item, numbered_list_item}) => {
  const stateMachine = (type) =>{
    switch (type) {
      case "paragraph":
        let p = annotate(paragraph.text)
        return React.createElement('p', null, [...p]);
        break;
      case "heading_2":
        let h2 = annotate(heading_2.text)
        return React.createElement('h2', null, [...h2]);
        break;
      case "heading_3":
        let h3 = annotate(heading_3.text)
        return React.createElement('h3', null, [...h3]);
        break;
      case "heading_1":
        let h1 = annotate(heading_1.text)
        return React.createElement('h1', null, [...h1]);
        break;
      case "bulleted_list_item":
        let bi = annotate(bulleted_list_item.text)
        return React.createElement('li', null, [...bi]);
        break;
      case "numbered_list_item":
        let ol = annotate(bulleted_list_item.text)
        return React.createElement('ol', null, [...ol]);
        break;
      case "bookmark":
        let bm = annotateBookmark(bookmark)
        return React.createElement('span', {className: 'bookmark'}, [...bm] )
        break;
        
      default:
        return React.createElement('div', null, `unsupported block`);;
        break;
    }
  }
  const annotateBookmark = (bookmark) =>{
    return bookmark.caption.map((caption, index) =>{
      if (bookmark.url ) {
        return React.createElement('a', {href: bookmark.url, key:index}, caption.plain_text)
      }
      else{
        return caption.plain_text
      };
    });
  }

  const annotate = (text) =>{
    return text.map((text, index) =>{
      const props = {key: index, className:''}
      if (text.annotations.bold) {
        props.className = props.className.concat(" font-bold")
      }
      if (text.annotations.italic) {
        props.className = props.className.concat(" italic")
      }
      if (text.annotations.strikethrough) {
        props.className = props.className.concat(" line-through	")
      }
      if (text.annotations.underline) {
        props.className = props.className.concat(" underline")
      }
      if (text.href ) {
        props.href = text.href
        return React.createElement('a', props, text.plain_text)
      }
      else{
        if (props.className != '') {
          return React.createElement('span', props, text.plain_text)
        }
        else {
          return text.plain_text
        }
      };
    });
  }

  return (
    stateMachine(type)
  )
}

export default Block
