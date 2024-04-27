
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

Part 2
- Install msw to implement local server.
- created mock server and handlers.
- Was getting error about [Browser: Cannot read properties of undefined (reading 'url')](https://github.com/mswjs/msw/issues/2053) to solve it down graded msw but still it might still occurs some time.
- Stored data in browser localStorage.

Part 3
- Created Post API on handlers to make API call from frontend every 5 seconds store data in localStorage as well.
- Write useEffect which will make api call from frontend every 5 seconds. if data is changed then update them in localStorage.
- Implemented Last save timer to show timing of last save change.
