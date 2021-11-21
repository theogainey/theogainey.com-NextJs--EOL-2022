
const Block = ({type, paragraph, heading_2, heading_3,code, bulleted_list_item}) => {
  const stateMachine = (type) =>{
    switch (type) {
      case "paragraph":
        let p = '<p>';
        paragraph.text.forEach(element => {
          if (element.href) {
            p= p.concat(`<a href=${element.href}>${element.plain_text}</a>`)
          }
          else {
            p = p.concat(element.plain_text)
          }
        });
        p = p.concat('</p>')
        return {__html: p};
        break;
      case "heading_`":
        let h1 = '<h1>';
        heading_1.text.forEach(element => {
          if (element.href) {
            h1= h1.concat(`<a href=${element.href}>${element.plain_text}</a>`)
          }
          else {
            h1 = h1.concat(element.plain_text)
          }
        });
        h1 = h1.concat('</h1>')
        return {__html: h1}
        break;
      case "heading_2":
        let h2 = '<h2>';
        heading_2.text.forEach(element => {
          if (element.href) {
            h2= h2.concat(`<a href=${element.href}>${element.plain_text}</a>`)
          }
          else {
            h2 = h2.concat(element.plain_text)
          }
        });
        h2 = h2.concat('</h2>')
        return {__html: h2}
        break;
      case "heading_3":
        let h3 = '<h3>';
        heading_3.text.forEach(element => {
          if (element.href) {
            h3= h3.concat(`<a href=${element.href}>${element.plain_text}</a>`)
          }
          else {
            h3 = h3.concat(element.plain_text)
          }
        });
        h3 = h3.concat('</h3>')
        return {__html: h3}
        break;
      case "code":
        let c = '<code>';
        code.text.forEach(element => {
          c = c.concat(element.plain_text)
        });
        c = c.concat('</code>')
        return {__html: c};
        break;
      case "bulleted_list_item":
        let bi = '<li>';
        bulleted_list_item.text.forEach(element => {
          if (element.href) {
            bi= bi.concat(`<a href=${element.href}>${element.plain_text}</a>`)
          }
          else {
            bi = bi.concat(element.plain_text)
          }
        });
        bi = bi.concat('</li>')
        return {__html:bi};
        break;
      case "numbered_list_item":
        let ni = '<ol>';
        numbered_list_item.text.forEach(element => {
          if (element.href) {
            ni= ni.concat(`<a href=${element.href}>${element.plain_text}</a>`)
          }
          else {
            ni = ni.concat(element.plain_text)
          }
        });
        ni = ni.concat('</ol>')
        return {__html:ni};
        break;
      default:
        return {__html:'<p>unsupported block</p>'};
        break;
    }
  }
  return (
    <div dangerouslySetInnerHTML={stateMachine(type)} />
  )
}

export default Block
