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

const calcIndentation = (parentArray) => {
  const indentation = [];

  for (let i = 0; i < parentArray.length; i++) {
    const parentOfI = parentArray[i];
    const parentIndentation = indentation[parentOfI];

    if (parentOfI === undefined) {
      indentation[i] = 0;
    } else {
      // calc currennt indentation
      const currentIndentation = parentIndentation + 1;
      indentation[i] = currentIndentation;
    }
  }

  return indentation;
}

const buildParentTree = (headingList) => {
  const parent = []

  for (let i = headingList.length - 1; i >= 0; i--) {
    const currLevel = headingList[i].data.level; // 3

    for (let j = i - 1; j >= 0; j--) {
      if (headingList[j].data.level < currLevel) {
        parent[i] = j;
        break;
      }
    }
  }

  return parent;
}

const renderHeadingTree = (headingList, indent) => {
  const headingTree = document.getElementById('heading-tree');
  headingTree.innerHTML = '';
  const ul = document.createElement('ul');

  headingList.forEach((block, idx) => {
    const li = document.createElement('li');
    const indentation = indent[idx];
    li.innerHTML = Array(indentation).fill('&nbsp;&nbsp;&nbsp;&nbsp;').join('') + block.data.text
    ul.appendChild(li);
  });


  headingTree.appendChild(ul);
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
      const headingList = outputData.blocks.filter(block => block.type === 'header')
      const parent = buildParentTree(headingList)
      console.log('Parent array: ', parent);
      console.log('Indentation array: ', calcIndentation(parent));


      renderHeadingTree(headingList, calcIndentation(parent))
    }
    );
  }
}
);



