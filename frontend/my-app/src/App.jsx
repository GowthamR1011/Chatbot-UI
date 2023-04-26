
import styles from './App.module.css';
import UserForm from '../components/login/login';
import NavHeader from '../components/navheader/navheader';
import ChatBot from '../components/chatbot/chatbot';

function App() {
  return (
    <div class={styles.App}>
  
      <NavHeader />
       <ChatBot />
    </div>
  );
}

export default App;
