
## Installation Setups

1. Clone the repository

```bash
  git clone https://github.com/yashpatel1797/drag-drop-image
```

2. Navigate to project

```bash
  cd drag-drop-image
```

3. Install Dependencies

```bash
  npm install
```

4. Start the Development Server

```bash
  npm start or yarn start
```

5. View the Application

```bash
  Navigate to http://localhost:3000 
```

### Progress and Thought process

Part 1 
- Created a JSON file with the required data.
- Displayed images in a grid of 3 columns.
- Explored several packages for drag and drop functionality before deciding to use '@dnd-kit/sortable' and '@dnd-kit/core' for implementation. 
(Initally decided to use 'react-beautiful-dnd' but but due to compatibility issues with React 18, an alternative solution was found.)
- After checking drag and drop works correctly implemented Image preview on click. and on press of 'ESC' preview will be closed.

