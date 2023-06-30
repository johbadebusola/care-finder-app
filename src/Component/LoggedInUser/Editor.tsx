import React from 'react'
import "../../css/Feeds.css";
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import Editor from "react-markdown-editor-lite";
const Editors = () => {
    const dEditor = React.useRef(null);
   
   

    const mdParser = new MarkdownIt(/* Markdown-it options */);

  const handleEditorChange = ({html, text }:any) => {
    console.log('handleEditorChange', html, text);
    
  };

  
  return (
    <div className='editor-cont'>
        Editor
        <MdEditor style={{ height: '500px' }} renderHTML={text => mdParser.render(text)} onChange={handleEditorChange} />
        </div>
  )
}

export default Editors