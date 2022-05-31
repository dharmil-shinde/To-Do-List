import './App.css';
import TodoSearch from './components/TodoSearch';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';

function App() {
  return (
    <>
      <h1 className='header'>
        <PlaylistAddIcon className='icon-header' fontSize="larger"/>To-do List</h1>
   
        <TodoSearch/>
    </>
  );
}

export default App;
