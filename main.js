import './style.css'
import javascriptLogo from './javascript.svg'
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';


document.querySelector('#app').innerHTML = `
  <div>
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
      <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
    </a>
    <h1>Problem solving!</h1>
    <div class="editor-container">
      <div class="heading-tree" id="heading-tree"></div>

      <div class="editorjs-cont" id="editorjs"></div>
    </div>
  </div>
`




const renderHeadingTree = (data) => {

  const headingTree = document.getElementById('heading-tree');
  headingTree.innerHTML = '';
  const ul = document.createElement('ul');
  headingTree.appendChild(ul);
  data.blocks.forEach(block => {
    if (block.type === 'header') {
      const li = document.createElement('li');
      li.textContent = block.data.text;
      ul.appendChild(li);
    }
  });
}

const editor = new EditorJS({
  holder: 'editorjs',

  tools: {
    header: {
      class: Header,
      config: {
        placeholder: 'Enter a header',
        levels: [1, 2, 3, 4],
      }
    }
  },
  onChange: (api, event) => {
    const data = editor.save().then((outputData) => {
      console.log('Article data: ', outputData)
      renderHeadingTree(outputData)
    }
    );
  }
}
);



